/*! lib(1.0.0) - JianGang Zhao <zhaojiangang@gmail.com> - 2013-09-28 15:12:02*/
define("lib/latest/ajax_form",[],function(){return function(){(function(e){"use strict";function t(t){var n=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(this).ajaxSubmit(n))}function n(t){var n=t.target,r=e(n);if(!r.is(":submit,input:image")){var i=r.closest(":submit");if(0===i.length)return;n=i[0]}var a=this;if(a.clk=n,"image"==n.type)if(void 0!==t.offsetX)a.clk_x=t.offsetX,a.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=r.offset();a.clk_x=t.pageX-o.left,a.clk_y=t.pageY-o.top}else a.clk_x=t.pageX-n.offsetLeft,a.clk_y=t.pageY-n.offsetTop;setTimeout(function(){a.clk=a.clk_x=a.clk_y=null},100)}function r(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var i={};i.fileapi=void 0!==e("<input type='file'/>").get(0).files,i.formdata=void 0!==window.FormData,e.fn.ajaxSubmit=function(t){function n(n){for(var r=new FormData,i=0;n.length>i;i++)r.append(n[i].name,n[i].value);if(t.extraData)for(var a in t.extraData)t.extraData.hasOwnProperty(a)&&r.append(a,t.extraData[a]);t.data=null;var o=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:"POST"});t.uploadProgress&&(o.xhr=function(){var e=jQuery.ajaxSettings.xhr();return e.upload&&(e.upload.onprogress=function(e){var n=0,r=e.loaded||e.position,i=e.total;e.lengthComputable&&(n=Math.ceil(100*(r/i))),t.uploadProgress(e,r,i,n)}),e}),o.data=null;var s=o.beforeSend;o.beforeSend=function(e,t){t.data=r,s&&s.call(this,e,t)},e.ajax(o)}function a(n){function i(e){var t=e.contentWindow?e.contentWindow.document:e.contentDocument?e.contentDocument:e.document;return t}function a(){function t(){try{var e=i(g).readyState;r("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(n){r("Server abort: ",n," (",n.name,")"),s(j),T&&clearTimeout(T),T=void 0}}var n=u.attr("target"),a=u.attr("action");w.setAttribute("target",h),o||w.setAttribute("method","POST"),a!=f.url&&w.setAttribute("action",f.url),f.skipEncodingOverride||o&&!/post/i.test(o)||u.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),f.timeout&&(T=setTimeout(function(){x=!0,s(S)},f.timeout));var l=[];try{if(f.extraData)for(var c in f.extraData)f.extraData.hasOwnProperty(c)&&l.push(e('<input type="hidden" name="'+c+'">').attr("value",f.extraData[c]).appendTo(w)[0]);f.iframeTarget||(m.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1)),setTimeout(t,15),w.submit()}finally{w.setAttribute("action",a),n?w.setAttribute("target",n):u.removeAttr("target"),e(l).remove()}}function s(t){if(!v.aborted&&!_){try{D=i(g)}catch(n){r("cannot access response document: ",n),t=j}if(t===S&&v)return v.abort("timeout"),void 0;if(t==j&&v)return v.abort("server abort"),void 0;if(D&&D.location.href!=f.iframeSrc||x){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var a,o="success";try{if(x)throw"timeout";var l="xml"==f.dataType||D.XMLDocument||e.isXMLDoc(D);if(r("isXml="+l),!l&&window.opera&&(null===D.body||!D.body.innerHTML)&&--A)return r("requeing onLoad callback, DOM not available"),setTimeout(s,250),void 0;var u=D.body?D.body:D.documentElement;v.responseText=u?u.innerHTML:null,v.responseXML=D.XMLDocument?D.XMLDocument:D,l&&(f.dataType="xml"),v.getResponseHeader=function(e){var t={"content-type":f.dataType};return t[e]},u&&(v.status=Number(u.getAttribute("status"))||v.status,v.statusText=u.getAttribute("statusText")||v.statusText);var c=(f.dataType||"").toLowerCase(),d=/(json|script|text)/.test(c);if(d||f.textarea){var h=D.getElementsByTagName("textarea")[0];if(h)v.responseText=h.value,v.status=Number(h.getAttribute("status"))||v.status,v.statusText=h.getAttribute("statusText")||v.statusText;else if(d){var y=D.getElementsByTagName("pre")[0],b=D.getElementsByTagName("body")[0];y?v.responseText=y.textContent?y.textContent:y.innerText:b&&(v.responseText=b.textContent?b.textContent:b.innerText)}}else"xml"==c&&!v.responseXML&&v.responseText&&(v.responseXML=L(v.responseText));try{C=M(v,c,f)}catch(t){o="parsererror",v.error=a=t||o}}catch(t){r("error caught: ",t),o="error",v.error=a=t||o}v.aborted&&(r("upload aborted"),o=null),v.status&&(o=v.status>=200&&300>v.status||304===v.status?"success":"error"),"success"===o?(f.success&&f.success.call(f.context,C,"success",v),p&&e.event.trigger("ajaxSuccess",[v,f])):o&&(void 0===a&&(a=v.statusText),f.error&&f.error.call(f.context,v,o,a),p&&e.event.trigger("ajaxError",[v,f,a])),p&&e.event.trigger("ajaxComplete",[v,f]),p&&!--e.active&&e.event.trigger("ajaxStop"),f.complete&&f.complete.call(f.context,v,o),_=!0,f.timeout&&clearTimeout(T),setTimeout(function(){f.iframeTarget||m.remove(),v.responseXML=null},100)}}}var l,c,f,p,h,m,g,v,y,b,x,T,w=u[0],k=!!e.fn.prop;if(e(":input[name=submit],:input[id=submit]",w).length)return alert('Error: Form elements must not have name or id of "submit".'),void 0;if(n)for(c=0;d.length>c;c++)l=e(d[c]),k?l.prop("disabled",!1):l.removeAttr("disabled");if(f=e.extend(!0,{},e.ajaxSettings,t),f.context=f.context||f,h="jqFormIO"+(new Date).getTime(),f.iframeTarget?(m=e(f.iframeTarget),b=m.attr("name"),b?h=b:m.attr("name",h)):(m=e('<iframe name="'+h+'" src="'+f.iframeSrc+'" />'),m.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=m[0],v={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var n="timeout"===t?"timeout":"aborted";r("aborting upload... "+n),this.aborted=1,m.attr("src",f.iframeSrc),v.error=n,f.error&&f.error.call(f.context,v,n,t),p&&e.event.trigger("ajaxError",[v,f,n]),f.complete&&f.complete.call(f.context,v,n)}},p=f.global,p&&0===e.active++&&e.event.trigger("ajaxStart"),p&&e.event.trigger("ajaxSend",[v,f]),f.beforeSend&&f.beforeSend.call(f.context,v,f)===!1)return f.global&&e.active--,void 0;if(!v.aborted){y=w.clk,y&&(b=y.name,b&&!y.disabled&&(f.extraData=f.extraData||{},f.extraData[b]=y.value,"image"==y.type&&(f.extraData[b+".x"]=w.clk_x,f.extraData[b+".y"]=w.clk_y)));var S=1,j=2,N=e("meta[name=csrf-token]").attr("content"),E=e("meta[name=csrf-param]").attr("content");E&&N&&(f.extraData=f.extraData||{},f.extraData[E]=N),f.forceSync?a():setTimeout(a,10);var C,D,_,A=50,L=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},F=e.parseJSON||function(e){return window.eval("("+e+")")},M=function(t,n,r){var i=t.getResponseHeader("content-type")||"",a="xml"===n||!n&&i.indexOf("xml")>=0,o=a?t.responseXML:t.responseText;return a&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),r&&r.dataFilter&&(o=r.dataFilter(o,n)),"string"==typeof o&&("json"===n||!n&&i.indexOf("json")>=0?o=F(o):("script"===n||!n&&i.indexOf("javascript")>=0)&&e.globalEval(o)),o}}}if(!this.length)return r("ajaxSubmit: skipping submit process - no element selected"),this;var o,s,l,u=this;"function"==typeof t&&(t={success:t}),o=this.attr("method"),s=this.attr("action"),l="string"==typeof s?e.trim(s):"",l=l||window.location.href||"",l&&(l=(l.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:l,success:e.ajaxSettings.success,type:o||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var c={};if(this.trigger("form-pre-serialize",[this,t,c]),c.veto)return r("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return r("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var f=t.traditional;void 0===f&&(f=e.ajaxSettings.traditional);var p,d=[],h=this.formToArray(t.semantic,d);if(t.data&&(t.extraData=t.data,p=e.param(t.data,f)),t.beforeSubmit&&t.beforeSubmit(h,this,t)===!1)return r("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[h,this,t,c]),c.veto)return r("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var m=e.param(h,f);p&&(m=m?m+"&"+p:p),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+m,t.data=null):t.data=m;var g=[];if(t.resetForm&&g.push(function(){u.resetForm()}),t.clearForm&&g.push(function(){u.clearForm(t.includeHidden)}),!t.dataType&&t.target){var v=t.success||function(){};g.push(function(n){var r=t.replaceTarget?"replaceWith":"html";e(t.target)[r](n).each(v,arguments)})}else t.success&&g.push(t.success);t.success=function(e,n,r){for(var i=t.context||t,a=0,o=g.length;o>a;a++)g[a].apply(i,[e,n,r||u,u])};var y=e("input:file:enabled[value]",this),b=y.length>0,x="multipart/form-data",T=u.attr("enctype")==x||u.attr("encoding")==x,w=i.fileapi&&i.formdata;r("fileAPI :"+w);var k=(b||T)&&!w;t.iframe!==!1&&(t.iframe||k)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){a(h)}):a(h):(b||T)&&w?n(h):e.ajax(t);for(var S=0;d.length>S;S++)d[S]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(i){if(i=i||{},i.delegation=i.delegation&&e.isFunction(e.fn.on),!i.delegation&&0===this.length){var a={s:this.selector,c:this.context};return!e.isReady&&a.s?(r("DOM not ready, queuing ajaxForm"),e(function(){e(a.s,a.c).ajaxForm(i)}),this):(r("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return i.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,n).on("submit.form-plugin",this.selector,i,t).on("click.form-plugin",this.selector,i,n),this):this.ajaxFormUnbind().bind("submit.form-plugin",i,t).bind("click.form-plugin",i,n)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,n){var r=[];if(0===this.length)return r;var a=this[0],o=t?a.getElementsByTagName("*"):a.elements;if(!o)return r;var s,l,u,c,f,p,d;for(s=0,p=o.length;p>s;s++)if(f=o[s],u=f.name)if(t&&a.clk&&"image"==f.type)f.disabled||a.clk!=f||(r.push({name:u,value:e(f).val(),type:f.type}),r.push({name:u+".x",value:a.clk_x},{name:u+".y",value:a.clk_y}));else if(c=e.fieldValue(f,!0),c&&c.constructor==Array)for(n&&n.push(f),l=0,d=c.length;d>l;l++)r.push({name:u,value:c[l]});else if(i.fileapi&&"file"==f.type&&!f.disabled){n&&n.push(f);var h=f.files;if(h.length)for(l=0;h.length>l;l++)r.push({name:u,value:h[l],type:f.type});else r.push({name:u,value:"",type:f.type})}else null!==c&&c!==void 0&&(n&&n.push(f),r.push({name:u,value:c,type:f.type,required:f.required}));if(!t&&a.clk){var m=e(a.clk),g=m[0];u=g.name,u&&!g.disabled&&"image"==g.type&&(r.push({name:u,value:m.val()}),r.push({name:u+".x",value:a.clk_x},{name:u+".y",value:a.clk_y}))}return r},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var n=[];return this.each(function(){var r=this.name;if(r){var i=e.fieldValue(this,t);if(i&&i.constructor==Array)for(var a=0,o=i.length;o>a;a++)n.push({name:r,value:i[a]});else null!==i&&i!==void 0&&n.push({name:this.name,value:i})}}),e.param(n)},e.fn.fieldValue=function(t){for(var n=[],r=0,i=this.length;i>r;r++){var a=this[r],o=e.fieldValue(a,t);null===o||void 0===o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(n,o):n.push(o))}return n},e.fieldValue=function(t,n){var r=t.name,i=t.type,a=t.tagName.toLowerCase();if(void 0===n&&(n=!0),n&&(!r||t.disabled||"reset"==i||"button"==i||("checkbox"==i||"radio"==i)&&!t.checked||("submit"==i||"image"==i)&&t.form&&t.form.clk!=t||"select"==a&&-1==t.selectedIndex))return null;if("select"==a){var o=t.selectedIndex;if(0>o)return null;for(var s=[],l=t.options,u="select-one"==i,c=u?o+1:l.length,f=u?o:0;c>f;f++){var p=l[f];if(p.selected){var d=p.value;if(d||(d=p.attributes&&p.attributes.value&&!p.attributes.value.specified?p.text:p.value),u)return d;s.push(d)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var n=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var r=this.type,i=this.tagName.toLowerCase();n.test(r)||"textarea"==i?this.value="":"checkbox"==r||"radio"==r?this.checked=!1:"select"==i?this.selectedIndex=-1:t&&(t===!0&&/hidden/.test(r)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var n=this.type;if("checkbox"==n||"radio"==n)this.checked=t;else if("option"==this.tagName.toLowerCase()){var r=e(this).parent("select");t&&r[0]&&"select-one"==r[0].type&&r.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1})(jQuery)}});