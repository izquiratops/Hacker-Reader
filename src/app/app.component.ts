import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "(window:resize)": "onWindowResize($event)"
  }
})
export class AppComponent {

  @HostBinding('class') componentCssClass: string;

  constructor(
    public shared: SharedService
  ) {
    this.shared.currentTheme$
      .subscribe((theme: string) => this.componentCssClass = theme);
  }

  /**
   * Checks if should be displayed the desktop or mobile layout.
   * 
   * @param event Values from the new state of the window
   */
  onWindowResize(event: any): void {
    this.shared.isMobile$.next(event.target.innerWidth < this.shared.mobileThreshold);
  }
}
