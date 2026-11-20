import {FREE_LESSONS,PRACTICE_QUESTIONS} from './learning-data.mjs';
export function createLearningState(){return{version:1,completed:[],notes:{},plan:[],attempts:[]};}
export function validStudyDate(date){return date===''||(typeof date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(date)&&Number.isFinite(Date.parse(date))&&new Date(date).toISOString().slice(0,10)===date);}
export function cleanLearningState(input){
  const state=createLearningState();if(!input||typeof input!=='object'||Array.isArray(input))return state;
  const ids=new Set(FREE_LESSONS.map(l=>l.id));
  state.completed=Array.isArray(input.completed)?[...new Set(input.completed.filter(id=>ids.has(id)))]:[];
  for(const lesson of FREE_LESSONS)if(input.notes&&Object.hasOwn(input.notes,lesson.id)&&typeof input.notes[lesson.id]==='string')state.notes[lesson.id]=input.notes[lesson.id].slice(0,4000);
  const taskIds=new Set();
  for(const task of Array.isArray(input.plan)?input.plan.slice(0,200):[]){
    if(!task||typeof task!=='object'||typeof task.id!=='string'||!/^[A-Za-z0-9-]{1,80}$/.test(task.id)||taskIds.has(task.id)||typeof task.title!=='string'||!task.title.trim())continue;
    taskIds.add(task.id);state.plan.push({id:task.id,title:task.title.trim().slice(0,160),date:validStudyDate(task.date)?task.date:'',done:task.done===true});
  }
  for(const attempt of Array.isArray(input.attempts)?input.attempts.slice(-100):[]){
    const question=PRACTICE_QUESTIONS.find(q=>q.id===attempt?.questionId);
    if(!question||!Number.isInteger(attempt.choice)||attempt.choice<0||attempt.choice>=question.options.length)continue;
    state.attempts.push({questionId:question.id,choice:attempt.choice,correct:attempt.choice===question.answer});
  }
  return state;
}
export function finishFreeLesson(state,id){if(!FREE_LESSONS.some(l=>l.id===id))throw new Error('Unknown free lesson');const clean=cleanLearningState(state);clean.completed=[...new Set([...clean.completed,id])];return clean;}
export function writeStudyNote(state,id,text){if(!FREE_LESSONS.some(l=>l.id===id)||typeof text!=='string')throw new Error('Unknown note');const clean=cleanLearningState(state);clean.notes[id]=text.slice(0,4000);return clean;}
export function addStudyTask(state,{id,title,date=''}){const clean=cleanLearningState(state);if(clean.plan.length>=200)throw new Error('Your local planner holds up to 200 tasks. Export a backup before starting a fresh plan.');if(typeof title!=='string'||!title.trim())throw new Error('Add a short task title.');if(!validStudyDate(date))throw new Error('Choose a valid date.');if(typeof id!=='string'||!/^[A-Za-z0-9-]{1,80}$/.test(id)||clean.plan.some(t=>t.id===id))throw new Error('Task identifier is not valid.');clean.plan.push({id,title:title.trim().slice(0,160),date,done:false});return clean;}
export function toggleStudyTask(state,id){const clean=cleanLearningState(state);const task=clean.plan.find(t=>t.id===id);if(!task)throw new Error('Unknown task');task.done=!task.done;return clean;}
export function answerPracticeQuestion(state,questionId,choice){const q=PRACTICE_QUESTIONS.find(q=>q.id===questionId);if(!q||!Number.isInteger(choice)||choice<0||choice>=q.options.length)throw new Error('Choose a valid answer.');const clean=cleanLearningState(state);clean.attempts=[...clean.attempts,{questionId,choice,correct:choice===q.answer}].slice(-100);return clean;}
export function learningSummary(state){const clean=cleanLearningState(state),latest=new Map();for(const a of clean.attempts)latest.set(a.questionId,a.correct);return{completed:clean.completed.length,totalLessons:FREE_LESSONS.length,responses:clean.attempts.length,accuracy:clean.attempts.length?Math.round(100*clean.attempts.filter(a=>a.correct).length/clean.attempts.length):null,missedIds:[...latest].filter(([,correct])=>!correct).map(([id])=>id),tasksDone:clean.plan.filter(t=>t.done).length,tasksTotal:clean.plan.length,notesCount:Object.values(clean.notes).filter(t=>t.trim()).length};}
export function learningBackup(state){return{format:'succinate-study-backup',version:1,learning:cleanLearningState(state)};}
export function restoreLearningBackup(input){if(!input||input.format!=='succinate-study-backup'||input.version!==1||!input.learning||typeof input.learning!=='object'||Array.isArray(input.learning))throw new Error('This is not a supported StudyPass learning backup.');return cleanLearningState(input.learning);}
