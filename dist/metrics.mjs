const METRIC_EVENTS=['visit','free_start','lesson_open','lesson_complete','practice_answer','planner_task','upgrade_preview'];
export function summarizeMetrics(events,days=30,now=Date.now()){
  const cutoff=days?now-days*86400000:0;
  const valid=(Array.isArray(events)?events:[]).filter(e=>e&&METRIC_EVENTS.includes(e.name)&&typeof e.session==='string'&&Number.isFinite(e.time)&&e.time>=0&&e.time<=now);
  const cohort=new Set(valid.filter(e=>e.name==='visit'&&e.time>=cutoff).map(e=>e.session));
  const stage=name=>new Set(valid.filter(e=>e.name===name&&cohort.has(e.session)).map(e=>e.session)).size;
  const recent=valid.filter(e=>e.time>=cutoff);
  const count=name=>recent.filter(e=>e.name===name).length;
  const rate=n=>cohort.size?Math.round(n/cohort.size*100):null;
  const daily=new Map();for(const e of recent){const day=new Date(e.time).toISOString().slice(0,10);if(!daily.has(day))daily.set(day,{date:day,visits:0,lessons:0,practice:0});const row=daily.get(day);if(e.name==='visit')row.visits++;if(e.name==='lesson_complete')row.lessons++;if(e.name==='practice_answer')row.practice++;}
  const funnel=['visit','free_start','lesson_open','lesson_complete','practice_answer','upgrade_preview'].map(name=>({name,sessions:stage(name),percent:rate(stage(name))}));
  return{sessions:cohort.size,activation:rate(stage('free_start')),learning:rate(stage('lesson_complete')),upgradeInterest:rate(stage('upgrade_preview')),lessonOpens:count('lesson_open'),completions:count('lesson_complete'),practice:count('practice_answer'),tasks:count('planner_task'),activeDays:daily.size,funnel,daily:[...daily.values()].sort((a,b)=>a.date.localeCompare(b.date))};
}
export function createUsageMetrics({showDialog,notify}){
  const key='succinate-usage-v1',sessionKey='succinate-metrics-session-v1',choiceKey='succinate-metrics-choice-v1';let events=[],enabled=true,persistent=true,days=30;
  const makeSession=()=>crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
  let session=makeSession();
  try{enabled=localStorage.getItem(choiceKey)!=='off';const raw=JSON.parse(localStorage.getItem(key)||'[]');events=Array.isArray(raw)?raw.filter(e=>e&&METRIC_EVENTS.includes(e.name)&&typeof e.session==='string'&&e.session.length<=80&&Number.isFinite(e.time)&&e.time<=Date.now()).slice(-10000):[];}catch{persistent=false;}
  try{const saved=JSON.parse(sessionStorage.getItem(sessionKey)||'null');if(saved&&typeof saved.id==='string'&&saved.id.length<=80&&Date.now()-saved.last<1800000)session=saved.id;sessionStorage.setItem(sessionKey,JSON.stringify({id:session,last:Date.now()}));}catch{}
  const save=()=>{try{localStorage.setItem(key,JSON.stringify(events));persistent=true;}catch{persistent=false;}};
  function track(name){if(!enabled||!METRIC_EVENTS.includes(name))return;if(!events.some(e=>e.name==='visit'&&e.session===session))events.push({name:'visit',session,time:Date.now()});if(name!=='visit')events.push({name,session,time:Date.now()});events=events.slice(-10000);save();try{sessionStorage.setItem(sessionKey,JSON.stringify({id:session,last:Date.now()}));}catch{}}
  const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
  const button=(text,fn,cls='button button-outline')=>{const b=el('button',text,cls);b.type='button';b.addEventListener('click',fn);return b;};
  const dialog=el('dialog',undefined,'metrics-dialog');dialog.setAttribute('aria-labelledby','metrics-title');document.body.append(dialog);
  let backup=null;
  function render(){
    const m=summarizeMetrics(events,days),labels={visit:'Started a visit',free_start:'Opened free learning',lesson_open:'Opened a lesson',lesson_complete:'Completed a lesson',practice_answer:'Answered a question',upgrade_preview:'Viewed paid checkout preview'};
    dialog.replaceChildren();const top=el('div',undefined,'dialog-top');top.append(el('span','STUDYPASS / OWNER TOOLS','dialog-brand'),button('×',()=>dialog.close(),'close-button'));top.lastChild.setAttribute('aria-label','Close usage metrics');
    const h=el('h2','Usage metrics');h.id='metrics-title';dialog.append(top,h,el('p','Local browser activity · This is not an organisation-wide analytics dashboard.','muted'));
    const controls=el('div',undefined,'metrics-controls'),range=el('label','Reporting window','study-label'),select=el('select');for(const [value,label]of [[7,'Last 7 days'],[30,'Last 30 days'],[0,'All retained activity']]){const o=el('option',label);o.value=value;o.selected=value===days;select.append(o);}select.addEventListener('change',()=>{days=Number(select.value);render();});range.append(select);controls.append(range,button('Refresh',render));dialog.append(controls);
    const cards=el('div',undefined,'learning-stats');for(const [v,label]of [[m.sessions,'Observed tab visits'],[m.activation===null?'—':m.activation+'%','Free-learning activation'],[m.completions,'Lesson completions'],[m.practice,'Practice answers'],[m.tasks,'Planner tasks created'],[m.upgradeInterest===null?'—':m.upgradeInterest+'%','Upgrade-preview interest']]){const c=el('div');c.append(el('strong',String(v)),el('span',label));cards.append(c);}dialog.append(cards);
    dialog.append(el('h3','Activation and engagement'),el('p','Each row counts visits that reached that action. Rows are independent: this is not a required sequence. Percentages use visits started in the selected window.','workspace-small'));
    for(const row of m.funnel){const item=el('div',undefined,'metric-funnel-row'),label=el('div');label.append(el('span',labels[row.name]),el('b',`${row.sessions} · ${row.percent===null?'—':row.percent+'%'}`));const bar=el('div',undefined,'library-progress'),fill=el('span');fill.style.width=(row.percent||0)+'%';bar.append(fill);item.append(label,bar);dialog.append(item);}
    dialog.append(el('h3','Daily activity · UTC'));
    if(!m.daily.length)dialog.append(el('p','No activity recorded for this window. No sample numbers are inserted.','muted'));
    else{const table=el('table',undefined,'metrics-table'),head=el('thead'),tr=el('tr');for(const text of ['Date','Visits','Completions','Answers'])tr.append(el('th',text));head.append(tr);const body=el('tbody');for(const r of m.daily.slice(-30).reverse()){const row=el('tr');for(const v of [r.date,r.visits,r.lessons,r.practice])row.append(el('td',String(v)));body.append(row);}table.append(head,body);dialog.append(table);}
    const actions=el('div',undefined,'learning-actions');actions.append(button('Export report CSV ↓',()=>{const lines=['date,visits,lesson_completions,practice_answers',...m.daily.map(r=>[r.date,r.visits,r.lessons,r.practice].join(','))];const url=URL.createObjectURL(new Blob([lines.join('\r\n')],{type:'text/csv;charset=utf-8'})),a=el('a');a.href=url;a.download='studypass-usage-metrics.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);},'button button-primary'),button(enabled?'Pause local usage recording':'Enable local usage recording',()=>{enabled=!enabled;try{localStorage.setItem(choiceKey,enabled?'on':'off');}catch{}if(enabled)track('visit');render();}),button('Clear recorded usage',()=>{backup=[...events];events=[];save();render();notify('Local usage cleared. You can undo this until the page is reloaded.');}));if(backup)actions.append(button('Undo clear',()=>{events=backup;backup=null;save();render();}));dialog.append(actions);
    dialog.append(el('p',persistent?'Usage is saved only in this browser.':'Storage is unavailable; these metrics last only for this page visit.','workspace-small'),el('p','Definitions: a visit is a browser-tab session, refreshed after 30 minutes of inactivity when the app loads. Refreshes within that window do not add a visit. Activity counts are events in the reporting window; engagement rates follow visits started in that window. History retains the latest 10,000 events.','workspace-small'),el('p','No names, note text, answer choices, wallet addresses, payments, or IP addresses are recorded here. Multiple devices and browsers are not combined. Real unique users, return retention, revenue, and paid conversion require a deployed collection service and verified payments; they are not claimed by this report.','workspace-small'));
  }
  track('visit');
  return{track,open(){render();showDialogElement();},getReport:()=>summarizeMetrics(events,days)};
  function showDialogElement(){document.querySelectorAll('dialog[open]').forEach(d=>d.close());dialog.showModal();dialog.scrollTop=0;}
}
