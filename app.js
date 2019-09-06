let brain = require('brain.js')
let fs = require('fs')

init()

/////////

async function init() {
    let trainData = null
    let testData = null

    await Promise.all([
        readFile('./data/data.csv').then(res => trainData = res),
        readFile('./data/testing.csv').then(res => testData = res),
    ])

    //format data for training / testing
    const formattedTrainingData = formatData(trainData).slice(1).map(value => parseFloat((value / 1000).toFixed(2)))
    const formattedTestingData = formatData(testData).map(value => parseFloat((value / 1000).toFixed(2)))

    const net = new brain.recurrent.LSTMTimeStep()

    net.train([formattedTrainingData], {
        iterations: 1000,
        errorThresh: 0.001,
    })

    const forecast = net.forecast(formattedTestingData, 10)

    //save trained brain
    fs.writeFileSync('brain.json', JSON.stringify(net.toJSON()))

    console.log('TEST DATA USED: ', formattedTestingData.map(value => value * 1000))
    console.log('FORECAST: ', forecast.map(value => value * 1000))
}
function formatData(data) {
    return data.toString().split('\n').map(row => row.split(',')[4])
}
function readFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}