import { Component, Output, EventEmitter } from '@angular/core';
import { HNService } from 'src/app/_shared/services/hn.service';
import { ThemeService } from 'src/app/_shared/services/theme.service';
import { FeedType } from 'src/app/_shared/enums';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: {
    "(window:resize)": "onWindowResize($event)"
  }
})
export class ToolbarComponent {

  // If window width is narrower than 760px -> mobile layout.
  private readonly mobileThreshold: number = 760;
  mobile: boolean = !!(window.innerWidth < this.mobileThreshold);

  // Emit new 'type' values to the parent
  FeedType = FeedType;
  @Output() changeType = new EventEmitter<FeedType>();

  constructor(
    public hn: HNService,
    public themeService: ThemeService
  ) {
  }

  onWindowResize = (event: any) => this.mobile = event.target.innerWidth < this.mobileThreshold;

  switchFeed = (input: FeedType) => this.changeType.emit(input)

}
