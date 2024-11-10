const h={context:void 0,registry:void 0,effects:void 0,done:!1,getContextId(){return ae(this.context.count)},getNextContextId(){return ae(this.context.count++)}};function ae(e){const t=String(e),n=t.length-1;return h.context.id+(n?String.fromCharCode(96+n):"")+t}function k(e){h.context=e}const Le=(e,t)=>e===t,se=Symbol("solid-proxy"),je=typeof Proxy=="function",G={equals:Le};let B=null,Ie=Pe;const T=1,R=2,Se={owned:null,cleanups:null,context:null,owner:null},te={};var d=null;let u=null,Ve=null,y=null,A=null,x=null,Q=0;function xe(e,t){const n=y,s=d,i=e.length===0,r=t===void 0?s:t,l=i?Se:{owned:null,cleanups:null,context:r?r.context:null,owner:r},o=i?e:()=>e(()=>O(()=>L(l)));d=l,y=null;try{return E(o,!0)}finally{y=n,d=s}}function $(e,t){t=t?Object.assign({},G,t):G;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(u&&u.running&&u.sources.has(n)?i=i(n.tValue):i=i(n.value)),Ne(n,i));return[Oe.bind(n),s]}function de(e,t,n){const s=z(e,t,!0,T);K(s)}function V(e,t,n){const s=z(e,t,!1,T);K(s)}function N(e,t,n){n=n?Object.assign({},G,n):G;const s=z(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,K(s),Oe.bind(s)}function qe(e){return e&&typeof e=="object"&&"then"in e}function ve(e,t,n){let s,i,r;arguments.length===2&&typeof t=="object"||arguments.length===1?(s=!0,i=e,r={}):(s=e,i=t,r={});let l=null,o=te,f=null,c=!1,a=!1,g="initialValue"in r,w=typeof s=="function"&&N(s);const b=new Set,[C,P]=(r.storage||$)(r.initialValue),[j,I]=$(void 0),[_,J]=$(void 0,{equals:!1}),[fe,ue]=$(g?"ready":"unresolved");h.context&&(f=h.getNextContextId(),r.ssrLoadFrom==="initial"?o=r.initialValue:h.load&&h.has(f)&&(o=h.load(f)));function q(p,m,S,v){return l===p&&(l=null,v!==void 0&&(g=!0),(p===o||m===o)&&r.onHydrated&&queueMicrotask(()=>r.onHydrated(v,{value:m})),o=te,u&&p&&c?(u.promises.delete(p),c=!1,E(()=>{u.running=!0,ce(m,S)},!1)):ce(m,S)),m}function ce(p,m){E(()=>{m===void 0&&P(()=>p),ue(m!==void 0?"errored":g?"ready":"unresolved"),I(m);for(const S of b.keys())S.decrement();b.clear()},!1)}function Z(){const p=D&&Ee(D),m=C(),S=j();if(S!==void 0&&!l)throw S;return y&&!y.user&&p&&de(()=>{_(),l&&(p.resolved&&u&&c?u.promises.add(l):b.has(p)||(p.increment(),b.add(p)))}),m}function ee(p=!0){if(p!==!1&&a)return;a=!1;const m=w?w():s;if(c=u&&u.running,m==null||m===!1){q(l,O(C));return}u&&l&&u.promises.delete(l);const S=o!==te?o:O(()=>i(m,{value:C(),refetching:p}));return qe(S)?(l=S,"value"in S?(S.status==="success"?q(l,S.value,void 0,m):q(l,void 0,ie(S.value),m),S):(a=!0,queueMicrotask(()=>a=!1),E(()=>{ue(g?"refreshing":"pending"),J()},!1),S.then(v=>q(S,v,void 0,m),v=>q(S,void 0,ie(v),m)))):(q(l,S,void 0,m),S)}return Object.defineProperties(Z,{state:{get:()=>fe()},error:{get:()=>j()},loading:{get(){const p=fe();return p==="pending"||p==="refreshing"}},latest:{get(){if(!g)return Z();const p=j();if(p&&!l)throw p;return C()}}}),w?de(()=>ee(!1)):ee(!1),[Z,{refetch:ee,mutate:P}]}function pt(e){return E(e,!1)}function O(e){if(y===null)return e();const t=y;y=null;try{return e()}finally{y=t}}function bt(e,t,n){const s=Array.isArray(e);let i,r=n&&n.defer;return l=>{let o;if(s){o=Array(e.length);for(let c=0;c<e.length;c++)o[c]=e[c]()}else o=e();if(r)return r=!1,l;const f=O(()=>t(o,i,l));return i=o,f}}function Ae(e){return d===null||(d.cleanups===null?d.cleanups=[e]:d.cleanups.push(e)),e}function Fe(e,t){B||(B=Symbol("error")),d=z(void 0,void 0,!0),d.context={...d.context,[B]:[t]},u&&u.running&&u.sources.add(d);try{return e()}catch(n){X(n)}finally{d=d.owner}}function Me(){return d}function mt(e,t){const n=d,s=y;d=e,y=null;try{return E(t,!0)}catch(i){X(i)}finally{d=n,y=s}}function St(e){if(u&&u.running)return e(),u.done;const t=y,n=d;return Promise.resolve().then(()=>{y=t,d=n;let s;return D&&(s=u||(u={sources:new Set,effects:[],promises:new Set,disposed:new Set,queue:new Set,running:!0}),s.done||(s.done=new Promise(i=>s.resolve=i)),s.running=!0),E(e,!1),y=d=null,s?s.done:void 0})}const[xt,he]=$(!1);function Ue(e){x.push.apply(x,e),e.length=0}function Ce(e,t){const n=Symbol("context");return{id:n,Provider:De(n),defaultValue:e}}function Ee(e){let t;return d&&d.context&&(t=d.context[e.id])!==void 0?t:e.defaultValue}function _e(e){const t=N(e),n=N(()=>re(t()));return n.toArray=()=>{const s=n();return Array.isArray(s)?s:s!=null?[s]:[]},n}let D;function Be(){return D||(D=Ce())}function Oe(){const e=u&&u.running;if(this.sources&&(e?this.tState:this.state))if((e?this.tState:this.state)===T)K(this);else{const t=A;A=null,E(()=>W(this),!1),A=t}if(y){const t=this.observers?this.observers.length:0;y.sources?(y.sources.push(this),y.sourceSlots.push(t)):(y.sources=[this],y.sourceSlots=[t]),this.observers?(this.observers.push(y),this.observerSlots.push(y.sources.length-1)):(this.observers=[y],this.observerSlots=[y.sources.length-1])}return e&&u.sources.has(this)?this.tValue:this.value}function Ne(e,t,n){let s=u&&u.running&&u.sources.has(e)?e.tValue:e.value;if(!e.comparator||!e.comparator(s,t)){if(u){const i=u.running;(i||!n&&u.sources.has(e))&&(u.sources.add(e),e.tValue=t),i||(e.value=t)}else e.value=t;e.observers&&e.observers.length&&E(()=>{for(let i=0;i<e.observers.length;i+=1){const r=e.observers[i],l=u&&u.running;l&&u.disposed.has(r)||((l?!r.tState:!r.state)&&(r.pure?A.push(r):x.push(r),r.observers&&$e(r)),l?r.tState=T:r.state=T)}if(A.length>1e6)throw A=[],new Error},!1)}return t}function K(e){if(!e.fn)return;L(e);const t=Q;ge(e,u&&u.running&&u.sources.has(e)?e.tValue:e.value,t),u&&!u.running&&u.sources.has(e)&&queueMicrotask(()=>{E(()=>{u&&(u.running=!0),y=d=e,ge(e,e.tValue,t),y=d=null},!1)})}function ge(e,t,n){let s;const i=d,r=y;y=d=e;try{s=e.fn(t)}catch(l){return e.pure&&(u&&u.running?(e.tState=T,e.tOwned&&e.tOwned.forEach(L),e.tOwned=void 0):(e.state=T,e.owned&&e.owned.forEach(L),e.owned=null)),e.updatedAt=n+1,X(l)}finally{y=r,d=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Ne(e,s,!0):u&&u.running&&e.pure?(u.sources.add(e),e.tValue=s):e.value=s,e.updatedAt=n)}function z(e,t,n,s=T,i){const r={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:d,context:d?d.context:null,pure:n};return u&&u.running&&(r.state=0,r.tState=s),d===null||d!==Se&&(u&&u.running&&d.pure?d.tOwned?d.tOwned.push(r):d.tOwned=[r]:d.owned?d.owned.push(r):d.owned=[r]),r}function Te(e){const t=u&&u.running;if((t?e.tState:e.state)===0)return;if((t?e.tState:e.state)===R)return W(e);if(e.suspense&&O(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<Q);){if(t&&u.disposed.has(e))return;(t?e.tState:e.state)&&n.push(e)}for(let s=n.length-1;s>=0;s--){if(e=n[s],t){let i=e,r=n[s+1];for(;(i=i.owner)&&i!==r;)if(u.disposed.has(i))return}if((t?e.tState:e.state)===T)K(e);else if((t?e.tState:e.state)===R){const i=A;A=null,E(()=>W(e,n[0]),!1),A=i}}}function E(e,t){if(A)return e();let n=!1;t||(A=[]),x?n=!0:x=[],Q++;try{const s=e();return Re(n),s}catch(s){n||(x=null),A=null,X(s)}}function Re(e){if(A&&(Pe(A),A=null),e)return;let t;if(u){if(!u.promises.size&&!u.queue.size){const s=u.sources,i=u.disposed;x.push.apply(x,u.effects),t=u.resolve;for(const r of x)"tState"in r&&(r.state=r.tState),delete r.tState;u=null,E(()=>{for(const r of i)L(r);for(const r of s){if(r.value=r.tValue,r.owned)for(let l=0,o=r.owned.length;l<o;l++)L(r.owned[l]);r.tOwned&&(r.owned=r.tOwned),delete r.tValue,delete r.tOwned,r.tState=0}he(!1)},!1)}else if(u.running){u.running=!1,u.effects.push.apply(u.effects,x),x=null,he(!0);return}}const n=x;x=null,n.length&&E(()=>Ie(n),!1),t&&t()}function Pe(e){for(let t=0;t<e.length;t++)Te(e[t])}function W(e,t){const n=u&&u.running;n?e.tState=0:e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];if(i.sources){const r=n?i.tState:i.state;r===T?i!==t&&(!i.updatedAt||i.updatedAt<Q)&&Te(i):r===R&&W(i,t)}}}function $e(e){const t=u&&u.running;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(t?!s.tState:!s.state)&&(t?s.tState=R:s.state=R,s.pure?A.push(s):x.push(s),s.observers&&$e(s))}}function L(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const r=i.pop(),l=n.observerSlots.pop();s<i.length&&(r.sourceSlots[l]=s,i[s]=r,n.observerSlots[s]=l)}}if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)L(e.tOwned[t]);delete e.tOwned}if(u&&u.running&&e.pure)ke(e,!0);else if(e.owned){for(t=e.owned.length-1;t>=0;t--)L(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}u&&u.running?e.tState=0:e.state=0}function ke(e,t){if(t||(e.tState=0,u.disposed.add(e)),e.owned)for(let n=0;n<e.owned.length;n++)ke(e.owned[n])}function ie(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function ye(e,t,n){try{for(const s of t)s(e)}catch(s){X(s,n&&n.owner||null)}}function X(e,t=d){const n=B&&t&&t.context&&t.context[B],s=ie(e);if(!n)throw s;x?x.push({fn(){ye(s,n,t)},state:T}):ye(s,n,t)}function re(e){if(typeof e=="function"&&!e.length)return re(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const s=re(e[n]);Array.isArray(s)?t.push.apply(t,s):t.push(s)}return t}return e}function De(e,t){return function(s){let i;return V(()=>i=O(()=>(d.context={...d.context,[e]:s.value},_e(()=>s.children))),void 0),i}}function He(e,t){return O(()=>e(t||{}))}function Y(){return!0}const Ke={get(e,t,n){return t===se?n:e.get(t)},has(e,t){return t===se?!0:e.has(t)},set:Y,deleteProperty:Y,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:Y,deleteProperty:Y}},ownKeys(e){return e.keys()}};function ne(e){return(e=typeof e=="function"?e():e)?e:{}}function Xe(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function At(...e){let t=!1;for(let l=0;l<e.length;l++){const o=e[l];t=t||!!o&&se in o,e[l]=typeof o=="function"?(t=!0,N(o)):o}if(je&&t)return new Proxy({get(l){for(let o=e.length-1;o>=0;o--){const f=ne(e[o])[l];if(f!==void 0)return f}},has(l){for(let o=e.length-1;o>=0;o--)if(l in ne(e[o]))return!0;return!1},keys(){const l=[];for(let o=0;o<e.length;o++)l.push(...Object.keys(ne(e[o])));return[...new Set(l)]}},Ke);const n={},s=Object.create(null);for(let l=e.length-1;l>=0;l--){const o=e[l];if(!o)continue;const f=Object.getOwnPropertyNames(o);for(let c=f.length-1;c>=0;c--){const a=f[c];if(a==="__proto__"||a==="constructor")continue;const g=Object.getOwnPropertyDescriptor(o,a);if(!s[a])s[a]=g.get?{enumerable:!0,configurable:!0,get:Xe.bind(n[a]=[g.get.bind(o)])}:g.value!==void 0?g:void 0;else{const w=n[a];w&&(g.get?w.push(g.get.bind(o)):g.value!==void 0&&w.push(()=>g.value))}}}const i={},r=Object.keys(s);for(let l=r.length-1;l>=0;l--){const o=r[l],f=s[o];f&&f.get?Object.defineProperty(i,o,f):i[o]=f?f.value:void 0}return i}function Ct(e){let t,n;const s=i=>{const r=h.context;if(r){const[o,f]=$();h.count||(h.count=0),h.count++,(n||(n=e())).then(c=>{!h.done&&k(r),h.count--,f(()=>c.default),k()}),t=o}else if(!t){const[o]=ve(()=>(n||(n=e())).then(f=>f.default));t=o}let l;return N(()=>(l=t())?O(()=>{if(!r||h.done)return l(i);const o=h.context;k(r);const f=l(i);return k(o),f}):"")};return s.preload=()=>n||((n=e()).then(i=>t=()=>i.default),n),s}let Ye=0;function Et(){return h.context?h.getNextContextId():`cl-${Ye++}`}const Ge=e=>`Stale read from <${e}>.`;function Ot(e){const t=e.keyed,n=N(()=>e.when,void 0,{equals:(s,i)=>t?s===i:!s==!i});return N(()=>{const s=n();if(s){const i=e.children;return typeof i=="function"&&i.length>0?O(()=>i(t?s:()=>{if(!O(n))throw Ge("Show");return e.when})):i}return e.fallback},void 0,void 0)}let M;function Nt(){M&&[...M].forEach(e=>e())}function Tt(e){let t;h.context&&h.load&&(t=h.load(h.getContextId()));const[n,s]=$(t,void 0);return M||(M=new Set),M.add(s),Ae(()=>M.delete(s)),N(()=>{let i;if(i=n()){const r=e.fallback;return typeof r=="function"&&r.length?O(()=>r(i,()=>s())):r}return Fe(()=>e.children,s)},void 0,void 0)}const We=Ce();function Pt(e){let t=0,n,s,i,r,l;const[o,f]=$(!1),c=Be(),a={increment:()=>{++t===1&&f(!0)},decrement:()=>{--t===0&&f(!1)},inFallback:o,effects:[],resolved:!1},g=Me();if(h.context&&h.load){const C=h.getContextId();let P=h.load(C);if(P&&(typeof P!="object"||P.status!=="success"?i=P:h.gather(C)),i&&i!=="$$f"){const[j,I]=$(void 0,{equals:!1});r=j,i.then(()=>{if(h.done)return I();h.gather(C),k(s),I(),k()},_=>{l=_,I()})}}const w=Ee(We);w&&(n=w.register(a.inFallback));let b;return Ae(()=>b&&b()),He(c.Provider,{value:a,get children(){return N(()=>{if(l)throw l;if(s=h.context,r)return r(),r=void 0;s&&i==="$$f"&&k();const C=N(()=>e.children);return N(P=>{const j=a.inFallback(),{showContent:I=!0,showFallback:_=!0}=n?n():{};if((!j||i&&i!=="$$f")&&I)return a.resolved=!0,b&&b(),b=s=i=void 0,Ue(a.effects),C();if(_)return b?P:xe(J=>(b=J,s&&(k({id:s.id+"F",count:0}),s=void 0),e.fallback),g)})})}})}const Qe=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],ze=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Qe]),Je=new Set(["innerHTML","textContent","innerText","children"]),Ze=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),et=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function tt(e,t){const n=et[e];return typeof n=="object"?n[t]?n.$:void 0:n}const nt=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),st={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function it(e,t,n){let s=n.length,i=t.length,r=s,l=0,o=0,f=t[i-1].nextSibling,c=null;for(;l<i||o<r;){if(t[l]===n[o]){l++,o++;continue}for(;t[i-1]===n[r-1];)i--,r--;if(i===l){const a=r<s?o?n[o-1].nextSibling:n[r-o]:f;for(;o<r;)e.insertBefore(n[o++],a)}else if(r===o)for(;l<i;)(!c||!c.has(t[l]))&&t[l].remove(),l++;else if(t[l]===n[r-1]&&n[o]===t[i-1]){const a=t[--i].nextSibling;e.insertBefore(n[o++],t[l++].nextSibling),e.insertBefore(n[--r],a),t[i]=n[r]}else{if(!c){c=new Map;let g=o;for(;g<r;)c.set(n[g],g++)}const a=c.get(t[l]);if(a!=null)if(o<a&&a<r){let g=l,w=1,b;for(;++g<i&&g<r&&!((b=c.get(t[g]))==null||b!==a+w);)w++;if(w>a-o){const C=t[l];for(;o<a;)e.insertBefore(n[o++],C)}else e.replaceChild(n[o++],t[l++])}else l++;else t[l++].remove()}}}const we="_$DX_DELEGATE";function $t(e,t,n,s={}){let i;return xe(r=>{i=r,t===document?e():ht(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function kt(e,t,n){let s;const i=()=>{const l=document.createElement("template");return l.innerHTML=e,n?l.content.firstChild.firstChild:l.content.firstChild},r=t?()=>O(()=>document.importNode(s||(s=i()),!0)):()=>(s||(s=i())).cloneNode(!0);return r.cloneNode=r,r}function rt(e,t=window.document){const n=t[we]||(t[we]=new Set);for(let s=0,i=e.length;s<i;s++){const r=e[s];n.has(r)||(n.add(r),t.addEventListener(r,wt))}}function oe(e,t,n){U(e)||(n==null?e.removeAttribute(t):e.setAttribute(t,n))}function ot(e,t,n,s){U(e)||(s==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,s))}function lt(e,t,n){U(e)||(n?e.setAttribute(t,""):e.removeAttribute(t))}function ft(e,t){U(e)||(t==null?e.removeAttribute("class"):e.className=t)}function ut(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=r=>i.call(e,n[1],r))}else e.addEventListener(t,n,typeof n!="function"&&n)}function ct(e,t,n={}){const s=Object.keys(t||{}),i=Object.keys(n);let r,l;for(r=0,l=i.length;r<l;r++){const o=i[r];!o||o==="undefined"||t[o]||(pe(e,o,!1),delete n[o])}for(r=0,l=s.length;r<l;r++){const o=s[r],f=!!t[o];!o||o==="undefined"||n[o]===f||!f||(pe(e,o,!0),n[o]=f)}return n}function at(e,t,n){if(!t)return n?oe(e,"style"):t;const s=e.style;if(typeof t=="string")return s.cssText=t;typeof n=="string"&&(s.cssText=n=void 0),n||(n={}),t||(t={});let i,r;for(r in n)t[r]==null&&s.removeProperty(r),delete n[r];for(r in t)i=t[r],i!==n[r]&&(s.setProperty(r,i),n[r]=i);return n}function Lt(e,t={},n,s){const i={};return s||V(()=>i.children=H(e,t.children,i.children)),V(()=>typeof t.ref=="function"&&dt(t.ref,e)),V(()=>gt(e,t,n,!0,i,!0)),i}function dt(e,t,n){return O(()=>e(t,n))}function ht(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return H(e,t,s,n);V(i=>H(e,t(),i,n),s)}function gt(e,t,n,s,i={},r=!1){t||(t={});for(const l in i)if(!(l in t)){if(l==="children")continue;i[l]=be(e,l,null,i[l],n,r,t)}for(const l in t){if(l==="children")continue;const o=t[l];i[l]=be(e,l,o,i[l],n,r,t)}}function U(e){return!!h.context&&!h.done&&(!e||e.isConnected)}function yt(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function pe(e,t,n){const s=t.trim().split(/\s+/);for(let i=0,r=s.length;i<r;i++)e.classList.toggle(s[i],n)}function be(e,t,n,s,i,r,l){let o,f,c,a,g;if(t==="style")return at(e,n,s);if(t==="classList")return ct(e,n,s);if(n===s)return s;if(t==="ref")r||n(e);else if(t.slice(0,3)==="on:"){const w=t.slice(3);s&&e.removeEventListener(w,s,typeof s!="function"&&s),n&&e.addEventListener(w,n,typeof n!="function"&&n)}else if(t.slice(0,10)==="oncapture:"){const w=t.slice(10);s&&e.removeEventListener(w,s,!0),n&&e.addEventListener(w,n,!0)}else if(t.slice(0,2)==="on"){const w=t.slice(2).toLowerCase(),b=nt.has(w);if(!b&&s){const C=Array.isArray(s)?s[0]:s;e.removeEventListener(w,C)}(b||n)&&(ut(e,w,n,b),b&&rt([w]))}else if(t.slice(0,5)==="attr:")oe(e,t.slice(5),n);else if(t.slice(0,5)==="bool:")lt(e,t.slice(5),n);else if((g=t.slice(0,5)==="prop:")||(c=Je.has(t))||!i&&((a=tt(t,e.tagName))||(f=ze.has(t)))||(o=e.nodeName.includes("-")||"is"in l)){if(g)t=t.slice(5),f=!0;else if(U(e))return n;t==="class"||t==="className"?ft(e,n):o&&!f&&!c?e[yt(t)]=n:e[a||t]=n}else{const w=i&&t.indexOf(":")>-1&&st[t.split(":")[0]];w?ot(e,w,t,n):oe(e,Ze[t]||t,n)}return n}function wt(e){if(h.registry&&h.events&&h.events.find(([f,c])=>c===e))return;let t=e.target;const n=`$$${e.type}`,s=e.target,i=e.currentTarget,r=f=>Object.defineProperty(e,"target",{configurable:!0,value:f}),l=()=>{const f=t[n];if(f&&!t.disabled){const c=t[`${n}Data`];if(c!==void 0?f.call(t,c,e):f.call(t,e),e.cancelBubble)return}return t.host&&typeof t.host!="string"&&!t.host._$host&&t.contains(e.target)&&r(t.host),!0},o=()=>{for(;l()&&(t=t._$host||t.parentNode||t.host););};if(Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),h.registry&&!h.done&&(h.done=_$HY.done=!0),e.composedPath){const f=e.composedPath();r(f[0]);for(let c=0;c<f.length-2&&(t=f[c],!!l());c++){if(t._$host){t=t._$host,o();break}if(t.parentNode===i)break}}else o();r(s)}function H(e,t,n,s,i){const r=U(e);if(r){!n&&(n=[...e.childNodes]);let f=[];for(let c=0;c<n.length;c++){const a=n[c];a.nodeType===8&&a.data.slice(0,2)==="!$"?a.remove():f.push(a)}n=f}for(;typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,o=s!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(r||l==="number"&&(t=t.toString(),t===n))return n;if(o){let f=n[0];f&&f.nodeType===3?f.data!==t&&(f.data=t):f=document.createTextNode(t),n=F(e,n,s,f)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean"){if(r)return n;n=F(e,n,s)}else{if(l==="function")return V(()=>{let f=t();for(;typeof f=="function";)f=f();n=H(e,f,n,s)}),()=>n;if(Array.isArray(t)){const f=[],c=n&&Array.isArray(n);if(le(f,t,n,i))return V(()=>n=H(e,f,n,s,!0)),()=>n;if(r){if(!f.length)return n;if(s===void 0)return n=[...e.childNodes];let a=f[0];if(a.parentNode!==e)return n;const g=[a];for(;(a=a.nextSibling)!==s;)g.push(a);return n=g}if(f.length===0){if(n=F(e,n,s),o)return n}else c?n.length===0?me(e,f,s):it(e,n,f):(n&&F(e),me(e,f));n=f}else if(t.nodeType){if(r&&t.parentNode)return n=o?[t]:t;if(Array.isArray(n)){if(o)return n=F(e,n,s,t);F(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function le(e,t,n,s){let i=!1;for(let r=0,l=t.length;r<l;r++){let o=t[r],f=n&&n[e.length],c;if(!(o==null||o===!0||o===!1))if((c=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))i=le(e,o,f)||i;else if(c==="function")if(s){for(;typeof o=="function";)o=o();i=le(e,Array.isArray(o)?o:[o],Array.isArray(f)?f:[f])||i}else e.push(o),i=!0;else{const a=String(o);f&&f.nodeType===3&&f.data===a?e.push(f):e.push(document.createTextNode(a))}}return i}function me(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function F(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let r=!1;for(let l=t.length-1;l>=0;l--){const o=t[l];if(i!==o){const f=o.parentNode===e;!r&&!l?f?e.replaceChild(i,o):e.insertBefore(i,n):f&&o.remove()}else r=!0}}else e.insertBefore(i,n);return[i]}const jt=()=>{},It=!1;export{Pt as A,$t as B,oe as C,Tt as E,Ot as S,Ce as a,Lt as b,He as c,Et as d,V as e,N as f,Me as g,$ as h,bt as i,St as j,pt as k,O as l,It as m,Nt as n,Ae as o,_e as p,xe as q,mt as r,h as s,rt as t,Ee as u,jt as v,At as w,ht as x,kt as y,Ct as z};
