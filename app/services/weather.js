(function () {
    var global = this;
    global.weather = {};
    var apiEndPoints = global.weather.api = {};

    apiEndPoints = {
        getApiKey: function () {
            return 'KTmuWedjKHmshvuGKaMUWQ8p75MPp1PDpZBjsnIGsfflB5HORk';
        },
        _getBaseUrl: function () {
            return 'https://simple-weather.p.mashape.com/';
        },
        getWeatherUrl: function (lat, lon) {
            if (lat && lon) {
                return this._getBaseUrl() + '/weather?lat=' + lat + '&lng=' + lon;
            }
            else {
                throw "Latitude and Longitude value cannot be null";
            }
        },
        getWeatherDataUrl: function (lat, lon) {
            if (lat && lon) {
                return this._getBaseUrl() + '/weatherdata?lat=' + lat + '&lng=' + lon;
            }
            else {
                throw "Latitude and Longitude value cannot be null";
            }
        }
    };
    weather.getWeather = function (lat, lon, callback) {
        return $.ajax({
            url: apiEndPoints.getWeatherUrl(lat, lon),
            headers: {
                "X-Mashape-Key": apiEndPoints.getApiKey()
            },
            success: _successCallback,
            type: 'GET'
        });
    }
    weather.getWeatherData = function (lat, lon, callback) {
        return $.ajax({
            url: apiEndPoints.getWeatherDataUrl(lat, lon),
            headers: {
                "X-Mashape-Key": apiEndPoints.getApiKey()
            },
            success: weather._successCallback,
            type: 'GET'
        });
    }
    weather._successCallback = function (data) {
        if (data) {
            callback({
                success: true,
                result: JSON.parse(data)
            });
        }
        else {
            callback({
                success: false,
                result: null
            });
        }
    }
})();