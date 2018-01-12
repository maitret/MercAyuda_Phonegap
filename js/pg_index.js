var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
function guid(){ function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); } return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4(); }

var Data_Id = "Data_ID";
var Usuario = localStorage.getItem('usuario');
var Usuario_md5 = localStorage.getItem('usuario_md5');
var myUuid = localStorage.getItem('key');
if (!myUuid) { myUuid = guid(); localStorage.setItem('key', myUuid); }
if (!Data_Id) { Data_Id = "0"; }
if (!Usuario) { Usuario = "Invitado"; }
if (!Usuario_md5) { Usuario_md5 = "0"; }

var url_server_firebase = localStorage.getItem('url_server_firebase');
var url_server_firebase_def = "https://www.gstatic.com/firebasejs/4.6.0/firebase.js";
if (!url_server_firebase) {
window.url_server_firebase = url_server_firebase_def;
localStorage.setItem('url_server_firebase', url_server_firebase_def);
} else {
window.url_server_firebase = url_server_firebase;
}

var url_server = localStorage.getItem('url_server');
var url_server_def = "https://app.mercayuda.cf";
if (!url_server) {
window.url_server = url_server_def;
localStorage.setItem('url_server', url_server_def);
} else {
window.url_server = url_server;
}

var id_cliente = window.localStorage.getItem("id_cliente");
if (!id_cliente) {
window.id_cliente = "app";
} else {
window.id_cliente = id_cliente;
}

var color_header_aplicativo = localStorage.getItem('color_header_aplicativo');
var color_header_aplicativo_def = "#aaa";
if (!url_server) {
color_header_aplicativo = color_header_aplicativo_def;
} else {
//color_header_aplicativo = color_header_aplicativo;
}
//$('.am-top-header').css("background-color", color_header_aplicativo );

function guid() {
function s4() {
return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
var my_uuid = localStorage.getItem('my_uuid');
var my_uuid_def = guid();
if (!my_uuid) {
window.my_uuid = my_uuid_def;
localStorage.setItem('my_uuid', my_uuid_def);
} else {
window.my_uuid = my_uuid;
}

window.handle_url = "";
function handleOpenURL(url){
setTimeout(function() {
//alert("Recibido: " + url);
window.handle_url = url;
window.onOnline(url);
}, 0);
}

jQuery(document).ready(function($){
window.enable_gallery = function enable_gallery(class_lg){
if(class_lg == ""){ class_lg = ".gallery_lg"; }
$(class_lg).lightGallery({
thumbnail:false,
animateThumb: false,
showThumbByDefault: false,
fullScreen: false,
download: false,
hash: false
});
};
window.enable_gallery();
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

window.div_user_menu = function (){
$(".div_user_menu").html('<div align="center"><i class="fa fa-lock" aria-hidden="true"></i></div>');
$.getJSON(window.url_server+"/movil/html.templates.php", { key: window.my_uuid, html: 'div_user_menu', view_as: 'json', is_app: '1' }, function (j) {
var data_html = j['content'];
$(".div_user_menu").html(data_html);
});
};
window.div_extras_header = function (){
$(".div_extras_header").html('<div align="center"><i class="fa fa-lock" aria-hidden="true"></i></div>');
$.getJSON(window.url_server+"/movil/html.templates.php", { key: window.my_uuid, html: 'div_extras_header', view_as: 'json', is_app: '1' }, function (j) {
var data_html = j['content'];
$(".div_extras_header").html(data_html);
});
};

$(document).ready(function () {
$(".click_get_mensajes").on('click', function () {
$(".update_get_mensajes").load(url_server + "/ajax/get_mensajes.php?v=2&lat=" + window.lat_global + "&lon=" + window.lon_global);
});
$(".click_get_notificaciones").on('click', function () {
$(".update_get_notificaciones").load(url_server + "/ajax/get_notificaciones.php?v=2&lat=" + window.lat_global + "&lon=" + window.lon_global);
});

$("[rel=tooltip]").tooltip();
$("[rel=popover]").popover();
});
