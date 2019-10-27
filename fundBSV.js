const datapay = require('datapay')
const util = require('util')
const readFile = util.promisify(require('fs').readFile)

const masterKey = async () => {
  const keys = await readFile('key.json')
  return JSON.parse(keys.toString())
}

const swarmKeys = async () => {
  const swarm = await readFile('swarm.json')
  return JSON.parse(swarm.toString())
}

const fund = async (master, swarm, amount) => {
  const sends = swarm.map(peer => {
    return ({
      address: peer.address,
      value: amount
    })
  })
  const tx = {
    data: ["gear", "pay"],
    pay: {
      key: master.privateKey,
      to: sends
    }
  }

  datapay.send(tx, (err, hash) => {
    if (error) console.log(erro)
    else console.log(hash)
  })

}

(async () => {
  const master = await masterKey()
  const swarm = await swarmKeys()
  await fund(master, swarm, 1e5)
})()
