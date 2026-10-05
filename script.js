'use strict';
// ================= UTIL =================
let W=960;
const $=i=>document.getElementById(i),cv=$('c'),g=cv.getContext('2d'),H=540,MW=4096,MH=2304,PI2=Math.PI*2;
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
const ZN=[{x:[60,4036],y:[1650,1970],lv:[1,4],sp:{goblin:12,slime:10,wolf:8}},{x:[60,4036],y:[60,490],lv:[8,12],sp:{wolf:5,orc:7,dknight:5}},{x:[60,2690],y:[2010,2270],lv:[13,16],sp:{orc:6,dknight:6}},{x:[2710,4036],y:[2010,2270],lv:[15,18],sp:{dknight:3,boss:1}}];
const GATES=[{r:[0,0,MW,500],ln:500,lv:8,n:'Deep Forest'},{r:[0,1990,MW,MH],ln:1990,lv:15,n:'Dark Forest'}];
const AREAS=[['Renn Village (desa, pasar, ladang, danau)',1],['Forest Hunting Ground (selatan sungai)',1],['Deep Forest (utara)',8],['Dark Forest & Ruins / Boss (selatan jauh)',15]];
const QS=[
{id:'q1',n:'Goblin Problem',need:{goblin:5},rw:{gold:100,xp:20,items:{small_potion:2}}},
{id:'q2',n:'Wolf Hunt',pre:'q1',need:{wolf:5},rw:{gold:150,xp:30,items:{wolf_fang:2}}},
{id:'q3',n:'Village Defense',pre:'q2',need:{goblin:5,wolf:3,orc:1},rw:{gold:500,xp:100,art:2}}];
const NPCS=[{id:'elder',n:'Village Elder',x:1130,y:815,body:'#8a6a3a',hair:'#eee',hat:1,long:1},{id:'smith',n:'Blacksmith',x:1105,y:1240,body:'#7a3a2a',hair:'#333'},{id:'merchant',n:'Merchant',x:2340,y:868,body:'#2a7a5a',hair:'#a05020'},{id:'healer',n:'Healer',x:1390,y:1025,body:'#e8e8f0',hair:'#f0a0c0',long:1},{id:'guard',n:'Captain Mira',x:1500,y:838,body:'#a03030',hair:'#d8a030',long:1},{id:'farmer',n:'Farmer',x:895,y:1185,body:'#6a8a3a',hair:'#8a5a2a',hat:1}];
const DL={elder:['Monster mulai muncul di sekitar desa.\nTolong bantu kami. Hutan Dalam (utara) butuh Lv.8, Hutan Gelap & Reruntuhan (selatan jauh) butuh Lv.15.',[]],smith:['Bawa Iron Ore dan Gold, akan kutempa artifact-mu jadi lebih kuat.',[['Upgrade Artifact','op','inv']]],merchant:['Selamat datang! Lihat daganganku.',[['Buka Toko','op','shop']]],healer:['Biarkan aku menyembuhkan lukamu.',[['Sembuhkan (gratis)','heal']]],guard:['Desa butuh pahlawan. Ada tugas untukmu?',[['Lihat Quest','op','questN']]]};
DL.farmer=['Panen tahun ini bagus, tapi serigala dan goblin dari hutan selatan mengganggu. Seberangi sungai lewat jembatan!',[]];
const SHOP=['small_potion','large_potion','mana_potion','bread','meat','fish','iron_ore','herb','crystal'];
const SHOPART=[{b:0,r:0,u:0},{b:1,r:1,u:0},{b:2,r:1,u:0},{b:4,r:2,u:0}];
const CHESTS=[{id:'c1',k:0,x:90,y:960},{id:'c2',k:1,x:2900,y:150},{id:'c3',k:2,x:3560,y:2150},{id:'c4',k:0,x:900,y:1900},{id:'c5',k:1,x:3500,y:700}];
// ================= ASSETS =================
const IMG={};function ld(p){if(!IMG[p]){const i=new Image();i.onload=()=>i.ok=1;i.src=(self.ASSET_DATA&&ASSET_DATA[p])||p;IMG[p]=i}return IMG[p]}
const ULV=[0,0,0,0,10,15],LBL=['ATTACK','SKILL 1','SKILL 2','SKILL 3','ULT 1','ULT 2'],EFM={slash:'dir',wind:'spin',bolt:'bolt',wave:'dir',fire:'spin'};
const icoP=k=>'assets/skills/icon_'+k+'.png',efP=k=>'assets/effects/'+k+'_effect.png';
Object.values(CH).forEach(c=>c.sk.forEach(k=>{if(k.im){ld(icoP(k.im));ld(efP(k.ef))}}));
const tap=(el,f)=>{el.addEventListener('touchstart',e=>{e.preventDefault();f(e)},{passive:false});el.addEventListener('pointerdown',e=>{if(e.pointerType!='touch'){e.preventDefault();f(e)}})};
// ================= WORLD GEN =================
const CS=16,GW=MW/CS,GH=MH/CS,COL=new Uint8Array(GW*GH);
function sd(px,py,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=CL(((px-a[0])*dx+(py-a[1])*dy)/(dx*dx+dy*dy||1),0,1);return Math.hypot(px-a[0]-t*dx,py-a[1]-t*dy)}
const ROADS=[
{w:96,p:[[1500,950],[1480,1200],[1500,1490],[1530,1700],[1500,1990],[1700,2150]]},
{w:86,p:[[1500,950],[1580,700],[1720,500],[1820,250],[1850,0]]},
{w:86,p:[[1500,950],[2100,900],[2800,950],[3330,1020]]},
{w:70,p:[[3000,940],[3200,800],[3450,760]]},
{w:86,p:[[1500,950],[1000,1000],[700,1050]]},
{w:60,p:[[700,1050],[330,850],[150,800]]},
{w:60,p:[[1000,1000],[1000,1250],[930,1560],[760,1800]]},
{w:70,p:[[1530,1700],[900,1800],[400,1850]]},
{w:70,p:[[1530,1700],[2300,1780],[3000,1700],[3000,1495],[2950,1300],[2800,950]]},
{w:56,p:[[1450,900],[1150,800]]},
{w:56,p:[[1600,850],[2050,720]]},
{w:64,p:[[2100,900],[2400,830]]},
{w:70,p:[[1700,2150],[2400,2200],[3300,2150]]},
{w:60,p:[[1820,250],[1200,300],[500,330]]},
{w:60,p:[[1820,250],[2700,260],[3500,300]]}];
const RIVS=[{w:130,p:[[0,1560],[450,1520],[930,1560],[1250,1480],[1500,1490],[1800,1540],[2300,1470],[2700,1520],[3000,1495],[3300,1540],[3560,1480],[4096,1560]]},
{w:80,p:[[265,650],[300,740],[330,850],[280,1100],[350,1350],[450,1520]]},
{w:70,p:[[3600,1230],[3640,1380],[3570,1480]]}];
const LAKES=[{x:3680,y:1000,rx:340,ry:250},{x:2450,y:1180,rx:130,ry:80}];
const BRG=[{x:1450,y:1410,w:100,h:160,v:1},{x:2950,y:1420,w:100,h:160,v:1},{x:880,y:1480,w:100,h:160,v:1},{x:250,y:815,w:160,h:70,v:0}];
const CLIFFS=[{x:60,y:520,w:620,h:120},{x:3640,y:600,w:440,h:150}],FALLS=[{x:240,y:520,w:50,h:135},{x:3880,y:600,w:50,h:160}];
const FARMS=[{x:540,y:1110,w:300,h:150},{x:2000,y:1240,w:300,h:130},{x:3050,y:1100,w:220,h:110}];
const HOUSES=[{x:1020,y:640,w:210,h:130,t:'big'},{x:2020,y:580,w:230,h:140,t:'big'},{x:1860,y:600,w:140,h:105,t:'mid'},{x:1040,y:1090,w:150,h:105,t:'work'},
{x:1750,y:620,w:110,h:90,t:'small'},{x:2480,y:560,w:120,h:95,t:'small'},{x:780,y:700,w:110,h:90,t:'small'},{x:1230,y:1230,w:130,h:95,t:'mid'},{x:1840,y:1110,w:110,h:90,t:'small'},
{x:500,y:860,w:180,h:115,t:'barn'},{x:3180,y:700,w:130,h:95,t:'small'},{x:2600,y:1290,w:160,h:100,t:'barn'}];
const PLZ=[[1500,950,215],[2400,830,200],[175,830,130]];
const DEC=[],dc=(t,x,y,o)=>DEC.push(Object.assign({t,x,y},o));
const CR={barrel:9,crate:10,lamp:5,rock:15,stump:9,well:24,wagon:28,tent:40,stall:36,board:13,fire:10,torii:16,scare:6,pillar:14,sign:5};
let ws=5;const wr=()=>(ws=ws*16807%2147483647)/2147483647;
function walk(p,step,fn){for(let i=0;i<p.length-1;i++){const a=p[i],b=p[i+1],dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy),n=Math.max(1,Math.floor(L/step));for(let k=0;k<n;k++){const t=k/n;fn(a[0]+dx*t,a[1]+dy*t,-dy/L,dx/L)}}}
function rd(x,y){let m=1e9;for(const r of ROADS)for(let i=0;i<r.p.length-1;i++)m=Math.min(m,sd(x,y,r.p[i],r.p[i+1])-r.w/2);return m}
function inWater(px,py,pad){for(const r of RIVS)for(let i=0;i<r.p.length-1;i++)if(sd(px,py,r.p[i],r.p[i+1])<r.w/2+pad)return 1;for(const l of LAKES)if(((px-l.x)/(l.rx+pad))**2+((py-l.y)/(l.ry+pad))**2<1)return 1;return 0}
function freeSpot(x,y,m){if(x<70||y<70||x>MW-70||y>MH-70)return 0;if(rd(x,y)<m)return 0;if(inWater(x,y,m+6))return 0;
for(const q of PLZ)if(Math.hypot(x-q[0],y-q[1])<q[2]+m)return 0;
for(const h of HOUSES)if(x>h.x-m&&x<h.x+h.w+m&&y>h.y-m-50&&y<h.y+h.h+m)return 0;
for(const f of FARMS)if(x>f.x-m-10&&x<f.x+f.w+m+10&&y>f.y-m-10&&y<f.y+f.h+m+10)return 0;
for(const c of CLIFFS)if(x>c.x-m&&x<c.x+c.w+m&&y>c.y-m-20&&y<c.y+c.h+m)return 0;
for(const b of BRG)if(x>b.x-m&&x<b.x+b.w+m&&y>b.y-m&&y<b.y+b.h+m)return 0;
if(x>3270&&x<3470&&y>970&&y<1050)return 0;
for(const d of DEC)if(Math.hypot(d.x-x,d.y-y)<m)return 0;
for(const n of NPCS)if(Math.hypot(n.x-x,n.y-y)<m+25)return 0;for(const c of CHESTS)if(Math.hypot(c.x-x,c.y-y)<m+25)return 0;return 1}
// fences around farms (gap on south side)
const FS=[];FARMS.forEach(f=>{const x0=f.x-14,y0=f.y-14,x1=f.x+f.w+14,y1=f.y+f.h+14,mx=(x0+x1)/2;FS.push([x0,y0,x1,y0],[x0,y0,x0,y1],[x1,y0,x1,y1],[x0,y1,mx-30,y1],[mx+30,y1,x1,y1])});
// static decor
dc('well',1600,1040);dc('board',1440,815);dc('banner',1370,880);dc('banner',1630,880);dc('banner',1075,790);
dc('stall',2300,800);dc('stall',2430,770);dc('stall',2560,810);dc('crate',2335,848);dc('barrel',2490,830);dc('crate',2400,835);dc('crate',2260,830);
dc('wagon',2180,1010);dc('wagon',880,1085);dc('anvil',1120,1215);
dc('tent',110,740);dc('tent',250,745);dc('fire',175,850);dc('bench',130,890);dc('bench',225,890);dc('stump',90,820);dc('crate',60,800);
dc('tent',3130,1110);dc('crate',3080,1150);dc('barrel',3180,1155);dc('torii',3470,730);dc('lamp',3420,765);dc('lamp',3520,765);dc('boat',3560,1130);
dc('scare',700,1185);dc('scare',2150,1315);dc('scare',3150,1175);
dc('sign',1560,1130);dc('sign',1290,975);dc('sign',1740,945);dc('sign',1660,650);dc('sign',3000,1650);
[0,1,2,4].forEach(i=>{let c=0;walk(ROADS[i].p,260,(px,py,nx,ny)=>{if(py<560||py>1450||Math.hypot(px-1500,py-950)<240)return;c++;const sg=c%2?1:-1,o=ROADS[i].w/2+18;dc('lamp',px+nx*o*sg,py+ny*o*sg)})});
HOUSES.forEach((h,i)=>{dc('barrel',h.x-16,h.y+h.h+2);if(i%2)dc('crate',h.x+h.w+16,h.y+h.h)});
for(let k=0;k<8;k++){const a=k/8*PI2;dc('pillar',3300+Math.cos(a)*230,2150+Math.sin(a)*150)}
for(let i=0,n=0;i<600&&n<16;i++){const X=2740+wr()*1260,Y=2030+wr()*240;if(Math.hypot(X-3300,Y-2150)>300&&rd(X,Y)>30){dc('pillar',X,Y);n++}}
RIVS.forEach(o=>walk(o.p,150,(px,py,nx,ny)=>{const sg=wr()<.5?1:-1,off=o.w/2+30+wr()*20,X=px+nx*off*sg,Y=py+ny*off*sg;if(freeSpot(X,Y,18))dc('rock',X,Y,{s:.6+wr()*.7})}));
for(let i=0,n=0;i<5000&&n<130;i++){const X=wr()*MW,Y=wr()*MH;if(freeSpot(X,Y,22)){dc(i%3?'rock':'stump',X,Y,{s:.7+wr()*.8});n++}}
// trees
const TREES=[];for(let i=0;i<40000&&TREES.length<2400;i++){const x=wr()*MW,y=wr()*MH;
let v;if(y<500)v=.95;else if(x<110||x>MW-110||y>MH-110)v=1;else if(y>1990)v=.75;else if(y>1600)v=.6;else if(y>1500)v=.3;else{v=.08+.22*(Math.sin(x/350)*Math.cos(y/290)+1)/2;if(x<420||x>3250)v+=.25}
if(wr()>v||!freeSpot(x,y,14))continue;const dk=y<500||y>1990;TREES.push({x,y,s:.7+wr()*.8,d:dk,p:(dk||wr()<.2)?1:0,c:(wr()*3)|0})}
// collision grid
(()=>{for(let i=0;i<GH;i++)for(let j=0;j<GW;j++)if(inWater(j*CS+8,i*CS+8,0))COL[i*GW+j]=1;
const mR=(x0,y0,x1,y1,v)=>{for(let j=Math.max(0,x0/CS|0);j<=Math.min(GW-1,x1/CS|0);j++)for(let i=Math.max(0,y0/CS|0);i<=Math.min(GH-1,y1/CS|0);i++)COL[i*GW+j]=v};
const mC=(cx,cy,r)=>{for(let j=Math.max(0,(cx-r)/CS|0);j<=Math.min(GW-1,(cx+r)/CS|0);j++)for(let i=Math.max(0,(cy-r)/CS|0);i<=Math.min(GH-1,(cy+r)/CS|0);i++)if(Math.hypot(j*CS+8-cx,i*CS+8-cy)<=r+6)COL[i*GW+j]=1};
BRG.forEach(b=>mR(b.x,b.y,b.x+b.w,b.y+b.h,0));mR(3290,985,3440,1035,0);
CLIFFS.forEach(c=>mR(c.x,c.y,c.x+c.w,c.y+c.h,1));
HOUSES.forEach(h=>mR(h.x+2,h.y+(h.t=='big'?38:32),h.x+h.w-2,h.y+h.h+4,1));
DEC.forEach(d=>{const r=CR[d.t];if(r)mC(d.x,d.y,r*(d.s||1))});TREES.forEach(t=>mC(t.x,t.y,7));
FS.forEach(s=>mR(Math.min(s[0],s[2])-3,Math.min(s[1],s[3])-3,Math.max(s[0],s[2])+3,Math.max(s[1],s[3])+3,1));
mR(0,0,MW,47,1);mR(0,MH-48,MW,MH,1);mR(0,0,47,MH,1);mR(MW-48,0,MW,MH,1)})();
// ground texture (half resolution, pixel-art look)
const BG=(()=>{const b=document.createElement('canvas');b.width=MW/2;b.height=MH/2;const x=b.getContext('2d');x.scale(.5,.5);const r=wr,rc=(c,X,Y,w,h)=>{x.fillStyle=c;x.fillRect(X,Y,w,h)},ci=(c,X,Y,R_)=>{x.fillStyle=c;x.beginPath();x.arc(X,Y,R_,0,PI2);x.fill()},el=(c,X,Y,a,b_)=>{x.fillStyle=c;x.beginPath();x.ellipse(X,Y,a,b_,0,0,PI2);x.fill()};
const st=(p,w,c)=>{x.strokeStyle=c;x.lineWidth=w;x.lineCap='round';x.lineJoin='round';x.beginPath();p.forEach((q,i)=>i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]));x.stroke()};
const crv=(p,w,c)=>{x.strokeStyle=c;x.lineWidth=w;x.lineCap='round';x.lineJoin='round';x.beginPath();x.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length-1;i++)x.quadraticCurveTo(p[i][0],p[i][1],(p[i][0]+p[i+1][0])/2,(p[i][1]+p[i+1][1])/2);x.lineTo(p[p.length-1][0],p[p.length-1][1]);x.stroke()};
rc('#62b03c',0,0,MW,MH);rc('rgba(10,70,60,.28)',0,0,MW,500);rc('rgba(0,50,10,.12)',0,1600,MW,390);rc('rgba(40,15,80,.42)',0,1990,MW,MH-1990);rc('#4f4b66',2700,1990,MW-2700,MH-1990);
const TC=['#74c24a','#4f9a31','#86d055','#3f8a2a'];for(let i=0;i<36000;i++){const px=r()*MW,py=r()*MH;rc(py>1990&&px>2700?'rgba(255,255,255,.05)':py>1990?'rgba(60,40,110,.18)':TC[i&3],px,py,3+r()*4,3+r()*4)}
x.strokeStyle='rgba(0,0,0,.25)';x.lineWidth=2;for(let X=2700;X<MW;X+=90){x.beginPath();x.moveTo(X,1990);x.lineTo(X,MH);x.stroke()}for(let Y=1990;Y<MH;Y+=90){x.beginPath();x.moveTo(2700,Y);x.lineTo(MW,Y);x.stroke()}
ci('#3b3752',3300,2150,255);ci('#4a4666',3300,2150,235);x.strokeStyle='#9a6ae0';x.lineWidth=4;x.beginPath();x.arc(3300,2150,200,0,PI2);x.stroke();
ROADS.forEach(o=>crv(o.p,o.w+18,'#b3a35e'));PLZ.forEach(q=>{for(let k=0;k<7;k++)ci('#b3a35e',q[0]+(r()-.5)*q[2]*.5,q[1]+(r()-.5)*q[2]*.5,q[2]*(.7+r()*.3))});
ROADS.forEach(o=>crv(o.p,o.w,'#d2b078'));PLZ.forEach(q=>{for(let k=0;k<7;k++)ci('#d2b078',q[0]+(r()-.5)*q[2]*.45,q[1]+(r()-.5)*q[2]*.45,q[2]*(.66+r()*.28))});
ROADS.forEach(o=>crv(o.p,o.w*.55,'#ddbd86'));
ROADS.forEach(o=>walk(o.p,7,(px,py,nx,ny)=>{const l=(r()-.5)*o.w;rc(r()<.5?'#b89560':'#e6c994',px+nx*l,py+ny*l,3,2);if(r()<.5){const e=(r()<.5?1:-1)*(o.w/2+r()*10-2);rc(TC[(r()*3)|0],px+nx*e,py+ny*e,4,4)}}));
FARMS.forEach(f=>{rc('#5a3d22',f.x,f.y,f.w,f.h);for(let Y=f.y+10;Y<f.y+f.h-6;Y+=18){rc('#46301a',f.x,Y+6,f.w,3);for(let X=f.x+8;X<f.x+f.w-6;X+=14)ci(r()<.15?'#e8c23a':'#4caf2f',X,Y,4)}});
RIVS.forEach(o=>st(o.p,o.w+26,'#7d8a5a'));LAKES.forEach(l=>el('#7d8a5a',l.x,l.y,l.rx+14,l.ry+14));
RIVS.forEach(o=>{st(o.p,o.w,'#2c88d0');st(o.p,o.w*.62,'#49a6ec')});LAKES.forEach(l=>{el('#2c88d0',l.x,l.y,l.rx,l.ry);el('#49a6ec',l.x,l.y,l.rx*.72,l.ry*.72)});
RIVS.forEach(o=>walk(o.p,26,(px,py,nx,ny)=>{const l=(r()-.5)*o.w*.8;rc('#bfe6ff',px+nx*l,py+ny*l,14,2)}));
for(let i=0;i<500;i++){const l=LAKES[i%2],a=r()*PI2,d=Math.sqrt(r());rc('#bfe6ff',l.x+Math.cos(a)*l.rx*d*.9,l.y+Math.sin(a)*l.ry*d*.9,14,2);if(i%6==0)el('#3f9a45',l.x+Math.cos(a)*l.rx*d*.8,l.y+Math.sin(a)*l.ry*d*.8,9,5)}
RIVS.forEach(o=>walk(o.p,38,(px,py,nx,ny)=>{const sg=r()<.5?1:-1,off=o.w/2+4;for(let k=0;k<3;k++){const X=px+nx*off*sg+k*5,Y=py+ny*off*sg;rc('#3f8a2a',X,Y-14,2,14);rc('#8a6a3c',X,Y-17,2,4)}}));
CLIFFS.forEach(c=>{rc('#6d6f78',c.x,c.y,c.w,c.h);rc('#8a8c96',c.x,c.y,c.w,c.h*.35);rc('#55565f',c.x,c.y+c.h*.8,c.w,c.h*.2);for(let X=c.x+10;X<c.x+c.w;X+=26)rc('rgba(0,0,0,.2)',X+r()*10,c.y+8,3,c.h-12);for(let X=c.x-6;X<c.x+c.w+6;X+=14)ci('#62b03c',X,c.y-4+r()*8,12)});
FALLS.forEach(f=>{rc('#8fd0ff',f.x,f.y,f.w,f.h);for(let i=0;i<f.w/8;i++)rc('#fff',f.x+4+i*8,f.y,3,f.h);el('rgba(255,255,255,.85)',f.x+f.w/2,f.y+f.h,f.w*.75,12)});
BRG.forEach(b=>{rc('#4a2e14',b.x-4,b.y-4,b.w+8,b.h+8);rc('#a8743a',b.x,b.y,b.w,b.h);x.strokeStyle='#6b4423';x.lineWidth=2;if(b.v)for(let Y=b.y;Y<b.y+b.h;Y+=10){x.beginPath();x.moveTo(b.x,Y);x.lineTo(b.x+b.w,Y);x.stroke()}else for(let X=b.x;X<b.x+b.w;X+=10){x.beginPath();x.moveTo(X,b.y);x.lineTo(X,b.y+b.h);x.stroke()}if(b.v){rc('#6b4423',b.x-4,b.y,6,b.h);rc('#6b4423',b.x+b.w-2,b.y,6,b.h)}else{rc('#6b4423',b.x,b.y-4,b.w,6);rc('#6b4423',b.x,b.y+b.h-2,b.w,6)}});
rc('#4a2e14',3286,981,158,58);rc('#a8743a',3290,985,150,50);x.strokeStyle='#6b4423';x.lineWidth=2;for(let X=3290;X<3440;X+=10){x.beginPath();x.moveTo(X,985);x.lineTo(X,1035);x.stroke()}for(let X=3330;X<3440;X+=36){rc('#4a2e14',X,975,6,14);rc('#4a2e14',X,1033,6,14)}
FS.forEach(s=>{x.strokeStyle='#6b4a26';x.lineWidth=3;x.beginPath();x.moveTo(s[0],s[1]-6);x.lineTo(s[2],s[3]-6);x.moveTo(s[0],s[1]-1);x.lineTo(s[2],s[3]-1);x.stroke();walk([[s[0],s[1]],[s[2],s[3]]],22,(px,py)=>rc('#4a2e14',px-2,py-12,4,14))});
for(let i=0;i<2400;i++){const px=r()*MW,py=r()*MH;if(py>1990||py<60||!freeSpot(px,py,12))continue;if(i%3==0){ci('#2f7a2f',px,py,8+r()*6);ci('#47a83a',px-2,py-3,6)}else{rc('#3f8a2a',px,py,2,7);ci(['#fff','#ffd23a','#ff8ac0','#9cf'][i&3],px+1,py,3)}}
rc('rgba(5,25,15,.45)',0,0,MW,60);rc('rgba(5,25,15,.45)',0,MH-60,MW,60);rc('rgba(5,25,15,.45)',0,0,60,MH);rc('rgba(5,25,15,.45)',MW-60,0,60,MH);return b})();
const MM=(()=>{const m=document.createElement('canvas');m.width=160;m.height=90;m.getContext('2d').drawImage(BG,0,0,160,90);return m})();
// ================= STATE =================
let ZM=1.25,VW=960/1.25,NT=0,G,T=0,PK='',PN=0,paused=true,shake=0,ens=[],PR=[],FX=[],PT=[],FL=[],TM=[],cam={x:0,y:0},shopTab='buy',swcd=0,gm=0,hudT=0,gmT=-9,tt;
const P=()=>G.hs[G.act],Cm=()=>G.hs[G.act=='renn'?'sora':'renn'];
const need=l=>l>=100?0:Math.min(100,10+5*(l-1));
const slots=()=>Math.min(6,2+Math.floor(G.lv/20));
const aVal=a=>+(ARTS[a.b].v*RAR[a.r][2]*(1+.25*a.u)).toFixed(1),aName=a=>ARTS[a.b].ic+' '+ARTS[a.b].n;
const artPrice=a=>Math.round(60*[1,2.5,6,15,40][a.r]*(1+.3*a.u));
function ST(ch){const c=CH[ch],l=G.lv-1,s={};for(const k in c.gr)s[k]=c[k]+c.gr[k]*l;G.arts.forEach(a=>{if(a.e)s[ARTS[a.b].s]+=aVal(a)});s.hp=Math.round(s.hp);s.mp=Math.round(s.mp);return s}
function mkH(ch,x,y){const s=ST(ch);return{ch,x,y,f:0,w:0,sw:0,mv:0,slow:0,cd:[0,0,0,0,0,0],hp:s.hp,mp:s.mp}}
function newG(){G={lv:1,xp:0,gold:50,inv:{small_potion:3},arts:[],act:'renn',q:{},ch:[],tm:.3,hs:{},dead:0};G.hs.renn=mkH('renn',1500,1030);G.hs.sora=mkH('sora',1470,1050);spawnAll()}
function spawnAll(){ens=[];ZN.forEach(z=>{for(const k in z.sp)for(let i=0;i<z.sp[k];i++)ens.push(mkE(k,z))});PR=[];FX=[];TM=[]}
function mkE(k,z){const t=EN[k],lv=RI(z.lv[0],z.lv[1]),s=1+.12*(lv-1);const e={k,t,lv,z,mhp:Math.round(t.hp*s),at:t.atk*s,df:t.def*(1+.08*(lv-1)),dead:0,rt:0,flash:0,slow:0,wind:0,cd:0,wt:0,dx:0,dy:0,aggro:0,dir:1};respawn(e);return e}
function respawn(e){let x,y;do{if(e.k=='boss'){x=3300+R(-90,90);y=2150+R(-50,50)}else{x=R(e.z.x[0],e.z.x[1]);y=R(e.z.y[0],e.z.y[1])}}while(blocked(x,y));e.x=e.hx=x;e.y=e.hy=y;e.hp=e.mhp;e.dead=0}
function blocked(x,y,pl){if(x<8||y<8||x>MW-8||y>MH-8)return 1;if(COL[((y/CS)|0)*GW+((x/CS)|0)])return 1;
if(pl)for(const gt of GATES)if(y>gt.r[1]&&y<gt.r[3]&&G.lv<gt.lv){if(T-gmT>2){gmT=T;toast('🔒 '+gt.n+' butuh Lv.'+gt.lv)}return 1}return 0}
function mv(o,dx,dy,pl){if(!blocked(o.x+dx,o.y,pl))o.x+=dx;if(!blocked(o.x,o.y+dy,pl))o.y+=dy}
// ================= ITEMS / XP =================
function addItem(id,n){G.inv[id]=(G.inv[id]||0)+n}
function rar(lv){let r=0;const b=1+lv/8;[.4,.25,.1,.03].forEach((c,i)=>{if(r==i&&Math.random()<c*b)r=i+1});return r}
function addArt(r,b){const a={b:b??RI(0,6),r,u:0,e:false};G.arts.push(a);return a}
function gainXP(n){if(G.lv>=100)return;G.xp+=n;while(G.lv<100&&G.xp>=need(G.lv)){G.xp-=need(G.lv);G.lv++;levelUp()}if(G.lv>=100)G.xp=0}
function levelUp(){[P(),Cm()].forEach(h=>{const s=ST(h.ch);h.hp=s.hp;h.mp=s.mp});const p=P();FX.push({k:'rg',x:p.x,y:p.y,r:120,l:.8,m:.8,c:'#ffd23a'});pt(p.x,p.y-20,'#ffd23a',40);banner(G.lv>=100?'MAX LEVEL!':'LEVEL UP!');toast('Level '+G.lv+'!');if(G.lv==10||G.lv==15)setTimeout(()=>toast('🔓 ULTIMATE '+(G.lv==10?1:2)+' UNLOCKED!'),1500)}
// ================= COMBAT =================
const flo=(x,y,t,c,s)=>FL.push({x,y,t:NE(t),c,l:1,s:s||1});
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
if(Math.abs(e.x-P().x)>1100||Math.abs(e.y-P().y)>800)return;
e.flash-=dt;e.slow-=dt;e.cd-=dt;const p=P(),t=e.t,sp=t.spd*(e.slow>0?.5:1),d=D(e,p),z=e.z,inz=p.x>z.x[0]-30&&p.x<z.x[1]+30&&p.y>z.y[0]-30&&p.y<z.y[1]+30;
if(e.wind>0){e.wind-=dt;if(e.wind<=0&&!G.dead&&D(e,p)<t.z+34)hurtP(e);return}
let tx=null,ty;const mE=(dx,dy)=>{mv(e,dx,dy,0);e.x=CL(e.x,z.x[0],z.x[1]);e.y=CL(e.y,z.y[0],z.y[1])};
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
else{G.dead-=dt;if(G.dead<=0){G.dead=0;const lost=Math.floor(G.gold*.1);G.gold-=lost;[p,c].forEach(h=>{const s=ST(h.ch);h.x=1500+(h==p?0:-30);h.y=1030;h.hp=s.hp;h.mp=s.mp});toast('Respawn di desa (-'+lost+' Gold)')}}
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
function drawH(h){const act=h==P();chibi(h.x,h.y,CH[h.ch],h.mv?Math.abs(Math.sin(h.w*10))*3:0,Math.cos(h.f)>=0?1:-1,h.sw);
if(act){g.strokeStyle='#ffd23a';g.lineWidth=2;g.beginPath();g.ellipse(h.x,h.y,17,8,0,0,PI2);g.stroke();
const s=ST(h.ch),bw=46,bx=h.x-bw/2,by=h.y-82;g.fillStyle='#000c';g.fillRect(bx-1,by-1,bw+2,6);g.fillStyle='#e33';g.fillRect(bx,by,bw*CL(h.hp/s.hp,0,1),4);g.fillStyle='#000c';g.fillRect(bx-1,by+5,bw+2,6);g.fillStyle='#3a7bff';g.fillRect(bx,by+6,bw*CL(h.mp/s.mp,0,1),4);label(CH[h.ch].n,h.x,by-4,'#ffe9a0')}
else label(CH[h.ch].n,h.x,h.y-62,'#9cf')}
function drawNpc(n){chibi(n.x,n.y,n,0,1,0);label(n.n,n.x,n.y-62,'#ffe9a0');if(n.id=='guard'){const m=QS.some(q=>qs(q)=='available'||qs(q)=='completed');if(m){{const yy=n.y-86+Math.sin(T*5)*3;g.fillStyle='#ffd23a';g.beginPath();g.arc(n.x,yy,9,0,PI2);g.fill();g.fillStyle='#5a2a00';g.font='bold 14px sans-serif';g.textAlign='center';g.fillText('!',n.x,yy+5)}}}}
function drawE(e){const t=e.t,x=e.x,y=e.y,z=t.z,k=e.k,d=e.dir,b=Math.sin(T*8+x)*1.5;g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(x,y,z,z*.4,0,0,PI2);g.fill();g.fillStyle=e.flash>0?'#fff':t.col;
if(k=='slime'){g.beginPath();g.ellipse(x,y-2,z,z*.9+b,0,Math.PI,PI2);g.fill();g.fillStyle='#fff';g.fillRect(x-6,y-z*.6,4,5);g.fillRect(x+3,y-z*.6,4,5)}
else if(k=='wolf'){g.beginPath();g.ellipse(x,y-z*.7,z*1.1,z*.6,0,0,PI2);g.fill();g.beginPath();g.arc(x+d*z,y-z*1.1+b,z*.5,0,PI2);g.fill();g.beginPath();g.moveTo(x+d*z*.8,y-z*1.5);g.lineTo(x+d*z*.9,y-z*1.95);g.lineTo(x+d*z*1.2,y-z*1.5);g.fill();g.fillStyle='#f33';g.fillRect(x+d*z*1.2-1,y-z*1.2+b,3,3)}
else{g.fillRect(x-z*.5,y-z*1.3,z,z*1.2+b);g.beginPath();g.arc(x,y-z*1.65+b,z*.55,0,PI2);g.fill();
if(k=='goblin'){g.beginPath();g.moveTo(x-z*.5,y-z*1.7);g.lineTo(x-z*1.1,y-z*2);g.lineTo(x-z*.5,y-z*1.4);g.moveTo(x+z*.5,y-z*1.7);g.lineTo(x+z*1.1,y-z*2);g.lineTo(x+z*.5,y-z*1.4);g.fill()}
if(k=='orc'){g.fillStyle='#fff';g.fillRect(x-z*.35,y-z*1.4,3,6);g.fillRect(x+z*.3,y-z*1.4,3,6)}
if(k=='dknight'||k=='boss'){g.fillStyle=k=='boss'?'#ff6aa0':'#555';g.beginPath();g.moveTo(x-z*.5,y-z*2);g.lineTo(x-z*.7,y-z*2.6);g.lineTo(x-z*.2,y-z*2.1);g.moveTo(x+z*.5,y-z*2);g.lineTo(x+z*.7,y-z*2.6);g.lineTo(x+z*.2,y-z*2.1);g.fill()}
g.fillStyle=(k=='dknight'||k=='boss')?'#f33':'#111';g.fillRect(x-z*.3,y-z*1.7+b,3,4);g.fillRect(x+z*.1,y-z*1.7+b,3,4)}
const by=y-z*2.7;g.fillStyle='#000a';g.fillRect(x-18,by,36,5);g.fillStyle=e.k=='boss'?'#c3f':'#e33';g.fillRect(x-17,by+1,34*Math.max(0,e.hp/e.mhp),3);label('Lv.'+e.lv+' '+t.n,x,by-3,e.wind>0?'#f66':'#fff')}
const PAL={big:['#a8743a','#d6b052','#7a5226'],mid:['#b58450','#9a3b2a','#7a5226'],small:['#9a6a38','#6d8a46','#6a4a26'],barn:['#8a5a30','#7a6a58','#5a3a1a'],work:['#8a6a48','#55596a','#5a4a3a']};
function drawHouse(o){const{x,y,w,h,t}=o,p=PAL[t],rh=t=='big'?64:t=='small'?42:52,wt=y+rh*.55;g.fillStyle='rgba(0,0,0,.25)';g.fillRect(x+6,y+h-4,w,10);
g.fillStyle=p[0];g.fillRect(x,wt,w,y+h-wt);g.strokeStyle=p[2];g.lineWidth=2;for(let i=wt+10;i<y+h;i+=10){g.beginPath();g.moveTo(x,i);g.lineTo(x+w,i);g.stroke()}
if(t=='big'){g.fillStyle='#6a4a26';g.fillRect(x-8,y+h-6,w+16,8);for(let i=0;i<4;i++)g.fillRect(x+w/2-20+i*2,y+h+2+i*3,40-i*4,3)}
g.fillStyle='#5a3513';if(t=='barn')g.fillRect(x+w*.3,y+h-46,w*.4,46);else g.fillRect(x+w/2-12,y+h-34,24,34);
if(t!='barn'){g.fillStyle='#ffd77a';const n=w>170?3:2;for(let i=0;i<n;i++){const wx=i%2?x+w-36-(i>1?30:0):x+12+(i>1?30:0);g.fillRect(wx,wt+16,20,18)}}
g.fillStyle=p[1];g.beginPath();g.moveTo(x-14,wt+8);g.lineTo(x+w/2,y-rh*.45);g.lineTo(x+w+14,wt+8);g.closePath();g.fill();g.strokeStyle=p[2];g.lineWidth=1.5;for(let i=1;i<7;i++){g.beginPath();g.moveTo(x-14+i*(w+28)/7,wt+8);g.lineTo(x+w/2,y-rh*.45);g.stroke()}
if(t=='work'){g.fillStyle='#4a4a52';g.fillRect(x+w-34,y-6,16,34);g.fillStyle='rgba(200,200,200,.4)';for(let i=0;i<3;i++){g.beginPath();g.arc(x+w-26+Math.sin(T*2+i)*4,y-14-i*12-(T*10%12),5+i,0,PI2);g.fill()}}
if(t=='big'){g.fillStyle='#b8302a';g.fillRect(x+w-26,wt+10,14,36);g.fillStyle='#ffd23a';g.fillRect(x+w-22,wt+18,6,6)}}
function drawTree(t){const{x,y,s}=t;g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.ellipse(x,y,17*s,6*s,0,0,PI2);g.fill();g.fillStyle='#5a3a1c';g.fillRect(x-4*s,y-24*s,8*s,24*s);
if(t.p){const c=t.d?['#17493a','#215c46','#2c7052']:['#1f6a3a','#2c8548','#3a9a52'];for(let i=0;i<3;i++){g.fillStyle=c[i];g.beginPath();g.moveTo(x-(24-i*5)*s,y-(14+i*20)*s);g.lineTo(x,y-(50+i*20)*s);g.lineTo(x+(24-i*5)*s,y-(14+i*20)*s);g.fill()}}
else{const c=[['#2f8a2f','#47a83a'],['#3a9a3a','#5ab94a'],['#2a7a35','#3f9a45']][t.c];g.fillStyle=c[0];g.beginPath();g.arc(x,y-42*s,22*s,0,PI2);g.arc(x+14*s,y-32*s,14*s,0,PI2);g.arc(x-14*s,y-32*s,14*s,0,PI2);g.fill();g.fillStyle=c[1];g.beginPath();g.arc(x-6*s,y-48*s,14*s,0,PI2);g.fill()}}
function drawDec(d){const{x,y}=d,s=d.s||1;g.fillStyle='rgba(0,0,0,.22)';switch(d.t){
case 'lamp':g.fillRect(x-6,y-2,12,4);g.fillStyle='#4a3318';g.fillRect(x-2,y-50,4,50);g.fillRect(x-2,y-50,16,3);g.fillStyle='#ffd23a';g.fillRect(x+9,y-47,8,11);break;
case 'barrel':rr(x-8,y-18,16,20,3,'#8a5a2b');g.fillStyle='#3a2a1a';g.fillRect(x-8,y-12,16,2);g.fillRect(x-8,y-5,16,2);break;
case 'crate':rr(x-10,y-18,20,20,2,'#b08040');g.strokeStyle='#6a4a20';g.lineWidth=2;g.strokeRect(x-9,y-17,18,18);g.beginPath();g.moveTo(x-9,y-17);g.lineTo(x+9,y+1);g.stroke();break;
case 'rock':g.beginPath();g.ellipse(x,y,16*s,6*s,0,0,PI2);g.fill();g.fillStyle='#8a8c94';g.beginPath();g.ellipse(x,y-8*s,15*s,11*s,0,0,PI2);g.fill();g.fillStyle='#a8aab2';g.beginPath();g.ellipse(x-4*s,y-11*s,8*s,5*s,0,0,PI2);g.fill();break;
case 'stump':rr(x-8,y-12,16,14,3,'#6a4a26');g.fillStyle='#c8a064';g.beginPath();g.ellipse(x,y-12,8,4,0,0,PI2);g.fill();break;
case 'well':g.beginPath();g.ellipse(x,y,28,10,0,0,PI2);g.fill();rr(x-22,y-18,44,22,8,'#8a8c94');g.fillStyle='#2c88d0';g.beginPath();g.ellipse(x,y-16,16,6,0,0,PI2);g.fill();g.fillStyle='#5a3a1a';g.fillRect(x-24,y-50,4,34);g.fillRect(x+20,y-50,4,34);g.fillStyle='#4a5870';g.beginPath();g.moveTo(x-30,y-48);g.lineTo(x,y-66);g.lineTo(x+30,y-48);g.fill();break;
case 'wagon':rr(x-28,y-26,56,20,3,'#8a5a2b');g.fillStyle='#d8c8a0';g.beginPath();g.arc(x-8,y-30,10,0,PI2);g.arc(x+10,y-29,9,0,PI2);g.fill();g.fillStyle='#3a2a1a';for(const wx of[-18,18]){g.beginPath();g.arc(x+wx,y-4,9,0,PI2);g.fill();g.fillStyle='#8a6a3c';g.beginPath();g.arc(x+wx,y-4,4,0,PI2);g.fill();g.fillStyle='#3a2a1a'}break;
case 'tent':g.beginPath();g.ellipse(x,y,44,12,0,0,PI2);g.fill();g.fillStyle='#d8cfa8';g.beginPath();g.moveTo(x-44,y);g.lineTo(x,y-52);g.lineTo(x+44,y);g.fill();g.fillStyle='#b8ae88';g.beginPath();g.moveTo(x,y-52);g.lineTo(x+44,y);g.lineTo(x+10,y);g.fill();g.fillStyle='#3a2a1a';g.beginPath();g.moveTo(x-8,y);g.lineTo(x,y-22);g.lineTo(x+8,y);g.fill();break;
case 'stall':g.fillRect(x-38,y-2,76,8);g.fillStyle='#6a4a26';g.fillRect(x-36,y-44,4,44);g.fillRect(x+32,y-44,4,44);rr(x-34,y-16,68,16,2,'#a8743a');g.fillStyle='#e8a03a';for(let i=0;i<5;i++){g.beginPath();g.arc(x-24+i*12,y-20,5,0,PI2);g.fill()}for(let i=0;i<6;i++){g.fillStyle=i%2?'#fff':'#c8402a';g.fillRect(x-40+i*13.3,y-56,13.3,16)}break;
case 'board':g.fillStyle='#5a3a1a';g.fillRect(x-14,y-36,4,36);g.fillRect(x+10,y-36,4,36);rr(x-20,y-52,40,28,3,'#a8743a');g.fillStyle='#fff';g.fillRect(x-14,y-46,12,10);g.fillRect(x+2,y-44,12,12);break;
case 'fire':g.beginPath();g.ellipse(x,y,16,6,0,0,PI2);g.fill();g.fillStyle='#8a8c94';for(let i=0;i<7;i++){g.beginPath();g.arc(x+Math.cos(i)*13,y+Math.sin(i)*5,4,0,PI2);g.fill()}for(let k=0;k<3;k++){g.fillStyle=['#ff6a1a','#ffb02a','#ffee80'][k];const h=(26-k*7)+Math.sin(T*12+k)*4;g.beginPath();g.moveTo(x-(10-k*3),y);g.quadraticCurveTo(x,y-h*1.4,x+(10-k*3),y);g.fill()}break;
case 'torii':g.fillStyle='#c8402a';g.fillRect(x-30,y-70,8,70);g.fillRect(x+22,y-70,8,70);g.fillRect(x-40,y-76,80,8);g.fillRect(x-34,y-58,68,6);g.fillStyle='#222';g.fillRect(x-44,y-82,88,6);break;
case 'scare':g.fillStyle='#6a4a26';g.fillRect(x-2,y-40,4,40);g.fillRect(x-16,y-32,32,4);g.fillStyle='#d8b060';g.beginPath();g.arc(x,y-46,8,0,PI2);g.fill();g.fillStyle='#3a5a8a';g.fillRect(x-8,y-38,16,14);break;
case 'boat':g.fillStyle='#8a5a2b';g.beginPath();g.moveTo(x-40,y-8);g.quadraticCurveTo(x,y+16,x+40,y-8);g.lineTo(x+30,y-14);g.lineTo(x-30,y-14);g.fill();g.fillStyle='#d8cfa8';g.fillRect(x-20,y-24,40,10);break;
case 'pillar':g.beginPath();g.ellipse(x,y,18,7,0,0,PI2);g.fill();rr(x-12,y-56,24,56,3,'#8a86a0');g.fillStyle='#a8a4c0';g.fillRect(x-12,y-56,8,56);g.fillStyle='#6a6680';g.fillRect(x-14,y-60,28,6);break;
case 'sign':g.fillStyle='#5a3a1a';g.fillRect(x-2,y-34,4,34);rr(x-16,y-44,32,14,2,'#c89050');g.fillStyle='#3a2a1a';g.fillRect(x-10,y-39,20,2);break;
case 'banner':g.fillStyle='#5a3a1a';g.fillRect(x-2,y-60,4,60);g.fillRect(x-2,y-60,16,3);g.fillStyle='#b8302a';g.fillRect(x+2,y-57,12,30);break;
case 'bench':rr(x-22,y-12,44,8,2,'#7a5226');g.fillStyle='#4a2e14';g.fillRect(x-18,y-4,4,6);g.fillRect(x+14,y-4,4,6);break;
case 'anvil':g.fillStyle='#4a4a52';g.fillRect(x-14,y-14,28,8);g.fillRect(x-6,y-6,12,8);g.fillRect(x-20,y-18,12,4);break}}
function glow(){g.globalCompositeOperation='lighter';DEC.forEach(d=>{if(d.t!='lamp'&&d.t!='fire')return;if(d.x<cam.x-150||d.x>cam.x+W+150||d.y<cam.y-150||d.y>cam.y+H+200)return;const f=d.t=='fire',a=f?.5:Math.min(.5,NT*1.2);if(a<.03)return;const r=f?90+Math.sin(T*9)*8:70;g.fillStyle='rgba(255,170,60,'+a*.1+')';for(let k=1;k<=4;k++){g.beginPath();g.arc(d.x+(f?0:12),d.y-(f?10:40),r*k/4,0,PI2);g.fill()}});g.globalCompositeOperation='source-over'}
function areaName(p){return p.y<500?'Deep Forest':p.y>1990?(p.x<2700?'Dark Forest':'Ruins / Boss Area'):p.y>1600?'Forest Hunting Ground':p.y>1410?'Sungai':p.x<430&&p.y>600?'Camp Barat':p.x>3200?'Danau & Shrine':p.x<1000&&p.y>850?'Farm':p.x>2200&&p.y>650&&p.y<1000?'Marketplace':'Renn Village'}
function drawMini(m,p){m.drawImage(MM,0,0);const k=160/MW;GATES.forEach(gt=>{if(G.lv<gt.lv){m.fillStyle='rgba(70,0,110,.5)';m.fillRect(gt.r[0]*k,gt.r[1]*k,(gt.r[2]-gt.r[0])*k,(gt.r[3]-gt.r[1])*k)}});
m.fillStyle='#f33';ens.forEach(e=>{if(!e.dead){if(e.k=='boss'){m.fillStyle='#e0f';m.fillRect(e.x*k-3,e.y*k-3,6,6);m.fillStyle='#f33'}else m.fillRect(e.x*k,e.y*k,2,2)}});m.fillStyle='#ff0';NPCS.forEach(o=>m.fillRect(o.x*k-1,o.y*k-1,3,3));m.fillStyle='#fa0';CHESTS.forEach(o=>{if(!G.ch.includes(o.id))m.fillRect(o.x*k-1,o.y*k-1,3,3)});
m.strokeStyle='rgba(255,255,255,.7)';m.lineWidth=1;m.strokeRect(cam.x*k,cam.y*k,VW*k,VH*k);m.fillStyle='#fff';m.fillRect(p.x*k-2,p.y*k-2,4,4);m.strokeStyle='#000';m.strokeRect(p.x*k-2.5,p.y*k-2.5,5,5)}
function drawChest(c){const o=G.ch.includes(c.id),col=['#8a5a2b','#aab4c0','#e8b830'][c.k];g.fillStyle='rgba(0,0,0,.3)';g.fillRect(c.x-16,c.y-2,32,6);rr(c.x-15,c.y-16,30,16,3,col);rr(c.x-15,c.y-(o?30:24),30,10,3,o?'#222':col);g.fillStyle='#ffe';g.fillRect(c.x-3,c.y-12,6,6);if(!o&&D(c,P())<90)label('F: Buka',c.x,c.y-34,'#ff8')}
function drawIm(f,u){const im=ld(efP(f.i));if(!im.ok)return;const md=EFM[f.i],t=1-u;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=Math.min(1,u*1.6);
if(md=='bolt'){const hh=f.r*2.6,ww=hh*im.width/im.height;g.drawImage(im,f.x-ww/2,f.y-hh+10,ww,hh)}
else if(f.a!==undefined){g.translate(f.x,f.y);g.rotate(f.a);const ww=f.w,hh=ww*im.height/im.width;g.drawImage(im,6,-hh/2,ww,hh)}
else{const w=f.r*2.2*(.7+.3*t),hh=w*im.height/im.width;g.translate(f.x,f.y);if(md=='spin')g.rotate(T*8);g.drawImage(im,-w/2,-hh/2,w,hh)}g.restore()}
const SV={talk:'<svg viewBox="0 0 32 32"><path d="M4 5h24a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H15l-6 6v-6H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" fill="#fff" stroke="#c8902a" stroke-width="2"/><circle cx="9" cy="14" r="2" fill="#c8902a"/><circle cx="16" cy="14" r="2" fill="#c8902a"/><circle cx="23" cy="14" r="2" fill="#c8902a"/></svg>',quest:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#ffd23a" stroke="#a40" stroke-width="2"/><rect x="14" y="7" width="4" height="12" rx="2" fill="#a40"/><circle cx="16" cy="24" r="2.5" fill="#a40"/></svg>',shop:'<svg viewBox="0 0 32 32"><path d="M6 11h20l-2 17H8z" fill="#2a8a3a" stroke="#fff" stroke-width="2"/><path d="M11 12a5 5 0 0 1 10 0" fill="none" stroke="#fff" stroke-width="2"/><circle cx="16" cy="20" r="4" fill="#ffd23a"/></svg>',chest:'<svg viewBox="0 0 32 32"><rect x="3" y="14" width="26" height="14" rx="2" fill="#c8902a" stroke="#5a3513" stroke-width="2"/><path d="M3 14a13 9 0 0 1 26 0z" fill="#e8b830" stroke="#5a3513" stroke-width="2"/><rect x="14" y="16" width="4" height="7" fill="#fff"/></svg>',heal:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#fff" stroke="#d33" stroke-width="2"/><path d="M13 7h6v6h6v6h-6v6h-6v-6H7v-6h6z" fill="#d33"/></svg>'};
let indK='';function indUI(){const el=$('ind'),o=paused||G.dead?null:nearObj();if(!o){el.classList.add('hide');return}
const id=o.t=='c'?'chest':o.o.id,lab=o.t=='c'?['Wooden Chest','Silver Chest','Golden Chest'][o.o.k]:o.o.n;
if(indK!=id){indK=id;$('indi').innerHTML=SV[{elder:'talk',farmer:'talk',smith:'talk',merchant:'shop',healer:'heal',guard:'quest',chest:'chest'}[id]];$('indl').textContent=lab}
el.classList.remove('hide');el.style.left=(o.o.x-cam.x)/VW*100+'%';el.style.top=(o.o.y-cam.y-80)/VH*100+'%'}
function draw(){const p=P();cam.x=Math.round(CL(p.x-VW/2,0,MW-VW));cam.y=Math.round(CL(p.y-VH/2,0,MH-VH));NT=Math.max(0,Math.sin((G.tm-.25)*PI2)*-1);let sx=0,sy=0;if(shake>0){sx=R(-shake,shake);sy=R(-shake,shake);shake=Math.max(0,shake-1)}
g.setTransform(1,0,0,1,0,0);g.imageSmoothingEnabled=false;g.drawImage(BG,cam.x/2,cam.y/2,VW/2,VH/2,0,0,W,H);g.setTransform(ZM,0,0,ZM,-cam.x*ZM+sx,-cam.y*ZM+sy);
GATES.forEach(gt=>{if(G.lv<gt.lv&&Math.abs(p.y-gt.ln)<600){g.fillStyle='rgba(180,80,255,'+(.3+.15*Math.sin(T*4))+')';g.fillRect(cam.x,gt.ln-6,VW,12);label('🔒 Lv.'+gt.lv+' '+gt.n,p.x,gt.ln+(p.y<gt.ln?-14:26),'#e8c0ff')}});
const L=[];HOUSES.forEach(h=>{if(h.x+h.w>cam.x-80&&h.x<cam.x+W+80&&h.y+h.h>cam.y-60&&h.y<cam.y+H+160)L.push([h.y+h.h,()=>drawHouse(h)])});DEC.forEach(d=>{if(d.x>cam.x-120&&d.x<cam.x+W+120&&d.y>cam.y&&d.y<cam.y+H+130)L.push([d.y,()=>drawDec(d)])});TREES.forEach(t=>{if(t.x>cam.x-40&&t.x<cam.x+W+40&&t.y>cam.y&&t.y<cam.y+H+90)L.push([t.y,()=>drawTree(t)])});
NPCS.forEach(n=>L.push([n.y,()=>drawNpc(n)]));CHESTS.forEach(c=>L.push([c.y,()=>drawChest(c)]));ens.forEach(e=>{if(!e.dead&&Math.abs(e.x-p.x)<W/2+100&&Math.abs(e.y-p.y)<H/2+140)L.push([e.y,()=>drawE(e)])});[Cm(),p].forEach(h=>L.push([h.y,()=>drawH(h)]));
L.sort((a,b)=>a[0]-b[0]).forEach(o=>o[1]());glow();
PR.forEach(q=>{if(q.sk.ef){const im=ld(efP(q.sk.ef));if(im.ok){const w=q.sk.ew||70,hh=w*im.height/im.width;g.save();g.globalCompositeOperation='lighter';g.translate(q.x,q.y);g.rotate(EFM[q.sk.ef]=='spin'?T*12:Math.atan2(q.vy,q.vx));g.drawImage(im,-w/2,-hh/2,w,hh);g.restore();return}}g.fillStyle=q.sk.col;g.shadowColor=q.sk.col;g.shadowBlur=10;g.beginPath();g.arc(q.x,q.y,6,0,PI2);g.fill();g.shadowBlur=0});
FX.forEach(f=>{const u=f.l/f.m;if(f.k=='im'){g.globalAlpha=1;drawIm(f,u);return}g.globalAlpha=Math.max(0,u);g.strokeStyle=f.c;g.fillStyle=f.c;if(f.k=='rg'){const r=f.r*(1-u*.7);g.lineWidth=5;g.beginPath();g.arc(f.x,f.y,r,0,PI2);g.stroke();g.globalAlpha=u*.25;g.fill()}else{g.lineWidth=10;g.beginPath();g.arc(f.x,f.y,f.r*.8,f.a-1,f.a+1);g.stroke()}g.globalAlpha=1});
PT.forEach(q=>{g.globalAlpha=Math.min(1,q.l*2);g.fillStyle=q.c;g.fillRect(q.x,q.y,3,3)});g.globalAlpha=1;
FL.forEach(f=>{g.globalAlpha=Math.min(1,f.l*1.5);g.font='bold '+14*f.s+'px sans-serif';g.textAlign='center';g.lineWidth=3;g.strokeStyle='#000';g.strokeText(f.t,f.x,f.y);g.fillStyle=f.c;g.fillText(f.t,f.x,f.y)});g.globalAlpha=1;
g.setTransform(1,0,0,1,0,0);const n=Math.max(0,Math.sin((G.tm-.25)*PI2)*-1);if(n>0){g.fillStyle='rgba(10,10,60,'+n*.45+')';g.fillRect(0,0,W,H)}
drawMini($('mm').getContext('2d'),p);indUI()}
// ================= UI ICONS (SVG) =================
const IS={
bag:'<svg viewBox="0 0 24 24"><path d="M7 7a5 5 0 0 1 10 0v1H7z" fill="#8a5a2b"/><rect x="4" y="8" width="16" height="13" rx="3" fill="#c0803a" stroke="#5a3513" stroke-width="1.4"/><rect x="8" y="13" width="8" height="5" rx="1.5" fill="#8a5a2b" stroke="#5a3513"/><circle cx="12" cy="15.5" r="1" fill="#ffd23a"/></svg>',
person:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4.5" fill="#efe0c8" stroke="#7a6a50"/><path d="M3.5 21c0-5 4-7.5 8.5-7.5s8.5 2.5 8.5 7.5z" fill="#efe0c8" stroke="#7a6a50"/></svg>',
scroll:'<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2" fill="#f0dcaa" stroke="#7a5226" stroke-width="1.4"/><path d="M8 8h8M8 12h8M8 16h5" stroke="#7a5226" stroke-width="1.4"/><circle cx="5" cy="4" r="2" fill="#c89050"/><circle cx="19" cy="20" r="2" fill="#c89050"/></svg>',
shopi:'<svg viewBox="0 0 24 24"><path d="M3 9l2-5h14l2 5z" fill="#e8402a"/><path d="M3 9h18v2H3z" fill="#fff"/><path d="M5 11h14v9H5z" fill="#c89050" stroke="#7a5226"/><rect x="8" y="13" width="8" height="5" fill="#f0dcaa"/></svg>',
mapi:'<svg viewBox="0 0 24 24"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" fill="#9ad07a" stroke="#4a6a2a" stroke-width="1.2"/><path d="M9 4v14M15 6v14" stroke="#4a6a2a" stroke-width="1.2"/><path d="M11 15l4-5" stroke="#3a8ae0" stroke-width="2"/></svg>',
pause:'<svg viewBox="0 0 24 24"><rect x="5" y="4" width="5" height="16" rx="1.5" fill="#f0e8d0"/><rect x="14" y="4" width="5" height="16" rx="1.5" fill="#f0e8d0"/></svg>',
coin:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#f6b800" stroke="#a86a00" stroke-width="1.6"/><circle cx="12" cy="12" r="7" fill="none" stroke="#ffe27a" stroke-width="1.2"/><path d="M14 9c-.6-.8-1.4-1.2-2.4-1.2-1.4 0-2.3.7-2.3 1.8 0 2.6 5 1.4 5 4 0 1.2-1 1.9-2.6 1.9-1 0-2-.4-2.5-1.1M12 6v12" stroke="#8a5a00" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>',
gear:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#c8902a" stroke="#5a3b12" stroke-width="1.4"/><circle cx="12" cy="12" r="2" fill="#24180c"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M5 19l2-2" stroke="#c8902a" stroke-width="2.4" stroke-linecap="round"/></svg>',
close:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="#f0e0c0" stroke-width="3" stroke-linecap="round"/></svg>',
swap:'<svg viewBox="0 0 24 24"><path d="M4 8h13l-3-3M20 16H7l3 3" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
lock:'<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2" fill="#e8c060" stroke="#7a5226"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="#e8c060" stroke-width="2.4"/></svg>',
potion:c=>`<svg viewBox="0 0 24 24"><path d="M9 3h6v4l4 8a5 5 0 0 1-4.5 7h-5A5 5 0 0 1 5 15l4-8z" fill="#dfeff8" stroke="#6a7a88" stroke-width="1.2"/><path d="M7.4 14h9.2l1.5 3.4A3.4 3.4 0 0 1 15 21H9a3.4 3.4 0 0 1-3.1-3.6z" fill="${c}"/><rect x="9" y="1.5" width="6" height="2.6" rx=".8" fill="#a8743a"/></svg>`,
leaf:c=>`<svg viewBox="0 0 24 24"><path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16z" fill="${c}" stroke="#1f5a2a" stroke-width="1.2"/><path d="M4 20L15 9" stroke="#1f5a2a" stroke-width="1.4"/></svg>`,
meat:'<svg viewBox="0 0 24 24"><ellipse cx="11" cy="11" rx="8" ry="6.5" fill="#c4553a" stroke="#6a2414" stroke-width="1.3"/><circle cx="9" cy="10" r="2" fill="#e8a090"/><rect x="17" y="14" width="6" height="3" rx="1.5" transform="rotate(35 20 15)" fill="#f0e8d0" stroke="#7a6a50"/></svg>',
bread:'<svg viewBox="0 0 24 24"><path d="M3 15c0-5 4-8 9-8s9 3 9 8v3H3z" fill="#d89a4a" stroke="#7a4a1a" stroke-width="1.3"/><path d="M8 10l2 4M12 9l1 5M16 10l-1 4" stroke="#9a6224" stroke-width="1.2"/></svg>',
fish:'<svg viewBox="0 0 24 24"><path d="M2 12c4-6 11-6 15 0-4 6-11 6-15 0z" fill="#e8a05a" stroke="#7a4a1a" stroke-width="1.2"/><path d="M17 12l5-4v8z" fill="#e8a05a" stroke="#7a4a1a" stroke-width="1.2"/><circle cx="7" cy="11" r="1.2" fill="#222"/></svg>',
ear:'<svg viewBox="0 0 24 24"><path d="M3 18C6 8 12 4 21 5c-1 9-6 15-15 15z" fill="#5aa63a" stroke="#2a5a1a" stroke-width="1.3"/><path d="M8 16c3-4 6-6 9-7" stroke="#3a7a2a" stroke-width="1.2" fill="none"/></svg>',
orb:c=>`<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8" fill="${c}" stroke="#0007" stroke-width="1.2"/><ellipse cx="9" cy="10" rx="2.6" ry="1.6" fill="#fff9"/></svg>`,
fang:c=>`<svg viewBox="0 0 24 24"><path d="M6 3h12c0 8-3 15-6 19-3-4-6-11-6-19z" fill="${c}" stroke="#7a6a50" stroke-width="1.2"/></svg>`,
ore:'<svg viewBox="0 0 24 24"><path d="M3 19l3-9 6-5 7 4 3 10z" fill="#8a8c94" stroke="#444" stroke-width="1.2"/><path d="M8 17l2-5 4 1 1 5z" fill="#c8a064"/></svg>',
gem:c=>`<svg viewBox="0 0 24 24"><path d="M6 4h12l4 6-10 12L2 10z" fill="${c}" stroke="#0008" stroke-width="1.2"/><path d="M2 10h20M8 4l-2 6 6 12 6-12-2-6" stroke="#fff7" stroke-width="1" fill="none"/></svg>`,
skull:'<svg viewBox="0 0 24 24"><path d="M12 2a8 8 0 0 0-8 8c0 3 1 4.500 3 5.500V20h10v-4.500c2-1 3-2.500 3-5.500a8 8 0 0 0-8-8z" fill="#e8e0d0" stroke="#555" stroke-width="1.2"/><circle cx="9" cy="11" r="2" fill="#222"/><circle cx="15" cy="11" r="2" fill="#222"/></svg>',
flame:'<svg viewBox="0 0 24 24"><path d="M12 2c1 5 6 7 6 13a6 6 0 0 1-12 0c0-3 2-4 3-7 1 2 2 2 3 1-1-3 0-5 0-7z" fill="#ff7a1a" stroke="#a83a00" stroke-width="1.2"/><path d="M12 22a3 3 0 0 1-3-3c0-2 2-3 3-5 1 2 3 3 3 5a3 3 0 0 1-3 3z" fill="#ffd23a"/></svg>',
shield:'<svg viewBox="0 0 24 24"><path d="M12 2l8 3v7c0 5-4 8-8 10-4-2-8-5-8-10V5z" fill="#6a8ac8" stroke="#2a3a6a" stroke-width="1.4"/><path d="M12 5v14" stroke="#cfe0ff" stroke-width="1.4"/></svg>',
feather:'<svg viewBox="0 0 24 24"><path d="M20 3C10 3 5 9 5 16l-2 5 5-2c7 0 12-6 12-16z" fill="#dfe8f8" stroke="#5a6a8a" stroke-width="1.2"/><path d="M5 19L16 8" stroke="#5a6a8a" stroke-width="1.2"/></svg>',
spark:'<svg viewBox="0 0 24 24"><path d="M12 2l2.500 7.500L22 12l-7.500 2.500L12 22l-2.500-7.500L2 12l7.500-2.500z" fill="#9ff" stroke="#2a8aaa" stroke-width="1.2"/></svg>',
ice:'<svg viewBox="0 0 24 24"><path d="M12 2l4 8-4 12-4-12z" fill="#8de" stroke="#2a7aaa" stroke-width="1.3"/><path d="M2 12l7-2M22 12l-7-2M5 5l5 5M19 5l-5 5" stroke="#bff" stroke-width="1.4"/></svg>',
windi:'<svg viewBox="0 0 24 24"><path d="M3 9h11a3 3 0 1 0-3-3M3 14h16a3 3 0 1 1-3 3M3 19h8" fill="none" stroke="#bfe8c8" stroke-width="2" stroke-linecap="round"/></svg>',
rain:'<svg viewBox="0 0 24 24"><path d="M6 14a5 5 0 0 1 1-9 6 6 0 0 1 11 2 4 4 0 0 1 0 8z" fill="#6a8ac8" stroke="#2a3a6a"/><path d="M8 17l-1 4M13 17l-1 4M18 17l-1 4" stroke="#6cf" stroke-width="2" stroke-linecap="round"/></svg>',
volc:'<svg viewBox="0 0 24 24"><path d="M3 21l6-12h6l6 12z" fill="#7a4a3a" stroke="#3a1a10" stroke-width="1.2"/><path d="M9 9l-2-5M15 9l2-6M12 8V2" stroke="#ff4a8a" stroke-width="2" stroke-linecap="round"/></svg>'};
const ITI={small_potion:['potion','#e33'],large_potion:['potion','#e8409a'],mana_potion:['potion','#3a7bff'],bread:['bread'],meat:['meat'],fish:['fish'],herb:['leaf','#4caf2f'],goblin_ear:['ear'],slime_core:['orb','#4ad0a0'],wolf_fang:['fang','#e8e0d0'],orc_tooth:['fang','#d8c890'],iron_ore:['ore'],dark_crystal:['gem','#7a3ab8'],crystal:['gem','#5ac8ff'],boss_mat:['skull']};
const ARTI=[['flame'],['gem','#4a8aff'],['shield'],['feather'],['gem','#ffd23a']],SKSV={'Magic Bolt':'spark','Fire Burst':'flame','Ice Crystal':'ice','Wind Cutter':'windi','Elemental Rain':'rain',"Sora's Cataclysm":'volc'};
const ic_=(n,c)=>{const v=IS[n];return typeof v=='function'?v(c):v},ico=id=>{const[n,c]=ITI[id]||['orb','#888'];return ic_(n,c)},aico=a=>{const[n,c]=ARTI[a.b];return ic_(n,c)};
const skIcon=s=>s.im?`<img src="${ld(icoP(s.im)).src}">`:(IS[SKSV[s.n]]||''),sv=(k,c)=>IS[k].replace('<svg','<svg class="'+c+'"');
const NE=s=>String(s).replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{2190}-\u{21FF}]/gu,'').replace(/\s{2,}/g,' ').trim();
let qNote=0,faceK='';const FC={};
function drawFace(cvs,ch){const x=cvs.getContext('2d'),o=CH[ch],w=cvs.width,s=w/64;x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,w,w);x.fillStyle='#1c2c4c';x.fillRect(0,0,w,w);x.scale(s,s);
x.fillStyle=o.hair;if(o.long)x.fillRect(10,24,44,36);x.fillStyle=o.body;x.beginPath();x.moveTo(4,64);x.quadraticCurveTo(32,42,60,64);x.fill();if(o.ren){x.fillStyle='#1a6cff';x.fillRect(22,50,20,5)}
x.fillStyle='#ffd9b8';x.beginPath();x.arc(32,33,17,0,PI2);x.fill();x.fillStyle=o.hair;x.beginPath();x.arc(32,29,18.500,Math.PI,0);x.fill();
if(o.ren)[[13,24,18,10,24,22],[20,18,28,5,33,17],[31,16,40,5,46,17],[42,18,52,10,52,24]].forEach(q=>{x.beginPath();x.moveTo(q[0],q[1]);x.lineTo(q[2],q[3]);x.lineTo(q[4],q[5]);x.fill()});
x.fillRect(14,27,6,14);x.fillRect(44,27,6,14);x.fillStyle=o.ren?'#2a6cff':'#7a4ae0';x.fillRect(23,33,6,8);x.fillRect(36,33,6,8);x.fillStyle='#fff';x.fillRect(24,34,2,2);x.fillRect(37,34,2,2);x.fillStyle='#c0705a';x.fillRect(29,44,6,2)}
function faceURL(ch){if(!FC[ch]){const c=document.createElement('canvas');c.width=c.height=96;drawFace(c,ch);FC[ch]=c.toDataURL()}return FC[ch]}
const PH=(i,t)=>`<div class=ph>${sv(i,'')}<b>${t}</b></div>`;
function hud(){const p=P(),s=ST(p.ch),nx=G.lv>=100;$('pname').textContent=CH[p.ch].n;$('plv').textContent='Lv. '+G.lv;
$('hp').style.width=Math.max(0,p.hp/s.hp*100)+'%';$('hpt').textContent=Math.max(0,Math.ceil(p.hp))+'/'+s.hp;$('mp').style.width=p.mp/s.mp*100+'%';$('mpt').textContent=Math.floor(p.mp)+'/'+s.mp;
$('xp').style.width=nx?'100%':G.xp/need(G.lv)*100+'%';$('xpt').textContent=nx?'MAX LEVEL':G.xp+'/'+need(G.lv);$('goldv').textContent=G.gold;
if(faceK!=G.act){faceK=G.act;drawFace($('pface'),G.act)}
const aq=QS.find(q=>G.q[q.id]&&(G.q[q.id].s=='active'||G.q[q.id].s=='completed')),el=$('qt');let hd,bd;
if(aq){const st=G.q[aq.id],dn=st.s=='completed';hd=dn?'Quest Selesai':(T<qNote?'Quest Diterima':'Quest Aktif');bd=`<b>${aq.n}</b><br>`+(dn?'Lapor ke Captain Mira':Object.keys(aq.need).map(k=>`Bunuh ${EN[k].n} (${st.k[k]}/${aq.need[k]})`).join('<br>'))}else{hd='Quest';bd='Temui Captain Mira'}
const html=`<i class=qi>${SV.quest}</i><div><b class=qh>${hd}</b><div>${bd}</div></div>`;if(el._h!=html){el._h=html;el.innerHTML=html}el.classList.toggle('new',T<qNote);
$('qdot').classList.toggle('hide',!QS.some(q=>qs(q)=='available'||qs(q)=='completed'))}
// ================= UI =================
const B=(a,v,t,c)=>`<button data-a="${a}" data-v="${v}" class="${c||''}">${t}</button>`;
function toast(m){const e=$('toast');e.textContent=NE(m);e.style.opacity=1;clearTimeout(tt);tt=setTimeout(()=>e.style.opacity=0,2000)}
function banner(t){const b=$('banner');b.textContent=NE(t);b.classList.remove('show');void b.offsetWidth;b.classList.add('show')}
const qs=q=>{const s=G.q[q.id];return s?s.s:(!q.pre||(G.q[q.pre]&&G.q[q.pre].s=='claimed')?'available':'locked')};
const rwTxt=r=>`${r.gold}G, ${r.xp}XP`+(r.items?', '+Object.keys(r.items).map(i=>ITEMS[i].n+' ×'+r.items[i]).join(', '):'')+(r.art?', Rare Artifact':'');
let skb=[];(()=>{const c=$('skills');for(let i=0;i<6;i++){const b=document.createElement('button');b.className='sk s'+i;b.innerHTML='<span class=ic></span><i class=co></i><b class=ct></b><small></small><u></u>';tap(b,()=>{if(!paused)cast(P(),i)});c.appendChild(b);skb.push(b)}})();
function skUI(){const h=P(),ss=CH[h.ch].sk;skb.forEach((b,i)=>{const lk=G.lv<ULV[i],s=ss[i],c=h.cd[i],k=b.children,im=s.im&&ld(icoP(s.im)),key=h.ch+i+(im&&im.ok?1:0);b.classList.toggle('lk',lk);
if(b._k!=key){b._k=key;k[0].innerHTML=im&&im.ok?`<img src="${im.src}">`:(s.im?'':(IS[SKSV[s.n]]||''));k[4].textContent=''}
const lt=lk?'UNLOCK LV. '+ULV[i]:'';if(k[3].textContent!=lt)k[3].textContent=lt;
k[1].style.height=(!lk&&c>0?c/s.cd*100:0)+'%';k[2].textContent=!lk&&c>0?Math.ceil(c):'';b.classList.toggle('lo',!lk&&h.mp<s.mp)})}
function nearObj(){const p=P();let b=null,bd=70;NPCS.forEach(n=>{const d=D(n,p);if(d<bd){bd=d;b={t:'n',o:n}}});CHESTS.forEach(c=>{if(!G.ch.includes(c.id)){const d=D(c,p);if(d<bd){bd=d;b={t:'c',o:c}}}});return b}
function interact(){const o=nearObj();if(!o||G.dead)return;if(o.t=='n'){$('dlg').innerHTML=`<b style="color:#ffd23a">${o.o.n}</b><p>${DL[o.o.id][0].replace('\n','<br>')}</p>`+DL[o.o.id][1].map(x=>B(x[1],x[2]||'',x[0])).join('')+B('x','','Tutup');$('dlg').classList.remove('hide')}
else{const c=o.o,k=c.k,gd=RI(30,80)*(k+1)*(k+1);G.gold+=gd;G.ch.push(c.id);const msg=['+'+gd+' Gold'];const it=[['small_potion','mana_potion','herb'],['large_potion','iron_ore','crystal'],['large_potion','dark_crystal','crystal']][k][RI(0,2)];addItem(it,k+1);msg.push(ITEMS[it].n+' ×'+(k+1));
if(Math.random()<[.2,.6,1][k]){const a=addArt(Math.max([0,1,2][k],rar(k*8)));msg.push(aName(a)+' ['+RAR[a.r][0]+']')}
toast('📦 '+msg.join(', '));pt(c.x,c.y-20,'#ffd23a',30);FX.push({k:'rg',x:c.x,y:c.y,r:60,l:.5,m:.5,c:'#ffd23a'})}}
function open(k){PN=0;if(k=='map'){openMap();return}if(k=='questN'){k='quest';PN=1}PK=k;$('panel').classList.toggle('pm',k=='menu'||k=='set');$('dlg').classList.add('hide');$('panel').classList.remove('hide');render()}
function close(){if(FM.open)closeMap();PK='';$('panel').classList.add('hide');$('dlg').classList.add('hide')}
function render(){if(!PK)return;const f={inv:rInv,char:rChar,quest:rQuest,shop:rShop,menu:rMenu,set:rSet}[PK];$('pc').innerHTML=NE2(f())}
const NE2=h=>h.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu,'')
function rInv(){const eq=G.arts.filter(a=>a.e).length,ids=Object.keys(G.inv).filter(i=>G.inv[i]>0);
let h=PH('bag','Inventory')+`<p class=sub>${sv('coin','si')} ${G.gold} &nbsp;·&nbsp; Slot Artifact ${eq}/${slots()} (+1 tiap 20 level, maks 6)</p><h3>Item</h3><div class=grid>`;
h+=ids.length?ids.map(i=>{const it=ITEMS[i];return`<div class=cell><div class=ci>${ico(i)}<em>${G.inv[i]}</em></div><div class=tx><b>${it.n}</b><small>${it.t=='c'?'Consumable':'Material'}</small>${it.t=='c'?B('use',i,'Pakai'):''}</div></div>`}).join(''):'<i>Kosong</i>';
h+='</div><h3>Artifact</h3><div class=grid>';
h+=G.arts.length?G.arts.map((a,i)=>{const r=RAR[a.r];return`<div class=cell style="border-color:${r[1]}"><div class=ci style="border-color:${r[1]}">${aico(a)}</div><div class=tx><b style="color:${r[1]}">${r[0]}</b> ${ARTS[a.b].n}${a.u?' +'+a.u:''}<small>+${aVal(a)}${SL[ARTS[a.b].s]}${a.e?' · Terpasang':''}</small>${B('eq',i,a.e?'Lepas':'Pasang')}${a.u<5?B('up',i,`Upgrade ${(a.u+1)*2} Ore + ${(a.u+1)*50}G`):''}</div></div>`}).join(''):'<i>Belum ada artifact</i>';
return h+'</div>'}
function rChar(){const k=G.act,c=CH[k],s=ST(k),eq=G.arts.filter(a=>a.e),o=k=='renn'?'sora':'renn';
let h=PH('person','Character')+`<div class=cr><div class=pt><img src="${faceURL(k)}"><b>${c.n}</b><span>Lv. ${G.lv}</span></div><div class=st>`+[['HP',s.hp],['MP',s.mp],['Attack',s.atk.toFixed(0)],['Magic Attack',s.mag.toFixed(0)],['Defense',s.def.toFixed(0)],['Speed',s.spd.toFixed(1)],['Critical',s.crit.toFixed(1)+'%']].map(r=>`<div><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')+`</div><div class=eqs><small>Equipment (artifact ${eq.length}/${slots()})</small><div class=eqg>`+Array.from({length:slots()},(_,i)=>eq[i]?`<div class=slot style="border-color:${RAR[eq[i].r][1]}">${aico(eq[i])}</div>`:'<div class=slot></div>').join('')+`</div></div></div>`;
h+=`<div class=cell style="margin-top:.5em"><div class=ci><img src="${faceURL(o)}"></div><div class=tx><b>${CH[o].n}</b> (Companion)<small>${o=='renn'?'Magic Swordsman':'Mage / Witch'}</small>${B('sw',0,'Ganti ke '+CH[o].n)}</div></div><h3>Skill</h3>`;
return h+CH[k].sk.map((s,i)=>G.lv<ULV[i]?`<div class="cell sk2"><div class=ci>${sv('lock','')}</div><div class=tx><b>Ultimate ${i-3}</b><small>Unlock at Level ${ULV[i]}</small></div></div>`:`<div class="cell sk2"><div class=ci>${skIcon(s)}</div><div class=tx><b>${s.n}</b><small>${s.d} (DMG ×${s.m} · CD ${s.cd}s · MP ${s.mp})</small></div></div>`).join('')}
function rQuest(){let h=PH('scroll','Quest')+(PN?'':'<p class=sub>Terima/klaim quest di Captain Mira.</p>');QS.forEach(q=>{const st=qs(q);if(st=='locked')return;const s=G.q[q.id];
h+=`<div class=cell><div class=ci>${SV.quest}</div><div class=tx><b>${q.n}</b> <span class=chip>${st.toUpperCase()}</span><small>${Object.keys(q.need).map(k=>`Bunuh ${EN[k].n} (${s?s.k[k]:0}/${q.need[k]})`).join(' · ')}</small><small>Hadiah: ${rwTxt(q.rw)}</small>`+(PN&&st=='available'?B('qa',q.id,'Terima'):'')+(PN&&st=='completed'?B('qc',q.id,'Klaim'):'')+'</div></div>'});return h}
function rShop(){const co=sv('coin','si');let h=PH('shopi','Shop')+`<p class=sub>${co} ${G.gold}</p>${B('tab','buy','Beli',shopTab=='buy'?'on':'')}${B('tab','sell','Jual',shopTab=='sell'?'on':'')}<div class=grid>`;
if(shopTab=='buy')h+=SHOP.map(i=>`<div class=cell><div class=ci>${ico(i)}</div><div class=tx><b>${ITEMS[i].n}</b><small>${co} ${ITEMS[i].p}</small>${B('buy',i,'Beli')}</div></div>`).join('')+SHOPART.map((a,i)=>`<div class=cell style="border-color:${RAR[a.r][1]}"><div class=ci style="border-color:${RAR[a.r][1]}">${aico(a)}</div><div class=tx><b style="color:${RAR[a.r][1]}">${RAR[a.r][0]}</b> ${ARTS[a.b].n}<small>+${aVal(a)}${SL[ARTS[a.b].s]} · ${co} ${artPrice(a)}</small>${B('buyA',i,'Beli')}</div></div>`).join('');
else h+=Object.keys(G.inv).filter(i=>G.inv[i]>0).map(i=>`<div class=cell><div class=ci>${ico(i)}<em>${G.inv[i]}</em></div><div class=tx><b>${ITEMS[i].n}</b><small>${co} ${Math.floor(ITEMS[i].p/2)}</small>${B('sellI',i,'Jual')}</div></div>`).join('')+G.arts.map((a,i)=>a.e?'':`<div class=cell style="border-color:${RAR[a.r][1]}"><div class=ci style="border-color:${RAR[a.r][1]}">${aico(a)}</div><div class=tx>${ARTS[a.b].n} [${RAR[a.r][0]}]<small>${co} ${Math.floor(artPrice(a)/2)}</small>${B('sellA',i,'Jual')}</div></div>`).join('');
return h+'</div>'}
function rMenu(){return PH('pause','Menu Pause')+`${B('x','','Lanjut','bigb')}${B('op','set','Pengaturan','bigb')}${B('quit','','Keluar','bigb')}`}
function rSet(){return PH('gear','Pengaturan')+`${B('fs','','Layar Penuh','bigb')}${B('save','','Save Game','bigb')}${B('load','','Load Game','bigb')}${B('new','','Game Baru','bigb')}${B('op','menu','Kembali','bigb')}<p class=sub>WASD gerak · Space serang · 1/2/3 skill · Q Ultimate 1 (Lv10) · R Ultimate 2 (Lv15) · E interaksi · T ganti karakter · I inventory · J quest · C karakter · M peta · Esc menu</p>`}
function save(auto){try{localStorage.setItem('rennx_save',JSON.stringify(G));if(!auto)toast('💾 Game tersimpan')}catch(e){if(!auto)toast('Save tidak didukung di sini')}}
function load(){let s=null;try{s=localStorage.getItem('rennx_save')}catch(e){}if(!s)return 0;G=JSON.parse(s);for(const k in G.hs){const h=G.hs[k];if(blocked(h.x,h.y)){h.x=1500+(k=='renn'?0:-30);h.y=1030}}spawnAll();return 1}
function sw(){if(swcd>0||G.dead)return;swcd=1;const a=P(),b=Cm(),t={x:a.x,y:a.y};G.act=G.act=='renn'?'sora':'renn';a.x=b.x;a.y=b.y;b.x=t.x;b.y=t.y;pt(b.x,b.y-20,'#fff',16);toast('Karakter: '+CH[G.act].n)}
function act(a,v){const p=P();switch(a){
case 'start':fs();newG();$('title').classList.add('hide');return;
case 'cont':fs();if(load())$('title').classList.add('hide');else toast('Belum ada save');return;
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
case 'qa':{const q=QS.find(x=>x.id==v);G.q[v]={s:'active',k:Object.fromEntries(Object.keys(q.need).map(k=>[k,0]))};qNote=T+4;toast('Quest diterima');break}
case 'qc':{const q=QS.find(x=>x.id==v),r=q.rw;G.q[v].s='claimed';G.gold+=r.gold;if(r.items)for(const i in r.items)addItem(i,r.items[i]);if(r.art)addArt(2);gainXP(r.xp);toast('🎁 Hadiah: '+rwTxt(r));break}
case 'quit':{save(1);close();$('cont').classList.remove('hide');$('title').classList.remove('hide');return}
case 'fs':fs();return;
case 'save':save();return;
case 'load':if(load()){toast('Game dimuat');close()}else toast('Belum ada save');return;
case 'new':newG();close();return}
render()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(b)act(b.dataset.a,b.dataset.v)});
const tog=k=>{if(k=='map'?FM.open:(PK==k&&!$('panel').classList.contains('hide')))close();else open(k)};
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
function fs(){try{const e=document.documentElement,f=e.requestFullscreen||e.webkitRequestFullscreen;if(f&&!document.fullscreenElement){const r=f.call(e);if(r&&r.catch)r.catch(()=>{})}}catch(x){}}
const VH=H/ZM;
function resizeGame(){const w=CL(Math.round(H*innerWidth/innerHeight),640,1400);if(w!=W||cv.width!=w){W=w;cv.width=w}VW=W/ZM}
addEventListener('resize',resizeGame);addEventListener('orientationchange',resizeGame);resizeGame();
// ================= FULL MAP (overlay interaktif) =================
const FM={z:1,fit:1,cx:MW/2,cy:MH/2,open:0,ptr:new Map(),pd:0,cw:0,ch:0,d:1},fmEl=$('fmap'),fmC=$('fmc');
const FLBL=[['RENN VILLAGE',1500,900,1],['MARKET',2400,760,0],['FARM',700,1090,0],['FARM',2150,1220,0],['KAMP',170,760,0],['DANAU',3680,1000,1],['SHRINE',3470,700,0],['SUNGAI',2000,1500,0],['AIR TERJUN',265,512,0],['AIR TERJUN',3905,592,0],['FOREST HUNTING GROUND',2048,1800,1],['DEEP FOREST',2048,260,1,8],['DARK FOREST',1100,2150,1,15],['RUINS & BOSS AREA',3300,2040,1,15]];
function fmSize(){const r=fmC.getBoundingClientRect();FM.d=Math.min(typeof devicePixelRatio=='number'?devicePixelRatio:1,2);FM.cw=Math.max(200,Math.round(r.width*FM.d));FM.ch=Math.max(120,Math.round(r.height*FM.d));if(fmC.width!=FM.cw||fmC.height!=FM.ch){fmC.width=FM.cw;fmC.height=FM.ch}FM.fit=Math.min(FM.cw/MW,FM.ch/MH);FM.z=CL(FM.z,FM.fit,FM.fit*6);fmClamp()}
function fmClamp(){const hw=FM.cw/2/FM.z,hh=FM.ch/2/FM.z;FM.cx=hw*2>=MW?MW/2:CL(FM.cx,hw,MW-hw);FM.cy=hh*2>=MH?MH/2:CL(FM.cy,hh,MH-hh)}
function fmZoom(f,sx,sy){const wx=FM.cx+(sx-FM.cw/2)/FM.z,wy=FM.cy+(sy-FM.ch/2)/FM.z;FM.z=CL(FM.z*f,FM.fit,FM.fit*6);FM.cx=wx-(sx-FM.cw/2)/FM.z;FM.cy=wy-(sy-FM.ch/2)/FM.z;fmClamp()}
function openMap(){$('dlg').classList.add('hide');$('panel').classList.add('hide');PK='';fmEl.classList.remove('hide');FM.open=1;FM.z=0;FM.ptr.clear();fmSize();FM.z=FM.fit;const p=P();FM.cx=p.x;FM.cy=p.y;fmClamp();
$('fmar').innerHTML=AREAS.map(a=>`<div><span class="chip ${G.lv>=a[1]?'ok':'no'}">${G.lv>=a[1]?'Terbuka':'Terkunci Lv.'+a[1]}</span> ${a[0].split(' (')[0]}</div>`).join('');
try{history.pushState({fm:1},'')}catch(e){}requestAnimationFrame(fmLoop)}
function closeMap(fromPop){if(!FM.open)return;FM.open=0;fmEl.classList.add('hide');if(!fromPop)try{if(history.state&&history.state.fm)history.back()}catch(e){}}
function fmLoop(){if(!FM.open)return;fmDraw();requestAnimationFrame(fmLoop)}
function fmLab(c,t,x,y,fs,col){c.font='bold '+fs+'px Trebuchet MS,Segoe UI,sans-serif';c.textAlign='center';c.lineWidth=Math.max(2,fs*.22);c.strokeStyle='rgba(0,0,0,.85)';c.strokeText(t,x,y);c.fillStyle=col||'#fff';c.fillText(t,x,y)}
function fmLock(c,x,y,s){c.fillStyle='#e8c060';c.strokeStyle='#5a3b12';c.lineWidth=Math.max(1,s*.1);c.beginPath();c.roundRect(x-s/2,y-s*.1,s,s*.75,s*.12);c.fill();c.stroke();c.beginPath();c.arc(x,y-s*.1,s*.3,Math.PI,0);c.lineWidth=s*.16;c.strokeStyle='#e8c060';c.stroke()}
function fmDraw(){const c=fmC.getContext('2d'),z=FM.z,cw=FM.cw,ch=FM.ch,d=FM.d,p=P(),x0=FM.cx-cw/2/z,y0=FM.cy-ch/2/z,vw=cw/z,vh=ch/z;
c.setTransform(1,0,0,1,0,0);c.fillStyle='#0d1420';c.fillRect(0,0,cw,ch);
const ix0=Math.max(0,x0),iy0=Math.max(0,y0),ix1=Math.min(MW,x0+vw),iy1=Math.min(MH,y0+vh);c.imageSmoothingEnabled=z<FM.fit*3;
c.drawImage(BG,ix0/2,iy0/2,(ix1-ix0)/2,(iy1-iy0)/2,(ix0-x0)*z,(iy0-y0)*z,(ix1-ix0)*z,(iy1-iy0)*z);
const X=v=>(v-x0)*z,Y=v=>(v-y0)*z;
GATES.forEach(gt=>{if(G.lv<gt.lv){c.fillStyle='rgba(18,8,36,.64)';c.fillRect(X(gt.r[0]),Y(gt.r[1]),(gt.r[2]-gt.r[0])*z,(gt.r[3]-gt.r[1])*z);c.strokeStyle='rgba(210,160,255,.9)';c.lineWidth=2*d;c.setLineDash([8*d,6*d]);c.beginPath();c.moveTo(X(0),Y(gt.ln));c.lineTo(X(MW),Y(gt.ln));c.stroke();c.setLineDash([])}});
FLBL.forEach(l=>{const lk=l[4]&&G.lv<l[4],sx=X(l[1]),sy=Y(l[2]);if(sx<-200||sx>cw+200||sy<-40||sy>ch+40)return;fmLab(c,l[0],sx,sy,(l[3]?15:11)*d,lk?'#d8b8ff':l[3]?'#ffe9a0':'#fff');if(lk){fmLock(c,sx,sy-24*d,16*d);fmLab(c,'Lv.'+l[4],sx,sy+15*d,11*d,'#e8c0ff')}});
BRG.forEach(b=>{const sx=X(b.x+b.w/2),sy=Y(b.y+b.h/2);if(z>FM.fit*2.2)fmLab(c,'Jembatan',sx,sy,10*d,'#f0d0a0')});
CHESTS.forEach(o=>{if(G.ch.includes(o.id))return;const s=7*d,sx=X(o.x),sy=Y(o.y);c.fillStyle='#f0a020';c.strokeStyle='#5a3000';c.lineWidth=1.5*d;c.fillRect(sx-s,sy-s*.7,s*2,s*1.4);c.strokeRect(sx-s,sy-s*.7,s*2,s*1.4)});
ens.forEach(e=>{if(e.dead)return;const sx=X(e.x),sy=Y(e.y);if(sx<-20||sx>cw+20||sy<-20||sy>ch+20)return;if(e.k=='boss'){c.fillStyle='#d020ff';c.strokeStyle='#fff';c.lineWidth=2*d;c.beginPath();c.moveTo(sx,sy-11*d);c.lineTo(sx+9*d,sy);c.lineTo(sx,sy+11*d);c.lineTo(sx-9*d,sy);c.closePath();c.fill();c.stroke();fmLab(c,'BOSS',sx,sy-16*d,11*d,'#f0b0ff')}else{c.fillStyle='#ff3a3a';c.beginPath();c.arc(sx,sy,3*d,0,PI2);c.fill()}});
NPCS.forEach(n=>{const sx=X(n.x),sy=Y(n.y),r=6*d;c.strokeStyle='#000';c.lineWidth=1.5*d;c.fillStyle=n.id=='guard'?'#ffd23a':n.id=='merchant'?'#3fbf6a':n.id=='healer'?'#fff':'#ffe27a';c.beginPath();c.arc(sx,sy,r,0,PI2);c.fill();c.stroke();
c.fillStyle='#4a2a00';c.font='bold '+9*d+'px sans-serif';c.textAlign='center';if(n.id=='guard')c.fillText('!',sx,sy+3.500*d);else if(n.id=='merchant'){c.fillStyle='#fff';c.fillText('$',sx,sy+3.500*d)}else if(n.id=='healer'){c.fillStyle='#e22';c.fillRect(sx-1*d,sy-4*d,2*d,8*d);c.fillRect(sx-4*d,sy-1*d,8*d,2*d)}
if(z>FM.fit*2)fmLab(c,n.n,sx,sy-10*d,10*d,'#ffe9a0')});
{const sx=X(3470),sy=Y(730);c.fillStyle='#d03a22';c.fillRect(sx-7*d,sy-9*d,14*d,2.500*d);c.fillRect(sx-5*d,sy-5*d,10*d,2*d);c.fillRect(sx-5*d,sy-9*d,2*d,12*d);c.fillRect(sx+3*d,sy-9*d,2*d,12*d)}
const o=Cm();{const sx=X(o.x),sy=Y(o.y);c.fillStyle='#6cf';c.strokeStyle='#000';c.lineWidth=1.5*d;c.beginPath();c.arc(sx,sy,4*d,0,PI2);c.fill();c.stroke()}
c.strokeStyle='rgba(255,255,255,.95)';c.fillStyle='rgba(255,255,255,.08)';c.lineWidth=2*d;c.setLineDash([7*d,5*d]);c.fillRect(X(cam.x),Y(cam.y),VW*z,VH*z);c.strokeRect(X(cam.x),Y(cam.y),VW*z,VH*z);c.setLineDash([]);
{const sx=X(p.x),sy=Y(p.y),pu=Math.sin(performance.now()/260);c.strokeStyle='rgba(120,190,255,'+(.7-.3*pu)+')';c.lineWidth=2.500*d;c.beginPath();c.arc(sx,sy,(12+3*pu)*d,0,PI2);c.stroke();c.fillStyle='#2a7bff';c.strokeStyle='#fff';c.lineWidth=2.500*d;c.beginPath();c.arc(sx,sy,7*d,0,PI2);c.fill();c.stroke();fmLab(c,CH[p.ch].n.toUpperCase(),sx,sy+24*d,12*d,'#bfe0ff')}}
fmC.addEventListener('pointerdown',e=>{try{fmC.setPointerCapture(e.pointerId)}catch(x){}FM.ptr.set(e.pointerId,{x:e.clientX,y:e.clientY});if(FM.ptr.size==2){const a=[...FM.ptr.values()];FM.pd=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)}});
fmC.addEventListener('pointermove',e=>{const o=FM.ptr.get(e.pointerId);if(!o)return;const r=fmC.getBoundingClientRect(),sc=FM.cw/r.width;
if(FM.ptr.size==1){FM.cx-=(e.clientX-o.x)*sc/FM.z;FM.cy-=(e.clientY-o.y)*sc/FM.z;fmClamp();o.x=e.clientX;o.y=e.clientY}
else{o.x=e.clientX;o.y=e.clientY;const a=[...FM.ptr.values()],nd=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);if(FM.pd>0)fmZoom(nd/FM.pd,((a[0].x+a[1].x)/2-r.left)*sc,((a[0].y+a[1].y)/2-r.top)*sc);FM.pd=nd}});
const fmUp=e=>{FM.ptr.delete(e.pointerId);FM.pd=0};['pointerup','pointercancel','pointerleave'].forEach(t=>fmC.addEventListener(t,fmUp));
fmC.addEventListener('wheel',e=>{e.preventDefault();const r=fmC.getBoundingClientRect(),sc=FM.cw/r.width;fmZoom(e.deltaY<0?1.2:1/1.2,(e.clientX-r.left)*sc,(e.clientY-r.top)*sc)},{passive:false});
$('fmp').addEventListener('click',()=>fmZoom(1.6,FM.cw/2,FM.ch/2));$('fmm').addEventListener('click',()=>fmZoom(1/1.6,FM.cw/2,FM.ch/2));
$('fmcen').addEventListener('click',()=>{const p=P();if(FM.z<FM.fit*2)FM.z=FM.fit*2.2;FM.cx=p.x;FM.cy=p.y;fmClamp()});
addEventListener('resize',()=>{if(FM.open)fmSize()});addEventListener('popstate',()=>{if(FM.open)closeMap(1)});
const mmOpen=e=>{e.preventDefault();open('map')};$('mm').addEventListener('touchstart',mmOpen,{passive:false});
// ================= LOOP =================
let last=0;function loop(t){const dt=Math.min(.05,(t-last)/1000||0);last=t;paused=!['title','panel','dlg','fmap'].every(i=>$(i).classList.contains('hide'))||innerHeight>innerWidth;
if(!paused)update(dt);hudT+=dt;if(hudT>.1){hudT=0;hud()}skUI();draw();requestAnimationFrame(loop)}
try{if(!localStorage.getItem('rennx_save'))$('cont').classList.add('hide')}catch(e){$('cont').classList.add('hide')}
newG();hud();requestAnimationFrame(loop);
document.querySelectorAll('[data-ic]').forEach(e=>{e.innerHTML=IS[e.dataset.ic]});
