/*!
 * lrc-file-parser.js v1.1.0
 * Author: lyswhut
 * Github: https://github.com/lyswhut/lrc-file-parser
 * License: MIT
 */
!function(t,i){"object"==typeof exports&&"object"==typeof module?module.exports=i():"function"==typeof define&&define.amd?define("Lyric",[],i):"object"==typeof exports?exports.Lyric=i():t.Lyric=i()}(self,(function(){return t={579:t=>{function i(t){return function(t){if(Array.isArray(t))return e(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,i){if(t){if("string"==typeof t)return e(t,i);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,i):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(t,i){(null==i||i>t.length)&&(i=t.length);for(var e=0,n=new Array(i);e<i;e++)n[e]=t[e];return n}function n(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function r(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=/^\[([\d:.]*)\]{1}/g,a={title:"ti",artist:"ar",album:"al",offset:"offset",by:"by"},u="object"==("undefined"==typeof performance?"undefined":s(performance))&&performance.now?performance.now.bind(performance):Date.now.bind(Date),f={invokeTime:0,animationFrameId:null,timeoutId:null,callback:null,thresholdTime:200,run:function(){var t=this;this.animationFrameId=window.requestAnimationFrame((function(){t.animationFrameId=null;var i=t.invokeTime-u();if(i>0)return i<t.thresholdTime?t.run():t.timeoutId=setTimeout((function(){t.timeoutId=null,t.run()}),i-t.thresholdTime);t.callback(i)}))},start:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){},i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;this.callback=t,this.invokeTime=u()+i,this.run()},clear:function(){this.animationFrameId&&(window.cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.timeoutId&&(window.clearTimeout(this.timeoutId),this.timeoutId=null)}};t.exports=function(){function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=i.lyric,r=void 0===e?"":e,s=i.translationLyric,o=void 0===s?"":s,a=i.offset,u=void 0===a?150:a,f=i.onPlay,l=void 0===f?function(){}:f,h=i.onSetLyric,c=void 0===h?function(){}:h;n(this,t),this.lyric=r,this.translationLyric=o,this.tags={},this.lines=null,this.onPlay=l,this.onSetLyric=c,this.isPlay=!1,this.curLineNum=0,this.maxLine=0,this.offset=u,this.isOffseted=!1,this._performanceTime=0,this._performanceOffsetTime=0,this._init()}var e,s,l;return e=t,(s=[{key:"_init",value:function(){null==this.lyric&&(this.lyric=""),null==this.translationLyric&&(this.translationLyric=""),this._initTag(),this._initLines(),this.onSetLyric(this.lines)}},{key:"_initTag",value:function(){for(var t in a){var i=this.lyric.match(new RegExp("\\[".concat(a[t],":([^\\]]*)]"),"i"));this.tags[t]=i&&i[1]||""}}},{key:"_initLines",value:function(){this.lines=[],this.translationLines=[];for(var t=this.lyric.split("\n"),e={},n=0;n<t.length;n++){var r=t[n].trim();if(o.exec(r)){var s=r.replace(o,"").trim();if(s){var a=RegExp.$1,u=a.split(":");u.length<3&&u.unshift(0),u[2].indexOf(".")>-1&&(u.push.apply(u,i(u[2].split("."))),u.splice(2,1)),e[a]={time:60*parseInt(u[0])*60*1e3+60*parseInt(u[1])*1e3+1e3*parseInt(u[2])+parseInt(u[3]||0),text:s}}}}for(var f=this.translationLyric.split("\n"),l=0;l<f.length;l++){var h=f[l].trim();if(o.exec(h)){var c=h.replace(o,"").trim();if(c){var m=e[RegExp.$1];m&&(m.translation=c)}}}this.lines=Object.values(e),this.lines.sort((function(t,i){return t.time-i.time})),this.maxLine=this.lines.length-1}},{key:"_currentTime",value:function(){return u()-this._performanceTime+this._performanceOffsetTime}},{key:"_findCurLineNum",value:function(t){for(var i=this.lines.length,e=0;e<i;e++)if(t<=this.lines[e].time)return 0===e?0:e-1;return i-1}},{key:"_handleMaxLine",value:function(){this.onPlay(this.curLineNum,this.lines[this.curLineNum].text),this.pause()}},{key:"_refresh",value:function(){var t=this;this.curLineNum++;var i=this.lines[this.curLineNum],e=this.lines[this.curLineNum+1],n=this._currentTime(),r=n-i.time;if(r>=0||0===this.curLineNum){if(this.curLineNum===this.maxLine)return this._handleMaxLine();if(this.delay=e.time-i.time-r,this.delay>0)return!this.isOffseted&&this.delay>=this.offset&&(this._performanceOffsetTime+=this.offset,this.delay-=this.offset,this.isOffseted=!0),f.start((function(){t._refresh()}),this.delay),void this.onPlay(this.curLineNum,i.text,n)}this.curLineNum=this._findCurLineNum(n)-1,this._refresh()}},{key:"play",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.lines.length&&(this.pause(),this.isPlay=!0,this._performanceOffsetTime=0,this._performanceTime=u()-t,this._performanceTime<0&&(this._performanceOffsetTime=-this._performanceTime,this._performanceTime=0),this.curLineNum=this._findCurLineNum(t)-1,this._refresh())}},{key:"pause",value:function(){if(this.isPlay&&(this.isPlay=!1,this.isOffseted=!1,f.clear(),this.curLineNum!==this.maxLine)){var t=this._findCurLineNum(this._currentTime());this.curLineNum!==t&&(this.curLineNum=t,this.onPlay(t,this.lines[t].text))}}},{key:"setLyric",value:function(t,i){this.isPlay&&this.pause(),this.lyric=t,this.translationLyric=i,this._init()}}])&&r(e.prototype,s),l&&r(e,l),t}()}},i={},function e(n){if(i[n])return i[n].exports;var r=i[n]={exports:{}};return t[n](r,r.exports,e),r.exports}(579);var t,i}));