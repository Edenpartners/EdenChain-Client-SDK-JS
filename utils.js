
/*
    Eden sdk utiltity functions
*/

import EthCrypto from 'eth-crypto';

export class Utils {
    /*
        Get Signed Address Object for Delivery
        @params private key for ethereum
        @return address object contains
                    address for ethereum
                    public_key for verify signature
                    signature which is encrypted by private key
    */
    makeAddressObject(private_key)
    {
        let addr = {};
        addr.public_key = EthCrypto.publicKeyByPrivateKey(private_key);
        addr.address =   EthCrypto.publicKey.toAddress(addr.public_key);
        addr.signature = EthCrypto.sign(private_key, EthCrypto.hash.keccak256(addr.address))
        return addr;
    }
};

