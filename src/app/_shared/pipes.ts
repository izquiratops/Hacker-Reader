import { Pipe, PipeTransform } from '@angular/core';
import { FeedType, FeedTypeLabel, Theme, ThemeIcon } from './enums';

@Pipe({ name: 'domain' })
export class DomainPipe implements PipeTransform {
    transform(value: string): string {
        const match = value.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match !== null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
        } else {
            return null;
        }
    }
}

@Pipe({ name: 'replies' })
export class RepliesPipe implements PipeTransform {
    transform(value: number): string {
        if (value === 0) {
            return '';
        } else if (value === 1) {
            return '1 reply hidden.';
        } else {
            return value + ' replies hidden.'
        }
    }
}

@Pipe({name: 'postFrom'})
export class PostFromPipe implements PipeTransform {
  transform(value: number): string {
    const diff = Math.abs(Date.now() - value * 1000) / (60 * 60 * 1000);
    const minutes = Math.trunc(diff * 60);
    const hours = Math.floor(diff);
    const days = Math.floor(hours/24);

    if (days > 1) {
      return days + ' days ago';
    } else if (days === 1) {
      return days + ' day ago'
    } else if (hours > 1) {
      return hours + ' hours ago';
    } else if (hours === 1) {
      return hours + ' hour ago';
    } else {
      return minutes + ' minutes ago';
    }
  }
}

@Pipe({ name: 'headerTitle' })
export class HeaderPipe implements PipeTransform {
    transform(value: FeedType): FeedTypeLabel {
        switch (value) {
            case FeedType.TOP:
                return FeedTypeLabel.TOP;
            case FeedType.BEST:
                return FeedTypeLabel.BEST;
            case FeedType.NEW:
                return FeedTypeLabel.NEW;
            case FeedType.SHOW:
                return FeedTypeLabel.SHOW;
            case FeedType.ASK:
                return FeedTypeLabel.ASK;
            case FeedType.JOB:
                return FeedTypeLabel.JOB;
            default:
                return FeedTypeLabel.TOP;
        }
    }
}

@Pipe({ name: 'iconTheme' })
export class IconThemePipe implements PipeTransform {
    transform(value: string): ThemeIcon {
        switch (value) {
            case Theme.DARK:
                return ThemeIcon.DARK;
            case Theme.LIGHT:
                return ThemeIcon.LIGHT;
            default:
                return ThemeIcon.LIGHT;
        }
    }
}

@Pipe({ name: 'commentPadding' })
export class PaddingPipe implements PipeTransform {
    transform(value: boolean): number {
        // easy, mobile? 30 no mobile? 10
        if (value) {
            return 10;
        } else {
            return 30;
        }
    }
}