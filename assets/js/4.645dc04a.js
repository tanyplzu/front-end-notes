(window.webpackJsonp=window.webpackJsonp||[]).push([[4,8],{326:function(t,e,n){},330:function(t,e,n){"use strict";n(326)},350:function(t,e,n){},358:function(t,e,n){"use strict";n.r(e);var o=n(32),u=n(0),a={"/":{message:"New content is available.",buttonText:"Refresh"},"/zh/":{message:"发现新内容可用",buttonText:"刷新"},"/ru/":{message:"Доступен новый контент.",buttonText:"Обновить"},"/uk/":{message:"Доступний новий контент.",buttonText:"Оновити"},"/ja/":{message:"新しいコンテンツがあります。",buttonText:"更新する"},"/es/":{message:"Hay nuevo contenido disponible.",buttonText:"Actualizar"}},s={name:"SWUpdatePopup",data:function(){return{rawPopupConfig:{message:"New content is available.",popupComponent:"MySWUpdatePopup",buttonText:"Refresh"},updateEvent:null}},computed:{popupConfig:function(){return Object(u.g)(this,this.rawPopupConfig)},enabled:function(){return Boolean(this.popupConfig&&this.updateEvent)},message:function(){var t=this.popupConfig;return t&&t.message||a["/"].message},buttonText:function(){var t=this.popupConfig;return t&&t.buttonText||a["/"].buttonText}},created:function(){o.a.$on("sw-updated",this.onSWUpdated),!0==={message:"New content is available.",popupComponent:"MySWUpdatePopup",buttonText:"Refresh"}&&(this.rawPopupConfig=a)},methods:{onSWUpdated:function(t){this.updateEvent=t},reload:function(){this.updateEvent&&(this.updateEvent.skipWaiting().then((function(){location.reload(!0)})),this.updateEvent=null)}}},p=(n(330),n(15)),i=Object(p.a)(s,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"sw-update-popup"}},[t._t("default",[t.enabled?n("div",{staticClass:"sw-update-popup"},[t._v("\n      "+t._s(t.message)+"\n\n      "),n("br"),t._v(" "),n("button",{on:{click:t.reload}},[t._v("\n        "+t._s(t.buttonText)+"\n      ")])]):t._e()],{reload:t.reload,enabled:t.enabled,message:t.message,buttonText:t.buttonText})],2)}),[],!1,null,"fec8b358",null);e.default=i.exports},422:function(t,e,n){"use strict";n(350)},443:function(t,e,n){"use strict";n.r(e);var o={components:{SWUpdatePopup:n(358).default}},u=(n(422),n(15)),a=Object(u.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("SWUpdatePopup",{scopedSlots:t._u([{key:"default",fn:function(e){var o=e.enabled,u=e.reload,a=e.message,s=e.buttonText;return[o?n("div",{staticClass:"my-sw-update-popup"},[t._v("\n    "+t._s(a)),n("br"),t._v(" "),n("button",{on:{click:u}},[t._v(t._s(s))])]):t._e()]}}])})}),[],!1,null,null,null);e.default=a.exports}}]);