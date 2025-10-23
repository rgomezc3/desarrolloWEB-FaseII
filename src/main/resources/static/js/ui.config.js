(function(){
  const $grid=document.getElementById("gridConfig");
  const $name=document.getElementById("trackName");
  const $list=document.getElementById("tracksList");

  const tracks=window.Store.ensureSeeds();
  let model=JSON.parse(JSON.stringify(tracks[0]||{id:crypto.randomUUID(),name:"Nueva pista 5x5",rows:5,cols:5,start:{r:4,c:0,dir:"E"},goal:{r:0,c:4},path:[]}));
  model.rows=5; model.cols=5; model.path=(model.path||[]).filter(([r,c])=>r>=0&&c>=0&&r<5&&c<5);
  $name.value=model.name;

  function renderList(){
    $list.innerHTML="";
    window.Store.listTracks().forEach(t=>{
      const li=document.createElement("li");
      const title=document.createElement("span"); title.textContent=t.name;
      const btn=document.createElement("button"); btn.className="btn btn-secondary"; btn.textContent="Editar";
      btn.onclick=()=>{ model=JSON.parse(JSON.stringify(t)); model.rows=5; model.cols=5; model.path=(model.path||[]).filter(([r,c])=>r>=0&&c>=0&&r<5&&c<5); $name.value=model.name; draw(); };
      li.appendChild(title); li.appendChild(btn); $list.appendChild(li);
    });
  }
  function draw(){
    window.Grid.renderGrid($grid, {track:model,rows:5,cols:5,path:model.path,goal:model.goal,robot:model.start}, {
      editable:true,
      onToggleCell:(r,c)=>{
        const key=`${r},${c}`;
        const idx=model.path.findIndex(p=>`${p[0]},${p[1]}`===key);
        if(idx>=0) model.path.splice(idx,1); else model.path.push([r,c]);
        draw();
      }
    });
  }
  document.getElementById("saveTrack").addEventListener("click", ()=>{
    const name=($name.value||"").trim(); if(!name){alert("Ingresa un nombre");return;}
    if(!model.id) model.id=crypto.randomUUID(); model.name=name; model.rows=5; model.cols=5; model.path=(model.path||[]).filter(([r,c])=>r>=0&&c>=0&&r<5&&c<5);
    window.Store.saveTrack(model); renderList(); alert("Pista guardada");
  });
  document.getElementById("deleteTrack").addEventListener("click", ()=>{
    if(!model?.id){alert("No hay pista seleccionada");return;}
    if(confirm(`¿Borrar la pista "${model.name}"?`)){
      window.Store.deleteTrack(model.id);
      const all=window.Store.listTracks();
      model=all[0]?JSON.parse(JSON.stringify(all[0])):{id:crypto.randomUUID(),name:"Nueva pista 5x5",rows:5,cols:5,start:{r:4,c:0,dir:"E"},goal:{r:0,c:4},path:[]};
      model.rows=5; model.cols=5; model.path=(model.path||[]).filter(([r,c])=>r>=0&&c>=0&&r<5&&c<5);
      $name.value=model.name; draw(); renderList();
    }
  });
  draw(); renderList();
})();