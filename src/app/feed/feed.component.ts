import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FeedService } from './feed.service';
import { FeedType } from '../_shared/enums';
import { Item } from '../_shared/interfaces';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  @ViewChild('scrollElement', { static: true }) scrollElement: ElementRef;

  constructor(
    public feedService: FeedService
  ) { }

  ngOnInit() {
    this.feedService.initStoriesList();
  }

  idTracker = (index: number, item: Item) => item.id;

  scrollToTop = () => this.scrollElement.nativeElement.scrollTop = 0

  onChangeType(type: FeedType): void {
    this.feedService.type$.next(type);
    this.feedService.initStoriesList();
  }

  appendMoreStories = () => this.feedService.appendStories();
}
