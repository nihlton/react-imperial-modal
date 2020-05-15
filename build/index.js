module.exports=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){e.exports=require("react")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ModalContext=void 0;const o=n(0),r=e=>{throw new Error("Attempted to call useModal outside of modal context. Make sure your component is inside ModalProvider.")};t.ModalContext=o.createContext({addModal:r,removeModal:r})},function(e,t,n){"use strict";var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n),Object.defineProperty(e,o,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),r=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||t.hasOwnProperty(n)||o(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),r(n(3),t),r(n(5),t)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ModalProvider=void 0;const o=n(0),r=n(1),l=n(4),{useRef:a,useState:d,useCallback:s,useMemo:i}=o,u={bodyOpenClass:"modal-open",modalShadeClass:"modal-shade",modalContainerClass:"modals",modalClass:"modal"},c=[];t.ModalProvider=({children:e,config:t={},appElement:n=(()=>{})})=>{const[f,m]=d([]),b=Object.assign(Object.assign({},u),t),v=a(),p=s(e=>{c.push(document.activeElement),0===f.length&&(()=>{const e=n()||(null==v?void 0:v.current);document.documentElement.style.overflow="hidden",document.body.classList.add(b.bodyOpenClass),e.setAttribute("aria-hidden","true")})(),f.includes(e)?console.warn("tried to open a modal that was already opened"):m(t=>[...t,e])},[f]),y=s(e=>{const t=c.pop();document.documentElement.contains(t)&&t.focus(),1===f.length&&(()=>{var e;const t=n()||(null==v?void 0:v.current);document.documentElement.style.overflow="",null===(e=null===document||void 0===document?void 0:document.body)||void 0===e||e.classList.remove(b.bodyOpenClass),t.removeAttribute("aria-hidden")})(),f.includes(e)?m(t=>{const n=[...t];return n.splice(n.indexOf(e),1),n}):console.warn("tried to close a modal that isn't open")},[f]),x=i(()=>({addModal:p,removeModal:y}),[f]),M=e=>{e.resolver(),y(e)};return o.createElement(r.ModalContext.Provider,{value:x},o.createElement(o.Fragment,null,o.createElement("div",{ref:v},e),f.length>0&&o.createElement("div",{className:b.modalContainerClass,onKeyDown:e=>{"Escape"===e.key&&M(f.slice(-1)[0])}},f.map((e,t)=>o.createElement(l.default,{key:"modal-"+t,className:b.modalClass,label:e.label,role:e.role},e.modal)),o.createElement("div",{className:b.modalShadeClass,onClick:()=>M(f.slice(-1)[0])}))))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),{useRef:r,useEffect:l}=o,a=["a[href]:not([tabindex='-1'])","area[href]:not([tabindex='-1'])","input:not([disabled]):not([tabindex='-1'])","select:not([disabled]):not([tabindex='-1'])","textarea:not([disabled]):not([tabindex='-1'])","button:not([disabled]):not([tabindex='-1'])","iframe:not([tabindex='-1'])","[tabindex]:not([tabindex='-1'])","[contentEditable=true]:not([tabindex='-1'])"].join(", ");t.default=function(e){const{className:t,children:n,label:d,role:s}=e,i=r();l(()=>{u([0,1])},[i]);const u=e=>{var t;const n=(Array.from(null===(t=null==i?void 0:i.current)||void 0===t?void 0:t.querySelectorAll(a))||[]).slice(...e)[0];n&&n.focus()};return o.createElement(o.Fragment,null,o.createElement("div",{tabIndex:0,onFocus:()=>u([-1])}),o.createElement("div",{role:s,"aria-label":d,ref:i,className:t},n),o.createElement("div",{tabIndex:0,onFocus:()=>u([0,1])}))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useModal=t.usePrevious=void 0;const o=n(0),r=n(1);function l(e){const t=o.useRef();return o.useEffect(()=>{t.current=e},[e]),t.current}t.usePrevious=l,t.useModal=()=>{const[e,t]=o.useState([]),n=l(e)||[],a=o.useContext(r.ModalContext);o.useEffect(()=>{const t=e.filter(e=>!n.includes(e)),o=n.filter(t=>!e.includes(t));t.forEach(e=>{a.addModal(e)}),o.forEach(e=>{a.removeModal(e)})},[e]);return[(e,n="",o="dialog")=>{let r;const l=new Promise(e=>{r=e}),a={modal:e,resolver:r,label:n,role:o};return t(e=>[...e,a]),l},(e,n)=>{t(t=>{const o=t.find(t=>t.modal===e),r=[...t];return r.splice(r.indexOf(o),1),o.resolver(n),r})}]}}]);
//# sourceMappingURL=index.js.map