!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("rplayer")):"function"==typeof define&&define.amd?define("RPlayerDanmaku",["rplayer"],e):"object"==typeof exports?exports.RPlayerDanmaku=e(require("rplayer")):t.RPlayerDanmaku=e(t.RPlayer)}(window,function(i){return s={},o.m=n={0:function(t,e){t.exports=i},17:function(t,e,i){var n=i(2),o=i(18);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[t.i,o,""]]);var s={insert:"head",singleton:!1},r=(n(o,s),o.locals?o.locals:{});t.exports=r},18:function(t,e,i){(e=i(3)(!1)).push([t.i,".rplayer_dan{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;overflow:hidden;font-family:SimHei,Microsoft JhengHei,Arial,Helvetica,sans-serif}.rplayer_dan_d{position:absolute;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:nowrap;will-change:transform;font-weight:700;line-height:1.125;color:#fff;text-shadow:#000 1px 1px 2px,#000 0 0 1px}.rplayer_dan_d-me{outline:1px solid currentColor;z-index:1}.rplayer_dan_d-center{left:50%;transform:translateX(-50%)}",""]),t.exports=e},2:function(t,e,s){"use strict";var i,n,o=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},r=(n={},function(t){if(void 0===n[t]){var e=document.querySelector(t);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(t){e=null}n[t]=e}return n[t]}),l=[];function p(t){for(var e=-1,i=0;i<l.length;i++)if(l[i].identifier===t){e=i;break}return e}function h(t,e){for(var i={},n=[],o=0;o<t.length;o++){var s=t[o],r=e.base?s[0]+e.base:s[0],a=i[r]||0,h="".concat(r," ").concat(a);i[r]=a+1;var u=p(h),c={css:s[1],media:s[2],sourceMap:s[3]};-1!==u?(l[u].references++,l[u].updater(c)):l.push({identifier:h,updater:function(e,t){var i,n,o;{var s;o=t.singleton?(s=m++,i=y=y||d(t),n=f.bind(null,i,s,!1),f.bind(null,i,s,!0)):(i=d(t),n=function(t,e,i){var n=i.css,o=i.media,s=i.sourceMap;o?t.setAttribute("media",o):t.removeAttribute("media");s&&btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */"));if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,i,t),function(){!function(t){if(null===t.parentNode)return;t.parentNode.removeChild(t)}(i)})}return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else o()}}(c,e),references:1}),n.push(h)}return n}function d(t){var e,i=document.createElement("style"),n=t.attributes||{};if(void 0!==n.nonce||(e=s.nc)&&(n.nonce=e),Object.keys(n).forEach(function(t){i.setAttribute(t,n[t])}),"function"==typeof t.insert)t.insert(i);else{var o=r(t.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(i)}return i}var a,u=(a=[],function(t,e){return a[t]=e,a.filter(Boolean).join("\n")});function f(t,e,i,n){var o,s,r=i?"":n.media?"@media ".concat(n.media," {").concat(n.css,"}"):n.css;t.styleSheet?t.styleSheet.cssText=u(e,r):(o=document.createTextNode(r),(s=t.childNodes)[e]&&t.removeChild(s[e]),s.length?t.insertBefore(o,s[e]):t.appendChild(o))}var y=null,m=0;t.exports=function(t,r){(r=r||{}).singleton||"boolean"==typeof r.singleton||(r.singleton=o());var a=h(t=t||[],r);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var e=0;e<a.length;e++){var i=p(a[e]);l[i].references--}for(var n=h(t,r),o=0;o<a.length;o++){var s=p(a[o]);0===l[s].references&&(l[s].updater(),l.splice(s,1))}a=n}}}},21:function(t,e,i){"use strict";i.r(e);var n=i(0),s=i.n(n);function o(t,e,i,n,o){this.showFrame=0,this._width=0,this.speed=0,this.canRecycle=!1,this.danmaku=t,this.dom=s.a.utils.newElement("rplayer_dan_d"),t.dom.appendChild(this.dom),this.reset(e,i,n,o)}var r=(Object.defineProperty(o.prototype,"width",{get:function(){return this._width||(this._width=this.measure().width),this._width},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"invisibleLength",{get:function(){return this.width+this.length},enumerable:!0,configurable:!0}),o.prototype.measure=function(){var t=this.dom.getBoundingClientRect();return t.height&&this.danmaku.updateTunnelHeight(t.height+1),t},o.prototype.reset=function(t,e,i,n){var o,s,r;return this.dom.innerText=t.text,t.color&&(this.dom.style.color=t.color),t.fontFamily&&(this.dom.style.fontFamily=t.color),t.isMe&&this.dom.classList.add("rplayer_dan_d-me"),this.type=t.type,this.tunnel=e,this.updateVertical(),this.type&&"scroll"!==this.type?this.dom.classList.add("rplayer_dan_d-center"):(this.length=Math.max(i,0)+this.danmaku.fontSize,0<=i&&n?this.speed=n:(s=(o=this.danmaku.player.rect.width)+this.length,this.speed=(this.width+s)/this.danmaku.opts.scrollFrame,n&&i<0&&(r=s*n/(o+i))<this.speed&&(this.speed=r)),this.updateX(),this.dom.style.right="-"+this.width+"px"),this.canRecycle=!1,this.show(),this},o.prototype.updateVertical=function(){this.dom.style["bottom"===this.type?"bottom":"top"]=this.tunnel*this.danmaku.tunnelHeight+"px"},o.prototype.updateX=function(){this.dom.style.transform="translateX("+this.length+"px)"},o.prototype.show=function(){this.dom.hidden=!1},o.prototype.hide=function(){this.dom.hidden=!0},o.prototype.update=function(){if(!this.canRecycle)if("top"===this.type||"bottom"===this.type){if(this.showFrame>this.danmaku.opts.staticFrame)return this.canRecycle=!0,void this.hide();this.showFrame++}else{if(-this.length>=this.danmaku.player.rect.width+this.width)return this.canRecycle=!0,void this.hide();this.length-=this.speed,this.updateX()}},o.prototype.recycle=function(){this.canRecycle=!0,this.showFrame=0,this._width=0,this.speed=0,this.dom.style.color="",this.dom.style.fontFamily="",this.dom.style.right="",this.dom.style.top="",this.dom.style.bottom="",this.dom.style.transform="",this.dom.classList.remove("rplayer-dan-me"),this.dom.classList.remove("rplayer_dan_d-center"),this.hide()},o.prototype.destroy=function(){this.hide(),this.dom.parentNode&&this.dom.parentNode.removeChild(this.dom),this.canRecycle=!0},o);function a(t){var e,n=this;this.tunnel=0,this.opacity=1,this.tunnelHeight=0,this.unlimited=!1,this.showing=!1,this.running=!1,this.remain=[],this.current=[],this.last=[],this.pool=[],this.top=[],this.bottom=[],this.prevCurrentTime=0,this.onPlayerSeeked=function(){n.clear(),n.remain=n.opts.items},this.updateTunnel=function(){if(n.player){var t=n.player.rect.height;if(t){n.tunnel=n.area*t/n.tunnelHeight|0;var e=Math.max(n.last.length,n.top.length,n.bottom.length);if(e>n.tunnel)for(var i=n.tunnel;i<e;i++)n.recycleDan(n.last[i]),n.recycleDan(n.top[i]),n.recycleDan(n.bottom[i]),n.last[i]=void 0,n.top[i]=void 0,n.bottom[i]=void 0;n.current.forEach(function(t){return t.updateVertical()}),n.tunnel<1?n.hide():n.show()}}},this.pause=function(){cancelAnimationFrame(n.timer),n.running=!1},this.update=function(){n.running||(n.running=!0,n.render())},this.render=function(){if(n.load(),n.fire(),n.clean(),!n.current.length&&!n.remain.length)return n.hide();n.timer=requestAnimationFrame(n.render)},this.run=function(){n.updateTunnel(),n.show(),n.player.playing||n.pause()},this.dom=s.a.utils.newElement("rplayer_dan"),this.opts=((e=t).area=s.a.utils.isNum(e.area)?e.area:.5,e.opacity=e.opacity||1,e.items=e.items||[],e.staticFrame=e.staticFrame||300,e.scrollFrame=e.scrollFrame||500,e.blockTypes=e.blockTypes||[],e);var i=this.opts.items;this.opts.items=[],this.push(i),this.updateOpacity(this.opts.opacity),this.updateArea(this.opts.area),this.updateFontSize(this.opts.fontSize)}var h=(a.prototype.install=function(t){this.player=t,this.player.appendChild(this.dom),t.on(s.a.Events.PAUSE,this.pause),t.on(s.a.Events.LOADING_SHOW,this.pause),t.on(s.a.Events.LOADING_HIDE,this.update),t.on(s.a.Events.PLAY,this.update),t.on(s.a.Events.ENDED,this.pause),t.on(s.a.Events.PLAYER_RESIZE,this.updateTunnel),t.on(s.a.Events.SEEKED,this.onPlayerSeeked),document.contains(this.player.dom)?this.run():t.once(s.a.Events.MOUNTED,this.run)},a.prototype.updateTunnelHeight=function(t){t&&this.tunnelHeight<t&&(this.tunnelHeight=t,this.updateTunnel())},a.prototype.updateArea=function(t){s.a.utils.isNum(t)&&(this.unlimited=1<t,this.area=s.a.utils.clamp(t),this.updateTunnel())},a.prototype.updateOpacity=function(t){s.a.utils.isNum(t)&&(this.opacity=s.a.utils.clamp(t),this.dom.style.opacity=this.opacity.toString())},a.prototype.updateFontSize=function(t){s.a.utils.isNum(t)?this.fontSize=t:this.fontSize=this.getFontSize(),this.tunnelHeight||(this.tunnelHeight=this.fontSize),this.updateTunnel(),this.dom.style.fontSize=this.fontSize+"px"},a.prototype.updateScrollFrame=function(t){t&&(this.opts.scrollFrame=t)},a.prototype.updateStaticFrame=function(t){t&&(this.opts.staticFrame=t)},a.prototype.getFontSize=function(){return s.a.utils.getClientWH()[0]<769?15:23},a.prototype.hide=function(){this.showing=!1,this.pause(),this.clear()},a.prototype.show=function(){this.showing||(this.showing=!0,this.pause(),this.update())},a.prototype.clear=function(){var e=this;this.current.forEach(function(t){return e.recycleDan(t)}),this.current=[],this.last=[],this.top=[],this.bottom=[]},a.prototype.toggleBlockType=function(e){var i=this;e&&(this.opts.blockTypes.includes(e)?(this.opts.blockTypes=this.opts.blockTypes.filter(function(t){return t!==e}),this.remain=this.opts.items):(this.opts.blockTypes.push(e),this.remain=this.remain.filter(function(t){return t.type!==e}),this.current=this.current.filter(function(t){return t.type!==e||(i.recycleDan(t),!1)})))},a.prototype.send=function(t){t.isMe=!0,this.opts.items.push(t),this.insert(t,0,!0)},a.prototype.push=function(t){var e,i,n=this;t&&(Array.isArray(t)?((e=this.opts.items).push.apply(e,t),this.opts.blockTypes.length&&(t=t.filter(function(t){return!n.opts.blockTypes.includes(t.type)})),(i=this.remain).push.apply(i,t)):(this.opts.items.push(t),this.opts.blockTypes.includes(t.type)||this.remain.push(t)))},a.prototype.getDan=function(t,e,i,n){var o=this.pool.pop();return o?o.reset(t,e,i,n):new r(this,t,e,i,n)},a.prototype.recycleDan=function(t){t&&(20<this.pool.length?t.destroy():(t.recycle(),this.pool.push(t)))},a.prototype.getShortestTunnel=function(){for(var t=1/0,e=-1,i=0,n=0;n<this.tunnel;n++){if(!this.last[n]||this.last[n].canRecycle)return[n,0,0];var o=this.last[n].invisibleLength;o<t&&(t=o,e=n,i=this.last[n].speed)}return[e,t,i]},a.prototype.insert=function(t,e,i){if(void 0===e&&(e=0),void 0===i&&(i=!1),t){if("top"===t.type||"bottom"===t.type){for(var n=-1,o=0;o<this.tunnel;o++)if(!this[t.type][o]||this[t.type][o].canRecycle){n=o;break}-1<n&&(this[t.type][n]=this.getDan(t,n),this.current.push(this[t.type][n]),t=void 0)}else{var s=this.getShortestTunnel(),n=s[0],r=s[1],a=s[2];r<200&&(this.last[n]=this.getDan(t,n,r,a),this.current.push(this.last[n]),t=void 0)}(t&&this.unlimited||i)&&this.current.push(this.getDan(t,e%this.tunnel,e))}},a.prototype.load=function(){if(this.showing&&this.player&&this.remain.length&&!(this.tunnel<1)){var e=0|this.player.currentTime;if(this.prevCurrentTime!==e){this.prevCurrentTime=e;var i=[],n=[];if(this.remain.forEach(function(t){t.time===e?n.push(t):i.push(t)}),this.remain=i,n.length)for(var t=0,o=n.length;t<o;t++){var s=n[t];if(!s||!s.text)break;this.insert(s,t)}}}},a.prototype.fire=function(){this.current.forEach(function(t){return t.update()})},a.prototype.clean=function(){var e=this,i=[];this.current.forEach(function(t){t.canRecycle?e.recycleDan(t):i.push(t)}),this.current=i;for(var t=0;t<this.tunnel;t++)this.last[t]&&this.last[t].canRecycle&&(this.last[t]=void 0),this.top[t]&&this.top[t].canRecycle&&(this.top[t]=void 0),this.bottom[t]&&this.bottom[t].canRecycle&&(this.bottom[t]=void 0)},a);i(17),e.default=h},3:function(t,e,i){"use strict";t.exports=function(i){var h=[];return h.toString=function(){return this.map(function(t){var e=function(t,e){var i=t[1]||"",n=t[3];if(!n)return i;if(e&&"function"==typeof btoa){var o=function(t){var e=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),i="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(e);return"/*# ".concat(i," */")}(n),s=n.sources.map(function(t){return"/*# sourceURL=".concat(n.sourceRoot||"").concat(t," */")});return[i].concat(s).concat([o]).join("\n")}return[i].join("\n")}(t,i);return t[2]?"@media ".concat(t[2]," {").concat(e,"}"):e}).join("")},h.i=function(t,e,i){"string"==typeof t&&(t=[[null,t,""]]);var n={};if(i)for(var o=0;o<this.length;o++){var s=this[o][0];null!=s&&(n[s]=!0)}for(var r=0;r<t.length;r++){var a=[].concat(t[r]);i&&n[a[0]]||(e&&(a[2]?a[2]="".concat(e," and ").concat(a[2]):a[2]=e),h.push(a))}},h}}},o.c=s,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(i,n,function(t){return e[t]}.bind(null,n));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=21).default;function o(t){if(s[t])return s[t].exports;var e=s[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}var n,s});
//# sourceMappingURL=index.js.map