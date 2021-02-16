import { Pipe, PipeTransform } from '@angular/core';

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
