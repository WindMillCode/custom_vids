
# Microsoft Azure Blob Storage App in Angular

* after this lab your project shoud look like AngularAppFinal
* if issues restart lab from AngularAppStart

## Start the Angular app
* download the frontend [here](https://github.com/WindMillCode/custom_vids/tree/master/azureStorage/AngularApp)
* open a terminal and head to project root and run this command
```ps1
cd AngularApp
npm install -s
npx ng serve --open=true
```

## Required files
* open
AngularApp\src\app\app.module.ts
AngularApp\backend\python\template.py
AngularApp\src\app\extend\popup\popup.component.ts


## Overview on modules

* modules think of them as pages on a website, if you add a module you add a site to your web app say, the payment page, or the purchased items page. 

* using modules in your project allows your to copy and paste your porject for different websites while keeping bundle size and refactoring at an all time low

__FILE__  app.module.ts

* in 'we need this to add microsoft azure and XHR features to our app'
```ts
    ExtendModule,
    HttpClientModule,
    TableModule,
```

* whenever working with 3rd party software, (primeng,agGrid) remember this step 
* take a look at extend.module.ts, angular modules are simple

## Azure Storage Blobs

* simple there like a file explorer but only, only accepts files
* there is the storage accounts, with blobs, tables,queues and files
* in the blob partition you have blob containers, filled with files

### Authentication 
* using SharedKey to work with azure blob storage you have to get the headers exact especailly the authroization header

* it has proved exceedingly difficult to try to construct the header object yourself and Microsoft should have provided a utitly fn that can alone construct the headers given language of choice in the docs however it its preferred that you use azure AD or SAS to work with azure

__FILE__ template.py

* note that in create blob we filter out any headers that have an empty val because the azure api will complain, however it does not complain when 
we create a container

* [Azure Storage Blob API](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-service-rest-api)

* in 'modifications for our app' paste this code
```py
	if(myType == "createBlob"):
		url =  "{}/{}".format(url,fileName)
		headers['Content-Length'] = str(contentLength)
		headers['Content-Type'] = mimeType if mimeType else ""
		headers['x-ms-blob-type'] = "BlockBlob"
		headers = {key:val for key,val in headers.items() if not key in ['If-Modified-Since','If-Match','If-None-Match','If-Unmodified-Since']}
		pprint.pprint(headers)
		headers = {key:val for (key,val) in dict(headers).items() if val != ""}

	elif(myType == "createContainer"):
		headers['x-ms-blob-public-access'] = "blob"
```

### The Azure Portal UI

* [create a storage acct](https://portal.azure.com/#create/Microsoft.StorageAccount)

#### Basics Tab
* Storage account name: storageacctdemo624
* Redundancy : LRS

#### Data Protection Tab
* uncheck all "enable soft delete ..."

Review + create

go to resource 

Security + networking > Access Keys 

copy and paste Key from Key1

Settings -> Resource sharing (CORS) -> Blob Service

|property|value|data|
|:------|:------:|------|
|Allowed origins|*||
|Allowed Methods|PUT,GET||
|Allowed Headers|*||
|Exposed Headers|Content-Length||
|Max age|0||

Click the save icon  top left corner in the CORS dashboard 

### Start the Python Tornado server

* now head to AngularApp/backend/python in your terminal 
* set 
AZURE_STORAGE_ACCT_NAME env var to  storageacctdemo624
AZURE_STORAGE_ACCT_KEY to the key copied from earlier
```ps1
cd Env:
Set-Content -Path AZURE_STORAGE_ACCT_NAME -Value 'storageacctdemo624'
Set-Content -Path AZURE_STORAGE_ACCT_KEY -Value 'xPIR5zOHoRp2PsdafsafafsUhypGDRInqYUCrWq5sadasdsad/OHhJoU3ZmYm5fUUg=='
set-location AngularApp\backend\python
python tornado_server.py
```

__FILE__ popup.component.ts

### Create a container

* in 'xhr to the backend to construt the container' paster this code 
```ts
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
```

### Upload a file to blob storage
* in 'upload a file to the given container' paste this code
```ts
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

                                http.put(
                                    result[0].url,
                                    myBlob,
                                    {
                                        headers:result[0].headers,
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
```

* browsers override the Content-Length header, FileReader.readAsBinaryString, might provide content that is different from the correct file and the XHR will provide a bad authentication response

* to bypass this we use FileReader.readAsDataURL and base64ToBlob, which more accurately provides the file size of the file

* in 'data url to blob' paste this code
```ts
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
```

### Get Files

* we implement a primeng table to easily list all the files in the storage container

* in 'get all files' paste this code
```ts
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
										// really wish angular would add this as a response type in HttpClient
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
```