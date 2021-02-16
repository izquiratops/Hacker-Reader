import { Pipe, PipeTransform } from '@angular/core';
import { FeedType, FeedTypeLabel } from '../enums';

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
                return FeedTypeLabel.EMPTY;
        }
    }
}
