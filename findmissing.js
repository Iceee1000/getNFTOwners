
const {CONNECTION}=require('./config.js')
const { Metaplex } =require('@metaplex-foundation/js');
const web3 = require('@solana/web3.js');



async function findmissing(mintlist){
    const mx = Metaplex.make(CONNECTION); //SVIZ.WEB3_CONN
    let list=[]
    for (let mint of mintlist){
        try{
            let address=new web3.PublicKey(mint);
            const nft = await mx.nfts().findByMint({ mintAddress: address });
            list.push(nft.json.name)
        }catch(e){
            console.log('nada for mint ', mint)
        }
        
    }

    return list
}


module.exports={
    findmissing
  }