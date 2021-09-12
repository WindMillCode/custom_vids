import { Pipe, PipeTransform } from '@angular/core';
import { mediaPrefix } from './customExports';
@Pipe({
  name: 'mediaPrefix'
})
export class MediaPrefixPipe implements PipeTransform {

  transform(value:string, ...args: unknown[]): unknown {

    return mediaPrefix({media:value});
  }

}
