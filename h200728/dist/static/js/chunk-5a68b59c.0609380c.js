(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a68b59c"],{"0c6c":function(t,e,n){"use strict";var r=n("6b62"),i=n.n(r);i.a},1276:function(t,e,n){"use strict";var r=n("d784"),i=n("44e7"),a=n("825a"),o=n("1d80"),c=n("4840"),s=n("8aa5"),u=n("50c4"),l=n("14c3"),f=n("9263"),h=n("d039"),p=[].push,d=Math.min,g=4294967295,_=!h((function(){return!RegExp(g,"y")}));r("split",2,(function(t,e,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var r=String(o(this)),a=void 0===n?g:n>>>0;if(0===a)return[];if(void 0===t)return[r];if(!i(t))return e.call(r,t,a);var c,s,u,l=[],h=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),d=0,_=new RegExp(t.source,h+"g");while(c=f.call(_,r)){if(s=_.lastIndex,s>d&&(l.push(r.slice(d,c.index)),c.length>1&&c.index<r.length&&p.apply(l,c.slice(1)),u=c[0].length,d=s,l.length>=a))break;_.lastIndex===c.index&&_.lastIndex++}return d===r.length?!u&&_.test("")||l.push(""):l.push(r.slice(d)),l.length>a?l.slice(0,a):l}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:e.call(this,t,n)}:e,[function(e,n){var i=o(this),a=void 0==e?void 0:e[t];return void 0!==a?a.call(e,i,n):r.call(String(i),e,n)},function(t,i){var o=n(r,t,this,i,r!==e);if(o.done)return o.value;var f=a(t),h=String(this),p=c(f,RegExp),v=f.unicode,y=(f.ignoreCase?"i":"")+(f.multiline?"m":"")+(f.unicode?"u":"")+(_?"y":"g"),m=new p(_?f:"^(?:"+f.source+")",y),w=void 0===i?g:i>>>0;if(0===w)return[];if(0===h.length)return null===l(m,h)?[h]:[];var b=0,E=0,x=[];while(E<h.length){m.lastIndex=_?E:0;var k,C=l(m,_?h:h.slice(E));if(null===C||(k=d(u(m.lastIndex+(_?0:E)),h.length))===b)E=s(h,E,v);else{if(x.push(h.slice(b,E)),x.length===w)return x;for(var R=1;R<=C.length-1;R++)if(x.push(C[R]),x.length===w)return x;E=b=k}}return x.push(h.slice(b)),x}]}),!_)},"1da1":function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));n("d3b7");function r(t,e,n,r,i,a,o){try{var c=t[a](o),s=c.value}catch(u){return void n(u)}c.done?e(s):Promise.resolve(s).then(r,i)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(i,a){var o=t.apply(e,n);function c(t){r(o,i,a,c,s,"next",t)}function s(t){r(o,i,a,c,s,"throw",t)}c(void 0)}))}}},"4c75":function(t,e,n){t.exports=n.p+"static/img/banner@3x.f09e3ec9.png"},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,n){var r=n("1d80"),i=n("5899"),a="["+i+"]",o=RegExp("^"+a+a+"*"),c=RegExp(a+a+"*$"),s=function(t){return function(e){var n=String(r(e));return 1&t&&(n=n.replace(o,"")),2&t&&(n=n.replace(c,"")),n}};t.exports={start:s(1),end:s(2),trim:s(3)}},"6b62":function(t,e,n){},8259:function(t,e,n){},"8b1a":function(t,e,n){"use strict";var r=n("8259"),i=n.n(r);i.a},"96cf":function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",o=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(D){s=function(t,e,n){return t[e]=n}}function u(t,e,n,r){var i=e&&e.prototype instanceof _?e:_,a=Object.create(i.prototype),o=new L(r||[]);return a._invoke=C(t,n,o),a}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(D){return{type:"throw",arg:D}}}t.wrap=u;var f="suspendedStart",h="suspendedYield",p="executing",d="completed",g={};function _(){}function v(){}function y(){}var m={};m[a]=function(){return this};var w=Object.getPrototypeOf,b=w&&w(w(I([])));b&&b!==n&&r.call(b,a)&&(m=b);var E=y.prototype=_.prototype=Object.create(m);function x(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function k(t,e){function n(i,a,o,c){var s=l(t[i],t,a);if("throw"!==s.type){var u=s.arg,f=u.value;return f&&"object"===typeof f&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,o,c)}),(function(t){n("throw",t,o,c)})):e.resolve(f).then((function(t){u.value=t,o(u)}),(function(t){return n("throw",t,o,c)}))}c(s.arg)}var i;function a(t,r){function a(){return new e((function(e,i){n(t,r,e,i)}))}return i=i?i.then(a,a):a()}this._invoke=a}function C(t,e,n){var r=f;return function(i,a){if(r===p)throw new Error("Generator is already running");if(r===d){if("throw"===i)throw a;return N()}n.method=i,n.arg=a;while(1){var o=n.delegate;if(o){var c=R(o,n);if(c){if(c===g)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===f)throw r=d,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=p;var s=l(t,e,n);if("normal"===s.type){if(r=n.done?d:h,s.arg===g)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r=d,n.method="throw",n.arg=s.arg)}}}function R(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,R(t,n),"throw"===n.method))return g;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var i=l(r,t.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,g;var a=i.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,g):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function T(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function $(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function I(t){if(t){var n=t[a];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var i=-1,o=function n(){while(++i<t.length)if(r.call(t,i))return n.value=t[i],n.done=!1,n;return n.value=e,n.done=!0,n};return o.next=o}}return{next:N}}function N(){return{value:e,done:!0}}return v.prototype=E.constructor=y,y.constructor=v,v.displayName=s(y,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,s(t,c,"GeneratorFunction")),t.prototype=Object.create(E),t},t.awrap=function(t){return{__await:t}},x(k.prototype),k.prototype[o]=function(){return this},t.AsyncIterator=k,t.async=function(e,n,r,i,a){void 0===a&&(a=Promise);var o=new k(u(e,n,r,i),a);return t.isGeneratorFunction(n)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},x(E),s(E,c,"Generator"),E[a]=function(){return this},E.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=I,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach($),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function i(r,i){return c.type="throw",c.arg=t,n.next=r,i&&(n.method="next",n.arg=e),!!i}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],c=o.completion;if("root"===o.tryLoc)return i("end");if(o.tryLoc<=this.prev){var s=r.call(o,"catchLoc"),u=r.call(o,"finallyLoc");if(s&&u){if(this.prev<o.catchLoc)return i(o.catchLoc,!0);if(this.prev<o.finallyLoc)return i(o.finallyLoc)}else if(s){if(this.prev<o.catchLoc)return i(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return i(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var a=i;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=t,o.arg=e,a?(this.method="next",this.next=a.finallyLoc,g):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),$(n),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;$(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:I(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),g}},t}(t.exports);try{regeneratorRuntime=r}catch(i){Function("r","regeneratorRuntime = r")(r)}},a9e3:function(t,e,n){"use strict";var r=n("83ab"),i=n("da84"),a=n("94ca"),o=n("6eeb"),c=n("5135"),s=n("c6b6"),u=n("7156"),l=n("c04e"),f=n("d039"),h=n("7c73"),p=n("241c").f,d=n("06cf").f,g=n("9bf2").f,_=n("58a8").trim,v="Number",y=i[v],m=y.prototype,w=s(h(m))==v,b=function(t){var e,n,r,i,a,o,c,s,u=l(t,!1);if("string"==typeof u&&u.length>2)if(u=_(u),e=u.charCodeAt(0),43===e||45===e){if(n=u.charCodeAt(2),88===n||120===n)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:r=2,i=49;break;case 79:case 111:r=8,i=55;break;default:return+u}for(a=u.slice(2),o=a.length,c=0;c<o;c++)if(s=a.charCodeAt(c),s<48||s>i)return NaN;return parseInt(a,r)}return+u};if(a(v,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var E,x=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof x&&(w?f((function(){m.valueOf.call(n)})):s(n)!=v)?u(new y(b(e)),n,x):b(e)},k=r?p(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),C=0;k.length>C;C++)c(y,E=k[C])&&!c(x,E)&&g(x,E,d(y,E));x.prototype=m,m.constructor=x,o(i,v,x)}},bb51:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"home-container"},[r("header",{staticClass:"banner"},[r("img",{attrs:{src:n("4c75"),alt:""}}),r("div",{staticClass:"rule",on:{click:t.rule}},[t._v("规则")]),r("div",{staticClass:"get_reward",on:{click:t.getRewardList}},[t._v("已领取福利")])]),r("calender",{attrs:{coin:t.coin,"exist-date":t.exist_date},on:{sign:t.sign,pick:t.pick}}),r("div",{staticClass:"continuous"},[r("p",[t._v("连续签到福利")]),r("div",{staticClass:"continuous_box"},t._l(t.keep_sign_list,(function(e,n){return r("div",{key:n,staticClass:"continuous_box__item"},[r("div",{staticClass:"continuous_box__item___left"},[r("img",{attrs:{src:e.img,alt:""}})]),r("div",{staticClass:"continuous_box__item___center"},["number"===typeof t.reward_type[e.bonustype].reward?r("p",[t._v(" 连续签到"+t._s(t.reward_type[e.bonustype].day)+"天，+"+t._s(t.reward_type[e.bonustype].reward)+"青创币 ")]):r("p",[t._v("连续签到"+t._s(t.reward_type[e.bonustype].day)+"天，获得"+t._s(t.reward_type[e.bonustype].reward))]),r("p",[t._v("有效期至"+t._s(e.date))])]),r("div",{staticClass:"continuous_box__item___right"},[r("button",{class:{disabled_button:t.keep_sign_status["disabled"].includes(e.status)},attrs:{disabled:t.keep_sign_status["disabled"].includes(e.status)},on:{click:function(n){return t.getReward(e.bonustype)}}},[t._v(" "+t._s(t.keep_sign_status[e.status])+" ")])])])})),0)])],1)},i=[],a=(n("ac1f"),n("1276"),n("5530")),o=(n("96cf"),n("1da1")),c=(n("e7e5"),n("d399")),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"calender-container"},[n("div",{staticClass:"calender"},[n("div",{staticClass:"calender_header"},[n("p",[t._v("已有青创币 "+t._s(t.coin)+" 枚")]),n("p",{on:{click:t.pick}},[t._v("幸运抽牌 >")])]),n("div",{staticClass:"calender_main"},[t._l(t.visibeDays,(function(e,r){return n("div",{key:r,staticClass:"calender_main__item",class:{pro_month_active:e.date.getMonth()+1!==t.date.getMonth()+1},style:{color:t.existDate.includes(e.formDate)?"#fff":""},attrs:{"date-formdate":e.formDate}},[t._v(" "+t._s(e.date.getDate())+" "),t.existDate.includes(e.formDate)?n("div",{staticClass:"active"}):t._e()])})),n("div",{staticClass:"calender_main__nowMonth"},[t._v(t._s(t.nowMonth)+"月")])],2),n("button",{staticClass:"calender_button",on:{click:t.sign}},[t._v("立即签到")])])])},u=[],l=(n("99af"),n("a9e3"),{name:"calender",props:{date:{type:Date,default:function(){return new Date}},existDate:{type:Array,default:[]},coin:{type:Number,default:0}},methods:{sign:function(){this.$emit("sign")},pick:function(){this.$emit("pick")}},computed:{visibeDays:function(){for(var t=this.$Utils.getYearMonthDay(this.date),e=t.year,n=t.month,r=this.$Utils.getDate(e,n,1),i=r.getDay(),a=r-60*i*60*1e3*24,o=[],c=0;c<42;c++){var s=new Date(a+60*c*60*1e3*24).getFullYear(),u=parseInt(new Date(a+60*c*60*1e3*24).getMonth()+1)<10?"0"+parseInt(new Date(a+60*c*60*1e3*24).getMonth()+1):parseInt(new Date(a+60*c*60*1e3*24).getMonth()+1),l=new Date(a+60*c*60*1e3*24).getDate()<10?"0"+new Date(a+60*c*60*1e3*24).getDate():new Date(a+60*c*60*1e3*24).getDate();o.push({date:new Date(a+60*c*60*1e3*24),formDate:"".concat(s,"-").concat(u,"-").concat(l)})}return o},nowMonth:function(){var t=this.$Utils.getYearMonthDay(this.date),e=t.month;return e+1}}}),f=l,h=(n("8b1a"),n("2877")),p=Object(h["a"])(f,s,u,!1,null,"8cb063c4",null),d=p.exports,g=n("2f62"),_={name:"Home",components:{calender:d,Toast:c["a"]},data:function(){return{exist_date:[],coin:0,keep_sign_count:"",keep_sign_list:"",keep_sign_status:{disabled:[2,3,4],1:"领取",2:"已领取",3:"过期",4:"已抢光"},reward_type:this.$Config.REWARD_TYPE}},mounted:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return c["a"].loading({message:"加载中...",forbidClick:!0,duration:0}),t.$Utils.setDocumentTitle("签到领福利-测试222"),e.next=4,t.$store.dispatch("getOpenid",{im:t.$Config.PROJECT_INTERFACE.getopenid,url:t.$Config.REQUEST_URL});case 4:return e.next=6,t.refresh();case 6:return e.t0=t.$WxShare,e.t1=t.wx_config.back_value,e.next=10,t.$Utils.makeShareLink();case 10:e.t2=e.sent,e.t3={title:"范德萨发生范德萨发舒服",details:"99222999",link:e.t2,image:"www"},n=new e.t0(e.t1,e.t3,!0),n.init();case 14:case"end":return e.stop()}}),e)})))()},methods:{getRewardList:function(){this.$router.push("/reward")},rule:function(){this.$router.push("/rule")},pick:function(){this.$router.push("/sign")},sign:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t,c["a"].loading({forbidClick:!0,duration:0}),e.next=4,t.$store.dispatch("fetchData",{im:t.$Config.PROJECT_INTERFACE.clock_in_by_day,fps:{open_id:t.openid_info.back_value.open_id},url:t.$Config.REQUEST_URL});case 4:if(r=e.sent,2001101!==r.error_code){e.next=9;break}return c["a"].clear(),t.$Alert.show({titleShow:!1,content:{alertType:"noReward",content:"无法重复签到"},confirmText:"关闭",closeShow:!1}),e.abrupt("return",!1);case 9:t.$store.dispatch("fetchData",{im:t.$Config.PROJECT_INTERFACE.get_clocked_keep_count,fps:{open_id:t.openid_info.back_value.open_id},url:t.$Config.REQUEST_URL}).then((function(e){c["a"].clear(),t.refresh(),t.$Alert.show({title:"签到成功",content:{alertType:"sign",keepSignCount:e.back_value,reward:t.reward_type[r.back_value["bonustype"]]},confirmText:"去抽奖",operatButton:function(){n.$router.push("/sign")}})}));case 10:case"end":return e.stop()}}),e)})))()},getReward:function(t){var e=this,n=this;c["a"].loading({forbidClick:!0,duration:0}),this.$store.dispatch("fetchData",{im:this.$Config.PROJECT_INTERFACE.set_prize_record,fps:{open_id:this.openid_info.back_value.open_id,bonustype:t,date:"2020-09-30"},url:this.$Config.REQUEST_URL}).then((function(t){if(2008111345===t.error_code)return c["a"].clear(),Object(c["a"])("天数不够，无法领取"),!1;c["a"].clear(),e.refresh(),e.$Alert.show({title:"签到成功",content:{alertType:"sign",reward:e.reward_type[t.back_value["bonustype"]]},confirmText:"去抽奖",operatButton:function(){n.$router.push("/sign")}})}))},refresh:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("fetchData",{im:t.$Config.PROJECT_INTERFACE.get_clocked_list,fps:{open_id:t.openid_info.back_value.open_id},url:t.$Config.REQUEST_URL}).then((function(e){t.exist_date=e.back_value}));case 2:return e.next=4,t.$store.dispatch("fetchData",{im:t.$Config.PROJECT_INTERFACE.getplayerinfo,fps:{open_id:t.openid_info.back_value.open_id},url:t.$Config.REQUEST_URL}).then((function(e){t.coin=parseInt(e.back_value.score)}));case 4:return e.next=6,t.$store.dispatch("fetchData",{im:t.$Config.PROJECT_INTERFACE.get_bouns_list_info,fps:{open_id:t.openid_info.back_value.open_id},url:t.$Config.REQUEST_URL}).then((function(e){t.keep_sign_list=e.back_value}));case 6:return e.next=8,t.$store.dispatch("getWxConfig",{im:t.$Config.PROJECT_INTERFACE.get_jsconf,fps:{url:encodeURIComponent(window.location.href.split("#")[0])},url:t.$Config.REQUEST_URL});case 8:c["a"].clear();case 9:case"end":return e.stop()}}),e)})))()}},computed:Object(a["a"])({},Object(g["b"])(["openid_info","wx_config"]))},v=_,y=(n("0c6c"),Object(h["a"])(v,r,i,!1,null,"3baa7ac1",null));e["default"]=y.exports}}]);
//# sourceMappingURL=chunk-5a68b59c.0609380c.js.map