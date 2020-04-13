const axios = require('axios').default;
const ApiUtils = require('./ApiUtils');

const geoCode = (address, callback) => {

    axios.get(`${ApiUtils.MapBoxApi}${address}.json`, {
        params: {
            access_token: ApiUtils.MapBoxApiKey,
            limit: 1
        }
    }).then(res => {
        if (res.status != 200) {
            callback("Unable to find location. Try another search.", undefined);
        } else if (res && res.data && res.data.features && res.data.features.length > 0 && res.data.features[0].center.length > 0) {
            const resObj = res.data.features[0];
            const latitude = resObj.center[1];
            const longitude = resObj.center[0];
            const place = resObj.place_name;
            callback(undefined, {
                latitude,
                longitude,
                place
            })
        } else {
            callback("Unable to find location. Try another search.", undefined);
        }
    })
        .catch(err => callback("unable to connect to location services!", undefined))
}

module.exports = geoCode;