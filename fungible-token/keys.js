const bsv = require('bsv')
const util = require('util')
const writeFile = util.promisify(require('fs').writeFile)

const generate = (num) => {
  const peers = []
  for (var i in [...Array(num).keys()]) {
    const privateKey = bsv.PrivateKey.fromRandom()
    const publicKey = bsv.PublicKey.fromPrivateKey(privateKey)
    const address = bsv.Address.fromPublicKey(publicKey)
    peers.push ({
      privateKey: privateKey.toString(),
      publicKey: publicKey.toString(),
      address: address.toString()
    })
  }
  return peers
}

(async () => {
  const peers = generate(10)
  await writeFile('swarm.json', JSON.stringify(peers))
})()
