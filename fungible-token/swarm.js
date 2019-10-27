const bsv = require('bsv')
const util = require('util')
const readFile = util.promisify(require('fs').readFile)
const datapay = require('datapay')

let globalCounter = 0

let counter = 0

const run = async (swarm) => {

  const mod = (num) => num % 10

  setInterval(async () => {
    // transact
    await transact(swarm[counter], swarm[mod(counter + 1 )], 1)

    counter = mod(counter+1)
    globalCounter = globalCounter + 1
  }, 2000) // wait
}

const transact = async (sender, recipient, amount) => {
  const params = JSON.stringify([recipient.address, amount])

  const tx = {
    data: ["gear", "3862ae21275acad4256c5e4a4a82b3662f53b3dfb9c96a29cb4df35b7c467b7a", "transfer", params],
    pay: {
      key: sender.privateKey,
      fee: 0
    }
  }

  datapay.send(tx, (error, hash) => {
    if (error) console.log(error)
    else console.log(`
################################################
### Transaction:
### ${hash}
### ${counter}
### ${globalCounter}
###########################################
    `)
  })
}

const delay = (mili) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, mili)
  })
}

(async () => {
  const swarmFile = await readFile('../swarm.json')
  const swarm = JSON.parse(swarmFile)
  await run(swarm)
})()
