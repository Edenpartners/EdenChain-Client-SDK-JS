/*
    eden authentication export
*/
import * as firebase from 'firebase'
import firebaseApp from 'firebase/app'
import {edenConfig,edenApiEndPoint} from './config';
import {axInstance} from './ajax';
import edensdk from './index';

/* 
    initialize SDK application
    @param config_index for Edenchain index , 0 is mainnet. 1 is beta release.
*/
export function initApp(config_index){

    // initialize configuration
    let eden_config = edenConfig(config_index);
    if(!eden_config)
        return false;

    axInstance.defaults.baseURL  = edenApiEndPoint().url;

   
    // update member
    edensdk.app =  firebase.initializeApp(eden_config);
    edensdk.auth =  firebaseApp.auth();
    edensdk.googleProvider =  new firebaseApp.auth.GoogleAuthProvider();

    if( !edensdk.app && !edensdk.auth && !edensdk.googleProvider)
    {
        return false;
    }
 
    
    return  true;
}