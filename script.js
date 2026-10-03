'use strict';
// ================= UTIL =================
const $=i=>document.getElementById(i),cv=$('c'),g=cv.getContext('2d'),W=960,H=540,MW=2000,MH=1200,PI2=Math.PI*2;
const R=(a,b)=>a+Math.random()*(b-a),RI=(a,b)=>Math.floor(R(a,b+1)),D=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),CL=(v,a,b)=>Math.max(a,Math.min(b,v)),AD=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
// ================= DATA =================
const RAR=[['Common','#b8b8b8',.5],['Uncommon','#5ed25e',.8],['Rare','#4aa0ff',1.2],['Epic','#b45cff',1.8],['Legendary','#ffb020',2.5]];
const ITEMS={small_potion:{n:'Small Potion',t:'c',ic:'🧪',hp:50,p:20},large_potion:{n:'Large Potion',t:'c',ic:'⚗️',hp:150,p:60},mana_potion:{n:'Mana Potion',t:'c',ic:'💧',mp:60,p:30},bread:{n:'Bread',t:'c',ic:'🍞',hp:25,p:10},meat:{n:'Meat',t:'c',ic:'🍖',hp:40,p:15},fish:{n:'Cooked Fish',t:'c',ic:'🐟',hp:70,p:28},herb:{n:'Herb',t:'c',ic:'🌿',hp:20,p:8},
goblin_ear:{n:'Goblin Ear',t:'m',ic:'👂',p:6},slime_core:{n:'Slime Core',t:'m',ic:'🟢',p:8},wolf_fang:{n:'Wolf Fang',t:'m',ic:'🦷',p:14},orc_tooth:{n:'Orc Tooth',t:'m',ic:'🦴',p:25},iron_ore:{n:'Iron Ore',t:'m',ic:'⛏️',p:20},dark_crystal:{n:'Dark Crystal',t:'m',ic:'🔮',p:60},crystal:{n:'Crystal',t:'m',ic:'💎',p:40},boss_mat:{n:'Boss Material',t:'m',ic:'☠️',p:200}};
const ARTS=[{n:'Flame Sword Core',s:'atk',v:10,ic:'🔥'},{n:'Arcane Crystal',s:'mag',v:15,ic:'🔷'},{n:'Guardian Stone',s:'def',v:20,ic:'🛡️'},{n:'Swift Feather',s:'spd',v:5,ic:'🪶'},{n:'Critical Gem',s:'crit',v:5,ic:'💠'},{n:'Vital Heart',s:'hp',v:30,ic:'❤️'},{n:'Mana Spring',s:'mp',v:30,ic:'🔹'}];
const SL={atk:' ATK',mag:' MAG',def:' DEF',spd:' SPD',crit:'% CRIT',hp:' HP',mp:' MP'};
const S=(n,ic,d,cd,mp,m,t,o)=>Object.assign({n,ic,d,cd,mp,m,t},o);
const CH={
renn:{n:'Renn',ren:1,pants:'#1a1c26',hp:100,mp:100,atk:15,mag:12,def:8,spd:5,crit:5,gr:{hp:12,mp:6,atk:2.2,mag:1.8,def:1.2,spd:.05,crit:0},body:'#1a1c26',hair:'#111118',wp:'sword',sk:[
 S('Sword Slash','⚔️','Serangan pedang biasa ke musuh terdekat.',.5,0,1,'melee',{r:70,st:'atk',col:'#5aa8ff',im:'sword',ef:'slash'}),
 S('Arcane Slash','🌀','Pedang digabung energi sihir.',3,10,1.9,'melee',{r:95,st:'mag',col:'#b78cff',im:'wind',ef:'wind'}),
 S('Magic Burst','💥','Ledakan magic di sekitar target.',6,20,2.2,'aoe',{r:100,st:'mag',col:'#c07aff',at:'t',im:'fire',ef:'fire'}),
 S('Phantom Blade','🗡️','Lima tebasan energi menembus musuh.',8,25,1.2,'multi',{k:5,st:'mag',col:'#8ad0ff',pierce:1,sp:520,im:'wave',ef:'wave',ew:60}),
 S('Arcane Storm','🌪️','Serangan area besar (3 gelombang).',60,50,2.2,'aoe',{r:200,st:'mag',col:'#a060ff',at:'s',h:3,im:'wind',ef:'wind'}),
 S("Renn's Final Edge",'⚡','Damage sangat tinggi, menyambar 3 kali.',100,80,10,'aoe',{r:260,st:'atk',col:'#ffe066',at:'s',h:3,big:1,im:'bolt',ef:'bolt'})]},
sora:{n:'Sora',hp:80,mp:150,atk:5,mag:20,def:5,spd:4,crit:3,gr:{hp:9,mp:10,atk:.8,mag:2.8,def:.8,spd:.04,crit:0},body:'#7a3ab8',hair:'#e8e8ff',wp:'staff',long:1,sk:[
 S('Magic Bolt','✨','Menembakkan proyektil sihir.',.6,0,1,'proj',{st:'mag',col:'#9ff',sp:420}),
 S('Fire Burst','🔥','Serangan api pada target.',4,15,2.3,'aoe',{r:90,st:'mag',col:'#ff7a2a',at:'t'}),
 S('Ice Crystal','❄️','Damage + efek slow.',6,20,1.9,'proj',{st:'mag',col:'#8de',sp:380,slow:1}),
 S('Wind Cutter','🍃','Angin menembus musuh.',5,25,1.7,'proj',{st:'mag',col:'#bfb',sp:500,pierce:1}),
 S('Elemental Rain','☄️','Hujan elemental 5 kali di area.',60,60,1.4,'aoe',{r:150,st:'mag',col:'#6cf',at:'t',h:5}),
 S("Sora's Cataclysm",'🌋','Magic area besar, damage tinggi.',100,100,11,'aoe',{r:280,st:'mag',col:'#ff4a8a',at:'s',big:1})]}};
const EN={
goblin:{n:'Goblin',hp:40,atk:8,def:2,xp:2,g:[5,10],spd:80,col:'#5aa63a',z:13,dr:[['goblin_ear',5],['herb',15]]},
slime:{n:'Slime',hp:35,atk:6,def:1,xp:2,g:[3,8],spd:50,col:'#4ad0a0',z:13,dr:[['slime_core',25],['small_potion',10]]},
wolf:{n:'Wolf',hp:90,atk:12,def:4,xp:4,g:[8,15],spd:115,col:'#8a8a98',z:15,dr:[['wolf_fang',25],['meat',20]]},
orc:{n:'Orc',hp:220,atk:20,def:8,xp:8,g:[15,30],spd:70,col:'#6b8a3a',z:19,dr:[['orc_tooth',30],['iron_ore',20],['@',3]]},
dknight:{n:'Dark Knight',hp:500,atk:32,def:14,xp:15,g:[30,60],spd:85,col:'#2c2c44',z:19,dr:[['dark_crystal',35],['@',15]]},
boss:{n:'Demon Lord',hp:2500,atk:55,def:22,xp:50,g:[100,160],spd:75,col:'#7a1f5a',z:30,dr:[['boss_mat',100],['@',100],['@L',20]]}};
const ZN=[{x:[900,1380],lv:[1,4],sp:{goblin:6,slime:5,wolf:4}},{x:[1480,1780],lv:[8,12],sp:{wolf:3,orc:5,dknight:3}},{x:[1860,1960],lv:[15,18],sp:{dknight:2,boss:1}}];
const GATES=[{x:1430,lv:8,n:'Dark Forest'},{x:1820,lv:15,n:'Ruins'}];
const AREAS=[['Renn Village',1],['Forest',1],['Dark Forest',8],['Ruins / Demon Castle',15]];
const QS=[
{id:'q1',n:'Goblin Problem',need:{goblin:5},rw:{gold:100,xp:20,items:{small_potion:2}}},
{id:'q2',n:'Wolf Hunt',pre:'q1',need:{wolf:5},rw:{gold:150,xp:30,items:{wolf_fang:2}}},
{id:'q3',n:'Village Defense',pre:'q2',need:{goblin:5,wolf:3,orc:1},rw:{gold:500,xp:100,art:2}}];
const NPCS=[{id:'elder',n:'Village Elder',x:390,y:455,body:'#8a6a3a',hair:'#eee',hat:1,long:1},{id:'smith',n:'Blacksmith',x:255,y:395,body:'#7a3a2a',hair:'#333'},{id:'merchant',n:'Merchant',x:480,y:470,body:'#2a7a5a',hair:'#a05020'},{id:'healer',n:'Healer',x:430,y:420,body:'#e8e8f0',hair:'#f0a0c0',long:1},{id:'guard',n:'Captain Mira',x:560,y:540,body:'#a03030',hair:'#d8a030',long:1}];
const DL={elder:['Monster mulai muncul di sekitar desa.\nTolong bantu kami. Hutan Gelap butuh Lv.8, Reruntuhan butuh Lv.15.',[]],smith:['Bawa Iron Ore dan Gold, akan kutempa artifact-mu jadi lebih kuat.',[['Upgrade Artifact','op','inv']]],merchant:['Selamat datang! Lihat daganganku.',[['Buka Toko','op','shop']]],healer:['Biarkan aku menyembuhkan lukamu.',[['Sembuhkan (gratis)','heal']]],guard:['Desa butuh pahlawan. Ada tugas untukmu?',[['Lihat Quest','op','questN']]]};
const SHOP=['small_potion','large_potion','mana_potion','bread','meat','fish','iron_ore','herb','crystal'];
const SHOPART=[{b:0,r:0,u:0},{b:1,r:1,u:0},{b:2,r:1,u:0},{b:4,r:2,u:0}];
const CHESTS=[{id:'c1',k:0,x:520,y:880},{id:'c2',k:1,x:1100,y:260},{id:'c3',k:2,x:1640,y:880}];
const ROAD=[[60,600],[420,520],[800,600],[1200,640],[1500,580],[1950,600]],BR=[[[420,520],[260,400]],[[420,520],[620,380]],[[420,520],[270,690]],[[420,520],[650,700]]];
const HOUSES=[{x:190,y:250,w:130,h:100},{x:560,y:270,w:140,h:100},{x:200,y:700,w:130,h:100},{x:590,y:710,w:140,h:100}];
// ================= ASSETS =================
const IMG={};function ld(p){if(!IMG[p]){const i=new Image();i.onload=()=>i.ok=1;i.src=(self.ASSET_DATA&&ASSET_DATA[p])||p;IMG[p]=i}return IMG[p]}
const ULV=[0,0,0,0,10,15],LBL=['ATTACK','SKILL 1','SKILL 2','SKILL 3','ULT 1','ULT 2'],EFM={slash:'dir',wind:'spin',bolt:'bolt',wave:'dir',fire:'spin'};
const icoP=k=>'assets/skills/icon_'+k+'.png',efP=k=>'assets/effects/'+k+'_effect.png';
Object.values(CH).forEach(c=>c.sk.forEach(k=>{if(k.im){ld(icoP(k.im));ld(efP(k.ef))}}));
const tap=(el,f)=>{el.addEventListener('touchstart',e=>{e.preventDefault();f(e)},{passive:false});el.addEventListener('pointerdown',e=>{if(e.pointerType!='touch'){e.preventDefault();f(e)}})};
// ================= WORLD GEN =================
function sd(px,py,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=CL(((px-a[0])*dx+(py-a[1])*dy)/(dx*dx+dy*dy),0,1);return Math.hypot(px-a[0]-t*dx,py-a[1]-t*dy)}
function distRoad(x,y){let m=1e9;for(let i=0;i<ROAD.length-1;i++)m=Math.min(m,sd(x,y,ROAD[i],ROAD[i+1]));BR.forEach(b=>m=Math.min(m,sd(x,y,b[0],b[1])));return m}
const BG=(()=>{const b=document.createElement('canvas');b.width=MW;b.height=MH;const x=b.getContext('2d');let s=7;const r=()=>(s=s*16807%2147483647)/2147483647;
x.fillStyle='#62b03c';x.fillRect(0,0,MW,MH);x.fillStyle='rgba(10,50,40,.28)';x.fillRect(1430,0,390,MH);x.fillStyle='#4a4660';x.fillRect(1820,0,180,MH);
for(let i=0;i<9000;i++){const px=r()*MW,py=r()*MH;x.fillStyle=px>1820?'rgba(255,255,255,.06)':['#74c24a','#4f9a31','#86d055','#3f8a2a'][i%4];x.fillRect(px,py,2+r()*3,2+r()*3)}
x.lineCap=x.lineJoin='round';const pl=(p,w,c)=>{x.strokeStyle=c;x.lineWidth=w;x.beginPath();p.forEach((q,i)=>i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]));x.stroke()};
pl(ROAD,92,'#8a6a3c');pl(ROAD,82,'#d0ac6e');BR.forEach(b=>{pl(b,52,'#8a6a3c');pl(b,44,'#d0ac6e')});
x.fillStyle='#8a6a3c';x.beginPath();x.arc(420,520,118,0,PI2);x.fill();x.fillStyle='#d9b87a';x.beginPath();x.arc(420,520,110,0,PI2);x.fill();
const rv=[];for(let y=-20;y<=MH+20;y+=20)rv.push([820+Math.sin(y/60)*10,y]);pl(rv,76,'#c8b684');pl(rv,62,'#3d96d4');pl(rv,34,'#6ec0ee');
x.fillStyle='#6b4423';x.fillRect(768,564,104,72);x.fillStyle='#a8743a';x.fillRect(768,570,104,60);x.strokeStyle='#6b4423';x.lineWidth=2;for(let i=0;i<=104;i+=9){x.beginPath();x.moveTo(768+i,570);x.lineTo(768+i,630);x.stroke()}
for(let i=0;i<300;i++){const px=r()*1800,py=r()*MH;if(distRoad(px,py)<50||Math.abs(px-820)<50)continue;x.fillStyle=['#fff','#ffd23a','#ff8ac0','#9cf'][i%4];x.beginPath();x.arc(px,py,2.5,0,PI2);x.fill()}
for(let i=0;i<10;i++){x.fillStyle='#7a7690';x.fillRect(1850+(i%3)*50,120+i*100,22,50);x.fillStyle='#9a96b0';x.fillRect(1850+(i%3)*50,120+i*100,22,10)}
return b})();
const TREES=[];(()=>{let s=11;const r=()=>(s=s*16807%2147483647)/2147483647;
for(let i=0;i<5000&&TREES.length<190;i++){const x=r()*MW,y=r()*MH;if(x>1840)continue;if(distRoad(x,y)<55||Math.abs(x-820)<60||NPCS.some(n=>Math.hypot(n.x-x,n.y-y)<50)||HOUSES.some(h=>x>h.x-30&&x<h.x+h.w+30&&y>h.y-30&&y<h.y+h.h+30)||CHESTS.some(c=>Math.hypot(c.x-x,c.y-y)<40))continue;TREES.push({x,y,s:.8+r()*.6,d:x>1430})}})();
// ================= STATE =================
let G,T=0,PK='',PN=0,paused=true,shake=0,ens=[],PR=[],FX=[],PT=[],FL=[],TM=[],cam={x:0,y:0},shopTab='buy',swcd=0,gm=0,hudT=0,gmT=-9,tt;
const P=()=>G.hs[G.act],Cm=()=>G.hs[G.act=='renn'?'sora':'renn'];
const need=l=>l>=100?0:Math.min(100,10+5*(l-1));
const slots=()=>Math.min(6,2+Math.floor(G.lv/20));
const aVal=a=>+(ARTS[a.b].v*RAR[a.r][2]*(1+.25*a.u)).toFixed(1),aName=a=>ARTS[a.b].ic+' '+ARTS[a.b].n;
const artPrice=a=>Math.round(60*[1,2.5,6,15,40][a.r]*(1+.3*a.u));
function ST(ch){const c=CH[ch],l=G.lv-1,s={};for(const k in c.gr)s[k]=c[k]+c.gr[k]*l;G.arts.forEach(a=>{if(a.e)s[ARTS[a.b].s]+=aVal(a)});s.hp=Math.round(s.hp);s.mp=Math.round(s.mp);return s}
function mkH(ch,x,y){const s=ST(ch);return{ch,x,y,f:0,w:0,sw:0,mv:0,slow:0,cd:[0,0,0,0,0,0],hp:s.hp,mp:s.mp}}
function newG(){G={lv:1,xp:0,gold:50,inv:{small_potion:3},arts:[],act:'renn',q:{},ch:[],tm:.3,hs:{},dead:0};G.hs.renn=mkH('renn',400,570);G.hs.sora=mkH('sora',370,590);spawnAll()}
function spawnAll(){ens=[];ZN.forEach(z=>{for(const k in z.sp)for(let i=0;i<z.sp[k];i++)ens.push(mkE(k,z))});PR=[];FX=[];TM=[]}
function mkE(k,z){const t=EN[k],lv=RI(z.lv[0],z.lv[1]),s=1+.12*(lv-1);const e={k,t,lv,z,mhp:Math.round(t.hp*s),at:t.atk*s,df:t.def*(1+.08*(lv-1)),dead:0,rt:0,flash:0,slow:0,wind:0,cd:0,wt:0,dx:0,dy:0,aggro:0,dir:1};respawn(e);return e}
function respawn(e){let x,y;do{x=R(e.z.x[0],e.z.x[1]);y=e.k=='boss'?R(450,750):R(60,MH-60)}while(blocked(x,y));e.x=e.hx=x;e.y=e.hy=y;e.hp=e.mhp;e.dead=0}
function blocked(x,y,pl){if(x<14||y<14||x>MW-14||y>MH-14)return 1;if(Math.abs(x-(820+Math.sin(y/60)*10))<30&&!(y>570&&y<630))return 1;
for(const h of HOUSES)if(x>h.x-8&&x<h.x+h.w+8&&y>h.y+30&&y<h.y+h.h+6)return 1;
for(const t of TREES)if(Math.abs(t.x-x)<14&&Math.abs(t.y-y)<10)return 1;
if(pl)for(const gt of GATES)if(x>gt.x&&G.lv<gt.lv){if(T-gmT>2){gmT=T;toast('🔒 '+gt.n+' butuh Lv.'+gt.lv)}return 1}return 0}
function mv(o,dx,dy,pl){if(!blocked(o.x+dx,o.y,pl))o.x+=dx;if(!blocked(o.x,o.y+dy,pl))o.y+=dy}
// ================= ITEMS / XP =================
function addItem(id,n){G.inv[id]=(G.inv[id]||0)+n}
function rar(lv){let r=0;const b=1+lv/8;[.4,.25,.1,.03].forEach((c,i)=>{if(r==i&&Math.random()<c*b)r=i+1});return r}
function addArt(r,b){const a={b:b??RI(0,6),r,u:0,e:false};G.arts.push(a);return a}
function gainXP(n){if(G.lv>=100)return;G.xp+=n;while(G.lv<100&&G.xp>=need(G.lv)){G.xp-=need(G.lv);G.lv++;levelUp()}if(G.lv>=100)G.xp=0}
function levelUp(){[P(),Cm()].forEach(h=>{const s=ST(h.ch);h.hp=s.hp;h.mp=s.mp});const p=P();FX.push({k:'rg',x:p.x,y:p.y,r:120,l:.8,m:.8,c:'#ffd23a'});pt(p.x,p.y-20,'#ffd23a',40);banner(G.lv>=100?'MAX LEVEL!':'LEVEL UP!');toast('Level '+G.lv+'!');if(G.lv==10||G.lv==15)setTimeout(()=>toast('🔓 ULTIMATE '+(G.lv==10?1:2)+' UNLOCKED!'),1500)}
// ================= COMBAT =================
const flo=(x,y,t,c,s)=>FL.push({x,y,t,c,l:1,s:s||1});
function pt(x,y,c,n){for(let i=0;i<n;i++)PT.push({x,y,vx:R(-90,90),vy:R(-120,40),l:R(.3,.7),c})}
const near=(h,rng)=>{let b=null,bd=rng;for(const e of ens)if(!e.dead){const d=D(e,h)-e.t.z;if(d<bd){bd=d;b=e}}return b};
function dmg(h,sk,e){const s=ST(h.ch);let d=s[sk.st]*sk.m*R(.9,1.1);const c=Math.random()*100<s.crit;if(c)d*=2;return[Math.max(1,Math.round(d-e.df*.5)),c]}
function hurtE(e,d,c,col,sk){if(e.dead)return;e.hp-=d;e.flash=.12;e.aggro=3;if(sk&&sk.slow)e.slow=2.5;flo(e.x+R(-8,8),e.y-e.t.z*2-6,(c?'CRIT ':'')+d,c?'#ffd23a':'#fff',c?1.6:1);pt(e.x,e.y-12,col,c?10:5);FX.push({k:'rg',x:e.x,y:e.y-12,r:22,l:.2,m:.2,c:'#fff'});if(e.hp<=0)kill(e)}
function hurtP(e){const p=P(),s=ST(p.ch),d=Math.max(1,Math.round(e.at*R(.9,1.1)-s.def*.6));p.hp-=d;flo(p.x,p.y-50,'-'+d,'#f55');pt(p.x,p.y-14,'#f55',6);shake=4}
function kill(e){e.dead=1;e.rt=14;const t=e.t,gd=Math.round(RI(t.g[0],t.g[1])*(1+.1*(e.lv-1))),xp=Math.round(t.xp*(1+.15*(e.lv-1)));
G.gold+=gd;flo(e.x,e.y-40,'+'+gd+' Gold','#ffd23a');flo(e.x,e.y-58,'+'+xp+' XP','#7fe0ff');pt(e.x,e.y-12,t.col,28);FX.push({k:'rg',x:e.x,y:e.y,r:60,l:.5,m:.5,c:t.col});
let ly=76;t.dr.forEach(([id,ch])=>{if(Math.random()*100<ch){if(id[0]=='@'){const a=addArt(id=='@L'?RI(3,4):rar(e.lv));flo(e.x,e.y-ly,'🎁 '+aName(a),RAR[a.r][1],1.2)}else{addItem(id,1);flo(e.x,e.y-ly,'+'+ITEMS[id].n,'#9f9')}ly+=16}});
gainXP(xp);QS.forEach(q=>{const s=G.q[q.id];if(s&&s.s=='active'&&q.need[e.k]&&s.k[e.k]<q.need[e.k]){s.k[e.k]++;if(Object.keys(q.need).every(k=>s.k[k]>=q.need[k])){s.s='completed';toast('✔ Quest selesai: '+q.n)}}})}
function cast(h,i,tg){const sk=CH[h.ch].sk[i],isP=h==P();if(G.lv<ULV[i]){if(isP)toast('🔒 ULTIMATE '+(i-3)+' LOCKED — Unlock at Level '+ULV[i]);return}
if(h.cd[i]>0||(isP&&G.dead))return;
if(h.mp<sk.mp){if(isP)flo(h.x,h.y-55,'MP kurang','#7af');return}
h.mp-=sk.mp;h.cd[i]=sk.cd;tg=tg||near(h,sk.t=='melee'?sk.r:360);const a=tg?Math.atan2(tg.y-h.y,tg.x-h.x):h.f;h.f=a;h.sw=.25;
const hit=e=>{const[d,c]=dmg(h,sk,e);hurtE(e,d,c,sk.col,sk)};
if(sk.t=='melee'){sk.ef?FX.push({k:'im',i:sk.ef,x:h.x,y:h.y-14,a,w:sk.r*1.7,l:.3,m:.3}):FX.push({k:'sl',x:h.x,y:h.y-14,a,r:sk.r,l:.25,m:.25,c:sk.col});ens.forEach(e=>{if(e.dead)return;if(D(e,h)<sk.r+e.t.z&&Math.abs(AD(Math.atan2(e.y-h.y,e.x-h.x),a))<1.3)hit(e)})}
else if(sk.t=='proj'||sk.t=='multi'){const n=sk.k||1;for(let j=0;j<n;j++){const aa=a+(n>1?(j-(n-1)/2)*.2:0);PR.push({x:h.x,y:h.y-14,vx:Math.cos(aa)*sk.sp,vy:Math.sin(aa)*sk.sp,l:1.1,sk,h,hit:[]})}}
else{const c=sk.at=='t'?(tg||{x:h.x+Math.cos(a)*100,y:h.y+Math.sin(a)*100}):h,n=sk.h||1;
for(let j=0;j<n;j++)TM.push({t:j*.3,f:()=>{const q=sk.at=='t'&&j?{x:c.x+R(-50,50),y:c.y+R(-50,50)}:{x:c.x,y:c.y};FX.push({k:'rg',x:q.x,y:q.y,r:sk.r,l:.45,m:.45,c:sk.col});if(sk.ef){const n=sk.ef=='bolt'?(sk.big?6:3):1;for(let b=0;b<n;b++){const o=b?{x:q.x+R(-1,1)*sk.r*.7,y:q.y+R(-1,1)*sk.r*.5}:q;FX.push({k:'im',i:sk.ef,x:o.x,y:o.y,r:sk.ef=='bolt'?110:sk.r,l:.5,m:.5})}}pt(q.x,q.y,sk.col,sk.big?40:14);ens.forEach(e=>{if(!e.dead&&D(e,q)<sk.r+e.t.z)hit(e)})}});
if(sk.big)shake=14}}
function ai(c,dt){const p=P(),s=ST(c.ch),sp=95+s.spd*14;let tg=null,bd=300;for(const e of ens)if(!e.dead&&D(e,p)<320&&D(e,c)<bd){bd=D(e,c);tg=e}
let gx=p.x-34,gy=p.y+34,keep=60;
if(tg){const sk=CH[c.ch].sk[0],rng=sk.t=='melee'?sk.r*.7:230;gx=tg.x;gy=tg.y;keep=rng*.8;c.f=Math.atan2(tg.y-c.y,tg.x-c.x);
if(bd<rng){if(c.cd[0]<=0)cast(c,0,tg);else if(c.mp>s.mp*.5)for(let i=1;i<4;i++)if(c.cd[i]<=0&&c.mp>=CH[c.ch].sk[i].mp&&Math.random()<.02){cast(c,i,tg);break}}}
const d=Math.hypot(gx-c.x,gy-c.y);c.mv=0;if(d>keep){const a=Math.atan2(gy-c.y,gx-c.x);mv(c,Math.cos(a)*sp*dt,Math.sin(a)*sp*dt,1);c.w+=dt;c.mv=1}
if(D(c,p)>600){c.x=p.x-20;c.y=p.y+20}}
function updE(e,dt){if(e.dead){e.rt-=dt;if(e.rt<=0)respawn(e);return}
e.flash-=dt;e.slow-=dt;e.cd-=dt;const p=P(),t=e.t,sp=t.spd*(e.slow>0?.5:1),d=D(e,p),z=e.z,inz=p.x>z.x[0]-30&&p.x<z.x[1]+30;
if(e.wind>0){e.wind-=dt;if(e.wind<=0&&!G.dead&&D(e,p)<t.z+34)hurtP(e);return}
let tx=null,ty;const mE=(dx,dy)=>{mv(e,dx,dy,0);e.x=CL(e.x,z.x[0],z.x[1])};
if(!G.dead&&inz&&(d<200||e.aggro>0)){e.aggro-=dt;e.dir=p.x>e.x?1:-1;if(d>t.z+20){tx=p.x;ty=p.y}else if(e.cd<=0){e.wind=.5;e.cd=1.4;FX.push({k:'rg',x:e.x,y:e.y-10,r:30,l:.5,m:.5,c:'#f44'})}}
else{e.wt-=dt;if(e.wt<=0){e.wt=R(1,3);const a=R(0,PI2),m=Math.random()<.5?1:0;e.dx=Math.cos(a)*m;e.dy=Math.sin(a)*m}
if(D(e,{x:e.hx,y:e.hy})>140){tx=e.hx;ty=e.hy}else mE(e.dx*sp*.35*dt,e.dy*sp*.35*dt)}
if(tx!=null){const a=Math.atan2(ty-e.y,tx-e.x);mE(Math.cos(a)*sp*dt,Math.sin(a)*sp*dt)}}
// ================= UPDATE =================
const keys={},jv={x:0,y:0};
function inp(){let x=jv.x,y=jv.y;if(keys.a||keys.arrowleft)x--;if(keys.d||keys.arrowright)x++;if(keys.w||keys.arrowup)y--;if(keys.s||keys.arrowdown)y++;const l=Math.hypot(x,y);return l>1?[x/l,y/l]:[x,y]}
function update(dt){T+=dt;gm+=dt;G.tm=(G.tm+dt/200)%1;if(swcd>0)swcd-=dt;
const p=P(),c=Cm(),st=ST(p.ch);
[p,c].forEach(h=>{const s=ST(h.ch);h.cd=h.cd.map(v=>Math.max(0,v-dt));h.slow-=dt;h.sw-=dt;h.mp=Math.min(s.mp,h.mp+s.mp*.02*dt+dt);if(h.hp>0)h.hp=Math.min(s.hp,h.hp+s.hp*.004*dt)});
if(!G.dead){const[ix,iy]=inp();if(ix||iy){const sp=95+st.spd*14;mv(p,ix*sp*dt,iy*sp*dt,1);p.f=Math.atan2(iy,ix);p.w+=dt;p.mv=1}else p.mv=0;
if(keys[' ']){const k=CH[p.ch].sk[0];if(p.cd[0]<=0)cast(p,0)}
if(p.hp<=0){G.dead=2.5;banner('GAME OVER')}}
else{G.dead-=dt;if(G.dead<=0){G.dead=0;const lost=Math.floor(G.gold*.1);G.gold-=lost;[p,c].forEach(h=>{const s=ST(h.ch);h.x=400+(h==p?0:-30);h.y=570;h.hp=s.hp;h.mp=s.mp});toast('Respawn di desa (-'+lost+' Gold)')}}
c.hp=ST(c.ch).hp;ai(c,dt);
ens.forEach(e=>updE(e,dt));
PR=PR.filter(q=>{q.x+=q.vx*dt;q.y+=q.vy*dt;q.l-=dt;PT.push({x:q.x,y:q.y,vx:0,vy:0,l:.25,c:q.sk.col});
for(const e of ens){if(e.dead||q.hit.includes(e))continue;if(Math.hypot(e.x-q.x,e.y-e.t.z*.6-q.y)<e.t.z+8){const[d,cr]=dmg(q.h,q.sk,e);hurtE(e,d,cr,q.sk.col,q.sk);if(!q.sk.pierce)return false;q.hit.push(e)}}return q.l>0});
TM=TM.filter(o=>{o.t-=dt;if(o.t<=0){o.f();return false}return true});
FX=FX.filter(f=>(f.l-=dt)>0);PT=PT.filter(q=>{q.x+=q.vx*dt;q.y+=q.vy*dt;q.vy+=200*dt;return(q.l-=dt)>0});FL=FL.filter(f=>{f.y-=30*dt;return(f.l-=dt*.8)>0});
if(gm>30){gm=0;save(1)}}
// ================= DRAW =================
function rr(x,y,w,h,r,c){g.fillStyle=c;g.beginPath();g.roundRect(x,y,w,h,r);g.fill()}
function chibi(x,y,o,bob,d,sw){g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x,y,13,6,0,0,PI2);g.fill();y-=bob;const rn=o.ren;g.lineCap='round';
if(rn){g.strokeStyle='#3b4254';g.lineWidth=3;g.beginPath();g.moveTo(x-d*6,y-8);g.lineTo(x+d*8,y-46);g.stroke();g.strokeStyle='#2f8bff';g.beginPath();g.moveTo(x+d*8,y-46);g.lineTo(x+d*10,y-51);g.stroke()}
g.fillStyle=o.pants||'#3a2a20';g.fillRect(x-6,y-9,5,9);g.fillRect(x+1,y-9,5,9);
if(rn){g.fillStyle='#e8eaf0';g.fillRect(x-7,y-3,6,3);g.fillRect(x+1,y-3,6,3);g.fillStyle='#1a6cff';g.fillRect(x-7,y-5,6,2);g.fillRect(x+1,y-5,6,2)}
rr(x-9,y-27,18,20,5,o.body);
if(rn){g.fillStyle='#e8eaf0';g.fillRect(x-3,y-25,6,11);g.fillStyle='#1a6cff';g.fillRect(x-8,y-28,16,3);g.fillRect(x-9,y-14,18,3);rr(x-13,y-26,5,10,2,o.body);rr(x+8,y-26,5,10,2,o.body);g.fillStyle='#1a6cff';g.fillRect(x-13,y-18,5,2);g.fillRect(x+8,y-18,5,2);g.fillStyle='#111';g.fillRect(x-13,y-16,5,4);g.fillRect(x+8,y-16,5,4)}
else{g.fillStyle='#e8c060';g.fillRect(x-9,y-14,18,3)}
g.fillStyle='#ffd9b8';g.beginPath();g.arc(x,y-35,11,0,PI2);g.fill();g.fillStyle=o.hair;g.beginPath();g.arc(x,y-37,11.5,Math.PI,0);g.fill();
if(rn){[-9,-4,1,6].forEach((i,k)=>{g.beginPath();g.moveTo(x+i,y-44);g.lineTo(x+i+3,y-53-(k%2)*3);g.lineTo(x+i+7,y-44);g.fill()});g.fillRect(x-11,y-38,5,11);g.fillRect(x+6,y-38,5,11);g.fillRect(x-3,y-40,6,6)}
else{g.fillRect(x-12,y-38,5,o.long?22:12);g.fillRect(x+7,y-38,5,o.long?22:12)}
if(o.hat){g.fillStyle='#6a4a2a';g.fillRect(x-14,y-46,28,4);g.fillRect(x-8,y-56,16,11)}
g.fillStyle=rn?'#2a6cff':'#222';g.fillRect(x-5+d*2,y-35,3,5);g.fillRect(x+2+d*2,y-35,3,5);
if(o.wp){const wx=x+d*14+(sw>0?d*10:0),wy=y-16;if(o.wp=='sword'){if(rn){g.shadowColor='#2f8bff';g.shadowBlur=8}g.strokeStyle=rn?'#3b8cff':'#e6efff';g.lineWidth=4;g.beginPath();g.moveTo(wx,wy);g.lineTo(wx+d*3,wy-30);g.stroke();g.shadowBlur=0;g.strokeStyle=rn?'#222':'#c9a227';g.lineWidth=3;g.beginPath();g.moveTo(wx-5,wy);g.lineTo(wx+5,wy);g.stroke()}else{g.strokeStyle='#7a4a1c';g.lineWidth=3;g.beginPath();g.moveTo(wx,wy+8);g.lineTo(wx,wy-34);g.stroke();g.fillStyle='#7ff';g.beginPath();g.arc(wx,wy-38,5,0,PI2);g.fill()}}}
function label(t,x,y,c){g.font='bold 11px sans-serif';g.textAlign='center';g.lineWidth=3;g.strokeStyle='#000';g.strokeText(t,x,y);g.fillStyle=c||'#fff';g.fillText(t,x,y)}
function drawH(h){const act=h==P();chibi(h.x,h.y,CH[h.ch],h.mv?Math.abs(Math.sin(h.w*10))*3:0,Math.cos(h.f)>=0?1:-1,h.sw);if(act){g.strokeStyle='#ffd23a';g.lineWidth=2;g.beginPath();g.ellipse(h.x,h.y,17,8,0,0,PI2);g.stroke()}else label(CH[h.ch].n,h.x,h.y-62,'#9cf')}
function drawNpc(n){chibi(n.x,n.y,n,0,1,0);label(n.n,n.x,n.y-62,'#ffe9a0');if(n.id=='guard'){const m=QS.some(q=>qs(q)=='available'||qs(q)=='completed');if(m){g.fillStyle='#ffd23a';g.font='bold 22px sans-serif';g.textAlign='center';g.fillText('❗',n.x,n.y-72+Math.sin(T*5)*3)}}}
function drawE(e){const t=e.t,x=e.x,y=e.y,z=t.z,k=e.k,d=e.dir,b=Math.sin(T*8+x)*1.5;g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x,y,z,z*.4,0,0,PI2);g.fill();g.fillStyle=e.flash>0?'#fff':t.col;
if(k=='slime'){g.beginPath();g.ellipse(x,y-2,z,z*.9+b,0,Math.PI,PI2);g.fill();g.fillStyle='#fff';g.fillRect(x-6,y-z*.6,4,5);g.fillRect(x+3,y-z*.6,4,5)}
else if(k=='wolf'){g.beginPath();g.ellipse(x,y-z*.7,z*1.1,z*.6,0,0,PI2);g.fill();g.beginPath();g.arc(x+d*z,y-z*1.1+b,z*.5,0,PI2);g.fill();g.beginPath();g.moveTo(x+d*z*.8,y-z*1.5);g.lineTo(x+d*z*.9,y-z*1.95);g.lineTo(x+d*z*1.2,y-z*1.5);g.fill();g.fillStyle='#f33';g.fillRect(x+d*z*1.2-1,y-z*1.2+b,3,3)}
else{g.fillRect(x-z*.5,y-z*1.3,z,z*1.2+b);g.beginPath();g.arc(x,y-z*1.65+b,z*.55,0,PI2);g.fill();
if(k=='goblin'){g.beginPath();g.moveTo(x-z*.5,y-z*1.7);g.lineTo(x-z*1.1,y-z*2);g.lineTo(x-z*.5,y-z*1.4);g.moveTo(x+z*.5,y-z*1.7);g.lineTo(x+z*1.1,y-z*2);g.lineTo(x+z*.5,y-z*1.4);g.fill()}
if(k=='orc'){g.fillStyle='#fff';g.fillRect(x-z*.35,y-z*1.4,3,6);g.fillRect(x+z*.3,y-z*1.4,3,6)}
if(k=='dknight'||k=='boss'){g.fillStyle=k=='boss'?'#ff6aa0':'#555';g.beginPath();g.moveTo(x-z*.5,y-z*2);g.lineTo(x-z*.7,y-z*2.6);g.lineTo(x-z*.2,y-z*2.1);g.moveTo(x+z*.5,y-z*2);g.lineTo(x+z*.7,y-z*2.6);g.lineTo(x+z*.2,y-z*2.1);g.fill()}
g.fillStyle=(k=='dknight'||k=='boss')?'#f33':'#111';g.fillRect(x-z*.3,y-z*1.7+b,3,4);g.fillRect(x+z*.1,y-z*1.7+b,3,4)}
const by=y-z*2.7;g.fillStyle='#000a';g.fillRect(x-18,by,36,5);g.fillStyle=e.k=='boss'?'#c3f':'#e33';g.fillRect(x-17,by+1,34*Math.max(0,e.hp/e.mhp),3);label('Lv.'+e.lv+' '+t.n,x,by-3,e.wind>0?'#f66':'#fff')}
function drawHouse(o){const{x,y,w,h}=o;g.fillStyle='rgba(0,0,0,.25)';g.fillRect(x+6,y+h-4,w,10);g.fillStyle='#a8743a';g.fillRect(x,y+30,w,h-30);g.strokeStyle='#7a5226';g.lineWidth=2;for(let i=y+40;i<y+h;i+=10){g.beginPath();g.moveTo(x,i);g.lineTo(x+w,i);g.stroke()}
g.fillStyle='#5a3513';g.fillRect(x+w/2-12,y+h-34,24,34);g.fillStyle='#ffd77a';g.fillRect(x+12,y+50,22,20);g.fillRect(x+w-34,y+50,22,20);
g.fillStyle='#d6b052';g.beginPath();g.moveTo(x-14,y+38);g.lineTo(x+w/2,y-16);g.lineTo(x+w+14,y+38);g.closePath();g.fill();g.strokeStyle='#a78531';for(let i=1;i<6;i++){g.beginPath();g.moveTo(x-14+i*(w+28)/6,y+38);g.lineTo(x+w/2,y-16);g.stroke()}}
function drawTree(t){const{x,y,s}=t;g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.ellipse(x,y,16*s,6*s,0,0,PI2);g.fill();g.fillStyle='#5a3a1c';g.fillRect(x-4*s,y-26*s,8*s,26*s);const c=t.d?['#1f5a3a','#2c7048']:['#2f8a2f','#47a83a'];g.fillStyle=c[0];g.beginPath();g.arc(x,y-42*s,22*s,0,PI2);g.fill();g.fillStyle=c[1];g.beginPath();g.arc(x-6*s,y-48*s,14*s,0,PI2);g.fill()}
function drawChest(c){const o=G.ch.includes(c.id),col=['#8a5a2b','#aab4c0','#e8b830'][c.k];g.fillStyle='rgba(0,0,0,.3)';g.fillRect(c.x-16,c.y-2,32,6);rr(c.x-15,c.y-16,30,16,3,col);rr(c.x-15,c.y-(o?30:24),30,10,3,o?'#222':col);g.fillStyle='#ffe';g.fillRect(c.x-3,c.y-12,6,6);if(!o&&D(c,P())<90)label('F: Buka',c.x,c.y-34,'#ff8')}
function drawIm(f,u){const im=ld(efP(f.i));if(!im.ok)return;const md=EFM[f.i],t=1-u;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=Math.min(1,u*1.6);
if(md=='bolt'){const hh=f.r*2.6,ww=hh*im.width/im.height;g.drawImage(im,f.x-ww/2,f.y-hh+10,ww,hh)}
else if(f.a!==undefined){g.translate(f.x,f.y);g.rotate(f.a);const ww=f.w,hh=ww*im.height/im.width;g.drawImage(im,6,-hh/2,ww,hh)}
else{const w=f.r*2.2*(.7+.3*t),hh=w*im.height/im.width;g.translate(f.x,f.y);if(md=='spin')g.rotate(T*8);g.drawImage(im,-w/2,-hh/2,w,hh)}g.restore()}
const SV={talk:'<svg viewBox="0 0 32 32"><path d="M4 5h24a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H15l-6 6v-6H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" fill="#fff" stroke="#c8902a" stroke-width="2"/><circle cx="9" cy="14" r="2" fill="#c8902a"/><circle cx="16" cy="14" r="2" fill="#c8902a"/><circle cx="23" cy="14" r="2" fill="#c8902a"/></svg>',quest:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#ffd23a" stroke="#a40" stroke-width="2"/><rect x="14" y="7" width="4" height="12" rx="2" fill="#a40"/><circle cx="16" cy="24" r="2.5" fill="#a40"/></svg>',shop:'<svg viewBox="0 0 32 32"><path d="M6 11h20l-2 17H8z" fill="#2a8a3a" stroke="#fff" stroke-width="2"/><path d="M11 12a5 5 0 0 1 10 0" fill="none" stroke="#fff" stroke-width="2"/><circle cx="16" cy="20" r="4" fill="#ffd23a"/></svg>',chest:'<svg viewBox="0 0 32 32"><rect x="3" y="14" width="26" height="14" rx="2" fill="#c8902a" stroke="#5a3513" stroke-width="2"/><path d="M3 14a13 9 0 0 1 26 0z" fill="#e8b830" stroke="#5a3513" stroke-width="2"/><rect x="14" y="16" width="4" height="7" fill="#fff"/></svg>',heal:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#fff" stroke="#d33" stroke-width="2"/><path d="M13 7h6v6h6v6h-6v6h-6v-6H7v-6h6z" fill="#d33"/></svg>'};
let indK='';function indUI(){const el=$('ind'),o=paused||G.dead?null:nearObj();if(!o){el.classList.add('hide');return}
const id=o.t=='c'?'chest':o.o.id,lab=o.t=='c'?['Wooden Chest','Silver Chest','Golden Chest'][o.o.k]:o.o.n;
if(indK!=id){indK=id;$('indi').innerHTML=SV[{elder:'talk',smith:'talk',merchant:'shop',healer:'heal',guard:'quest',chest:'chest'}[id]];$('indl').textContent=lab}
el.classList.remove('hide');el.style.left=(o.o.x-cam.x)/W*100+'%';el.style.top=(o.o.y-cam.y-80)/H*100+'%'}
function draw(){const p=P();cam.x=CL(p.x-W/2,0,MW-W);cam.y=CL(p.y-H/2,0,MH-H);let sx=0,sy=0;if(shake>0){sx=R(-shake,shake);sy=R(-shake,shake);shake=Math.max(0,shake-1)}
g.setTransform(1,0,0,1,0,0);g.drawImage(BG,cam.x,cam.y,W,H,0,0,W,H);g.setTransform(1,0,0,1,-cam.x+sx,-cam.y+sy);
GATES.forEach(gt=>{if(G.lv<gt.lv){g.fillStyle='rgba(180,80,255,'+(.3+.15*Math.sin(T*4))+')';g.fillRect(gt.x-6,0,12,MH);label('🔒 Lv.'+gt.lv,gt.x,p.y-80,'#e8c0ff')}});
const L=[];HOUSES.forEach(h=>L.push([h.y+h.h,()=>drawHouse(h)]));TREES.forEach(t=>{if(t.x>cam.x-40&&t.x<cam.x+W+40&&t.y>cam.y&&t.y<cam.y+H+90)L.push([t.y,()=>drawTree(t)])});
NPCS.forEach(n=>L.push([n.y,()=>drawNpc(n)]));CHESTS.forEach(c=>L.push([c.y,()=>drawChest(c)]));ens.forEach(e=>{if(!e.dead&&Math.abs(e.x-p.x)<600&&Math.abs(e.y-p.y)<400)L.push([e.y,()=>drawE(e)])});[Cm(),p].forEach(h=>L.push([h.y,()=>drawH(h)]));
L.sort((a,b)=>a[0]-b[0]).forEach(o=>o[1]());
PR.forEach(q=>{if(q.sk.ef){const im=ld(efP(q.sk.ef));if(im.ok){const w=q.sk.ew||70,hh=w*im.height/im.width;g.save();g.globalCompositeOperation='lighter';g.translate(q.x,q.y);g.rotate(EFM[q.sk.ef]=='spin'?T*12:Math.atan2(q.vy,q.vx));g.drawImage(im,-w/2,-hh/2,w,hh);g.restore();return}}g.fillStyle=q.sk.col;g.shadowColor=q.sk.col;g.shadowBlur=10;g.beginPath();g.arc(q.x,q.y,6,0,PI2);g.fill();g.shadowBlur=0});
FX.forEach(f=>{const u=f.l/f.m;if(f.k=='im'){g.globalAlpha=1;drawIm(f,u);return}g.globalAlpha=Math.max(0,u);g.strokeStyle=f.c;g.fillStyle=f.c;if(f.k=='rg'){const r=f.r*(1-u*.7);g.lineWidth=5;g.beginPath();g.arc(f.x,f.y,r,0,PI2);g.stroke();g.globalAlpha=u*.25;g.fill()}else{g.lineWidth=10;g.beginPath();g.arc(f.x,f.y,f.r*.8,f.a-1,f.a+1);g.stroke()}g.globalAlpha=1});
PT.forEach(q=>{g.globalAlpha=Math.min(1,q.l*2);g.fillStyle=q.c;g.fillRect(q.x,q.y,3,3)});g.globalAlpha=1;
FL.forEach(f=>{g.globalAlpha=Math.min(1,f.l*1.5);g.font='bold '+14*f.s+'px sans-serif';g.textAlign='center';g.lineWidth=3;g.strokeStyle='#000';g.strokeText(f.t,f.x,f.y);g.fillStyle=f.c;g.fillText(f.t,f.x,f.y)});g.globalAlpha=1;
g.setTransform(1,0,0,1,0,0);const n=Math.max(0,Math.sin((G.tm-.25)*PI2)*-1);if(n>0){g.fillStyle='rgba(10,10,60,'+n*.45+')';g.fillRect(0,0,W,H)}
const m=$('mm').getContext('2d');m.drawImage(BG,0,0,120,72);const k=120/MW;m.fillStyle='#f33';ens.forEach(e=>{if(!e.dead)m.fillRect(e.x*k,e.y*k,2,2)});m.fillStyle='#ff0';NPCS.forEach(o=>m.fillRect(o.x*k,o.y*k,3,3));m.fillStyle='#fa0';CHESTS.forEach(o=>{if(!G.ch.includes(o.id))m.fillRect(o.x*k,o.y*k,3,3)});m.fillStyle='#fff';m.fillRect(p.x*k-2,p.y*k-2,4,4);indUI()}
// ================= UI =================
const B=(a,v,t,c)=>`<button data-a="${a}" data-v="${v}" class="${c||''}">${t}</button>`;
function toast(m){const e=$('toast');e.textContent=m;e.style.opacity=1;clearTimeout(tt);tt=setTimeout(()=>e.style.opacity=0,2000)}
function banner(t){const b=$('banner');b.textContent=t;b.classList.remove('show');void b.offsetWidth;b.classList.add('show')}
const qs=q=>{const s=G.q[q.id];return s?s.s:(!q.pre||(G.q[q.pre]&&G.q[q.pre].s=='claimed')?'available':'locked')};
const rwTxt=r=>`${r.gold}G, ${r.xp}XP`+(r.items?', '+Object.keys(r.items).map(i=>ITEMS[i].n+' ×'+r.items[i]).join(', '):'')+(r.art?', Rare Artifact':'');
let skb=[];(()=>{const c=$('skills');for(let i=0;i<6;i++){const b=document.createElement('button');b.className='sk s'+i;b.innerHTML='<span class=ic></span><i class=co></i><b class=ct></b><small></small><u></u>';tap(b,()=>{if(!paused)cast(P(),i)});c.appendChild(b);skb.push(b)}})();
function skUI(){const h=P(),ss=CH[h.ch].sk;skb.forEach((b,i)=>{const lk=G.lv<ULV[i];b.classList.toggle('hide',lk);if(lk)return;const s=ss[i],c=h.cd[i],k=b.children,im=s.im&&ld(icoP(s.im)),key=h.ch+i+(im&&im.ok?1:0);
if(b._k!=key){b._k=key;k[0].innerHTML=im&&im.ok?`<img src="${im.src}">`:s.ic;k[4].textContent='';k[3].textContent=''}
k[1].style.height=(c>0?c/s.cd*100:0)+'%';k[2].textContent=c>0?Math.ceil(c):'';b.classList.toggle('lo',h.mp<s.mp)})}
function hud(){const p=P(),s=ST(p.ch);$('pname').textContent=CH[p.ch].n.toUpperCase();$('plv').textContent='LV.'+G.lv;
$('hp').style.width=Math.max(0,p.hp/s.hp*100)+'%';$('hpt').textContent=Math.max(0,Math.ceil(p.hp))+'/'+s.hp;$('mp').style.width=p.mp/s.mp*100+'%';$('mpt').textContent=Math.floor(p.mp)+'/'+s.mp;
$('xp').style.width=G.lv>=100?'100%':G.xp/need(G.lv)*100+'%';$('xpt').textContent=G.lv>=100?'MAX LEVEL':'XP '+G.xp+'/'+need(G.lv);$('gold').textContent='💰 Gold: '+G.gold;
const aq=QS.find(q=>G.q[q.id]&&(G.q[q.id].s=='active'||G.q[q.id].s=='completed'));$('qt').innerHTML=aq?'📜 <b>'+aq.n+'</b>'+(G.q[aq.id].s=='completed'?' ✔ lapor ke Mira':'<br>'+Object.keys(aq.need).map(k=>EN[k].n+' '+G.q[aq.id].k[k]+'/'+aq.need[k]).join(' · ')):'📜 Temui Captain Mira ❗';}
function nearObj(){const p=P();let b=null,bd=70;NPCS.forEach(n=>{const d=D(n,p);if(d<bd){bd=d;b={t:'n',o:n}}});CHESTS.forEach(c=>{if(!G.ch.includes(c.id)){const d=D(c,p);if(d<bd){bd=d;b={t:'c',o:c}}}});return b}
function interact(){const o=nearObj();if(!o||G.dead)return;if(o.t=='n'){$('dlg').innerHTML=`<b style="color:#ffd23a">${o.o.n}</b><p>${DL[o.o.id][0].replace('\n','<br>')}</p>`+DL[o.o.id][1].map(x=>B(x[1],x[2]||'',x[0])).join('')+B('x','','Tutup');$('dlg').classList.remove('hide')}
else{const c=o.o,k=c.k,gd=RI(30,80)*(k+1)*(k+1);G.gold+=gd;G.ch.push(c.id);const msg=['+'+gd+' Gold'];const it=[['small_potion','mana_potion','herb'],['large_potion','iron_ore','crystal'],['large_potion','dark_crystal','crystal']][k][RI(0,2)];addItem(it,k+1);msg.push(ITEMS[it].n+' ×'+(k+1));
if(Math.random()<[.2,.6,1][k]){const a=addArt(Math.max([0,1,2][k],rar(k*8)));msg.push(aName(a)+' ['+RAR[a.r][0]+']')}
toast('📦 '+msg.join(', '));pt(c.x,c.y-20,'#ffd23a',30);FX.push({k:'rg',x:c.x,y:c.y,r:60,l:.5,m:.5,c:'#ffd23a'})}}
function open(k){PN=0;if(k=='questN'){k='quest';PN=1}PK=k;$('dlg').classList.add('hide');$('panel').classList.remove('hide');render()}
function close(){PK='';$('panel').classList.add('hide');$('dlg').classList.add('hide')}
function render(){if(!PK)return;const f={inv:rInv,char:rChar,quest:rQuest,shop:rShop,map:rMap,menu:rMenu}[PK];$('pc').innerHTML=f()}
function rInv(){const eq=G.arts.filter(a=>a.e).length,ids=Object.keys(G.inv).filter(i=>G.inv[i]>0);
let h=`<h2>🎒 Inventory</h2><p>Gold: ${G.gold} · Slot Artifact: ${eq}/${slots()} (+1 tiap 20 level, maks 6)</p><h3>Item</h3><div class=grid>`;
h+=ids.length?ids.map(i=>{const it=ITEMS[i];return`<div class=cell>${it.ic} <b>${it.n}</b> ×${G.inv[i]}<br><small>${it.t=='c'?'Consumable':'Material'}</small><br>${it.t=='c'?B('use',i,'Pakai'):''}</div>`}).join(''):'<i>Kosong</i>';
h+='</div><h3>Artifact</h3><div class=grid>';
h+=G.arts.length?G.arts.map((a,i)=>{const r=RAR[a.r];return`<div class=cell style="border-color:${r[1]}"><b style="color:${r[1]}">${r[0]}</b> ${aName(a)}${a.u?' +'+a.u:''}<br>+${aVal(a)}${SL[ARTS[a.b].s]}${a.e?' ✅':''}<br>${B('eq',i,a.e?'Lepas':'Pasang')}${a.u<5?B('up',i,`⬆ ${(a.u+1)*2} Ore + ${(a.u+1)*50}G`):''}</div>`}).join(''):'<i>Belum ada artifact</i>';
return h+'</div>'}
function rChar(){let h='<h2>🧙 Karakter</h2><div class=grid>';for(const k in CH){const c=CH[k],s=ST(k),a=G.act==k;h+=`<div class=cell style="border-color:${a?'#ffd23a':'#6a4a20'}"><b>${c.n}</b> — ${k=='renn'?'The Shadow Walker (Magic Swordsman)':'Mage / Witch'} ${a?'(Aktif)':'(Companion)'}<br>HP ${s.hp} · MP ${s.mp}<br>ATK ${s.atk.toFixed(0)} · MAG ${s.mag.toFixed(0)} · DEF ${s.def.toFixed(0)}<br>SPD ${s.spd.toFixed(1)} · CRIT ${s.crit.toFixed(1)}%<br>${a?'':B('sw',0,'Pilih')}</div>`}
return h+'</div><h3>Skill '+CH[G.act].n+'</h3>'+CH[G.act].sk.map((s,i)=>G.lv<ULV[i]?`<p>🔒 <b>ULTIMATE ${i-3}</b> — LOCKED · Unlock at Level ${ULV[i]}</p>`:`<p>${s.ic} <b>${s.n}</b> — ${s.d} <small>(DMG ×${s.m} · CD ${s.cd}s · MP ${s.mp})</small></p>`).join('')}
function rQuest(){let h='<h2>📜 Quest</h2>'+(PN?'':'<small>Terima/klaim quest di Captain Mira.</small>');QS.forEach(q=>{const st=qs(q);if(st=='locked')return;const s=G.q[q.id];
h+=`<div class=cell><b>${q.n}</b> [${st.toUpperCase()}]<br>${Object.keys(q.need).map(k=>`${EN[k].n} ${s?s.k[k]:0}/${q.need[k]}`).join(', ')}<br>Hadiah: ${rwTxt(q.rw)}<br>`+(PN&&st=='available'?B('qa',q.id,'Terima'):'')+(PN&&st=='completed'?B('qc',q.id,'Klaim'):'')+'</div>'});return h}
function rShop(){let h=`<h2>🛒 Merchant</h2><p>Gold: ${G.gold}</p>${B('tab','buy','Beli',shopTab=='buy'?'on':'')}${B('tab','sell','Jual',shopTab=='sell'?'on':'')}<div class=grid>`;
if(shopTab=='buy')h+=SHOP.map(i=>`<div class=cell>${ITEMS[i].ic} ${ITEMS[i].n}<br>${ITEMS[i].p}G ${B('buy',i,'Beli')}</div>`).join('')+SHOPART.map((a,i)=>`<div class=cell style="border-color:${RAR[a.r][1]}"><b style="color:${RAR[a.r][1]}">${RAR[a.r][0]}</b> ${aName(a)}<br>+${aVal(a)}${SL[ARTS[a.b].s]} · ${artPrice(a)}G ${B('buyA',i,'Beli')}</div>`).join('');
else h+=Object.keys(G.inv).filter(i=>G.inv[i]>0).map(i=>`<div class=cell>${ITEMS[i].ic} ${ITEMS[i].n} ×${G.inv[i]}<br>${B('sellI',i,'Jual '+Math.floor(ITEMS[i].p/2)+'G')}</div>`).join('')+G.arts.map((a,i)=>a.e?'':`<div class=cell style="border-color:${RAR[a.r][1]}">${aName(a)} [${RAR[a.r][0]}]<br>${B('sellA',i,'Jual '+Math.floor(artPrice(a)/2)+'G')}</div>`).join('');
return h+'</div>'}
function rMap(){const x=P().x;return'<h2>🗺️ Peta</h2>'+AREAS.map((a,i)=>`<p>${G.lv>=a[1]?'✅':'🔒'} <b>${a[0]}</b> — Lv.${a[1]}</p>`).join('')+`<p>Posisi: ${x<860?'Renn Village':x<1430?'Forest':x<1820?'Dark Forest':'Ruins'}</p><small>Titik putih = kamu · merah = monster · kuning = NPC · oranye = chest</small>`}
function rMenu(){return`<h2>⏸ Menu</h2>${B('x','','▶ Lanjut')}${B('save','','💾 Save Game')}${B('load','','📂 Load Game')}${B('new','','🔄 Game Baru')}<p>WASD gerak · Space serang · 1/2/3 skill · Q Ultimate 1 (Lv10) · R Ultimate 2 (Lv15) · E interaksi · T ganti karakter · I inventory · J quest · C karakter · M peta · Esc menu</p>`}
function save(auto){try{localStorage.setItem('rennx_save',JSON.stringify(G));if(!auto)toast('💾 Game tersimpan')}catch(e){if(!auto)toast('Save tidak didukung di sini')}}
function load(){let s=null;try{s=localStorage.getItem('rennx_save')}catch(e){}if(!s)return 0;G=JSON.parse(s);spawnAll();return 1}
function sw(){if(swcd>0||G.dead)return;swcd=1;const a=P(),b=Cm(),t={x:a.x,y:a.y};G.act=G.act=='renn'?'sora':'renn';a.x=b.x;a.y=b.y;b.x=t.x;b.y=t.y;pt(b.x,b.y-20,'#fff',16);toast('Karakter: '+CH[G.act].n)}
function act(a,v){const p=P();switch(a){
case 'start':newG();$('title').classList.add('hide');return;
case 'cont':if(load())$('title').classList.add('hide');else toast('Belum ada save');return;
case 'op':if(v=='shop'&&!(D(NPCS[2],p)<100)){toast('Dekati Merchant dulu');return}open(v);return;
case 'x':close();return;
case 'sw':sw();break;
case 'heal':{[p,Cm()].forEach(h=>{const s=ST(h.ch);h.hp=s.hp;h.mp=s.mp});toast('❤️ HP & MP pulih');close();return}
case 'use':{const it=ITEMS[v],s=ST(p.ch);if(G.inv[v]>0){G.inv[v]--;if(it.hp){p.hp=Math.min(s.hp,p.hp+it.hp);flo(p.x,p.y-55,'+'+it.hp+' HP','#5f5')}if(it.mp){p.mp=Math.min(s.mp,p.mp+it.mp);flo(p.x,p.y-55,'+'+it.mp+' MP','#7af')}}break}
case 'eq':{const a=G.arts[v];if(!a.e&&G.arts.filter(x=>x.e).length>=slots()){toast('Slot artifact penuh ('+slots()+')');return}a.e=!a.e;break}
case 'up':{const a=G.arts[v],o=(a.u+1)*2,gc=(a.u+1)*50;if((G.inv.iron_ore||0)>=o&&G.gold>=gc){G.inv.iron_ore-=o;G.gold-=gc;a.u++;toast('⬆ Artifact di-upgrade')}else toast('Butuh '+o+' Iron Ore & '+gc+' Gold');break}
case 'tab':shopTab=v;break;
case 'buy':{const it=ITEMS[v];if(G.gold>=it.p){G.gold-=it.p;addItem(v,1)}else toast('Gold kurang');break}
case 'buyA':{const a=SHOPART[v],c=artPrice(a);if(G.gold>=c){G.gold-=c;G.arts.push({b:a.b,r:a.r,u:0,e:false})}else toast('Gold kurang');break}
case 'sellI':if(G.inv[v]>0){G.inv[v]--;G.gold+=Math.floor(ITEMS[v].p/2)}break;
case 'sellA':G.gold+=Math.floor(artPrice(G.arts[v])/2);G.arts.splice(v,1);break;
case 'qa':{const q=QS.find(x=>x.id==v);G.q[v]={s:'active',k:Object.fromEntries(Object.keys(q.need).map(k=>[k,0]))};toast('Quest diterima');break}
case 'qc':{const q=QS.find(x=>x.id==v),r=q.rw;G.q[v].s='claimed';G.gold+=r.gold;if(r.items)for(const i in r.items)addItem(i,r.items[i]);if(r.art)addArt(2);gainXP(r.xp);toast('🎁 Hadiah: '+rwTxt(r));break}
case 'save':save();return;
case 'load':if(load()){toast('Game dimuat');close()}else toast('Belum ada save');return;
case 'new':newG();close();return}
render()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(b)act(b.dataset.a,b.dataset.v)});
const tog=k=>{if(PK==k&&!$('panel').classList.contains('hide'))close();else open(k)};
addEventListener('keydown',e=>{const k=e.key.toLowerCase();keys[k]=1;if(k==' ')e.preventDefault();if(k=='escape'){if(paused)close();else open('menu');return}
if(!$('title').classList.contains('hide'))return;
if('ijmc'.includes(k)&&k.length==1){tog({i:'inv',j:'quest',m:'map',c:'char'}[k]);return}
if(paused)return;const sk={' ':0,1:1,2:2,3:3,q:4,r:5}[k];if(sk!==undefined)cast(P(),sk);if(k=='e'||k=='f')interact();if(k=='t')sw()});
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=0);
tap($('ind'),()=>{if(!paused)interact()});
const joy=$('joy'),kn=$('knob');let jid=null;
function jm(cx,cy){const r=joy.getBoundingClientRect();let dx=(cx-r.left-r.width/2)/(r.width/2),dy=(cy-r.top-r.height/2)/(r.height/2);const l=Math.hypot(dx,dy);if(l>1){dx/=l;dy/=l}jv.x=Math.abs(dx)<.15?0:dx;jv.y=Math.abs(dy)<.15?0:dy;kn.style.transform=`translate(${-50+dx*60}%,${-50+dy*60}%)`}
function jr(){jid=null;jv.x=jv.y=0;kn.style.transform='translate(-50%,-50%)'}
joy.addEventListener('touchstart',e=>{e.preventDefault();const t=e.changedTouches[0];jid=t.identifier;jm(t.clientX,t.clientY)},{passive:false});
joy.addEventListener('touchmove',e=>{e.preventDefault();for(const t of e.changedTouches)if(t.identifier===jid)jm(t.clientX,t.clientY)},{passive:false});
const jend=e=>{for(const t of e.changedTouches)if(t.identifier===jid)jr()};joy.addEventListener('touchend',jend);joy.addEventListener('touchcancel',jend);
joy.addEventListener('pointerdown',e=>{if(e.pointerType=='touch')return;jid='m';joy.setPointerCapture(e.pointerId);jm(e.clientX,e.clientY)});
joy.addEventListener('pointermove',e=>{if(jid==='m'&&e.pointerType!='touch')jm(e.clientX,e.clientY)});joy.addEventListener('pointerup',e=>{if(jid==='m')jr()});
addEventListener('beforeunload',()=>{if(!paused)save(1)});
// ================= LOOP =================
let last=0;function loop(t){const dt=Math.min(.05,(t-last)/1000||0);last=t;paused=!['title','panel','dlg'].every(i=>$(i).classList.contains('hide'))||innerHeight>innerWidth;
if(!paused)update(dt);hudT+=dt;if(hudT>.1){hudT=0;hud()}skUI();draw();requestAnimationFrame(loop)}
try{if(!localStorage.getItem('rennx_save'))$('cont').classList.add('hide')}catch(e){$('cont').classList.add('hide')}
newG();hud();requestAnimationFrame(loop);
