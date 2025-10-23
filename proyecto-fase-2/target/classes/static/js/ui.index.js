(function(){
  const $grid=document.getElementById("grid");
  const $status=document.getElementById("status");
  const $programList=document.getElementById("programList");
  const $controls=document.querySelectorAll(".controls [data-move]");
  const $run=document.getElementById("run");
  const $reset=document.getElementById("reset");
  const $select=document.getElementById("trackSelect");

  const track=window.Store.getRandomTrack();
  window.AppState.setTrack(track);
  window.Grid.renderGrid($grid, window.AppState.State);

  function loadTracksIntoSelect(selectedId){
    const tracks=window.Store.ensureSeeds();
    $select.innerHTML="";
    tracks.forEach(t=>{
      const opt=document.createElement("option");
      opt.value=t.id; opt.textContent=t.name;
      if(selectedId && selectedId===t.id) opt.selected=true;
      $select.appendChild(opt);
    });
  }
  function getTrackById(id){ return window.Store.listTracks().find(t=>t.id===id); }
  $select.addEventListener("change", ()=>{
    const t=getTrackById($select.value);
    if(t){
      window.AppState.setTrack(t);
      window.Grid.renderGrid($grid, window.AppState.State);
      refreshProgram();
      $status.textContent="";
    }
  });

  function refreshProgram(){
    window.Program.renderProgramList($programList, window.AppState.State.program);
    if(window.AppState.State.recordingLoop){
      $status.textContent="Grabando bucle… Pulsa Bucle otra vez para cerrar";
      $status.classList.add("recording");
    } else { $status.textContent=""; $status.classList.remove("recording"); }
  }

  $controls.forEach(btn=>btn.addEventListener("click",()=>{
    window.Program.addStep(window.AppState.State, btn.dataset.move);
    refreshProgram();
  }));

  function setEnabled(en){[...$controls].forEach(b=>b.disabled=!en); $run.disabled=!en; $reset.disabled=!en;}

  $run.addEventListener("click", async ()=>{
    setEnabled(false); $status.textContent="";
    await window.Engine.runProgram(window.AppState.State, (pos)=>window.Grid.updateRobot($grid,pos), (m)=>{$status.textContent=m;setEnabled(true)}, (m)=>{$status.textContent=m;setEnabled(true)});
  });

  $reset.addEventListener("click", ()=>{
    const t=window.AppState.State.track; window.AppState.setTrack(t);
    window.Grid.renderGrid($grid, window.AppState.State); refreshProgram();
    $status.textContent="Reiniciado"; setTimeout(()=>{$status.textContent=""},800);
  });

  loadTracksIntoSelect(window.AppState.State.track?.id);
  refreshProgram();
})();