const request = require('request')

const forecast = (i, j, callback) => {
    const url = 'https://api.darksky.net/forecast/e3ca92a926a92d247795f122904a337d/' + j + ',' + i + '?units=si'

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("unable to connect to the server!", undefined)
        } else if(body.error)
        {
            callback("unable to find location.", undefined)
        }
        else {
              callback(undefined, body.daily.data[0].summary + "it is currently " + body.currently.temperature + " degrees out there")
        }
    })
}

module.exports = forecast