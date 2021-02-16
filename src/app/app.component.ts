import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { ThemeService } from './_shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  // Class property to switch between Light or Dark themes.
  @HostBinding('class') componentCssClass: string;

  constructor(
    private themeService: ThemeService
  ) {
    this.themeService.currentValue$.subscribe(
      (theme: string) => this.componentCssClass = theme
    );
  }
}
