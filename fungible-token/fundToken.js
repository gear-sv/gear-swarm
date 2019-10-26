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
  console.log("fund")
  for (let i = 0; i < swarm.length; i ++) {
    const peer = swarm[i]
    await delay (5000)
    console.log('peer.address', peer.address)
    const params = JSON.stringify([peer.address, amount])
    console.log('params', params)
    const tx = {
      data: ["gear", "3862ae21275acad4256c5e4a4a82b3662f53b3dfb9c96a29cb4df35b7c467b7a", "transfer", params],
      pay: {
        key: master.privateKey,
        fee: 0
      }
    }

    // console.log(tx)
    console.log(Date.now())

    // datapay.send(tx, (error, hash) => {
    //   if (error) console.log(error)
    //   else console.log(hash)
    // })
  }
}

const delay = (mili) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, mili)
  })
}

(async () => {
  const master = await masterKey()
  const swarm = await swarmKeys()
  await fund(master, swarm, 30)
})()
