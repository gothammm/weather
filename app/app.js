$(document).ready(function () {
    loadOrRefreshWeatherData();
    $(".jumbotron .btn").click(function () {
        loadOrRefreshWeatherData();
    });
});

function getLocation(callback) {
    var header = $(".jumbotron h1");
    var para = $(".jumbotron #details");
    header.html("Allow location detection, to proceed");
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (data) {
            if (data) {
                var cords = data.coords;
                var lat = cords.latitude;
                var lon = cords.longitude;
                callback(lat, lon);
            }
            else {
                callback(null, null);
            }
        });
    }
    else {
        alert("Sorry, your browser does not support geolocation services.");
    }
}
function loadOrRefreshWeatherData() {
    $(".jumbotron .btn").attr("disabled", true);
    getLocation(function (lat, lon) {
        var header = $(".jumbotron h1");
        var para = $(".jumbotron #details");
        header.html("Loading..");
        para.html("Loading..")
        weather.getWeather(lat, lon).then(function (data) {
            $(".jumbotron .btn").attr("disabled", false);
            if (data) {
                header.html(data);
            }
        }, function () {
            alert("Error!");
        });
        weather.getWeatherData(lat, lon).then(function (data) {
            $(".jumbotron .btn").attr("disabled", false);
            if (data) {
                var result = JSON.parse(data).query.results;
                var channel = result.channel;
                para.html(channel.item.description);
            }
        }, function () {
            alert("Error!");
        });
    });
}
