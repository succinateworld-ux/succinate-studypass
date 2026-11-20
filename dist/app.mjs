import { courses, courseById, priceZec, cleanLibrary, grantDemoPass, completeLesson } from './model.mjs';
import { createMotionDirector } from './motion.mjs';
import { FREE_LESSONS } from './learning-data.mjs';
import { createLearningWorkspace } from './learning-app.mjs';
import { createUsageMetrics } from './metrics.mjs';
const $=id=>document.getElementById(id);
const STORAGE_KEY='succinate-studypass-demo-v1';
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let library={}, selected=courses[0], toastTimer, paused=reducedMotion.matches, motionDirector=null, freeWorkspace=null;
try { const saved=localStorage.getItem(STORAGE_KEY); if(saved&&saved.length<20000) library=cleanLibrary(JSON.parse(saved)); } catch { /* storage is optional */ }
function node(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
function button(text,cls,action){const b=node('button',text,cls);b.addEventListener('click',action);return b;}
function notify(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3500);}
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(library));}catch{notify('Browser storage is unavailable. Your demo progress lasts for this visit.');}updateCount();}
function updateCount(summary=freeWorkspace?.summary()){const count=summary?.completed||0;$('library-count').textContent=count;$('library-count').hidden=!count;}
function closeDialogs(){document.querySelectorAll('dialog[open]').forEach(d=>d.close());}
function showDialog(id){closeDialogs();$(id).showModal();}
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
function renderCourses(filter='all'){
  const shown=courses.filter(c=>filter==='all'||c.category===filter);
  $('course-grid').replaceChildren(...shown.map(course=>{
    const card=node('article',undefined,'course-card'),art=node('div',undefined,`course-art ${course.tone}`);art.setAttribute('aria-hidden','true');
    art.append(node('span',course.label,'art-type'),node('span',course.symbol,'art-symbol'),node('span',course.satellite,'art-satellite'),node('span','', 'art-grid'),node('span','SUCCINATEWORLD / STUDY EDITION','art-edition'));
    const details=node('div',undefined,'course-details'),meta=node('div',undefined,'course-meta');meta.append(node('span',`3 FREE LESSONS / EXPANDED PACK PLANNED`),node('span',course.duration));
    const bottom=node('div',undefined,'course-bottom'),price=node('div'),amount=node('span',priceZec(course.priceZat),'price');amount.append(node('small','ZEC'));price.append(amount,node('span','Future pack · illustrative price','price-label'));
    const buy=button('↗','course-buy',()=>openCheckout(course.id));buy.setAttribute('aria-label',`Preview ${course.title} StudyPass`);bottom.append(price,buy);
    details.append(meta,node('h3',course.title),node('p',course.description,'course-description'),button('Start this path free ↗','button button-primary course-free-action',()=>openLesson(course.id)),bottom);card.append(art,details);return card;
  }));
  $('filter-status').textContent=`Showing ${shown.length} study ${shown.length===1?'pass':'passes'}.`;
}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(o=>{const active=o===b;o.classList.toggle('active',active);o.setAttribute('aria-pressed',String(active));});renderCourses(b.dataset.filter);}));
function checkoutShell(step,title,description){const target=$('checkout-content');target.classList.remove('success-view');target.replaceChildren(node('span','INTERACTIVE DEMO · NO ZEC IS SENT','checkout-badge'));const h=node('h2',title);h.id='checkout-title';target.append(h,node('p',description,'muted'));const progress=node('div',undefined,'checkout-steps');progress.setAttribute('aria-label',`Checkout step ${step} of 3`);for(let i=1;i<=3;i++)progress.append(node('span','',i<=step?'active':''));target.append(progress);return target;}
function detail(target,key,value){const row=node('div',undefined,'checkout-detail');row.append(node('span',key),node('strong',value));target.append(row);}
function orderBox(target){const box=node('div',undefined,'order-box'),copy=node('div');copy.append(node('h3',selected.title),node('p',selected.label));const price=node('span',priceZec(selected.priceZat),'price');price.append(node('small',' ZEC'));box.append(copy,price);target.append(box);}
function openCheckout(id){usageMetrics.track('upgrade_preview');selected=courseById(id)||courses[0];renderCheckoutReview();showDialog('checkout-dialog');}
function renderCheckoutReview(){
  const t=checkoutShell(1,'Your next chapter.','Take a closer look at your StudyPass before trying the checkout.');orderBox(t);
  detail(t,'Preview includes','Checkout preview · free starter learning is already open');detail(t,'Full resource plan',`${selected.modules} modules · ${selected.duration.toLowerCase()}`);detail(t,'Payment network','Simulated Zcash checkout');detail(t,'Real amount charged','0 ZEC · no transaction is made');
  const note=node('p','The catalog and prices are illustrative. Production access, prices, and resource availability will be confirmed before real checkout launches.','checkout-note');
  t.append(button('Continue to privacy review ↗','button button-primary checkout-primary',renderPrivacy),button('Start the free learning path','checkout-back',()=>openLesson(selected.id,0,true)),note);
}
function renderPrivacy(){
  const t=checkoutShell(2,'A clearer kind of checkout.','Understand what a shielded payment can protect, and what a merchant still needs to know.');
  const table=node('div',undefined,'privacy-table');for(const [who,what] of [['Public ledger','Shielded payment details can be hidden. Actual privacy depends on the transaction and wallet.'],['Recipient','The merchant sees the received amount and may associate it with your order.'],['StudyPass demo','No wallet is connected. A demo pass and lesson progress can be saved in this browser.']]){const row=node('div');row.append(node('b',who),node('span',what));table.append(row);}t.append(table);
  const label=node('label',undefined,'check-row'),check=node('input');check.type='checkbox';check.id='demo-consent';label.append(check,node('span','I understand this is a simulated checkout. No payment is sent or verified, and the pass unlocks sample content only.'));
  const next=button('Simulate pass unlock ↗','button button-primary checkout-primary',()=>{if(!check.checked)return;const random=crypto.randomUUID?crypto.randomUUID().slice(0,8).toUpperCase():String(Date.now());library=grantDemoPass(library,selected.id,`DEMO-${random}`);save();renderSuccess();});next.disabled=true;check.addEventListener('change',()=>next.disabled=!check.checked);
  t.append(label,next,button('← Back to your pass','checkout-back',renderCheckoutReview));
}
function renderSuccess(){
  const t=checkoutShell(3,'A new chapter, opened.','Checkout preview complete. Your free study tools remain open; paid access is not enabled.');t.classList.add('success-view');
  t.append(node('div','✓','success-emblem'),node('p',selected.title,'muted'),node('div',library[selected.id].receipt,'receipt-id'),node('p','DEMO RECEIPT · NOT A PAYMENT CONFIRMATION','receipt-note'),button('Return to free learning ↗','button button-primary checkout-primary',openLibrary),button('Download demo receipt','checkout-back',downloadReceipt));
}
function downloadReceipt(){const entry=library[selected.id];if(!entry)return;const receipt={demo:true,paymentSent:false,paymentVerified:false,receipt:entry.receipt,resource:selected.title,illustrativePriceZec:priceZec(selected.priceZat),currency:'ZEC',notice:'UI prototype receipt only. No payment or production entitlement.'};const url=URL.createObjectURL(new Blob([JSON.stringify(receipt,null,2)],{type:'application/json'}));const a=node('a');a.href=url;a.download='studypass-demo-receipt.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Demo receipt downloaded. No payment was made.');}
function openLibrary(){freeWorkspace?.open('learn');}
function openLesson(id){const first=FREE_LESSONS.find(l=>l.track===id);if(first)freeWorkspace?.openLesson(first.id);}
const mobileLibrary=button('My learning ↗','mobile-library',openLibrary);document.querySelector('.site-header nav').append(mobileLibrary);
document.querySelectorAll('[data-library]').forEach(b=>b.addEventListener('click',openLibrary));
document.querySelectorAll('[data-checkout-info]').forEach(b=>b.addEventListener('click',()=>openCheckout(courses[0].id)));
$('tour-button').addEventListener('click',()=>{notify('Start free: read a lesson, practise, review mistakes, and plan your next session.');document.querySelector('#how-it-works').scrollIntoView({behavior:paused?'instant':'smooth'});});
$('reset-demo').addEventListener('click',()=>{library={};try{localStorage.removeItem(STORAGE_KEY);}catch{}updateCount();notify('Demo passes and progress have been cleared.');});
const motionButton=$('motion-toggle');
function setMotion(value){paused=value||reducedMotion.matches;document.documentElement.classList.toggle('motion-paused',paused);motionButton.disabled=reducedMotion.matches;motionButton.textContent=reducedMotion.matches?'Reduced motion enabled':paused?'Resume motion':'Pause motion';motionButton.setAttribute('aria-pressed',String(paused));motionDirector?.setPaused(paused);if(paused)$('hero-pass').style.transform='';}
motionButton.addEventListener('click',()=>setMotion(!paused));reducedMotion.addEventListener('change',e=>setMotion(e.matches));setMotion(paused);
const menu=$('menu-toggle'),nav=document.querySelector('.site-header nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('menu-open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});nav.querySelectorAll('a,button').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}});
const scene=document.querySelector('.hero-scene'),pass=$('hero-pass');let frame;
scene.addEventListener('pointermove',e=>{if(paused||e.pointerType==='touch'||!matchMedia('(pointer:fine)').matches)return;cancelAnimationFrame(frame);const r=scene.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;frame=requestAnimationFrame(()=>pass.style.transform=`rotateY(${-19+x*14}deg) rotateX(${9-y*10}deg) rotateZ(${11+x*3}deg)`);});scene.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);pass.style.transform='';});
const usageMetrics=createUsageMetrics({showDialog,notify});
const metricsButton=button('Usage metrics','footer-button',()=>usageMetrics.open());document.querySelector('.footer-bottom').append(metricsButton);
freeWorkspace=createLearningWorkspace({notify,showDialog,closeDialogs,onProgress:updateCount,trackUsage:usageMetrics.track});
document.querySelectorAll('[data-free-start]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();freeWorkspace.open('learn');}));
document.querySelectorAll('[data-free-practice]').forEach(b=>b.addEventListener('click',()=>freeWorkspace.open('practice')));
document.querySelectorAll('[data-free-plan]').forEach(b=>b.addEventListener('click',()=>freeWorkspace.open('plan')));
motionDirector=createMotionDirector({isPaused:()=>paused});
renderCourses();updateCount();
