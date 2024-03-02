'use client';

const {
    Client,
    PrivateKey,
    AccountCreateTransaction,
    AccountBalanceQuery,
    Hbar,
    TransferTransaction,
  } = require("@hashgraph/sdk");
  
  import dotenv from "dotenv";
  //import { createAccount, getAccountIdByAlias } from "../../../../lib/hederaAccountService";
  //import { createFungibleToken, sendToken } from "../../../../lib/hederaTokenService";
  dotenv.config();

export default async function HButton() {

  // send HBAR
  async function sendHBAR(address) {

    // Grab your Hedera testnet account ID and private key from your .env file
    const myAccountId = process.env.HEDERA_ACCOUNT_ID;
    const myPrivateKey = process.env.HEDERA_ACCOUNT_PRIVATE_KEY;
  
    // If we weren't able to grab it, we should throw a new error
    if (myAccountId == null || myPrivateKey == null) {
      throw new Error(
        "Environment variables myAccountId and myPrivateKey must be present"
      );
    }
  
    // Create your connection to the Hedera network
    const client = Client.forTestnet();
  
    //Set your account as the client's operator
    client.setOperator(myAccountId, myPrivateKey);
  
    // Set default max transaction fee & max query payment
    client.setMaxTransactionFee(new Hbar(100));
    client.setMaxQueryPayment(new Hbar(50));
  
    // Create the transfer transaction
    const sendHbar = await new TransferTransaction()
      .addHbarTransfer(myAccountId, Hbar.fromTinybars(-10))
      .addHbarTransfer(address, Hbar.fromTinybars(10))
      .execute(client);
  
    // Verify the transaction reached consensus
    const transactionReceipt = await sendHbar.getReceipt(client);
    console.log(
      "\nThe transfer transaction from my account to the new account was: " +
        transactionReceipt.status.toString()
    );

}
return (
    <>
    <button onClick={() => {sendHBAR(data.wallet2)}}>
    Give 10 mini HBAR
  </button>
  </>
);

}