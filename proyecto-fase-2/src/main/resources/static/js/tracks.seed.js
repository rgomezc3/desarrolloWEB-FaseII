(function(){
  const T1 = {id:"seed-5x5-1",name:"Pista 5x5 L",rows:5,cols:5,start:{r:4,c:0,dir:"E"},goal:{r:1,c:4},path:[[4,0],[3,0],[2,0],[1,0],[1,1],[1,2],[1,3],[1,4]]};
  const T2 = {id:"seed-5x5-2",name:"Pista 5x5 Baja",rows:5,cols:5,start:{r:4,c:0,dir:"E"},goal:{r:4,c:4},path:[[4,0],[4,1],[4,2],[4,3],[4,4]]};
  const T3 = {id:"seed-5x5-3",name:"Pista 5x5 Centro",rows:5,cols:5,start:{r:4,c:2,dir:"N"},goal:{r:0,c:2},path:[[4,2],[3,2],[2,2],[1,2],[0,2]]};
  window.SEED_TRACKS = [T1,T2,T3];
})();