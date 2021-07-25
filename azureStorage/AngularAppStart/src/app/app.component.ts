import { Component,Output, ViewChild,Input } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'AngularApp';
    @Output() popupClose;
    @Output() popupContent;
    @ViewChild('getFilesButton') myGetFiles:any
    @ViewChild('popupContent') myContent:any
    @ViewChild('uploadContent') myUpload:any
    @ViewChild('uploadUrl') myUrl:any
    @ViewChild('uploadName') myFileName:any


    fileUpload :any= {
        select:{
            type:"select",
            file:null
        },
        upload:{
            type:"upload"
        },
        container:{
            type:"container",
        },
        list:{
            items:[],
        }
    }

    fileUploadSubject: Subject<any> = new Subject<any>()

    ngAfterViewInit(){
        this.fileUpload.container.popupC = this.myContent
        this.fileUpload.upload.popupC = this.myUpload
        this.fileUpload.upload.result= this.myUrl
        this.fileUpload.upload.fileName= this.myFileName
        this.fileUpload.list.button = this.myGetFiles
        this.fileUploadSubject.next(this.fileUpload)
    }
}
