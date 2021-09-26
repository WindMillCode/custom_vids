import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'sanitizeUrl'
})
export class SanitizeUrlPipe implements PipeTransform {
    constructor(
        private sanitizer: DomSanitizer
    ) {}
    transform(devObj: any, ...args: unknown[]): any {

        let {value } =devObj;
        switch (devObj.type) {
            case "Html":
                return this.sanitizer.bypassSecurityTrustHtml(devObj.value);
                break;
            case "Style":
                return this.sanitizer.bypassSecurityTrustStyle(devObj.value);
                break;
            case "Script":
                return this.sanitizer.bypassSecurityTrustScript(devObj.value);
                break;
            case "Url":
                return this.sanitizer.bypassSecurityTrustUrl(devObj.value)
                break;
            case "ResourceUrl":
                return this.sanitizer.bypassSecurityTrustResourceUrl(devObj.value)
                break;

            default:
                return null;
                break;
        }

    }

}
