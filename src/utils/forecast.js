const ApiUtils = require("./ApiUtils");
const axios = require('axios').default;

const forecast = (latitude, longitude, callback) => {
    axios.get(
        ApiUtils.WeatherApi,
        {
            params: {
                'access_key': ApiUtils.WeatherApiKey,
                'query': latitude + "," + longitude
            }
        }).then(res => {
            if (res.status != 200) {
                callback('There are some issues with the location. Please try other nearest location.', undefined)
            } else if (res.data.success === false) {
                callback('There are some issues with the location. Please try other nearest location.', undefined)
            } else {
                const { current = null, } = res.data;
                if (!current) {
                    callback('There are some issues with the location. Please try other nearest location.', undefined)
                } else {
                    callback(undefined, 'It was ' + current.temperature + ' degress at ' + current.observation_time + '. There is a ' + current.precip + '% chance of rain today.')
                }
            }
        }).catch(err => {
            callback("unable to connect to weather services", undefined);

        })
}

module.exports = forecast;