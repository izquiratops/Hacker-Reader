import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { scan } from 'rxjs/operators';

import { HNService } from '../_shared/services/hn.service';
import { SharedService } from '../_shared/services/shared.service';
import { Animations } from '../_shared/animations';
import { Item } from '../_shared/interfaces';
import { FeedType, LoadState } from '../_shared/enums';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  animations: [Animations.showItem]
})
export class FeedComponent implements OnInit {

  // Page context
  @ViewChild('scrollElement', { static: true }) scrollElement: ElementRef;
  scrollTop: number = 0;
  waitingRequest$: BehaviorSubject<LoadState>;

  // Stories
  FeedType = FeedType;
  type$: BehaviorSubject<FeedType>;
  ids$: BehaviorSubject<number[]>;
  stories$: BehaviorSubject<Item[]>;

  constructor(
    private router: Router,
    private host: ElementRef,
    private hn: HNService,
    public shared: SharedService
  ) {
    this.waitingRequest$ = new BehaviorSubject<LoadState>(LoadState.WAITING);
    this.type$ = new BehaviorSubject<FeedType>(FeedType.TOP);
    this.ids$ = new BehaviorSubject<number[]>([]);
    this.stories$ = new BehaviorSubject<Item[]>([]);

    // Listener to get scroll all the way up.
    this.shared.scrollUp$.subscribe(() => this.host.nativeElement.scrollTop = 0);

    // Listener to save the current scroll position when navigates into comments.
    this.router.events.subscribe((event) => {
      // Apply scroll when navigate back
      if (event instanceof NavigationEnd && event.url === '/') {
        // Disable smooth behavior to avoid scroll animations on resume
        this.host.nativeElement.style.setProperty('scroll-behavior', 'initial');
        this.host.nativeElement.scrollTop = this.scrollTop;
        this.host.nativeElement.style.setProperty('scroll-behavior', 'smooth');
      }
    });
  }

  idTracker = (index: number, item: Item) => item.id;


  /**
   * First time load, without this the list would be empty.
   */
  ngOnInit() {
    this.loadStories();
  }

  /**
   * Saves current scroll state and navigates into Comments.
   * @param id ID of the story
   */
  navigateIntoComments(id: number) {
    this.scrollTop = this.host.nativeElement.scrollTop;
    this.router.navigate([id]);
  }

  /**
   * Changes type value, empty the current stories array and request the new ones.
   * 
   * @param type Kind of feed
   */
  switchFeed(type: FeedType) {
    this.waitingRequest$.next(LoadState.WAITING);
    this.stories$.next([]);
    this.type$.next(type);
    this.loadStories();
  }

  /**
   * Loads the first page (30 items) of the current type (Top Stories by default).
   */
  loadStories() {
    this.hn.getStoryIndices(this.type$.getValue()).subscribe((ids: number[]) => {
      // Save IDs
      this.ids$.next(ids);
      // Get Stories
      const stories: Item[] = this.stories$.getValue();
      this.hn.getItemsContent(ids, stories.length).subscribe((stories: Item[]) => {
        this.stories$.next(stories);
        this.waitingRequest$.next(LoadState.IDLE);
      });
    })
  }

  /**
   * Keeps requesting items, appends 30 more into the list.
   */
  infiniteLoad() {
    const stories: Item[] = this.stories$.getValue();
    this.waitingRequest$.next(LoadState.WAITING);

    this.hn.getItemsContent(this.ids$.getValue(), stories.length).pipe(
      scan((curr, appendedStories) => [...curr, ...appendedStories], this.stories$.value)
    ).subscribe((stories: Item[]) => {
      this.stories$.next(stories);
      this.waitingRequest$.next(LoadState.IDLE);
    });
  };
}
