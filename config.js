/*
    Configurations
*/

// authentication configuration
const eden_configs = [ 
    {

    }, // MainNet
    {
    apiKey: "AIzaSyAxk1aIqRAd4hiaOPHexj3vFXo0gmeEDDE",
    authDomain: "eiam-695f7.firebaseapp.com",
    databaseURL: "https://eiam-695f7.firebaseio.com",
    projectId: "eiam-695f7",
    storageBucket: "eiam-695f7.appspot.com",
    messagingSenderId: "811177682224",
    }, // Test Prototype 
];

// api end point
const eden_api_endpoints= [ 
    {

    }, // MainNet
    {
        url: "https://104.197.252.130/api"
    }, // Test Prototype
];

let config_position = -1;

/*
    get edenConfigs internals
    @param config_index for configuration index index from 0 , shoud be integer
*/
export function edenConfig(config_index){
    config_position = config_index;
    if (eden_configs.length>=config_index+1 && config_index>=0)
    {
        return eden_configs[config_index];
    }
    else
        return undefined;
}

/* 
    get edenApiEndPoint
*/
export function edenApiEndPoint()
{
    if(config_position<0 || eden_api_endpoints.length < config_position+1 )
        return undefined;

 
    return eden_api_endpoints[config_position];
}

