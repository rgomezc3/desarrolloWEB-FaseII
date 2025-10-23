(function(){
  const KEY="robotRunner.tracks";
  function loadAll(){try{const raw=localStorage.getItem(KEY);return raw?JSON.parse(raw):[]}catch(_){return []}}
  function saveAll(list){localStorage.setItem(KEY,JSON.stringify(list))}
  function ensureSeeds(){const cur=loadAll();if(cur.length===0&&Array.isArray(window.SEED_TRACKS)){saveAll(window.SEED_TRACKS);return window.SEED_TRACKS}return cur}
  function listTracks(){return loadAll()}
  function getRandomTrack(){const all=ensureSeeds();return all[Math.floor(Math.random()*all.length)]}
  function saveTrack(track){const all=loadAll();const i=all.findIndex(t=>t.id===track.id);if(i>=0)all[i]=track;else all.push(track);saveAll(all)}
  function deleteTrack(id){let all=loadAll();all=all.filter(t=>t.id!==id);saveAll(all)}
  window.Store={ensureSeeds,listTracks,getRandomTrack,saveTrack,deleteTrack};
})();