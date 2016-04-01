// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

"use strict";!function(t,e,n){t("body");t(n).ready(function(){var e=new Slideout({panel:n.getElementById("container"),menu:n.getElementById("sidenav"),padding:200,tolerance:70,touch:!1});t(".toggle-btn").on("click",function(){e.toggle()})})}(window.jQuery,window,document);var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};!function(t){if("object"==("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.Slideout=t()}}(function(){return function t(e,n,o){function i(r,a){if(!n[r]){if(!e[r]){var u="function"==typeof require&&require;if(!a&&u)return u(r,!0);if(s)return s(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[r]={exports:{}};e[r][0].call(l.exports,function(t){var n=e[r][1][t];return i(n?n:t)},l,l.exports,t,e,n,o)}return n[r].exports}for(var s="function"==typeof require&&require,r=0;r<o.length;r++)i(o[r]);return i}({1:[function(t,e,n){function o(t,e){for(var n in e)e[n]&&(t[n]=e[n]);return t}function i(t,e){t.prototype=o(t.prototype||{},e.prototype)}function s(t){t=t||{},this._startOffsetX=0,this._currentOffsetX=0,this._opening=!1,this._moved=!1,this._opened=!1,this._preventOpen=!1,this._touch=void 0===t.touch?!0:t.touch&&!0,this.panel=t.panel,this.menu=t.menu,-1===this.panel.className.search("slideout-panel")&&(this.panel.className+=" slideout-panel"),-1===this.menu.className.search("slideout-menu")&&(this.menu.className+=" slideout-menu"),this._fx=t.fx||"ease",this._duration=parseInt(t.duration,10)||300,this._tolerance=parseInt(t.tolerance,10)||70,this._padding=this._translateTo=parseInt(t.padding,10)||256,this._orientation="right"===t.side?-1:1,this._translateTo*=this._orientation,this._touch&&this._initTouchEvents()}var r,a=t("decouple"),u=t("emitter"),c=!1,l=window.document,h=l.documentElement,p=window.navigator.msPointerEnabled,f={start:p?"MSPointerDown":"touchstart",move:p?"MSPointerMove":"touchmove",end:p?"MSPointerUp":"touchend"},d=function(){var t=/^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/,e=l.getElementsByTagName("script")[0].style;for(var n in e)if(t.test(n))return"-"+n.match(t)[0].toLowerCase()+"-";return"WebkitOpacity"in e?"-webkit-":"KhtmlOpacity"in e?"-khtml-":""}();i(s,u),s.prototype.open=function(){var t=this;return this.emit("beforeopen"),-1===h.className.search("slideout-open")&&(h.className+=" slideout-open"),this._setTransition(),this._translateXTo(this._translateTo),this._opened=!0,setTimeout(function(){t.panel.style.transition=t.panel.style["-webkit-transition"]="",t.emit("open")},this._duration+50),this},s.prototype.close=function(){var t=this;return this.isOpen()||this._opening?(this.emit("beforeclose"),this._setTransition(),this._translateXTo(0),this._opened=!1,setTimeout(function(){h.className=h.className.replace(/ slideout-open/,""),t.panel.style.transition=t.panel.style["-webkit-transition"]=t.panel.style[d+"transform"]=t.panel.style.transform="",t.emit("close")},this._duration+50),this):this},s.prototype.toggle=function(){return this.isOpen()?this.close():this.open()},s.prototype.isOpen=function(){return this._opened},s.prototype._translateXTo=function(t){return this._currentOffsetX=t,this.panel.style[d+"transform"]=this.panel.style.transform="translateX("+t+"px)",this},s.prototype._setTransition=function(){return this.panel.style[d+"transition"]=this.panel.style.transition=d+"transform "+this._duration+"ms "+this._fx,this},s.prototype._initTouchEvents=function(){var t=this;return this._onScrollFn=a(l,"scroll",function(){t._moved||(clearTimeout(r),c=!0,r=setTimeout(function(){c=!1},250))}),this._preventMove=function(e){t._moved&&e.preventDefault()},l.addEventListener(f.move,this._preventMove),this._resetTouchFn=function(e){"undefined"!=typeof e.touches&&(t._moved=!1,t._opening=!1,t._startOffsetX=e.touches[0].pageX,t._preventOpen=!t._touch||!t.isOpen()&&0!==t.menu.clientWidth)},this.panel.addEventListener(f.start,this._resetTouchFn),this._onTouchCancelFn=function(){t._moved=!1,t._opening=!1},this.panel.addEventListener("touchcancel",this._onTouchCancelFn),this._onTouchEndFn=function(){t._moved&&(t._opening&&Math.abs(t._currentOffsetX)>t._tolerance?t.open():t.close()),t._moved=!1},this.panel.addEventListener(f.end,this._onTouchEndFn),this._onTouchMoveFn=function(e){if(!c&&!t._preventOpen&&"undefined"!=typeof e.touches){var n=e.touches[0].clientX-t._startOffsetX,o=t._currentOffsetX=n;if(!(Math.abs(o)>t._padding)&&Math.abs(n)>20){t._opening=!0;var i=n*t._orientation;if(t._opened&&i>0||!t._opened&&0>i)return;0>=i&&(o=n+t._padding*t._orientation,t._opening=!1),t._moved||-1!==h.className.search("slideout-open")||(h.className+=" slideout-open"),t.panel.style[d+"transform"]=t.panel.style.transform="translateX("+o+"px)",t.emit("translate",o),t._moved=!0}}},this.panel.addEventListener(f.move,this._onTouchMoveFn),this},s.prototype.enableTouch=function(){return this._touch=!0,this},s.prototype.disableTouch=function(){return this._touch=!1,this},s.prototype.destroy=function(){return this.close(),l.removeEventListener(f.move,this._preventMove),this.panel.removeEventListener(f.start,this._resetTouchFn),this.panel.removeEventListener("touchcancel",this._onTouchCancelFn),this.panel.removeEventListener(f.end,this._onTouchEndFn),this.panel.removeEventListener(f.move,this._onTouchMoveFn),l.removeEventListener("scroll",this._onScrollFn),this.open=this.close=function(){},this},e.exports=s},{decouple:2,emitter:3}],2:[function(t,e,n){function o(t,e,n){function o(t){a=t,s()}function s(){u||(i(r),u=!0)}function r(){n.call(t,a),u=!1}var a,u=!1;return t.addEventListener(e,o,!1),o}var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();e.exports=o},{}],3:[function(t,e,n){var o=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};n.__esModule=!0;var i=function(){function t(){o(this,t)}return t.prototype.on=function(t,e){return this._eventCollection=this._eventCollection||{},this._eventCollection[t]=this._eventCollection[t]||[],this._eventCollection[t].push(e),this},t.prototype.once=function e(t,n){function o(){e.off(t,o),n.apply(this,arguments)}var e=this;return o.listener=n,this.on(t,o),this},t.prototype.off=function(t,e){var n=void 0;return this._eventCollection&&(n=this._eventCollection[t])?(n.forEach(function(t,o){t!==e&&t.listener!==e||n.splice(o,1)}),0===n.length&&delete this._eventCollection[t],this):this},t.prototype.emit=function n(t){for(var e=this,o=arguments.length,i=Array(o>1?o-1:0),s=1;o>s;s++)i[s-1]=arguments[s];var n=void 0;return this._eventCollection&&(n=this._eventCollection[t])?(n=n.slice(0),n.forEach(function(t){return t.apply(e,i)}),this):this},t}();n["default"]=i,e.exports=n["default"]},{}]},{},[1])(1)});