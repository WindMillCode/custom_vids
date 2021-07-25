let website:any = {}

website.convertCMS = [

    {
        "title": "present_drive_files",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "100",
                "background": "	rgb(124,252,0)",
                "googleSheets": {}
            },
            {
                "key": "Heading",
                "value": "E2E Testing With Capybara And Angular",
                "type": "title",
                "split": "9",
                "googleSheets": {}
            },
            {
                "key": "Name1",
                "type": "input",
                "value": "Name",
                "split": "9",
                "googleSheets": {}
            },
            {
                "key": "Name2",
                "type": "input",
                "value": "Name",
                "split": "9",
                "googleSheets": {}
            },
            {
                "key": "Name3",
                "type": "input",
                "value": "Name",
                "split": "9",
                "googleSheets": {}
            },
            {
                "key": "My-DropDown",
                "value": "Which name is the owner of the file",
                "type": "dropdown",
                "form": {
                    "required":"true",
                },
                "newline": [
                    "NAME1",
                    "NAME2",
                    "NAME3"
                ],
            },
            {
                "key": "Upload",
                "type": "file button",
                "value":"Upload Files",
                "next":"true",
                // "split": "3",
                "height":"250",
                "googleSheets": {}
            },
            {
                "key": "Submit",
                "type": "submit button",
                "value":"Submit",
                background:"red",
                // "split": "3",
                "height":"250",
                "googleSheets": {}
            },
            {
                "key": "UI-Change",
                "type": "text",
                "fontSize":"60",
                "value":"Waiting For Submission ...",
                color:"blue",
                "split": "4",
                "height":"250",
                "googleSheets": {}
            },
        ]
    },
]

// website["google-sheets"] = [
//     {
//         "key": "subsheet1",
//         "value": "Primary rental application data"
//     },
//     {
//         "key": "subsheet2",
//         "value": "Household members"
//     },
//     {
//         "key": "subsheet3",
//         "value": "Household employers"
//     },
//     {
//         "key": "subsheet4",
//         "value": "Household cars"
//     }
// ]

// website["google-sheets-mapping"] = {
//     "subsheet1": "Primary rental application data",
//     "subsheet2": "Household members",
//     "subsheet3": "Household employers",
//     "subsheet4": "Household cars",
// }



// website["extra_mapping"]  = {
//    "applicantID": [
//     {
//         "key": "Primary rental application data",
//         "value":[
//             [
//                 "field",
//                 "AID"
//             ],
//             [
//                 "value",
//                 "10000"
//             ],
//             [
//                 "type",
//                 "source"
//             ]
//         ]
//     },
//     {
//         "key": "Household members",
//         "value":[
//             [
//                 "field",
//                 "Application ID"
//             ],
//             [
//                 "type",
//                 "count"
//             ],
//             [
//                 "value",
//                 "10001"
//             ]
//         ]
//     },
//     {
//         "key": "Household employers",
//         "value": [
//             [
//                 "field",
//                 "Application ID"
//             ],
//             [
//                 "type",
//                 "count"
//             ],
//             [
//                 "value",
//                 "10001"
//             ]
//         ]
//     },
//     {
//         "key": "Household cars",
//         "value": [
//             [
//                 "field",
//                 "Application ID"
//             ],
//             [
//                 "type",
//                 "count"
//             ],
//             [
//                 "value",
//                 "10001"
//             ]
//         ]
//     },
//     {
//         "key": "default value",
//         "value": "10001" // use objects next time :))
//     }
//     ],
//     "memberID": [
//         {
//             "key": "Household members",
//             "value":[
//                 [
//                     "field",
//                     "Member ID"
//                 ],
//                 [
//                     "type",
//                     "count"
//                 ],
//                 [
//                     "type",
//                     "add 1"
//                 ],
//                 [
//                     "value",
//                     "1"
//                 ]
//             ]
//         },
//         {
//             "key": "Household employers",
//             "value": [
//                 [
//                     "field",
//                     "Member ID"
//                 ],
//                 [
//                     "type",
//                     "count"
//                 ],
//                 [
//                     "type",
//                     "add 1"
//                 ],
//                 [
//                     "value",
//                     "1"
//                 ]
//             ]
//         },
//         {
//             "key": "Household cars",
//             "value": [
//                 [
//                     "field",
//                     "Car ID"
//                 ],
//                 [
//                     "type",
//                     "count"
//                 ],
//                 [
//                     "type",
//                     "add 1"
//                 ],
//                 [
//                     "value",
//                     "1"
//                 ]
//             ]
//         },
//         {
//             "key": "default value",
//             "value": "1" // use objects next time :))
//         }
//     ]

// }

export default website


