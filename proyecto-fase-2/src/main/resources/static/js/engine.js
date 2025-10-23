(function(){
  function sleep(ms){return new Promise(r=>setTimeout(r,ms))}
  async function runProgram(state,onStep,onFail,onSuccess,delayMs=2000){
    const expanded=window.Program.expandLoops(state.program);
    let pos={...state.robot};
    for(const step of expanded){
      await sleep(delayMs);
      if(step.type==="FWD"){
        pos=window.Program.forward(pos);
        if(!window.Grid.inside(pos)||!window.Grid.onPath(pos,state.path)){ onStep&&onStep(pos); onFail&&onFail("Inténtalo de nuevo"); return; }
      } else if(step.type==="LEFT"||step.type==="RIGHT"){
        pos.dir=window.Program.turn(pos.dir,step.type);
      }
      onStep&&onStep(pos);
    }
    if(state.goal && pos.r===state.goal.r && pos.c===state.goal.c){
      onSuccess && onSuccess("Misión cumplida: recorrido exitoso");
    } else {
      onFail && onFail("Inténtalo de nuevo");
    }

  }
  window.Engine={runProgram};
})();