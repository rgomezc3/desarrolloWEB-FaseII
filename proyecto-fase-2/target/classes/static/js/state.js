(function(){
  const State = {track:null,program:[],robot:null,rows:5,cols:5,path:[],goal:null,recordingLoop:null};

  function firstBottomPathCell(path){
    if(!Array.isArray(path)||path.length===0) return {r:4,c:0};
    let maxR=-1; for(const [r,_] of path) if(r>maxR) maxR=r;
    const cand=path.filter(([r,_])=>r===maxR).sort((a,b)=>a[1]-b[1]);
    const [r,c]=cand[0]; return {r,c};
  }
  function initialDirFrom(pos,path){
    const s=new Set(path.map(p=>p.join(',')));
    const neigh=[{dir:'E',r:pos.r,c:pos.c+1},{dir:'N',r:pos.r-1,c:pos.c},{dir:'W',r:pos.r,c:pos.c-1},{dir:'S',r:pos.r+1,c:pos.c}];
    for(const nb of neigh){const k=`${nb.r},${nb.c}`; if(nb.r>=0&&nb.c>=0&&nb.r<5&&nb.c<5&&s.has(k)) return nb.dir;}
    return 'E';
  }
  function farthestReachableOnPath(start,path){
    const s=new Set(path.map(p=>p.join(','))); const key=(r,c)=>`${r},${c}`;
    const q=[]; const dist=new Map(); const sk=key(start.r,start.c);
    if(!s.has(sk)) return start; q.push(start); dist.set(sk,0);
    let far=start, dmax=0; const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
    while(q.length){const cur=q.shift(); const d=dist.get(key(cur.r,cur.c)); if(d>dmax){dmax=d; far={r:cur.r,c:cur.c};}
      for(const [dr,dc] of dirs){const nr=cur.r+dr,nc=cur.c+dc,nk=key(nr,nc);
        if(nr>=0&&nc>=0&&nr<5&&nc<5&&s.has(nk)&&!dist.has(nk)){dist.set(nk,d+1); q.push({r:nr,c:nc});}}}
    return far;
  }
  function setTrack(track){
    const normPath=(track.path||[]).filter(([r,c])=>r>=0&&c>=0&&r<5&&c<5);
    const startPos=firstBottomPathCell(normPath); const startDir=initialDirFrom(startPos,normPath);
    const explicitGoal=track.goal&&{r:Math.min(4,Math.max(0,track.goal.r)),c:Math.min(4,Math.max(0,track.goal.c))};
    const goal=explicitGoal||farthestReachableOnPath(startPos,normPath);
    const normalized={...track,rows:5,cols:5,path:normPath,start:{r:startPos.r,c:startPos.c,dir:startDir},goal:{r:goal.r,c:goal.c}};
    State.track=JSON.parse(JSON.stringify(normalized));
    State.rows=5; State.cols=5; State.path=normalized.path.map(p=>[p[0],p[1]]);
    State.goal={...normalized.goal}; State.robot={...normalized.start}; State.program=[]; State.recordingLoop=null;
  }
  window.AppState={State,setTrack};
})();