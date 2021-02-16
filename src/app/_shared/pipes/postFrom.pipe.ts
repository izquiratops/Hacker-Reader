import { Pipe, PipeTransform } from '@angular/core';

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