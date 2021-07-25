let website:any = {}

website.convertCMS = [

    {
        "title": "play",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
                // "height":"1000",
                "background": "rgb(255, 179, 204)",
                "googleSheets": {}
            },
            {
                "key": "Heading",
                "value": "Welcome to the HomePage of Advanced Angular Concepts",
                "type": "title",
                "split": "9",
                // "width":"420",
                "googleSheets": {}
            },
            {
                "key": "schema-mode",
                "type": "input",
                "value":"Enter Text Here",
                "fontSize":"20",
                "latch":"",
                // "multipleGroup":"schemasInput",
                "split": "9",
                // "width":"300",
                "height":"50",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        order:-2,
                        "background":"white",
                        "height":"50px",
                        // "width":"400px",
                    }
                }
            },
            // {
            //     "key": "schema-mode-1",
            //     "type": "input",
            //     "value":"Mode Type",
            //     "newline":[
            //         "REPEATED",
            //         "REQUIRED",
            //         "NULLABLE"
            //     ],
            //     "fontSize":"120",
            //     "latch":"",
            //     // "multipleGroup":"schemasInput",
            //     "split": "3",
            //     // "width":"300",
            //     "height":"250",
            //     "googleSheets": {},
            //     "options":{
            //         "css":{
            //             // "justify-self":"flex-start",
            //             // "flex-grow":"1"
            //             order:-2,
            //             "background":"white",
            //             "height":"50px",
            //             // "width":"400px",
            //         }
            //     }
            // },



        ]
    },
]


export default website


