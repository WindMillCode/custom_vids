import { Directive, HostListener,Renderer2,Input,ViewChild, ElementRef } from '@angular/core';

@Directive({
    selector: '[appFileUpload]'
})
export class FileUploadDirective {


    @HostListener('click', ['$event']) onClick(event) {

        let {renderer2,fileUpload,fileUploadObject} = this

        switch (fileUpload.type) {
            case "container":
                renderer2.setStyle(
                    fileUpload.popupC.el.nativeElement,
                    "display",
                    "flex"
                )
                break;
            case "select":
                this.file.click()
                break;
            case "upload":
                let file =fileUploadObject.select.file.files[0]
                let name = fileUploadObject.container.name
                let fileName = fileUploadObject.upload.fileName
                if(!file){
                    alert('please select a file')
                    return
                }

                if(!name){
                    alert("provide a container name")
                    return
                }
                console.log(fileName)
                fileName.nativeElement.innerText = file.name
                renderer2.setStyle(
                    fileUpload.popupC.el.nativeElement,
                    "display",
                    "flex"
                )
                break;
            default:
                break;
        }
    }

    @Input() fileUpload:any;
    @Input() fileUploadObject:any;
    file:HTMLInputElement


    constructor(
        private renderer2:Renderer2,
        private el:ElementRef
    ) { }

    ngOnInit(){
        let {renderer2,fileUpload} = this

        switch (fileUpload.type) {
            case "select":
                this.file = renderer2.createElement(
                    "input"
                )
                renderer2.setAttribute(
                    this.file,
                    "type",
                    "file"
                )
                fileUpload.file = this.file
                renderer2.setProperty(
                    this.file,
                    "onchange",
                    (event)=>{
                        renderer2.setProperty(
                            this.el.nativeElement,
                            "innerText",
                            "File Chosen"
                        )
                    }
                )
                // renderer2.setProperty
                break;
            case "upload":

                break;

            case "container":


            default:
                break;
        }

    }
}
