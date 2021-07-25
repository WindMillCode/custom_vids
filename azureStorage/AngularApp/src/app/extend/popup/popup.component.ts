import { Component, ElementRef, OnInit, Renderer2, ViewChild,Input } from '@angular/core';
import { combineLatest, of,fromEvent } from 'rxjs';
import { first} from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


declare global{
    interface Window{ ActiveXObject:any}
}

interface authAE {
    aE?:string,
    type:string,
    apiName?:string,
    method:"GET" | "POST" | "PUT" | "DELETE" | "OPTIONS",
    url:string,
    contentLength?:number,
    fileName?:string
    mimeType?:string
}

var parseXml;
if (typeof window.DOMParser != "undefined") {
    parseXml = function(xmlStr) {
        return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
    };
} else if (typeof window.ActiveXObject != "undefined" &&
       new window.ActiveXObject("Microsoft.XMLDOM")) {
    parseXml = function(xmlStr) {
        var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlStr);
        return xmlDoc;
    };
} else {
    throw new Error("No XML parser found");
}


//  data url to blob

//



@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopupComponent  {

    @Input('content') myContent:PopupComponent
    @Input('close') myClose:    HTMLElement
    @Input('containerSubmit') myContainerSubmit:HTMLButtonElement
    @Input('finalSubmit') myFinalSubmit:HTMLButtonElement
    @Input('container') myContainerName:HTMLInputElement
    @Input('fileUpload') myFinalUpload:any
    @Input('getButton') myGetButton:boolean

    constructor(
        private renderer2:Renderer2,
        private el:ElementRef,
        private http:HttpClient
    ) { }

    popup :any;
    storageURL :string =  "https://storageacctdemo624.blob.core.windows.net/"
    storageContainerURL :string= ""
    ngOnInit(): void {

        let {myGetButton,myClose,renderer2,myContainerSubmit,storageURL,myContent,myContainerName,myFinalSubmit,myFinalUpload,http} = this
        let authAS$ =  (devObj:authAE)=>{
            return http.post(
                "http://localhost:3005",
                {
                    env:"authConversion",
                    ...devObj
                }
            )
        }

        myFinalUpload
        .subscribe({
            next:(result:any)=>{
                let myObject = result
                this.popup = {
                    close:()=>{

                        let {myContent,renderer2} = this
                        renderer2.setStyle(
                            myContent.el.nativeElement,
                            "display",
                            "none"
                        )
                    },
                    containerSubmit:()=>{
                        let {myContainerName}= this
                        result.container.name = myContainerName.value
                        result.container.storageContainerURL = this.storageContainerURL = storageURL + myContainerName.value

                        // xhr to the backend to construt the container

                        //
                    },
                    finalSubmit:()=>{
                        let files = result.select.file.files[0]
                        let containerName = result.container.name
                        let url = result.upload.result.nativeElement
                        let fileName = result.upload.fileName
                        let storageContainerURL = result.container.storageContainerURL
                        let reader:FileReader = new FileReader();


                        // upload a file to the given container

                        //


                    },
                    getFiles:()=>{
                        result.list.items
                        let storageContainerURL = result.container.storageContainerURL
                        if(!storageContainerURL){
                            alert("please provide a container name")
                            return
                        }

                        // get all files

                        //
                    }
                }

                let {popup} = this


                renderer2.setProperty(
                    myClose,
                    "onclick",
                    popup.close
                )

                if(myContainerSubmit){
                    renderer2.setProperty(
                        myContainerSubmit,
                        "onclick",
                        popup.containerSubmit
                    )
                }

                if(myFinalSubmit){
                    renderer2.setProperty(
                        myFinalSubmit,
                        "onclick",
                        popup.finalSubmit
                    )
                }
                if(myGetButton){
                    renderer2.setProperty(
                        result.list.button.nativeElement,
                        "onclick",
                        popup.getFiles
                    )
                }
            },
            error:(err:any)=>{

            }
        })

    }



}
