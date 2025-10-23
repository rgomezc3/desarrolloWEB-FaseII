(function(){
  function renderGrid(container,state,{editable=false,onToggleCell}={}){
    const el=(typeof container==="string")?document.getElementById(container):container;
    el.innerHTML=""; el.style.gridTemplateColumns=`repeat(5,72px)`; el.style.gridTemplateRows=`repeat(5,72px)`;
    const pathSet=new Set(state.path.map(p=>p.join(",")));
    for(let r=0;r<5;r++){for(let c=0;c<5;c++){
      const cell=document.createElement("div"); cell.className="cell"; cell.dataset.r=r; cell.dataset.c=c;
      const key=`${r},${c}`; if(pathSet.has(key)) cell.classList.add("path");
      if(state.goal && state.goal.r===r && state.goal.c===c) cell.classList.add("goal");
      if(state.track && state.track.start.r===r && state.track.start.c===c) cell.classList.add("start");
      if(state.robot && state.robot.r===r && state.robot.c===c){ cell.classList.add("robot"); cell.innerHTML='<img src="assets/robot.svg" alt="robot" width="52" height="52" />'; }
      if(editable){ cell.addEventListener("click", ()=> onToggleCell&&onToggleCell(r,c)); }
      el.appendChild(cell);
    }}}
  function updateRobot(container,pos){
    const el=(typeof container==="string")?document.getElementById(container):container;
    el.querySelectorAll(".cell.robot").forEach(n=>{n.classList.remove("robot");n.innerHTML=""});
    const cell=el.querySelector(`.cell[data-r="${pos.r}"][data-c="${pos.c}"]`);
    if(cell){cell.classList.add("robot");cell.innerHTML='<img src="assets/robot.svg" alt="robot" width="52" height="52" />';}
  }
  function inside(pos){return pos.r>=0&&pos.c>=0&&pos.r<5&&pos.c<5}
  function onPath(pos,path){const key=`${pos.r},${pos.c}`;for(const p of path) if(`${p[0]},${p[1]}`===key) return true; return false}
  window.Grid={renderGrid,updateRobot,inside,onPath};
})();