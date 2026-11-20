// One motion director for static and dynamically created application components.
export function createMotionDirector({isPaused=()=>false}={}){
  const selectors=[
    '.brand','.nav-link','.header-actions > button','.announcement','h1','.hero-description',
    '.hero-actions > *','.hero-detail','.hero-scene','.scene-caption','.section-heading .eyebrow',
    '.section-heading h2','.section-heading > .button','.section-description','.collection-controls > *',
    '.course-card','.catalog-footnote','.step-number','.step-art','.step h3','.step p',
    '.privacy-visual','.privacy-copy > .eyebrow','.privacy-copy h2','.privacy-copy > p:not(.eyebrow)',
    '.privacy-list > div','.privacy-copy .inline-link','.faq-intro > *','.faq-list > details',
    '.final-cta > *:not(.cta-star)','.site-footer > :not(.footer-bottom)','.footer-bottom > *',
    '.dialog-top','dialog h2','dialog .muted','.checkout-badge','.checkout-steps','.order-box',
    '.checkout-detail','.privacy-table > div','.check-row','.checkout-primary','.checkout-back',
    '.checkout-note','.receipt-id','.receipt-note','.success-emblem','.library-item','.empty-library',
    '#lesson-content > h3','#lesson-content > p','#lesson-content > ul','.lesson-callout',
    '.free-start-card','.free-start-stat','.membership-card','.workspace-tabs','.free-welcome',
    '.free-path','.free-next-action','.learning-actions','.learning-sources','.study-label',
    '.practice-controls','.practice-question legend','.practice-option','.practice-feedback',
    '.study-plan-form','.study-task','.learning-stats > div','.learning-backup','.review-lesson'
  ].join(',');
  const seen=new WeakSet(),active=new Set();
  const noMotion=()=>isPaused()||document.hidden||matchMedia('(prefers-reduced-motion: reduce)').matches;
  function reveal(element){
    element.dataset.motionState='visible';
    if(noMotion()||typeof element.animate!=='function')return;
    const delay=Number(element.dataset.motionDelay||0);
    const animation=element.animate([
      {opacity:0,transform:'translate3d(0,14px,0)'},
      {opacity:1,transform:'translate3d(0,0,0)'}
    ],{duration:650,delay,easing:'cubic-bezier(.2,.75,.2,1)',fill:'backwards'});
    active.add(animation);
    animation.finished.then(()=>active.delete(animation),()=>active.delete(animation));
  }
  const intersection='IntersectionObserver'in window?new IntersectionObserver(entries=>{
    let sequence=0;
    for(const entry of entries)if(entry.isIntersecting){
      // Closed dialogs are intentionally left ready for their first opening.
      const dialog=entry.target.closest('dialog');if(dialog&&!dialog.open)continue;
      entry.target.dataset.motionDelay=String(Math.min(sequence++*38,200));
      intersection.unobserve(entry.target);reveal(entry.target);
    }
  },{threshold:.06,rootMargin:'0px 0px 12px 0px'}):null;
  // Animate the visible experience; suspend continuous decoration outside it.
  const visibility='IntersectionObserver'in window?new IntersectionObserver(entries=>{
    for(const entry of entries)entry.target.classList.toggle('motion-offscreen',!entry.isIntersecting);
  },{rootMargin:'120px',threshold:0}):null;
  document.querySelectorAll('main > section,.site-header,.site-footer').forEach(section=>visibility?.observe(section));
  function register(scope=document){
    const candidates=[...(scope.matches?.(selectors)?[scope]:[]),...scope.querySelectorAll(selectors)];
    for(const element of candidates){
      if(seen.has(element))continue;
      seen.add(element);element.dataset.motion='entry';element.classList.add('motion-entry');
      if(noMotion()||!intersection){element.dataset.motionState='visible';continue;}
      element.dataset.motionState='waiting';intersection.observe(element);
    }
    updateCoverage();
  }
  function updateCoverage(){
    const candidates=[...document.querySelectorAll(selectors)];
    const count=candidates.filter(e=>e.dataset.motion==='entry').length;
    document.documentElement.dataset.motionComponents=String(candidates.length);
    document.documentElement.dataset.motionCovered=String(count);
  }
  const mutations=new MutationObserver(changes=>{
    for(const change of changes){
      for(const removed of change.removedNodes)if(removed.nodeType===1){
        if(removed.dataset.motion)intersection?.unobserve(removed);
        removed.querySelectorAll('[data-motion]').forEach(n=>intersection?.unobserve(n));
      }
      for(const added of change.addedNodes)if(added.nodeType===1)register(added);
    }
    updateCoverage();
  });
  mutations.observe(document.body,{childList:true,subtree:true});
  const settle=()=>{for(const animation of active){try{animation.finish();}catch{animation.cancel();}}active.clear();};
  document.addEventListener('visibilitychange',()=>{
    document.documentElement.classList.toggle('page-idle',document.hidden);
    if(document.hidden)settle();
  });
  register();
  return {
    setPaused(value){if(value){settle();document.querySelectorAll('[data-motion-state="waiting"]').forEach(n=>{n.dataset.motionState='visible';intersection?.unobserve(n);});}},
    audit(){const total=Number(document.documentElement.dataset.motionComponents||0),covered=Number(document.documentElement.dataset.motionCovered||0);return{componentGroups:total,registered:covered,coverage:total?Math.round(100*covered/total):100};},
    destroy(){settle();intersection?.disconnect();visibility?.disconnect();mutations.disconnect();}
  };
}
