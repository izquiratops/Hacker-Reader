import { ChangeDetectionStrategy, Component, HostBinding, HostListener } from '@angular/core';
import { Theme } from './shared/enums';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {

  @HostBinding('class') componentCssClass: string;

  @HostListener('window:resize', ['$event'])
  private onResize(e: any): void {
    this.shared.isMobile$.next(e.target.innerWidth < this.shared.WIDTH_THRESHOLD);
  };

  constructor(
    public shared: SharedService
  ) {
    this.shared.isDarkTheme$.subscribe(isDark => {
      const theme = isDark ? Theme.DARK : Theme.LIGHT;
      this.componentCssClass = theme
      localStorage.setItem('theme', theme);
    });
  }

}
