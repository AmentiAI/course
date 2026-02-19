const { Connection, Keypair, VersionedTransaction } = require('@solana/web3.js');
const crypto = require('crypto');
const fs = require('fs');

// Load wallet
const walletData = JSON.parse(fs.readFileSync('solana-wallet-readable.json'));
const keypair = Keypair.fromSecretKey(new Uint8Array(walletData.secretKey));
const wallet = keypair.publicKey.toString();

console.log(`🔑 Wallet: ${wallet}`);

// Solana connection
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// Step 1: Get challenge
async function getChallenge() {
  const response = await fetch(`https://neural-norse.vercel.app/api/challenge?wallet=${wallet}`);
  return await response.json();
}

// Step 2: Solve SHA-256 puzzle
function solvePuzzle(challenge, wallet, difficulty = 4) {
  const target = '0'.repeat(difficulty);
  let nonce = 0;
  
  while (true) {
    const hash = crypto
      .createHash('sha256')
      .update(`${challenge}${wallet}${nonce}`)
      .digest('hex');
    
    if (hash.startsWith(target)) {
      return nonce;
    }
    nonce++;
  }
}

// Step 3: Get mint transaction
async function getMintTransaction(challenge, nonce) {
  const response = await fetch('https://neural-norse.vercel.app/api/mint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      wallet: wallet,
      challenge: challenge,
      nonce: nonce.toString()
    })
  });
  return await response.json();
}

// Step 4: Sign and submit transaction
async function signAndSubmit(transactionBase64) {
  // Decode transaction
  const txBuffer = Buffer.from(transactionBase64, 'base64');
  const vtx = VersionedTransaction.deserialize(new Uint8Array(txBuffer));
  
  // Sign with wallet
  vtx.sign([keypair]);
  
  // Submit to Solana
  const signature = await connection.sendRawTransaction(vtx.serialize(), {
    skipPreflight: false,
    maxRetries: 3
  });
  
  // Confirm transaction
  await connection.confirmTransaction(signature, 'confirmed');
  
  return signature;
}

// Mint one NFT
async function mintOne(index) {
  console.log(`\n🎯 Minting NFT #${index}...`);
  
  try {
    // Get challenge
    console.log('  📝 Getting challenge...');
    const challengeData = await getChallenge();
    
    if (!challengeData.success) {
      throw new Error(challengeData.message || 'Failed to get challenge');
    }
    
    // Solve puzzle
    console.log('  🧩 Solving puzzle...');
    const startTime = Date.now();
    const nonce = solvePuzzle(challengeData.challenge, wallet, challengeData.difficulty);
    const solveTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`  ✅ Solved in ${solveTime}s (nonce: ${nonce})`);
    
    // Get mint transaction
    console.log('  🔨 Getting mint transaction...');
    const mintData = await getMintTransaction(challengeData.challenge, nonce);
    
    if (!mintData.success) {
      throw new Error(mintData.message || 'Failed to get mint transaction');
    }
    
    console.log(`  📦 Asset: ${mintData.asset}`);
    console.log(`  📊 Collection: ${mintData.collection.claimed}/${mintData.collection.total} claimed`);
    
    // Sign and submit
    console.log('  ✍️  Signing and submitting...');
    const signature = await signAndSubmit(mintData.transaction);
    
    console.log(`  🎉 Minted! https://solscan.io/tx/${signature}`);
    
    return {
      success: true,
      signature,
      asset: mintData.asset
    };
    
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
}

// Mint multiple NFTs
async function mintMultiple(count) {
  console.log(`\n🚀 Starting to mint ${count} Neural Norse NFTs...`);
  
  const results = [];
  
  for (let i = 1; i <= count; i++) {
    const result = await mintOne(i);
    results.push(result);
    
    // Wait a bit between mints to avoid rate limits
    if (i < count) {
      console.log('  ⏱️  Waiting 2 seconds...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Summary
  console.log('\n📊 Minting Summary:');
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`  ✅ Successful: ${successful.length}`);
  console.log(`  ❌ Failed: ${failed.length}`);
  
  if (successful.length > 0) {
    console.log('\n🎨 Minted Assets:');
    successful.forEach((r, i) => {
      console.log(`  ${i + 1}. ${r.asset}`);
    });
  }
  
  // Save results
  fs.writeFileSync('mint-results.json', JSON.stringify(results, null, 2));
  console.log('\n💾 Results saved to mint-results.json');
}

// Run
mintMultiple(10).catch(console.error);
