/*
    interface with API-GW and get each information.
*/
import uuid from 'uuid/v4';
import {axInstance} from './ajax';


/* JSON RPC method name defines */
const GET_SERVER_CS_ADDRESS = "server.coinhdaddress";

const EIAM_SIGN_IN  = "user.signin";
const EIAM_SIGN_OUT = "user.signout";
const EIAM_GET_USER_INFO = "user.get_info";

const GET_USER_BALANCE= "user.getbalance";
const GET_USER_TRANSACTION_LIST = "user.lstransaction";

const DEPOSIT_TOKEN_TO_EDEN="user.deposit";
const WITHRAW_TOKEN_FROM_EDEN="user.withdraw";
const ADD_ETH_ADDRESS = "eth.add_address";
const DEL_ETH_ADDRESS = "eth.del_address";

const JSON_RPC_VERSION = "2.0";
const JSON_RPC_API_URL = "";

/* API class */
export class EdenApis {

    getDefaultJson(method,iamtoken)
    {
        var jr = {};
        jr.id = uuid();
        jr.jsonrpc = JSON_RPC_VERSION;
        jr.method = method;
        jr.params = {iamtoken: iamtoken};

        return jr;
    }

    /* server related api */
    
    /*
        Coin Server Address to withdraw or deposit.
        @param iamtoken
        @return CoinSerer Ethereum Address
    */
    async getCoinServerAddress(iamtoken){
        let jr = this.getDefaultJson(GET_SERVER_CS_ADDRESS, iamtoken)
        let resp = await axInstance.post(JSON_RPC_API_URL,jr);
        if(resp.isSuccess &&  jr.id == resp.data.id && resp.data.result.err_code==0)
        {
            return resp.data.result.data.hdaddress;
        }
        else
            return undefined;
    }
    
    /* user related api*/
    /*
        get balance
        @param iamtoken
        @return token amount in 18 decimal.
    */
    async getUserBalance(iamtoken){
        let jr = this.getDefaultJson(GET_USER_BALANCE, iamtoken)
        let resp = await axInstance.post(JSON_RPC_API_URL,jr);
        if(resp.isSuccess  && jr.id == resp.data.id && resp.data.result.err_code==0 )
        {
            return resp.data.result.data.amount;
        }
        else
            return undefined;
    }

    /*
        get info
        @param iamtoken
        @return user information in IAM
    */
    async getUserInfo(iamtoken)
    {
        let jr = this.getDefaultJson(EIAM_GET_USER_INFO, iamtoken)
        let resp = await axInstance.post(JSON_RPC_API_URL,jr);
        if(resp.isSuccess && jr.id == resp.data.id && resp.data.result.err_code==0 )
        {
            return resp.data.result.data;
        }
        else
            return false;
    }

    /*
        sign in
        @param iamtoken
        @return boolean (success or fail)
    */
    async signInUser(iamtoken)
    {
        let jr = this.getDefaultJson(EIAM_SIGN_IN, iamtoken)
        
        let resp = await axInstance.post(JSON_RPC_API_URL,jr);
        if(resp.isSuccess && jr.id == resp.data.id && resp.data.result.err_code==0 )
        {
            return true;
        }
        else
            return false;
    }

    /*
        sign in
        @param iamtoken
        @return boolean (success or fail)
    */
    async signOutUser(iamtoken)
    {
        let jr = this.getDefaultJson(EIAM_SIGN_OUT, iamtoken)
        let resp = await axInstance.post(JSON_RPC_API_URL,jr);
        if(resp.isSuccess && jr.id == resp.data.id && resp.data.result.err_code==0)
        {
            return true;
        }
        else
            return false;
    }
    
    /*
        list transaction on user
        @param iamtoken
                page to diplay
                countperpage to show transaction on page 
        @return currentpage
                totalcount
                transaction array[]
    */
    async getTransactionList(iamtoken, page, countperpage)
    {
        let jr = this.getDefaultJson(GET_USER_TRANSACTION_LIST, iamtoken)

        // update additional parameter
        jr.params.page = page;
        jr.params.countperpage = countperpage;

        let resp = await axInstance.post(JSON_RPC_API_URL,jr);
        if(resp.isSuccess && jr.id == resp.data.id && resp.data.result.err_code==0)
        {
            return resp.data.result.data;
        }
        else
            return undefined;
    }

    /*
        add ethereum address to eiam
        @param iamtoken
               address for eth address
    */
    async addEthAddress(iamtoken,address)
    {
        let jr = this.getDefaultJson(ADD_ETH_ADDRESS, iamtoken)
        
        // update additional parameter
        jr.params.address = address.address;
        jr.params.public_key = address.public_key;
        jr.params.signature = address.signature;

        let resp = await axInstance.post(JSON_RPC_API_URL,jr);
        if(resp.isSuccess && jr.id == resp.data.id && resp.data.result.err_code==0)
        {
            return true;
        }
        else
            return false;
    }

    /*
        del ethereum address to eiam
        @param iamtoken
               address for eth address
    */
   async delEthAddress(iamtoken, address)
   {
       let jr = this.getDefaultJson(DEL_ETH_ADDRESS, iamtoken)

       // update additional parameter
       jr.params.address = address.address;
       jr.params.public_key = address.public_key;
       jr.params.signature = address.signature;

       let resp = await axInstance.post(JSON_RPC_API_URL,jr);
       if(resp.isSuccess && jr.id == resp.data.id && resp.data.result.err_code==0)
       {
           return true;
       }
       else
           return false;
   }

    /*
        deposit to edenchain
        @param iamtoken
                txhash for ethereum transaction hash to check
        @return boolean 
    */
    async depositTokenToEdenChain(iamtoken,txhash)
    {
        let jr = this.getDefaultJson(DEPOSIT_TOKEN_TO_EDEN, iamtoken)

        // update additional parameter
        jr.params.txhash = txhash;

        let resp = await axInstance.post(JSON_RPC_API_URL,jr);
        if(resp.isSuccess && jr.id == resp.data.id && resp.data.result.err_code==0)
        {
            return true;
        }
        else
            return false;
    }

    /*
        withdraw from edenchain
        @param iamtoken
                ethaddress for ethereum address for receive EDN token.
                amount for Eden chain Token to withdraw as string.
        @return boolean
    */
   async withdrawTokenFromEdenChain(iamtoken,ethaddress, amount)
   {
       let jr = this.getDefaultJson(WITHRAW_TOKEN_FROM_EDEN, iamtoken)

       // update additional parameter
       jr.params.ethaddress = ethaddress;
       jr.params.amount = amount.toString();

       let resp = await axInstance.post(JSON_RPC_API_URL,jr);
       if(resp.isSuccess && jr.id == resp.data.id && resp.data.result.err_code==0)
       {
           return true;
       }
       else
           return false;
   }


};
