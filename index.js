const hashlist=require('./hashlist.json')
const exclude=require('./excludeWallets.json') //exclude list includes exchange-owned wallets: magic eden, hyperspace, tensor
const { getOwnersWithQty}=require('./src/getOwner');
const {write_data, append_info}=require("./writefile.js")

require("dotenv").config();

async function dothings(){

    const ownerList=await getOwnersWithQty(hashlist, exclude)
    console.log("User public keys and qty NTFs owned:", ownerList);

    await write_data("","./ownerList.txt");
    await append_info(ownerList.map(x=>x.address),"./ownerList.txt")


};

dothings();

