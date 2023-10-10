require("dotenv").config();
const web3 = require('@solana/web3.js');
const {CONNECTION}=require('../config.js')
const splToken = require('@solana/spl-token');


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//hashlist <string>, exclude <string>
const getOwnersWithQty = async (hashlist, exclude) => {
  let ownerlist=[]
  console.log(hashlist.length+" NFTs, getting owners...");
  let i=0;

  for (let hash of hashlist){
      
      let nftOwner=await getNftOwner(hash)

      if(exclude.includes(nftOwner) || !nftOwner){
        continue; //Undefined owner or the NFT is listed for sale. Skips to next hash.
      } 

      if (ownerlist.length && (ownerlist.map(x=>x.address)).includes(nftOwner)){
        let index=(ownerlist.map(x=>x.address)).indexOf(nftOwner);
        ownerlist[index].qty++

      }else{
        ownerlist.push({address: nftOwner, qty: 1})
      }

      i++
      if(i%10===0){
        console.log("Checked "+i+" of "+hashlist.length+" hashes.")
      }

      await sleep(200)
      
  }

  return [...new Set(ownerlist)]
}


async function getNftOwner(mintAddress) {
    
    try {
      // Fetch and parse all the accounts owned by the specified program id
      const accountInfo = await CONNECTION.getParsedProgramAccounts(
        splToken.TOKEN_PROGRAM_ID,
        {
          filters: [
            { dataSize: 165 },
            { memcmp: { offset: 0, bytes: mintAddress } },
          ],
        },
      );
      // Get the account that has an amount of 1
      const tokenAccount = accountInfo.find((element) => {
        const data = element.account.data 
        return data.parsed.info.tokenAmount.amount !== '0';
      });
      // Parsed data for the token account
      return tokenAccount.account.data.parsed.info.owner

    } catch (err) {
      console.log('NFT has been burned or does not exist: ', mintAddress)  
    }
    
  }


  module.exports={
    getNftOwner,
    getOwnersWithQty
  }