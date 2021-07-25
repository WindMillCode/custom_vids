

export const environment:any = {
    production: false,
    url: 'Judima',
    // deprecated
    inputHandle: {
        options: false,
        link: false,
        linkInit: false
    },
    //
    cookie:{
        // permission:"allow",
        // confirm:"false"
    },
    component: {

        form: {
            panelView:-1, //should be a number use a positive number to view it
            lifecycleHooks: false,
            zChildView:-1,
			zChild:[1],
			topLevelZChild:[-1],
            drag:[-1],
        },
        app: {
            lifecycleHooks:false
        }
    },
    directive:{
        deltaNode:{
            lifecycleHooks:false
        },
        latch:{
            lifecycleHooks:false
        },
		login:{
			lifecycleHooks:true
		}
    },


    testingAcct:{
		confirm:"false", //true for hubspot false for drive
		capybara: { // remove this if not doing unit or e2e tests impt
			main:"true",
			url:"gdp",
		}
    },
    sentry:{
        env:"gdp_development",
        defaultIntegrations:true,
        tracingOrigins:["localhost",/^\//]
    },
	navigation:{
		startURL:"/login"
	},
    //

	// dev additions
	login:{
		// url:"https://facebook-language-translator.herokuapp.com",
		url:"http://localhost:3005"
	}
	//




};

