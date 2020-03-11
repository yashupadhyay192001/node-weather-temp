const request = require('request')

const geocode = (address, callback) => {
    const gurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoieWFzaDE5IiwiYSI6ImNrNm1rZ3liMjBicDkzbmx5Ym1sZzFmZ2MifQ.Grm7q7JiP4mD-kxof_43bg&limit=1'
    
    request({url: gurl, json: true}, (error, {body}) => {
    if(error) {
        callback('unable to connect to location services!', undefined)
    } else if(body.features.length === 0) {
        callback('unable to find location. please try another search.', undefined)
    }else {
        callback(undefined, {
            longitude: body.features[0].center[0],
            latitude: body.features[0].center[1],
            location: body.features[0].place_name
        })
    }
})
}

module.exports = geocode