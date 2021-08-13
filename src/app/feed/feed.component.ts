import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { finalize, scan} from 'rxjs/operators';

import { HNService } from '../shared/hn.service';
import { SharedService } from '../shared/shared.service';
import { LoadState } from '../shared/enums';
import { Item } from '../shared/interfaces';
import { Animations } from '../shared/animations';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  animations: [ Animations.showItem ]
})
export class FeedComponent implements OnInit {

  @ViewChild('scrollElement', { static: true }) scrollEl: ElementRef;

  readonly ITEMS_PER_PAGE = 30;
  readonly TYPES = ['topstories', 'beststories', 'newstories', 'askstories', 'showstories', 'jobstories']
  readonly LABELS = ['Top', 'Best', 'New', 'Ask', 'Show', 'Job']


  // Page context
  page: number = 0;
  scrollTop: number = 0;
  loadState: LoadState = LoadState.WAITING;

  // Stories
  type: string = this.TYPES[0];
  ids: number[] = [];
  stories: Item[] = [];

  LoadState = LoadState;

  constructor(
    private router: Router,
    private hn: HNService,
    public shared: SharedService
  ) {
  }

  ngOnInit() {
    // Listener to save the current scroll position when navigates into comments.
    this.router.events.subscribe((event) => {
      // Apply scroll when navigate back
      if (event instanceof NavigationEnd && event.url === '/') {
        // Disable smooth behavior to avoid scroll animations on resume
        this.scrollEl.nativeElement.style.setProperty('scroll-behavior', 'initial');
        this.scrollEl.nativeElement.scrollTop = this.scrollTop;
        this.scrollEl.nativeElement.style.setProperty('scroll-behavior', 'smooth');
      }
    });

    this.hn.getStoryIndices(this.type).subscribe(ids => {
      this.ids = ids;
      this.requestContentFromIds();
    });
  }

  idTracker = (index: number, item: Item) => item.id;

  switchTheme() {
    // TODO
  }

  /**
   * Saves current scroll state and navigates into Comments.
   * @param id ID of the story
   */
  navigateIntoComments(id: number): void {
    this.scrollTop = this.scrollEl.nativeElement.scrollTop;
    this.router.navigate([id]);
  }

  /**
   * Changes type value, empty the current stories array and request the new ones.
   * 
   * @param type Kind of feed
   */
  setFeedType(type: string): void {
    this.type = type;
    this.page = 0;
    this.stories = [];

    this.loadState = LoadState.WAITING;
    this.hn.getStoryIndices(this.type).subscribe(ids => {
      this.ids = ids;
      this.requestContentFromIds();
    });
  }

  /**
   * Loads the first page (30 items) of the current type (Top Stories by default).
   */
  requestContentFromIds(itemOffset: number = 0): void {
    this.hn.getItemsContent(this.ids.slice(itemOffset, itemOffset + 30)).pipe(
      scan((acc, curr) => [...acc, ...curr], this.stories),
      finalize(() => this.loadState = LoadState.IDLE)
      ).subscribe(stories => this.stories = stories);
  }

  /**
   * Keeps requesting items, appends 30 more into the list.
   */
  infiniteLoad(): void {
    this.page++;
    this.requestContentFromIds(this.page * this.ITEMS_PER_PAGE);
  };
}
