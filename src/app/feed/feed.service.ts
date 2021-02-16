import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { scan } from "rxjs/operators";

import { HNService } from "../_shared/services/hn.service";
import { FeedType } from "../_shared/enums";
import { Item } from "../_shared/interfaces";

@Injectable()
export class FeedService {

    type$: BehaviorSubject<FeedType>;
    ids$: BehaviorSubject<number[]>;
    stories$: BehaviorSubject<Item[]>;

    constructor(
        private hn: HNService
    ) {
        this.type$ = new BehaviorSubject<FeedType>(FeedType.TOP);
        this.ids$ = new BehaviorSubject<number[]>([]);
        this.stories$ = new BehaviorSubject<Item[]>([]);
    }

    initStoriesList() {
        const type = this.type$.value;
        this.stories$.next([]);

        this.hn.getStoryIndices(type).subscribe((ids: number[]) => {
            // Save IDs
            this.ids$.next(ids);
            // Get Stories
            const offset: number = this.stories$.value.length;
            this.hn.getItemsContent(ids, offset).subscribe((stories: Item[]) => {
                this.stories$.next(stories);
            });
        })
    };

    appendStories() {
        const offset: number = this.stories$.value.length;
        this.hn.getItemsContent(this.ids$.value, offset).pipe(
            scan((curr, appendedStories) => [...curr, ...appendedStories], this.stories$.value)
        ).subscribe((stories: Item[]) => this.stories$.next(stories));
    }
}
