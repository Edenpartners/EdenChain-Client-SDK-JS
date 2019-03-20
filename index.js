/*
    eden api 
    current version only support 1 instance
*/
import {EdenApis} from './api';
import {Utils} from './utils';
import {initApp} from './init';

// Network defines
const EDEN_MAINNET_NETWORK = 0;
const EDEN_PROTOTYPE_NETWORK = 1;

// declare singleton class
class edensdk {

    // required member defines
    constructor(){
        // constance.

        // initialize
        this.init = initApp;

        // authentication objects
        this.app  = undefined;
        this.auth  = undefined;
        this.googleProvider  = undefined;

        // Api objects
        this.apis            = new EdenApis();
        this.utils           = new Utils();
    }

    // network constant export 
    get EDEN_MAINNET_NETWORK() {
        return EDEN_MAINNET_NETWORK;
    }

    get EDEN_PROTOTYPE_NETWORK() {
        return EDEN_PROTOTYPE_NETWORK;
    }
};

// export default module to world
export default ( new edensdk );

 