/*! lib(0.0.1) - JianGang Zhao <zhaojiangang@gmail.com> - 2013-09-18 15:10:21*/
define("lib/0.0.1/ajax_form",[],function(){return function(){(function(e){"use strict";function t(t){var a=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(this).ajaxSubmit(a))}function a(t){var a=t.target,r=e(a);if(!r.is(":submit,input:image")){var n=r.closest(":submit");if(0===n.length)return;a=n[0]}var i=this;if(i.clk=a,"image"==a.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=r.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-a.offsetLeft,i.clk_y=t.pageY-a.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function r(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData,e.fn.ajaxSubmit=function(t){function a(a){for(var r=new FormData,n=0;a.length>n;n++)r.append(a[n].name,a[n].value);if(t.extraData)for(var i in t.extraData)t.extraData.hasOwnProperty(i)&&r.append(i,t.extraData[i]);t.data=null;var o=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:"POST"});t.uploadProgress&&(o.xhr=function(){var e=jQuery.ajaxSettings.xhr();return e.upload&&(e.upload.onprogress=function(e){var a=0,r=e.loaded||e.position,n=e.total;e.lengthComputable&&(a=Math.ceil(100*(r/n))),t.uploadProgress(e,r,n,a)}),e}),o.data=null;var s=o.beforeSend;o.beforeSend=function(e,t){t.data=r,s&&s.call(this,e,t)},e.ajax(o)}function i(a){function n(e){var t=e.contentWindow?e.contentWindow.document:e.contentDocument?e.contentDocument:e.document;return t}function i(){function t(){try{var e=n(h).readyState;r("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(a){r("Server abort: ",a," (",a.name,")"),s(w),T&&clearTimeout(T),T=void 0}}var a=l.attr("target"),i=l.attr("action");j.setAttribute("target",p),o||j.setAttribute("method","POST"),i!=f.url&&j.setAttribute("action",f.url),f.skipEncodingOverride||o&&!/post/i.test(o)||l.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),f.timeout&&(T=setTimeout(function(){y=!0,s(k)},f.timeout));var u=[];try{if(f.extraData)for(var c in f.extraData)f.extraData.hasOwnProperty(c)&&u.push(e('<input type="hidden" name="'+c+'">').attr("value",f.extraData[c]).appendTo(j)[0]);f.iframeTarget||(v.appendTo("body"),h.attachEvent?h.attachEvent("onload",s):h.addEventListener("load",s,!1)),setTimeout(t,15),j.submit()}finally{j.setAttribute("action",i),a?j.setAttribute("target",a):l.removeAttr("target"),e(u).remove()}}function s(t){if(!g.aborted&&!M){try{E=n(h)}catch(a){r("cannot access response document: ",a),t=w}if(t===k&&g)return g.abort("timeout"),void 0;if(t==w&&g)return g.abort("server abort"),void 0;if(E&&E.location.href!=f.iframeSrc||y){h.detachEvent?h.detachEvent("onload",s):h.removeEventListener("load",s,!1);var i,o="success";try{if(y)throw"timeout";var u="xml"==f.dataType||E.XMLDocument||e.isXMLDoc(E);if(r("isXml="+u),!u&&window.opera&&(null===E.body||!E.body.innerHTML)&&--F)return r("requeing onLoad callback, DOM not available"),setTimeout(s,250),void 0;var l=E.body?E.body:E.documentElement;g.responseText=l?l.innerHTML:null,g.responseXML=E.XMLDocument?E.XMLDocument:E,u&&(f.dataType="xml"),g.getResponseHeader=function(e){var t={"content-type":f.dataType};return t[e]},l&&(g.status=Number(l.getAttribute("status"))||g.status,g.statusText=l.getAttribute("statusText")||g.statusText);var c=(f.dataType||"").toLowerCase(),d=/(json|script|text)/.test(c);if(d||f.textarea){var p=E.getElementsByTagName("textarea")[0];if(p)g.responseText=p.value,g.status=Number(p.getAttribute("status"))||g.status,g.statusText=p.getAttribute("statusText")||g.statusText;else if(d){var x=E.getElementsByTagName("pre")[0],b=E.getElementsByTagName("body")[0];x?g.responseText=x.textContent?x.textContent:x.innerText:b&&(g.responseText=b.textContent?b.textContent:b.innerText)}}else"xml"==c&&!g.responseXML&&g.responseText&&(g.responseXML=X(g.responseText));try{L=_(g,c,f)}catch(t){o="parsererror",g.error=i=t||o}}catch(t){r("error caught: ",t),o="error",g.error=i=t||o}g.aborted&&(r("upload aborted"),o=null),g.status&&(o=g.status>=200&&300>g.status||304===g.status?"success":"error"),"success"===o?(f.success&&f.success.call(f.context,L,"success",g),m&&e.event.trigger("ajaxSuccess",[g,f])):o&&(void 0===i&&(i=g.statusText),f.error&&f.error.call(f.context,g,o,i),m&&e.event.trigger("ajaxError",[g,f,i])),m&&e.event.trigger("ajaxComplete",[g,f]),m&&!--e.active&&e.event.trigger("ajaxStop"),f.complete&&f.complete.call(f.context,g,o),M=!0,f.timeout&&clearTimeout(T),setTimeout(function(){f.iframeTarget||v.remove(),g.responseXML=null},100)}}}var u,c,f,m,p,v,h,g,x,b,y,T,j=l[0],S=!!e.fn.prop;if(e(":input[name=submit],:input[id=submit]",j).length)return alert('Error: Form elements must not have name or id of "submit".'),void 0;if(a)for(c=0;d.length>c;c++)u=e(d[c]),S?u.prop("disabled",!1):u.removeAttr("disabled");if(f=e.extend(!0,{},e.ajaxSettings,t),f.context=f.context||f,p="jqFormIO"+(new Date).getTime(),f.iframeTarget?(v=e(f.iframeTarget),b=v.attr("name"),b?p=b:v.attr("name",p)):(v=e('<iframe name="'+p+'" src="'+f.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),h=v[0],g={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var a="timeout"===t?"timeout":"aborted";r("aborting upload... "+a),this.aborted=1,v.attr("src",f.iframeSrc),g.error=a,f.error&&f.error.call(f.context,g,a,t),m&&e.event.trigger("ajaxError",[g,f,a]),f.complete&&f.complete.call(f.context,g,a)}},m=f.global,m&&0===e.active++&&e.event.trigger("ajaxStart"),m&&e.event.trigger("ajaxSend",[g,f]),f.beforeSend&&f.beforeSend.call(f.context,g,f)===!1)return f.global&&e.active--,void 0;if(!g.aborted){x=j.clk,x&&(b=x.name,b&&!x.disabled&&(f.extraData=f.extraData||{},f.extraData[b]=x.value,"image"==x.type&&(f.extraData[b+".x"]=j.clk_x,f.extraData[b+".y"]=j.clk_y)));var k=1,w=2,D=e("meta[name=csrf-token]").attr("content"),A=e("meta[name=csrf-param]").attr("content");A&&D&&(f.extraData=f.extraData||{},f.extraData[A]=D),f.forceSync?i():setTimeout(i,10);var L,E,M,F=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},O=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,a,r){var n=t.getResponseHeader("content-type")||"",i="xml"===a||!a&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),r&&r.dataFilter&&(o=r.dataFilter(o,a)),"string"==typeof o&&("json"===a||!a&&n.indexOf("json")>=0?o=O(o):("script"===a||!a&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o}}}if(!this.length)return r("ajaxSubmit: skipping submit process - no element selected"),this;var o,s,u,l=this;"function"==typeof t&&(t={success:t}),o=this.attr("method"),s=this.attr("action"),u="string"==typeof s?e.trim(s):"",u=u||window.location.href||"",u&&(u=(u.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:u,success:e.ajaxSettings.success,type:o||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var c={};if(this.trigger("form-pre-serialize",[this,t,c]),c.veto)return r("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return r("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var f=t.traditional;void 0===f&&(f=e.ajaxSettings.traditional);var m,d=[],p=this.formToArray(t.semantic,d);if(t.data&&(t.extraData=t.data,m=e.param(t.data,f)),t.beforeSubmit&&t.beforeSubmit(p,this,t)===!1)return r("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[p,this,t,c]),c.veto)return r("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var v=e.param(p,f);m&&(v=v?v+"&"+m:m),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+v,t.data=null):t.data=v;var h=[];if(t.resetForm&&h.push(function(){l.resetForm()}),t.clearForm&&h.push(function(){l.clearForm(t.includeHidden)}),!t.dataType&&t.target){var g=t.success||function(){};h.push(function(a){var r=t.replaceTarget?"replaceWith":"html";e(t.target)[r](a).each(g,arguments)})}else t.success&&h.push(t.success);t.success=function(e,a,r){for(var n=t.context||t,i=0,o=h.length;o>i;i++)h[i].apply(n,[e,a,r||l,l])};var x=e("input:file:enabled[value]",this),b=x.length>0,y="multipart/form-data",T=l.attr("enctype")==y||l.attr("encoding")==y,j=n.fileapi&&n.formdata;r("fileAPI :"+j);var S=(b||T)&&!j;t.iframe!==!1&&(t.iframe||S)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){i(p)}):i(p):(b||T)&&j?a(p):e.ajax(t);for(var k=0;d.length>k;k++)d[k]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(r("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(r("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,a).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,a),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,a)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,a){var r=[];if(0===this.length)return r;var i=this[0],o=t?i.getElementsByTagName("*"):i.elements;if(!o)return r;var s,u,l,c,f,m,d;for(s=0,m=o.length;m>s;s++)if(f=o[s],l=f.name)if(t&&i.clk&&"image"==f.type)f.disabled||i.clk!=f||(r.push({name:l,value:e(f).val(),type:f.type}),r.push({name:l+".x",value:i.clk_x},{name:l+".y",value:i.clk_y}));else if(c=e.fieldValue(f,!0),c&&c.constructor==Array)for(a&&a.push(f),u=0,d=c.length;d>u;u++)r.push({name:l,value:c[u]});else if(n.fileapi&&"file"==f.type&&!f.disabled){a&&a.push(f);var p=f.files;if(p.length)for(u=0;p.length>u;u++)r.push({name:l,value:p[u],type:f.type});else r.push({name:l,value:"",type:f.type})}else null!==c&&c!==void 0&&(a&&a.push(f),r.push({name:l,value:c,type:f.type,required:f.required}));if(!t&&i.clk){var v=e(i.clk),h=v[0];l=h.name,l&&!h.disabled&&"image"==h.type&&(r.push({name:l,value:v.val()}),r.push({name:l+".x",value:i.clk_x},{name:l+".y",value:i.clk_y}))}return r},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var a=[];return this.each(function(){var r=this.name;if(r){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)a.push({name:r,value:n[i]});else null!==n&&n!==void 0&&a.push({name:this.name,value:n})}}),e.param(a)},e.fn.fieldValue=function(t){for(var a=[],r=0,n=this.length;n>r;r++){var i=this[r],o=e.fieldValue(i,t);null===o||void 0===o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(a,o):a.push(o))}return a},e.fieldValue=function(t,a){var r=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===a&&(a=!0),a&&(!r||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,l="select-one"==n,c=l?o+1:u.length,f=l?o:0;c>f;f++){var m=u[f];if(m.selected){var d=m.value;if(d||(d=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),l)return d;s.push(d)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var a=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var r=this.type,n=this.tagName.toLowerCase();a.test(r)||"textarea"==n?this.value="":"checkbox"==r||"radio"==r?this.checked=!1:"select"==n?this.selectedIndex=-1:t&&(t===!0&&/hidden/.test(r)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var a=this.type;if("checkbox"==a||"radio"==a)this.checked=t;else if("option"==this.tagName.toLowerCase()){var r=e(this).parent("select");t&&r[0]&&"select-one"==r[0].type&&r.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1})(jQuery)}});