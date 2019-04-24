/*
    eden api 
    current version only support 1 instance
*/
import {EdenApis} from './api';
import {Utils} from './utils';
import {initApp} from './init';

// Network defines
const EDENCHAIN_MAINNET_NETWORK = 0;
const EDENCHAIN_BETA_RELEASE = 1;
const EDENCHAIN_CANDIDATE_RELEASE = 2;

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

        // callback function
        this.authCallback = undefined;
    }

    // network constant export 
    get EDENCHAIN_MAINNET_NETWORK() {
        return EDENCHAIN_MAINNET_NETWORK;
    }

    get EDENCHAIN_BETA_RELEASE() {
        return EDENCHAIN_BETA_RELEASE;
    }

    get EDENCHAIN_CANDIDATE_RELEASE(){
        return EDENCHAIN_CANDIDATE_RELEASE;
    }

    OnAuthChanged(callback) {
        if(this.app)
        {
            this.app.auth().onAuthStateChanged(
                async (user)=> {
                    let idToken = undefined;
                    if (user)
                    {
                        idToken =  await user.getIdToken();

                        // 
                        this.apis.signInUser(idToken).then((value)=>{
                            callback(idToken);
                        }).catch( (error)=>{           
                                this.app.auth().signOut().then( (value)=>{
                                    callback(undefined);
                                }
                                );
                            }                         
                        );
                    }
                    else
                    {
                        this.apis.signOutUser(idToken).then(
                            (value) => {
                                callback(undefined);
                            }
                        )
                    }
                }
            );

            return true;
        }
        else
            return false;
    }
};

// export default module to world
export default ( new edensdk );

 