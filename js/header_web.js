
var Data_Id = "Data_ID";

var firebase_app = "circleride-6cc1e";
var firebase_databaseURL = "https://circleride-6cc1e.firebaseio.com";
var config_adminpanel_fb = {
    apiKey: "AIzaSyBFv28V5hnPyu2EY8iem6bs6WE5DQwA-No",
    authDomain: firebase_app + ".firebaseapp.com",
    databaseURL: firebase_databaseURL,
    storageBucket: firebase_app + ".appspot.com",
    messagingSenderId: "38913838556"
};
var AdminPanel_FB = firebase.initializeApp(config_adminpanel_fb);
var storage_FB = firebase.storage();
var storageRef_FB = storage_FB.ref();
var custom_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay05MGp4d0BjaXJjbGVyaWRlLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstOTBqeHdAY2lyY2xlcmlkZS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOlwvXC9pZGVudGl0eXRvb2xraXQuZ29vZ2xlYXBpcy5jb21cL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaWF0IjoxNDk0MzYzNTE1LCJleHAiOjE0OTQzNjcxMTUsInVpZCI6InBydWViYSJ9.Mm01mlBNfzwcQixpWj7CtcLnENDamjVEQcGfl6UFxUXoD7IVCLm_XUbVKriUsXZb1XbtzOA7viow8wJZLX-Jh4H5kVX_RlHTlNBd1mUcMMkV3cDCsh3yXqjUs_NKlvqj8QwsQtXOfP6GSOLljMZ5FXM2tK3HyDE5FQEEX3XPb2PX4Pyx1t377DzCjEIxMIoguQb0uSykAZSuB6D1kmSbeYkefB0h2ZEettXLSVmweQieoD9ABwRlUQbQqVa28FTexfwgxps0yFYGwIaKUleQ4Sr8byqbqtvXKLt-FalxVDLNnvgXHM5QN_kMZOKFJVJz7aZTUaDIc6UAP7be1Bta3Q";
var auth = firebase.auth();
var database = firebase.database();
var storage = firebase.storage();
var storageRef = storage.ref();
jQuery(document).ready(function ($) {
    var startPos;
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
            AdminPanel_FB.database().ref('/users').child(Usuario_md5).update({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                altitud: position.coords.altitude,
                geo_aprox: position.coords.accuracy,
                last_geo: position.timestamp,
                usuario: Usuario,
                user_agent: user_agent,
                session_id: session_id,
                ip: ip,
                version: version
            });
            var Lat = position.coords.latitude;
            var Lon = position.coords.longitude;
            var GeoAprox = position.coords.longitude;
            window.lat_global = Lat;
            window.lon_global = Lon;
            window.geoaprox_global = GeoAprox;
            if (Lat != "") {
                window.localStorage.setItem("User_Lat", Lat);
            }
            if (Lon != "") {
                window.localStorage.setItem("User_Lon", Lon);
            }
            window.localStorage.setItem("Geo_Aprox", position.coords.accuracy);
            $("#User_Lat").val(Lat);
            $("#User_Lon").val(Lon);
            $(".User_Lat").val(Lat);
            $(".User_Lon").val(Lon);
            $(".User_LatLon_print").html(Lat + "," + Lon);
            $(".User_Lat_print").html(Lat);
            $(".User_Lon_print").html(Lon);
            $(".live_session").load(url_server + "/ajax/live_session.php?v=" + version + "&lat=" + Lat + "&lon=" + Lon);
        });
    }
    var live_session_int = setInterval(function () {
        $(".live_session").load(url_server + "/ajax/live_session.php?v=" + version + "&lat=" + window.lat_global + "&lon=" + window.lon_global);
    }, 15000);
    window.enable_geocomplete = function enable_geocomplete(target, default_loc, map) {
        if (target) {
        } else {
            target = ".Direccion";
        }
        if (default_loc) {
        } else {
            default_loc = "";
        }
        if (map) {
            $(target).geocomplete({
                map: map,
                mapOptions: {scrollwheel: true},
                markerOptions: {draggable: true, title: "Defina punto exacto"},
                details: "form",
                location: default_loc,
                types: ["geocode", "establishment"],
                detailsAttribute: "data-geo"
            });
        } else {
            $(target).geocomplete({
                details: "form",
                location: default_loc,
                types: ["geocode", "establishment"],
                detailsAttribute: "data-geo"
            });
        }
        $(target).bind("geocode:dragged", function (event, latLng) {
            $("input[name=Lat]").val(latLng.lat());
            $("input[name=Lon]").val(latLng.lng());
        });
    };
    $(".click_get_mensajes").on('click', function () {
        $(".update_get_mensajes").load(url_server + "/ajax/get_mensajes.php?v=" + version + "&lat=" + window.lat_global + "&lon=" + window.lon_global);
    });
    $(".click_get_notificaciones").on('click', function () {
        $(".update_get_notificaciones").load(url_server + "/ajax/get_notificaciones.php?v=" + version + "&lat=" + window.lat_global + "&lon=" + window.lon_global);
    });
    if (movil == 1) {
        $(window.document).swiperight(function () {
            $(".boton_menu").trigger('click');
        }).swipeleft(function () {
        });
    }
    $("#De").geocomplete({
        markerOptions: {draggable: false},
        location: "",
        details: "form",
        types: ["geocode", "establishment"],
        detailsAttribute: "Salida"
    });
    $("#btn_buscar").click(function () {
    });
    $("#A").geocomplete({
        markerOptions: {draggable: false},
        location: "",
        details: "form",
        types: ["geocode", "establishment"],
        detailsAttribute: "Destino"
    });
    $("#btn_buscar").click(function () {
    });
    $('.Get_Geo').click(function () {
        var target = $(this).attr('target_field');
        get_geo(target);
    });
    window.get_geo = function get_geo(target) {
        var url_get_geo_de = url_server + "/ajax/get_latlon.php?v=" + version + "&lat=" + window.lat_global + "&lon=" + window.lon_global + "&geo_aprox=" + window.geoaprox_global;
        $.getJSON(url_get_geo_de, function (json) {
            $('.' + target + '_Direccion').val(json.direccion);
            $('.' + target + '_Lat').val(json.lat);
            $('.' + target + '_Lon').val(json.lon);
            if (json.is_geolocated != "") {
            }
        });
    }
});
window.url_target = function url_target(url) {
    $(".navigation-trigger, .sidebar").removeClass("toggled");
    $(".ma-backdrop").remove();
    $('.content_main').html('<div align="center"><br><br><h4><i class="fa fa-spinner fa-spin"></i> Cargando...</h4><br><br><br></div>');
    var stateObj = {html: url};
    history.pushState(stateObj, "", url_server + "/ver/" + url);
    $('.content_main').load(url_server + '/_/' + url + "");
    window.onpopstate = function (e) {
        e.preventDefault();
        window.url_target("");
    };
};
$(document).ready(function () {
    $("[rel=tooltip]").tooltip();
    $("[rel=popover]").popover();
});