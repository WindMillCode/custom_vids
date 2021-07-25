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
function base64ToBlob(base64, mime){
    // console.log(base64)
    base64 = base64.split("base64,")[1]
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays:any = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        let byteArray: Uint8Array= new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
}
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
                        authAS$({
                            url:storageURL + myContainerName.value+"?restype=container",
                            type:"createContainer",
                            method:"PUT"
                        })
                        .subscribe({
                            next:(result:any)=>{

                                http.put(
                                    result.url,
                                    "",
                                    {
                                        params:{

                                        },
                                        headers:result.headers,
                                        responseType:"text"
                                    }
                                )
                                .subscribe({
                                    next:(result:any)=>{
                                        renderer2.setStyle(
                                            myContent.el.nativeElement,
                                            "display",
                                            "none"
                                        )
                                        alert("successflly createed container")
                                    },
                                    error:(err:any)=>{
                                        console.log(err)
                                        if(err.statusText === "The specified container already exists."){
                                            renderer2.setStyle(
                                                myContent.el.nativeElement,
                                                "display",
                                                "none"
                                            )
                                            alert(err.statusText)
                                        }
                                        else if(err.statusText === "Unknown Error"){
                                            alert("The Azure Storage Object is down contact customer support")

                                        }
                                    }
                                })
                            },
                            error:(err:any)=>{
                                if(err.statusText === "Unknown Error"){
                                    alert("The Azure Storage Object is down contact customer support")
                                }
                            }
                        })
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
                        combineLatest([
                            authAS$({
                                url:storageContainerURL,
                                type:"createBlob",
                                method:"PUT",
                                contentLength:files.size,
                                fileName:files.name,
                                mimeType:files.type
                            }),
                            fromEvent(reader,"load")
                        ])
                        .pipe(
                            first()
                        )
                        .subscribe({
                            next:(result:any)=>{
                                console.log(result)
                                let fileUrl = result[0].url
                                let myBlob =base64ToBlob(result[1].target.result,files.type)
                                // let size = encodeURI(binaryString).split(/%..|./).length - 1
                                console.log(myBlob.size,files.size)
                                http.put(
                                    result[0].url,
                                    myBlob,
                                    {
                                        headers:result[0].headers,
                                        // responseType:"text",
                                        observe:"response"
                                    }
                                )
                                .pipe(
                                    first()
                                )
                                .subscribe({
                                    next:(result:any)=>{
                                        alert("Sucessfully uploaded file to Azure Storage")
                                        url.innerText =fileUrl
                                    },
                                    error:(err:HttpErrorResponse)=>{
                                        if(err.statusText.includes("Server failed to authenticate the request.")){
                                            alert("please contact support the file was not able to upload")
                                        }

                                        else if(err.statusText === "Unknown Error"){
                                            alert("The Azure Storage Object is down contact customer support")

                                        }
                                    }
                                })
                            },
                            error:(err:any)=>{
                                if(err.statusText === "Unknown Error"){
                                    alert("The Azure Storage Object is down contact customer support")

                                }
                            }
                        })


                        // get the binary data for file
                        ;(reader as FileReader).readAsDataURL(files)
                        //
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
                        authAS$({
                            url:storageContainerURL + "?restype=container&comp=list",
                            type:"listBlobs",
                            method:"GET",
                        })
                        .subscribe({
                            next:(result:any)=>{
                                http.get(
                                    result.url,
                                    {
                                        headers:result.headers,
                                        responseType:"text",
                                        // observe:"response"

                                    }
                                )
                                .subscribe({
                                    next:(result:any)=>{
                                        let myXML:XMLDocument = parseXml(result)
                                        let blobList = Array.from(myXML.querySelectorAll("Blob"))
                                        myObject.list.items = blobList
                                        .map((x:any,i)=>{
                                            return {
                                                fileName:x.querySelector("Name").innerHTML,
                                                url:storageContainerURL + "/"+x.querySelector("Name").innerHTML
                                            }
                                        })

                                    },
                                    error:(err:any)=>{

                                    }
                                })
                            },
                            error:(err:any)=>{

                            }
                        })
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
