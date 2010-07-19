/*
Copyright 2010, KISSY UI Library v1.0.8
MIT Licensed
build: 871 Jul 19 08:51
*/
KISSY.add("anim-easing",function(h,q){var o=Math,n=o.PI,r=o.pow,j=o.sin,t=o.abs,s=o.asin,p={easeNone:function(a,e,c,b){return c*a/b+e},easeIn:function(a,e,c,b){return c*(a/=b)*a+e},easeOut:function(a,e,c,b){return-c*(a/=b)*(a-2)+e},easeBoth:function(a,e,c,b){return(a/=b/2)<1?c/2*a*a+e:-c/2*(--a*(a-2)-1)+e},easeInStrong:function(a,e,c,b){return c*(a/=b)*a*a*a+e},easeOutStrong:function(a,e,c,b){return-c*((a=a/b-1)*a*a*a-1)+e},easeBothStrong:function(a,e,c,b){return(a/=b/2)<1?c/2*a*a*a*a+e:-c/2*((a-=
2)*a*a*a-2)+e},elasticIn:function(a,e,c,b,d,f){if(a===0)return e;if((a/=b)===1)return e+c;f||(f=b*0.3);if(!d||d<t(c)){d=c;c=f/4}else c=f/(2*n)*s(c/d);return-(d*r(2,10*(a-=1))*j((a*b-c)*2*n/f))+e},elasticOut:function(a,e,c,b,d,f){var g;if(a===0)return e;if((a/=b)===1)return e+c;f||(f=b*0.3);if(!d||d<t(c)){d=c;g=f/4}else g=f/(2*n)*s(c/d);return d*r(2,-10*a)*j((a*b-g)*2*n/f)+c+e},elasticBoth:function(a,e,c,b,d,f){var g;if(a===0)return e;if((a/=b/2)===2)return e+c;f||(f=b*0.3*1.5);if(!d||d<t(c)){d=c;
g=f/4}else g=f/(2*n)*s(c/d);if(a<1)return-0.5*d*r(2,10*(a-=1))*j((a*b-g)*2*n/f)+e;return d*r(2,-10*(a-=1))*j((a*b-g)*2*n/f)*0.5+c+e},backIn:function(a,e,c,b,d){if(d===q)d=1.70158;if(a===b)a-=0.0010;return c*(a/=b)*a*((d+1)*a-d)+e},backOut:function(a,e,c,b,d){if(d===q)d=1.70158;return c*((a=a/b-1)*a*((d+1)*a+d)+1)+e},backBoth:function(a,e,c,b,d){if(d===q)d=1.70158;if((a/=b/2)<1)return c/2*a*a*(((d*=1.525)+1)*a-d)+e;return c/2*((a-=2)*a*(((d*=1.525)+1)*a+d)+2)+e},bounceIn:function(a,e,c,b){return c-
p.bounceOut(b-a,0,c,b)+e},bounceOut:function(a,e,c,b){if(!((a/=b)<1/2.75))if(a<2/2.75)a-=1.5/2.75;else if(a<2.5/2.75)a-=2.25/2.75;return c*(7.5625*(a-=2.625/2.75)*a+0.984375)+e},bounceBoth:function(a,e,c,b){if(a<b/2)return p.bounceIn(a*2,0,c,b)*0.5+e;return p.bounceOut(a*2-b,0,c,b)*0.5+c*0.5+e}};h.Easing=p});
KISSY.add("anim",function(h){function q(b,d,f,g,k){var i=h.isPlainObject(f);d=d;if(b=h.get(b)){this.domEl=b;if(h.isPlainObject(d))d=h.param(d,";").replace(/=/g,":");this.props=o(d);if(i)b=h.merge(c,f);else{b=h.clone(c);f&&(b.duration=p(f,10)||1);h.isString(g)&&(g=s[g]);h.isFunction(g)&&(b.easing=g);h.isFunction(k)&&(b.complete=k)}this.config=b;var m=o(e);f=el.currentStyle?el.currentStyle:getComputedStyle(el,null);var l,v={},w=+new Date,x=opts.duration||200,y=w+x,z;g=opts.easing||function(u){return-Math.cos(u*
Math.PI)/2+0.5};for(l in m)v[l]=n(f[l]);z=setInterval(function(){var u=+new Date,A=u>y?1:(u-w)/x;for(l in m)el.style[l]=m[l].f(v[l].v,m[l].v,g(A))+m[l].u;if(u>y){clearInterval(z);opts.after&&opts.after();after&&setTimeout(after,1)}},10)}}function o(b){var d={},f=e.length,g;a.innerHTML='<div style="'+b+'"></div>';for(b=a.childNodes[0].style;f--;)if(g=b[e[f]])d[e[f]]=n(g);return d}function n(b){var d=p(b);b=b.replace(/^[\-\d\.]+/,"");return isNaN(d)?{v:b,f:t,u:""}:{v:d,f:r,u:b}}function r(b,d,f){return(b+
(d-b)*f).toFixed(3)}function j(b,d,f){return b.substr(d,f||1)}function t(b,d,f){for(var g=2,k,i,m=[],l=[];k=3,i=arguments[g-1],g--;)if(j(i,0)=="r")for(i=i.match(/\d+/g);k--;)m.push(~~i[k]);else{if(i.length==4)i="#"+j(i,1)+j(i,1)+j(i,2)+j(i,2)+j(i,3)+j(i,3);for(;k--;)m.push(parseInt(j(i,1+k*2,2),16))}for(;k--;){g=~~(m[k+3]+(m[k]-m[k+3])*f);l.push(g<0?0:g>255?255:g)}return"rgb("+l.join(",")+")"}var s=h.Easing,p=parseFloat,a=h.DOM.create("<div>"),e="backgroundColor borderBottomColor borderBottomWidth borderLeftColor borderLeftWidth borderRightColor borderRightWidth borderSpacing borderTopColor borderTopWidth bottom color fontSize fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop maxHeight maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft paddingRight paddingTop right textIndent top width wordSpacing zIndex".split(" "),
c={duration:1,easing:s.easeNone,queue:true};h.augment(q,h.EventTarget,{_init:function(){}});h.Anim=q});