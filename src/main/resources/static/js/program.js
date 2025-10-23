(function(){
  function startLoop(state){ if(state.recordingLoop) return; const loop={type:"LOOP",body:[]}; state.program.push(loop); state.recordingLoop=loop; }
  function endLoop(state){ if(!state.recordingLoop) return; if(state.recordingLoop.body.length===0){ const i=state.program.indexOf(state.recordingLoop); if(i>=0) state.program.splice(i,1);} state.recordingLoop=null; }
  function addStep(state,type){ const step=(type==="LOOP")?{type:"LOOP",body:[]}:{type}; if(state.recordingLoop&&type!=="LOOP"){state.recordingLoop.body.push(step);} else if(type==="LOOP"){ state.recordingLoop?endLoop(state):startLoop(state);} else { state.program.push(step);} }
  function expandLoops(program){ const out=[]; for(const s of program){ if(s.type==="LOOP") out.push(...s.body); else out.push(s);} return out; }
  function forward(pos){ const d={...pos}; if(d.dir==="N")d.r--; else if(d.dir==="S")d.r++; else if(d.dir==="E")d.c++; else if(d.dir==="W")d.c--; return d; }
  function turn(dir,type){ const o=["N","E","S","W"]; let i=o.indexOf(dir); if(type==="LEFT")i=(i+3)%4; if(type==="RIGHT")i=(i+1)%4; return o[i]; }
  function renderProgramList(ol,program){ ol.innerHTML=""; program.forEach((step,idx)=>{ const li=document.createElement("li"); li.textContent=step.type==="LOOP"?`Bucle (x1) [${step.body?.length||0} pasos]`:{FWD:"Adelante",LEFT:"Girar Izquierda",RIGHT:"Girar Derecha"}[step.type]||step.type; const b=document.createElement("button"); b.textContent="X"; b.className="btn btn-danger"; b.style.marginLeft="8px"; b.onclick=()=>{program.splice(idx,1);renderProgramList(ol,program)}; li.appendChild(b); ol.appendChild(li); }); }
  window.Program={addStep,expandLoops,forward,turn,renderProgramList,startLoop,endLoop};
})();