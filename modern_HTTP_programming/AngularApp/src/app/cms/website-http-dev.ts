import { HttpErrorResponse } from "@angular/common/http";
import { pipe } from "rxjs";
import { environment as env } from "../../environments/environment";
import {objectCopy,zProtoComponent,zProtoChildren, zChildren, xContain, xPosition,latchUtilities} from '../customExports'


let website:any = {}

let loginDev:Array<zProtoComponent> = [
	{
		title:"login",
		metafields:[
			{
				key:"Body",
				type:"body",

				navigation:{
					name:"login"
				},
				options:{
					extras:{
						appSection:{
							confirm:"true"
						},
						appVanillaTilt:{
							confirm:"true",
							type:"body",
							zSymbolNeeded:"true"
						},
						appLogin:{
							confirm:"true",
							type:"body",
							zSymbolNeeded:"true"
						},
					}
				}
			},
			{
				key:"loginContainer a_p_p_Container",
				type:"div",
				split:7,
				left:150,
				height:600,
				latch:{
					type:"display",
					display:{
						type:"target",
						name:"login"
					},
					zChildren:[
						{
							bool:"h1",
							val:"title a_p_p_Title",
							text:"Log In",
							logic:{
								desktop:{
									width:()=>{
										return 200
									},
									height:.2,
									top:20,
									left:latchUtilities.centerX,
									metadata:{
										left:{
											containPos:.52
										}
									}
								},
								mobile:{
									width:()=>{
										return 98
									},
									height:.2,
									top:20,
									left:latchUtilities.centerX,
									metadata:{
										left:{
											containPos:.52
										}
									}
								}
							},
							group:["login"]
						},
						{
							bool:"i",
							val:"username a_p_p_Input p-inputtext",
							extras:{
								extend:{
									placeholder:"Username"
								},
								appLogin:{
									type:["username"],
									group:"myGroup"
								}
							},
							logic:{
								desktop:{
									width:.7,
									height:()=>{
										return 50
									},
									top:180,
									left:120,
									metadata:{
										width:{

										}
									}
								},
								mobile:{
									width:.7,
									height:()=>{
										return 50
									},
									top:180,
									left:latchUtilities.centerX,
								}
							},
							group:["login"]
						},
						{
							bool:"i",
							val:"password a_p_p_Input p-inputtext",
							extras:{
								extend:{
									placeholder:"Pasword"
								},
								appLogin:{
									type:["password"],
									group:"myGroup"
								}
							},
							logic:{
								desktop:{
									width:.7,
									height:()=>{
										return 50
									},
									top:280,
									left:120,
									metadata:{
										width:{

										}
									}
								},
								mobile:{
									width:.7,
									height:()=>{
										return 50
									},
									top:280,
									left:latchUtilities.centerX,
								}
							},
							group:["login"]
						},
						{
							bool:"b",
							val:"password a_p_p_Button ",
							text:"Login",
							extras:{
								appLogin:{
									type:["submit","refresh"],
									group:"myGroup"
								}
							},
							logic:{
								desktop:{
									width:.5,
									height:()=>{
										return 50
									},
									top:380,
									left:200,
								},
								mobile:{
									width:.5,
									height:()=>{
										return 50
									},
									top:380,
									left:latchUtilities.centerX,
								}
							},
							group:["login"]
						},

					]
				},


			}
		]
	},
	{
		title:"home",
		metafields:[
			{
				key:"Body",
				type:"body",

				navigation:{
					name:"home"
				},
				options:{
					extras:{
						appSection:{
							confirm:"true"
						},
						appVanillaTilt:{
							confirm:"true",
							type:"body",
							zSymbolNeeded:"true"
						},
					}
				}
			},
			{
				key:"title a_p_p_Title",
				type:"title",
				value:"Welcome to the Page",
				left:500,
				split:4,
				top:100
			},
			{
				key:"title a_p_p_Title",
				type:"title",
				value:"WindMillCode",
				// left:300,
				left:550,
				next:"true",
				split:3
			}
		]
	}
]
.map((x:any,i)=>{
	x.type_slug = "forms"
	return x
})


let httpDev=[
	...loginDev
]

website.convertCMS = httpDev
export default website
