import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { ProgressBarMode } from "@angular/material/progress-bar";

import { from, of, Observable, BehaviorSubject, EMPTY } from "rxjs";
import { filter, map, concatMap, mergeMap, reduce, expand, pluck, first, tap, finalize } from "rxjs/operators";

import { FeedType, LoadState } from "../enums";
import { Item, ItemType } from "../interfaces";

/**
 * ✨ DOCS! ✨
 * https://github.com/angular/angularfire/blob/master/docs
 */


@Injectable()
export class HNService {

    private readonly DEBUG = false;
    waitingRequest$: BehaviorSubject<ProgressBarMode>;

    constructor(
        private db: AngularFireDatabase
    ) {
        this.waitingRequest$ = new BehaviorSubject<ProgressBarMode>(LoadState.IDLE);
    }

    getItemsContent(indices$: number[], offset: number): Observable<Item[]> {
        this.waitingRequest$.next(LoadState.WAITING);

        return of(indices$).pipe(
            map((array: number[]) => array.slice(offset, offset + 30)),
            concatMap((array: number[]) => array),
            mergeMap((id: number) => this.getItem(id)),
            reduce((arr: Item[], content: Item) => {
                return arr.push(content) && arr;
            }, []),
            finalize(() => this.waitingRequest$.next(LoadState.IDLE))
        );
    }

    getStoryIndices(type: FeedType): Observable<number[]> {
        return this.db.list<number>('/v0', ref => ref.child(type))
            .valueChanges()
            .pipe(
                first(),
                tap(feed => this.DEBUG && console.debug('GET Story ids', feed))
            );
    }

    getRecursiveReplies(id: number): Observable<Item> {
        return this.getItem(id)
            .pipe(
                map(response => ({ node: response })),
                expand(({ node }) => {
                    return !node ? EMPTY : from(node.kids).pipe(
                        mergeMap(childId => this.getItem(childId).pipe(
                            map((res: any) => ({ node: res, parent: node }))
                        ))
                    );
                }),
                reduce((acc, { node, parent }) =>
                    !parent ? node : parent.replies.push(node) && acc
                ),
                pluck('node')
            );
    }

    getStoryComments(id: number) {
        console.time('Getting comments')
        return from(this.getItem(id)).pipe(
            concatMap((story: Item) => story.kids),
            mergeMap((id: number) => this.getRecursiveReplies(id)),
            reduce((arr: Item[], content: Item) => {
                return arr.push(content) && arr;
            }, []),
            tap(item => this.DEBUG && console.timeEnd('Getting comments'))
        )
    }

    /**
     * Method for getting any Item from database.
     * Stories, Comments, Shows, Jobs etc are extended interfaces from Item.
     * 
     * db.object could return null, to avoid linting warnings add "strictNullChecks"
     * on the tsconfig file.
     * 
     * @param id Reference number of the requested object.
     */
    getItem(id: number): Observable<Item> {
        return this.db.object<Item>('/v0/item/' + id)
            .valueChanges()
            .pipe(
                first(),
                // Filter every removed item.
                filter((item: Item) => !item.deleted),
                map((item: Item) => {
                    // No kids -> Empty list
                    !("kids" in item) && ((item as Item).kids = []);
                    // Comments must have a 'replies' property with [] as default value.
                    (item.type === ItemType.comment) && (item.replies = []);
                    return item;
                }),
                tap(item => this.DEBUG && console.debug('GET Item', item))
            );
    }
}
