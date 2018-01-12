
$.root_ = $('body');
$.navAsAjax = true;
var ignore_key_elms = ["script"]; //Tags o .clases a ignorar
function checkURL(){
var a = location.href.split("#").splice(1).join("#");
if (!a)try {
var b = window.document.URL;
b && b.indexOf("#", 0) > 0 && b.indexOf("#", 0) < b.length + 1 && (a = b.substring(b.indexOf("#", 0) + 1))
} catch (c) {
}
if (container = $(".content_main"), a) {
$(".navigation ul li.navigation__active").removeClass("navigation__active"), $('.navigation ul li:has(a[href="' + a + '"])').addClass("navigation__active");
var d = $('.navigation ul a[href="' + a + '"]').attr("title");
document.title = d || document.title, loadURL(a + location.search, container);
} else {
var e = $('.navigation > ul > li:first-child > a[href!="#"]');
window.location.hash = e.attr("href"), e = null
}
$(".navigation-trigger, .sidebar").removeClass("toggled"); $(".ma-backdrop").remove();
}
function loadURL(a, b) {
if (a == "undefined" || a == null || a == "" || a == "index") {
a = "/_/index";
}
else {
a = "/_/" + a;
}
console.log("Cargando URL: %c" + a), $.ajax({
"type": "GET",
"url": url_server + a,
"dataType": "html",
"cache": 0,
"beforeSend": function () {
pagefunction = null,
b.removeData().html("");
b.html('<div align="center"><br><br><h4><i class="fa fa-spinner fa-spin"></i> Cargando...</h4><br><br><br></div>');
$("html").animate({"scrollTop": 0}, "fast");
},
"success": function (a) {
b.css({"opacity": "0.0"}).html(a).delay(50).animate({"opacity": "1.0"}, 300), a = null, b = null
},
"error": function (c, d, e, f) {
b.html('<h5 class="ajax-loading-error"><i class="fa fa-warning txt-color-orangeDark"></i> Error '+c.status+': <span class="txt-color-red">' + a + '</span> <span style="text-transform: capitalize;">'+e+'</span></h5>')
},
"async": !0
})
}

$(document).ready(function (){

$.navAsAjax && ($(".navigation").length && checkURL(), $(document).on("click", 'a[href!="#"]', function (a) {
//a.preventDefault();
var b = $(a.currentTarget);
window.setTimeout(function(){
//window.location.href = window.location.href.replace(window.location.search, "").replace(window.location.hash, "") + "#" + b.attr("href");
}, 150);
}), $(window).on("hashchange", function () {
checkURL();
}));

});

jsArray = {};
function loadScript(a, b) {
if (jsArray[a])b && (root.root.console.log("This script was already loaded %c: " + a, debugStyle_warning), b()); else {
jsArray[a] = !0;
var c = document.getElementsByTagName("body")[0], d = document.createElement("script");
d.type = "text/javascript", d.src = a, d.onload = b, c.appendChild(d)
}
}