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
        weather.getWeather(lat, lon, function (data) {
            $(".jumbotron .btn").attr("disabled", false);
            if (data && data.success) {
                header.html(data.result);
            }
        });
        weather.getWeatherData(lat, lon, function (data) {
            $(".jumbotron .btn").attr("disabled", false);
            if (data && data.success) {
                var result = data.result.query.results;
                var channel = result.channel;
                para.html(channel.item.description);
            }
        });
    });
}
