export const courses = Object.freeze([
  { id:'nclex', category:'nclex', label:'NCLEX-RN', title:'Clinical Confidence', description:'A focused revision experience for your next step in nursing.', priceZat:2500000, modules:6, duration:'SELF-PACED', tone:'sage', symbol:'✳', satellite:'+', subtitle:'Reasoning. Reflection. Readiness.', lessons:['Build a deliberate study routine','Practise with purpose','Reflect on your reasoning','Revisit your weak spots','Prepare your revision plan','Your next chapter'], resource:'NCLEX-RN study concept' },
  { id:'midwifery', category:'midwifery', label:'REGISTERED MIDWIFERY', title:'The Midwifery Edit', description:'A thoughtful study path for the care that starts a new chapter.', priceZat:2000000, modules:5, duration:'SELF-PACED', tone:'lilac', symbol:'◎', satellite:'✦', subtitle:'Care. Curiosity. Confidence.', lessons:['Map your learning goals','Build your revision rhythm','Organise your topic notes','Use reflection in learning','Your next chapter'], resource:'Midwifery study concept' },
  { id:'public-health', category:'public-health', label:'PUBLIC HEALTH', title:'Beyond the Bedside', description:'Explore a study journey with community health at its heart.', priceZat:1500000, modules:4, duration:'SELF-PACED', tone:'peach', symbol:'✺', satellite:'↗', subtitle:'People. Purpose. Possibility.', lessons:['Set a community-learning goal','Connect ideas with context','Organise your revision','Your next chapter'], resource:'Public health study concept' }
]);
export function priceZec(zat) {
  if(!Number.isSafeInteger(zat)||zat<0) throw new Error('Invalid amount');
  return `${Math.floor(zat/100000000)}.${String(zat%100000000).padStart(8,'0')}`.replace(/\.?0+$/,'') || '0';
}
export function courseById(id) { return courses.find(c=>c.id===id) || null; }
export function cleanLibrary(value) {
  const clean = {};
  if(!value || typeof value !== 'object' || Array.isArray(value)) return clean;
  for(const course of courses) {
    const entry=Object.hasOwn(value,course.id)?value[course.id]:null;
    if(!entry || typeof entry!=='object' || entry.demo!==true) continue;
    const completed=Array.isArray(entry.completed)?[...new Set(entry.completed.filter(n=>n===0))]:[];
    clean[course.id]={demo:true,completed,receipt:typeof entry.receipt==='string'&&/^DEMO-[A-Z0-9-]{1,50}$/.test(entry.receipt)?entry.receipt:'DEMO-RESTORED'};
  }
  return clean;
}
export function grantDemoPass(library,id,receipt) {
  if(!courseById(id)) throw new Error('Unknown resource');
  const clean=cleanLibrary(library);
  return cleanLibrary({...clean,[id]:clean[id]||{demo:true,completed:[],receipt}});
}
export function completeLesson(library,id,index) {
  const clean=cleanLibrary(library), course=courseById(id);
  if(!course||!clean[id]||index!==0) throw new Error('Lesson is not available');
  clean[id].completed=[...new Set([...clean[id].completed,index])];
  return clean;
}
