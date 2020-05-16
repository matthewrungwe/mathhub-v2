import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertToNewline'
})

export class ConvertToNewlinePipe implements PipeTransform {

    transform(value: string, separator: string): string {
        const valueArray: string[] = value.split(' ');
        const changedArray: string[] = [];

        for (const word of valueArray) {
            if (word === separator) {
                changedArray.push('<br/>');
            } else {
                changedArray.push(word);
            }
        }

        return changedArray.join(' ');
    }
}
