pointman.define("tyv/main",function(){function n(n,t){var e,o,m=n.getElementsByTagName("input");for(e=0;e<m.length;e++)if(o=m[e],o.getAttribute("name")==t)return o;return o=i.createElement("input"),o.type="hidden",o.name=t,n.appendChild(o),o}function t(t){var e=i.getElementById(t);if(e){var o=n(e,"_ty_token");o.value=pointman.getToken()}}var e,o={},i=document;return o.init=function(n){e=n,n&&n.common&&n.common.FormId&&pointman.util.domReady(function(){t(n.common.FormId)})},o});