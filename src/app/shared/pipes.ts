import { Pipe, PipeTransform } from '@angular/core';
import { ThemeIcon } from './enums';

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

@Pipe({ name: 'formatTitle' })
export class FormatTitlePipe implements PipeTransform {
    transform(type: string): string {
        // input: topstories
        const label = type.split('stories');
        // output: Top Stories
        return label[0].charAt(0).toLocaleUpperCase() + label[0].slice(1) + ' Stories';
    }
}

@Pipe({ name: 'iconTheme' })
export class IconThemePipe implements PipeTransform {
    transform(value: boolean): ThemeIcon {
        if (value) {
            return ThemeIcon.DARK;
        } else {
            return ThemeIcon.LIGHT;
        }
    }
}

@Pipe({ name: 'commentPadding' })
export class PaddingPipe implements PipeTransform {
    transform(value: boolean): number {
        if (value) {
            return 10;
        } else {
            return 30;
        }
    }
}