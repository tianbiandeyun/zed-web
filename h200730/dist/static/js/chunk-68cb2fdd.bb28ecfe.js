(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-68cb2fdd"],{"028f":function(e,t,i){"use strict";var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{staticClass:"office-item-container",on:{click:e.officeDetails}},[i("div",{staticClass:"office-item-title"},[i("p",{staticClass:"office"},[e._v(e._s(e.office.job_title))]),i("p",{staticClass:"money"},[e._v(e._s(e.office.salary_cap)+" / "),1===+e.office.type?i("span",[e._v("次")]):e._e(),2===+e.office.type?i("span",[e._v("小时")]):e._e(),3===+e.office.type?i("span",[e._v("天")]):e._e(),4===+e.office.type?i("span",[e._v("月")]):e._e(),5===+e.office.type?i("span",[e._v("面议")]):e._e()])]),i("div",{staticClass:"office-item-details"},[i("p",{staticClass:"details"},[i("span",[e._v(e._s(e.office.location_area)+" | "+e._s(e.office.job_nature)+" | "+e._s(e.office.job_type))])]),e._t("default",[i("p",{staticClass:"position"},[e._v("没有传入任何东西")])])],2),e._t("hot")],2)},n=[],a={name:"office_item",props:{office:{type:Object}},methods:{officeDetails:function(){this.$emit("details")}}},c=a,o=(i("095d"),i("2877")),f=Object(o["a"])(c,s,n,!1,null,"47e32ece",null);t["a"]=f.exports},"095d":function(e,t,i){"use strict";var s=i("bed8"),n=i.n(s);n.a},1276:function(e,t,i){"use strict";var s=i("d784"),n=i("44e7"),a=i("825a"),c=i("1d80"),o=i("4840"),f=i("8aa5"),r=i("50c4"),l=i("14c3"),_=i("9263"),u=i("d039"),d=[].push,p=Math.min,v=4294967295,h=!u((function(){return!RegExp(v,"y")}));s("split",2,(function(e,t,i){var s;return s="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,i){var s=String(c(this)),a=void 0===i?v:i>>>0;if(0===a)return[];if(void 0===e)return[s];if(!n(e))return t.call(s,e,a);var o,f,r,l=[],u=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),p=0,h=new RegExp(e.source,u+"g");while(o=_.call(h,s)){if(f=h.lastIndex,f>p&&(l.push(s.slice(p,o.index)),o.length>1&&o.index<s.length&&d.apply(l,o.slice(1)),r=o[0].length,p=f,l.length>=a))break;h.lastIndex===o.index&&h.lastIndex++}return p===s.length?!r&&h.test("")||l.push(""):l.push(s.slice(p)),l.length>a?l.slice(0,a):l}:"0".split(void 0,0).length?function(e,i){return void 0===e&&0===i?[]:t.call(this,e,i)}:t,[function(t,i){var n=c(this),a=void 0==t?void 0:t[e];return void 0!==a?a.call(t,n,i):s.call(String(n),t,i)},function(e,n){var c=i(s,e,this,n,s!==t);if(c.done)return c.value;var _=a(e),u=String(this),d=o(_,RegExp),g=_.unicode,m=(_.ignoreCase?"i":"")+(_.multiline?"m":"")+(_.unicode?"u":"")+(h?"y":"g"),C=new d(h?_:"^(?:"+_.source+")",m),b=void 0===n?v:n>>>0;if(0===b)return[];if(0===u.length)return null===l(C,u)?[u]:[];var R=0,E=0,$=[];while(E<u.length){C.lastIndex=h?E:0;var k,w=l(C,h?u:u.slice(E));if(null===w||(k=p(r(C.lastIndex+(h?0:E)),u.length))===R)E=f(u,E,g);else{if($.push(u.slice(R,E)),$.length===b)return $;for(var x=1;x<=w.length-1;x++)if($.push(w[x]),$.length===b)return $;E=R=k}}return $.push(u.slice(R)),$}]}),!h)},8640:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{staticClass:"office-details-container"},[i("OfficItem",{attrs:{office:e.office_details}},[i("p",{staticClass:"position"},[e._v("发布时间："+e._s(e.office_details.issuance_date))])]),i("transition",{attrs:{name:"effect"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:1===+e.is_office_send||1===e.office_send_result,expression:"+is_office_send === 1 || office_send_result === 1"}]},[i("div",{staticClass:"office"},[i("p",{staticClass:"title"},[e._v("职位描述：")]),e._l(e.office_details.job_describe,(function(t,s){return i("p",{key:s,staticClass:"content"},[e._v(" "+e._s(t)+" ")])}))],2),i("div",{staticClass:"office"},[i("p",{staticClass:"title"},[e._v("任职条件：")]),e._l(e.office_details.skill_requirements,(function(t,s){return i("p",{key:s,staticClass:"content"},[e._v(" "+e._s(t)+" ")])}))],2),i("div",{staticClass:"save-box"},[1===+e.is_office_send?i("button",{staticClass:"save",on:{click:function(t){return e.sendOffice(e.office_details)}}},[e._v("简历直投")]):i("button",{staticClass:"save",on:{click:e.seeOfficeResult}},[e._v(" "+e._s(1===+e.office_send_result?"查看投递结果":"查看职位详情")+" ")])]),e.is_go_home?i("div",{staticClass:"position-go-home",on:{click:e.goHome}},[e._v("查看更多职位")]):e._e()])]),i("transition",{attrs:{name:"effect"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:2===+e.is_office_send&&2===e.office_send_result,expression:"+is_office_send === 2 && office_send_result === 2"}]},[i("div",{staticClass:"office"},[i("p",{staticClass:"title"},[e._v("简历送达：")]),i("p",{staticClass:"content"},[e._v(e._s(e.office_details.recruitment_unit))])]),i("div",{staticClass:"office"},[i("p",{staticClass:"title"},[e._v("阅读状态：")]),i("p",{staticClass:"content"},[i("span",{class:{span_active:1===+e.office_details.read_status}},[e._v("未读")]),e._v(" | "),i("span",{class:{span_active:2===+e.office_details.read_status}},[e._v("已读")]),e._v(" | "),i("span",{class:{span_active:3===+e.office_details.read_status}},[e._v("不合适")])])]),i("div",{staticClass:"save-box"},[1===+e.is_office_send?i("button",{staticClass:"save",on:{click:function(t){return e.sendOffice(e.office_details)}}},[e._v("简历直投")]):i("button",{staticClass:"save",on:{click:e.seeOfficeResult}},[e._v(" "+e._s(1===+e.office_send_result?"查看投递结果":"查看职位详情")+" ")])]),e.is_go_home?i("div",{staticClass:"position-go-home",on:{click:e.goHome}},[e._v("查看更多职位")]):e._e()])])],1)},n=[],a=(i("99af"),i("ac1f"),i("5319"),i("1276"),i("5530")),c=(i("96cf"),i("1da1")),o=i("2f62"),f=i("028f"),r={name:"officeDetails",components:{OfficItem:f["a"]},data:function(){return{office_details:{},is_office_send:1,office_send_result:1,data:"",is_go_home:!1}},mounted:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$Toast.loading({message:"加载中...",forbidClick:!0,duration:0,overlay:!0}),t.next=3,e.init();case 3:e.data=t.sent,e.$store.dispatch("fetchData",{im:e.$Config.PROJECT_INTERFACE.get_job_info,fps:{open_id:e.data.openid,job_info_id:e.data.task_id},url:e.$Config.REQUEST_URL}).then(function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(i){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.is_office_send=i.back_value.status,e.office_details=i.back_value,e.$Utils.setDocumentTitle(i.back_value.job_title),"yt"===e.$route.query.page&&(e.office_send_result=2),new e.$WxShare(e.wx_config.back_value,{title:"".concat(i.back_value.job_title),details:"有钱不赚，王八蛋！",link:"".concat(e.$Config.PROJECT_SHARE_REQUEST,"/h/").concat(e.$Config.PROJECT_ID,"/dist/index.html?ac=hxdf&id=").concat(e.data.task_id,"&openid=").concat(e.data.openid,"&state=507058&i_rs=t_code&i_t=1603164816&i_sn=6f2852a63bb772e39cf59dadabe3a3cd#/officeDetails"),image:e.$Config.PROJECT_SHARE_REQUEST+"/h/"+e.$Config.PROJECT_ID+"/dist/share.png"},!1).init(),e.$Toast.clear();case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 5:case"end":return t.stop()}}),t)})))()},methods:{goHome:function(){window.location.replace("".concat(this.$Config.PROJECT_REQUEST,"?r=interface/anycall&k=h_200730&page=dist/index&ac=hxdf&base=0"))},seeOfficeResult:function(){this.office_send_result=1===this.office_send_result?2:1},sendOffice:function(e){var t=this;this.$Alert.show({title:"确认提交简历",alertContent:"简历将提交给第三方人力资源部门进行审阅，确认后不可撤回",yes:function(){var i=this;t.$Toast.loading({message:"加载中...",forbidClick:!0,duration:0,overlay:!0}),t.$store.dispatch("fetchData",{im:t.$Config.PROJECT_INTERFACE.set_application_record,fps:{open_id:t.data.openid,company_id:"",job_info_id:e.id},url:t.$Config.REQUEST_URL}).then((function(e){e.back_value?t.$store.dispatch("fetchData",{im:t.$Config.PROJECT_INTERFACE.get_job_info,fps:{open_id:t.data.openid,job_info_id:t.data.task_id},url:t.$Config.REQUEST_URL}).then((function(e){t.office_send_result=1===i.office_send_result?2:1,t.is_office_send=e.back_value.status,t.office_details=e.back_value,t.$Toast.clear()})):(t.$Toast.clear(),2008191856===e.error_code&&t.$Alert.show({title:"提示",alertContent:"暂无任何简历，无法投递职位，是否添加？",yesText:"添加",noText:"取消",yes:function(){t.$router.push("/basic")},no:function(){t.$router.replace("/")}}))}))}})},init:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.$Utils.getUrlParam("id")||!e.$Utils.getUrlParam("openid")){t.next=7;break}return t.next=3,e.$store.dispatch("getWxConfig",{im:e.$Config.PROJECT_INTERFACE.get_jsconf,fps:{url:encodeURIComponent(window.location.href.split("#")[0])},url:e.$Config.REQUEST_URL});case 3:return e.is_go_home=!0,t.abrupt("return",{task_id:e.$Utils.getUrlParam("id"),openid:e.$Utils.getUrlParam("openid")});case 7:return e.is_go_home=!1,t.abrupt("return",{task_id:e.$route.query.id,openid:e.$route.query.openid});case 9:case"end":return t.stop()}}),t)})))()}},computed:Object(a["a"])({},Object(o["b"])(["wx_config"]))},l=r,_=(i("f7f3"),i("2877")),u=Object(_["a"])(l,s,n,!1,null,"6c7705c3",null);t["default"]=u.exports},bed8:function(e,t,i){},ce9c:function(e,t,i){},f7f3:function(e,t,i){"use strict";var s=i("ce9c"),n=i.n(s);n.a}}]);
//# sourceMappingURL=chunk-68cb2fdd.bb28ecfe.js.map