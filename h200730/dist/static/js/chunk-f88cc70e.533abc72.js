(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f88cc70e"],{1276:function(e,t,i){"use strict";var s=i("d784"),n=i("44e7"),a=i("825a"),c=i("1d80"),o=i("4840"),r=i("8aa5"),l=i("50c4"),f=i("14c3"),u=i("9263"),d=i("d039"),_=[].push,p=Math.min,h=4294967295,v=!d((function(){return!RegExp(h,"y")}));s("split",2,(function(e,t,i){var s;return s="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,i){var s=String(c(this)),a=void 0===i?h:i>>>0;if(0===a)return[];if(void 0===e)return[s];if(!n(e))return t.call(s,e,a);var o,r,l,f=[],d=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),p=0,v=new RegExp(e.source,d+"g");while(o=u.call(v,s)){if(r=v.lastIndex,r>p&&(f.push(s.slice(p,o.index)),o.length>1&&o.index<s.length&&_.apply(f,o.slice(1)),l=o[0].length,p=r,f.length>=a))break;v.lastIndex===o.index&&v.lastIndex++}return p===s.length?!l&&v.test("")||f.push(""):f.push(s.slice(p)),f.length>a?f.slice(0,a):f}:"0".split(void 0,0).length?function(e,i){return void 0===e&&0===i?[]:t.call(this,e,i)}:t,[function(t,i){var n=c(this),a=void 0==t?void 0:t[e];return void 0!==a?a.call(t,n,i):s.call(String(n),t,i)},function(e,n){var c=i(s,e,this,n,s!==t);if(c.done)return c.value;var u=a(e),d=String(this),_=o(u,RegExp),g=u.unicode,m=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(v?"y":"g"),b=new _(v?u:"^(?:"+u.source+")",m),C=void 0===n?h:n>>>0;if(0===C)return[];if(0===d.length)return null===f(b,d)?[d]:[];var w=0,x=0,k=[];while(x<d.length){b.lastIndex=v?x:0;var R,E=f(b,v?d:d.slice(x));if(null===E||(R=p(l(b.lastIndex+(v?0:x)),d.length))===w)x=r(d,x,g);else{if(k.push(d.slice(w,x)),k.length===C)return k;for(var $=1;$<=E.length-1;$++)if(k.push(E[$]),k.length===C)return k;x=w=R}}return k.push(d.slice(w)),k}]}),!v)},"77bd":function(e,t,i){"use strict";var s=i("b59a"),n=i.n(s);n.a},8640:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{staticClass:"office-details-container"},[i("OfficItem",{attrs:{office:e.office_details}},[i("p",{staticClass:"position"},[e._v("发布时间："+e._s(e.office_details.issuance_date))])]),i("transition",{attrs:{name:"effect"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:1===+e.is_office_send||1===e.office_send_result,expression:"+is_office_send === 1 || office_send_result === 1"}]},[i("div",{staticClass:"office"},[i("p",{staticClass:"title"},[e._v("职位描述：")]),e._l(e.office_details.job_describe,(function(t,s){return i("p",{key:s,staticClass:"content"},[e._v(" "+e._s(t)+" ")])}))],2),i("div",{staticClass:"office"},[i("p",{staticClass:"title"},[e._v("任职条件：")]),e._l(e.office_details.skill_requirements,(function(t,s){return i("p",{key:s,staticClass:"content"},[e._v(" "+e._s(t)+" ")])}))],2),i("div",{staticClass:"save-box"},[1===+e.is_office_send?i("button",{staticClass:"save",on:{click:function(t){return e.sendOffice(e.office_details)}}},[e._v("简历直投")]):i("button",{staticClass:"save",on:{click:e.seeOfficeResult}},[e._v(" "+e._s(1===+e.office_send_result?"查看投递结果":"查看职位详情")+" ")])]),e.is_go_home?i("div",{staticClass:"position-go-home",on:{click:e.goHome}},[e._v("查看更多职位")]):e._e()])]),i("transition",{attrs:{name:"effect"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:2===+e.is_office_send&&2===e.office_send_result,expression:"+is_office_send === 2 && office_send_result === 2"}]},[i("div",{staticClass:"office"},[i("p",{staticClass:"title"},[e._v("简历送达：")]),i("p",{staticClass:"content"},[e._v(e._s(e.office_details.recruitment_unit))])]),i("div",{staticClass:"office"},[i("p",{staticClass:"title"},[e._v("阅读状态：")]),i("p",{staticClass:"content"},[i("span",{class:{span_active:1===+e.office_details.read_status}},[e._v("未读")]),e._v(" | "),i("span",{class:{span_active:2===+e.office_details.read_status}},[e._v("已读")]),e._v(" | "),i("span",{class:{span_active:3===+e.office_details.read_status}},[e._v("不合适")])])]),i("div",{staticClass:"save-box"},[1===+e.is_office_send?i("button",{staticClass:"save",on:{click:function(t){return e.sendOffice(e.office_details)}}},[e._v("简历直投")]):i("button",{staticClass:"save",on:{click:e.seeOfficeResult}},[e._v(" "+e._s(1===+e.office_send_result?"查看投递结果":"查看职位详情")+" ")])]),e.is_go_home?i("div",{staticClass:"position-go-home",on:{click:e.goHome}},[e._v("查看更多职位")]):e._e()])])],1)},n=[],a=(i("99af"),i("ac1f"),i("5319"),i("1276"),i("5530")),c=(i("96cf"),i("1da1")),o=i("2f62"),r=i("028f"),l={name:"officeDetails",components:{OfficItem:r["a"]},data:function(){return{office_details:{},is_office_send:1,office_send_result:1,data:"",is_go_home:!1}},mounted:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$Toast.loading({message:"加载中...",forbidClick:!0,duration:0,overlay:!0}),t.next=3,e.init();case 3:e.data=t.sent,e.$store.dispatch("fetchData",{im:e.$Config.PROJECT_INTERFACE.get_job_info,fps:{open_id:e.data.openid,job_info_id:e.data.task_id},url:e.$Config.REQUEST_URL}).then(function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(i){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.is_office_send=i.back_value.status,e.office_details=i.back_value,e.$Utils.setDocumentTitle(i.back_value.job_title),"yt"===e.$route.query.page&&(e.office_send_result=2),new e.$WxShare(e.wx_config.back_value,{title:"".concat(i.back_value.job_title),details:"有钱不赚，王八蛋！",link:"".concat(e.$Config.PROJECT_SHARE_REQUEST,"/h/").concat(e.$Config.PROJECT_ID,"/dist/index.html?ac=hxdf&id=").concat(e.data.task_id,"&openid=").concat(e.data.openid,"&state=507058&i_rs=t_code&i_t=1603164816&i_sn=6f2852a63bb772e39cf59dadabe3a3cd#/officeDetails"),image:e.$Config.PROJECT_SHARE_REQUEST+"/h/"+e.$Config.PROJECT_ID+"/dist/share.png"},!1).init(),e.$Toast.clear();case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 5:case"end":return t.stop()}}),t)})))()},methods:{goHome:function(){window.location.replace("".concat(this.$Config.PROJECT_REQUEST,"?r=interface/anycall&k=h_200730&page=dist/index&ac=hxdf&base=0"))},seeOfficeResult:function(){this.office_send_result=1===this.office_send_result?2:1},sendOffice:function(e){var t=this;if(0===this.resume_info.back_value.length)return this.$Alert.show({title:"提示",alertContent:"暂无个人信息，是否添加？",yesText:"添加",noText:"取消",yes:function(){t.$router.push("/basic?jobid=".concat(e.id))}}),!1;t.$router.push("/uploader?jobid=".concat(e.id))},init:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.$Utils.getUrlParam("id")||!e.$Utils.getUrlParam("openid")){t.next=7;break}return t.next=3,e.$store.dispatch("getWxConfig",{im:e.$Config.PROJECT_INTERFACE.get_jsconf,fps:{url:encodeURIComponent(window.location.href.split("#")[0])},url:e.$Config.REQUEST_URL});case 3:return e.is_go_home=!0,t.abrupt("return",{task_id:e.$Utils.getUrlParam("id"),openid:e.$Utils.getUrlParam("openid")});case 7:return e.is_go_home=!1,t.abrupt("return",{task_id:e.$route.query.id,openid:e.$route.query.openid});case 9:case"end":return t.stop()}}),t)})))()}},computed:Object(a["a"])({},Object(o["b"])(["wx_config","resume_info"]))},f=l,u=(i("77bd"),i("2877")),d=Object(u["a"])(f,s,n,!1,null,"6f9da88a",null);t["default"]=d.exports},b59a:function(e,t,i){}}]);
//# sourceMappingURL=chunk-f88cc70e.533abc72.js.map