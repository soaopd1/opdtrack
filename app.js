/* ============================================================
   OPD1 TRACKER — Application Logic
   Vanilla JS — Zero dependencies
   ============================================================ */

// ---- Constants ----
const AGENTS = ['Jett','Reyna','Omen','Sage','Sova','Raze','Phoenix','Cypher','Killjoy','Viper','Breach','Brimstone','Skye','Yoru','Astra','Chamber','Neon','Fade','Harbor','Gekko','Deadlock','Iso','Clove','Vyse'];
const AGENT_ICONS = { Jett:'⚡',Reyna:'👁',Omen:'🌀',Sage:'💎',Sova:'🏹',Raze:'💥',Phoenix:'🔥',Cypher:'📡',Killjoy:'⚙',Viper:'☠',Breach:'⚡',Brimstone:'🎯',Skye:'🌿',Yoru:'🌊',Astra:'✨',Chamber:'🎩',Neon:'⚡',Fade:'🔮',Harbor:'🌊',Gekko:'🦎',Deadlock:'🔒',Iso:'🛡',Clove:'🍀',Vyse:'💫' };
const RANKS = [
  {name:'Iron',tiers:3,class:'rank--iron',abbr:'I'},{name:'Bronze',tiers:3,class:'rank--bronze',abbr:'B'},
  {name:'Silver',tiers:3,class:'rank--silver',abbr:'S'},{name:'Gold',tiers:3,class:'rank--gold',abbr:'G'},
  {name:'Platinum',tiers:3,class:'rank--plat',abbr:'P'},{name:'Diamond',tiers:3,class:'rank--diamond',abbr:'D'},
  {name:'Ascendant',tiers:3,class:'rank--ascendant',abbr:'A'},{name:'Immortal',tiers:3,class:'rank--immortal',abbr:'IM'},
  {name:'Radiant',tiers:1,class:'rank--radiant',abbr:'R'}
];
const SKINS = {
  // Sidearms
  classic:['Recon','Prime','Sovereign','RGX 11z Pro','Reaver','Default'],
  shorty:['Cryostasis','Prime','Aero','Default'],
  frenzy:['Glitchpop','Sarmad','Coalition: Cobra','Default'],
  ghost:['Sovereign','Ruination','Recon','Ion','Protocol 781-A','Default'],
  bandit:['Recon','Prime','Ion','Default'],
  sheriff:['Reaver','Ion','Singularity','Wasteland','Peacekeeper','Default'],
  // SMGs
  stinger:['Recon','Silvanus','Magepunk','Default'],
  spectre:['Oni','Recon','Ruination','RGX 11z Pro','Default'],
  // Rifles
  bulldog:['Prism','Tigris','Default'],
  guardian:['Recon','Sovereign','Ion','Default'],
  phantom:['Spectrum','Oni','Protocol 781-A','Ion','Recon','Ruination','Neptune'],
  vandal:['Champions 2021','RGX 11z Pro','Reaver','Prime','Elderflame','Glitchpop','Sentinels of Light'],
  // Sniper Rifles
  marshal:['Recon','Magepunk','Prime','Default'],
  outlaw:['Recon','Prime','Ion','Default'],
  operator:['Ion','Reaver','Elderflame','Origin','Celestial','Chaos'],
  // Machine Guns
  ares:['Recon','Silvanus','Default'],
  odin:['Recon','Tethered Realms','Default'],
  // Melee
  melee:['RGX Blade','Prime Karambit','Champions Blade','Reaver Knife','Glitchpop Dagger','Oni Claw']
};
const BUDDIES = ['Valorant Buddy','Radianite Buddy','Champions Buddy','Riot Fist Bump','Doombot','Omen','Sage','Jett','Duck','Cat'];
const SPRAYS = ['GG','Nice!','<3','Salty','Tilted','RIP','Sage Heart','Jett Dash','Omen Orb','Phoenix Fire','Raze Boom','Logo Spray'];
const PLAYER_CARDS = ['Ignition','Breach Contract','Jett Contract','Reyna EP5','Champions 2021','VCT Masters','Riot Fist Bump','Radianite Crisis','Act 3 Card','Yoru Contract'];
const TITLES = ['Sage Main','One More','Clutch Master','Act Rank Ready','Gold Gun','Headhunter','Tactician','Pistol Round King','Cold Hands','Big Brain'];
const WEAPON_CATEGORIES = {
  'SIDEARMS': ['classic','shorty','frenzy','ghost','bandit','sheriff'],
  'SMGS': ['stinger','spectre'],
  'RIFLES': ['bulldog','guardian','phantom','vandal'],
  'SNIPER RIFLES': ['marshal','outlaw','operator'],
  'MACHINE GUNS': ['ares','odin'],
  'MELEE': ['melee']
};
const MAPS = ['Ascent','Bind','Haven','Split','Icebox','Breeze','Fracture','Pearl','Lotus','Sunset','Abyss'];

function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function pick(a){return a[rand(0,a.length-1)];}

// Format date as MM/DD
function formatDate(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}/${day}`;
}

// Get time ago string
function getTimeAgo(date) {
  const now = new Date();
  const diff = now - date;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} min ago`;
  return 'just now';
}

// ---- Data Generators ----
function genRank(mn,mx){const r=RANKS[rand(mn,Math.min(mx,RANKS.length-1))];const t=r.tiers>1?rand(1,r.tiers):'';return{name:`${r.name}${t?' '+t:''}`,class:r.class,abbr:`${r.abbr}${t}`,rr:rand(0,99)};}
function genStreak(){return Array.from({length:5},()=>Math.random()>0.45?'W':'L');}
function genSkins(){
  const skins = {};
  for(const key of Object.keys(SKINS)){
    skins[key] = {
      name: pick(SKINS[key]),
      buddy: Math.random()>0.4 ? pick(BUDDIES) : null,
      chroma: Math.random()>0.6 ? `Variant ${rand(1,4)}` : null
    };
  }
  return skins;
}
function genAccessories(){
  return {
    playerCard: pick(PLAYER_CARDS),
    title: Math.random()>0.3 ? pick(TITLES) : null,
    sprays: [pick(SPRAYS), pick(SPRAYS), pick(SPRAYS)]
  };
}

function genPlayer(side, partyId){
  const agent=pick(AGENTS);
  const hasTag=Math.random()<0.2;
  const tags=['Toxic','Cracked','Bad'];
  const rankNames=['IRON','BRONZE','SILVER','GOLD','PLATINUM','DIAMOND','ASCENDANT','IMMORTAL','RADIANT'];
  // Generate streak with RR values
  const streakGames = Array.from({length:5},()=>({
    result: Math.random()>0.45?'W':'L',
    rr: rand(10, 25)
  }));
  // Generate peak rank (usually higher than current)
  const currentRankIdx = rand(3, 7);
  const peakRankIdx = Math.min(currentRankIdx + rand(0, 2), 8);
  const peakDays = rand(10, 500);
  // Previous season rank
  const prevSeasonIdx = Math.max(0, currentRankIdx + rand(-2, 1));
  // Account level and XP
  const accountLevel = rand(20, 450);
  const accountXP = accountLevel * rand(4000, 5500);
  // Kills, deaths, assists totals
  const totalKills = rand(800, 8000);
  const totalDeaths = rand(700, 7000);
  const totalAssists = rand(300, 3000);
  const matchesPlayed = rand(50, 500);
  return {
    id: `p_${rand(10000,99999)}`,
    name:`Player${rand(100,9999)}`, tag:`#${rand(1000,9999)}`, agent,
    agentIcon:'', level: accountLevel,
    rank:genRank(3,7), winRate:(40+Math.random()*25).toFixed(1),
    kd:(0.6+Math.random()*1.2).toFixed(2), hs:rand(15,35),
    streak:streakGames, skins:genSkins(), accessories:genAccessories(), partyId,
    playerTag:hasTag?pick(tags):null, notes:hasTag&&Math.random()>0.5?'Watch out for this one':'',
    team:side,
    peakRank: { name: rankNames[peakRankIdx], days: peakDays },
    prevSeasonRank: rankNames[prevSeasonIdx] + (prevSeasonIdx < 8 ? ` ${rand(1,3)}` : ''),
    accountXP,
    totalKills, totalDeaths, totalAssists, matchesPlayed,
    avgDamage: rand(120, 220),
    avgScore: rand(180, 320),
    mostPlayedAgent: agent,
    firstBloodRate: (Math.random()*20+5).toFixed(1),
    clutchRate: (Math.random()*15+3).toFixed(1),
    partySize: partyId > 0 ? rand(2,5) : 1
  };
}

function genTeam(side){
  const p=[];const pc=[1,2,3,4,5];let pi=0;
  const duo=pc[pi++]; p.push(genPlayer(side,duo)); p.push(genPlayer(side,duo));
  if(side==='ally'){const trio=pc[pi++];p.push(genPlayer(side,trio));p.push(genPlayer(side,trio));p.push(genPlayer(side,trio));}
  else{const d2=pc[pi++];p.push(genPlayer(side,d2));p.push(genPlayer(side,d2));p.push(genPlayer(side,0));}
  return p;
}

function genMatchHistory(){
  const m=[];
  for(let i=0;i<18;i++){
    const w=Math.random()>0.4;const k=rand(8,30);const d=rand(5,22);const a=rand(2,15);
    const ms=w?13:rand(4,12);const es=w?rand(4,12):13;
    const dt=new Date();dt.setDate(dt.getDate()-i*rand(1,3));
    m.push({id:`m_${i}`,map:pick(MAPS),agent:pick(AGENTS),agentIcon:'',
      result:w?'WIN':'LOSS',kills:k,deaths:d,assists:a,score:`${ms}-${es}`,
      date:formatDate(dt),
      timeAgo: getTimeAgo(dt),
      fullDate: dt,
      starred:i<2&&Math.random()>0.5, note:'', kdr:(k/Math.max(d,1)).toFixed(2)
    });
  }
  return m;
}

// ---- State ----
const state = {
  allyTeam: genTeam('ally'),
  enemyTeam: genTeam('enemy'),
  matchHistory: genMatchHistory(),
  taggedPlayers: [],
  historyFilter: 'all',
  playerFilter: 'all',
  currentView: 'live',
  hiddenWeapons: [] // Weapons to hide: 'vandal', 'phantom', 'operator', 'melee'
};

// Seed some tagged players for demo
const demoDates = [
  new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
];
state.taggedPlayers = [
  { id:'p_demo1', name:'ToxicAndy', tag:'#1234', playerTag:'Toxic', notes:'Flames team every round, very negative', lastSeen: formatDate(demoDates[0]), timeAgo: getTimeAgo(demoDates[0]) },
  { id:'p_demo2', name:'AimGodX', tag:'#5678', playerTag:'Cracked', notes:'Insane aim, always top frags', lastSeen: formatDate(demoDates[1]), timeAgo: getTimeAgo(demoDates[1]) },
  { id:'p_demo3', name:'BottomFrag99', tag:'#9012', playerTag:'Bad', notes:'', lastSeen: formatDate(demoDates[2]), timeAgo: getTimeAgo(demoDates[2]) },
];

// ---- Player Card - Compact Layout ----
function renderPlayerCard(player, index){
  const partyColor = player.partyId > 0 ? `var(--party-${player.partyId})` : 'transparent';
  const delay = index * 0.06;

  let tagHTML = '';
  if(player.playerTag){
    tagHTML = `<span class="player-card__tag player-card__tag--${player.playerTag.toLowerCase()}">${player.playerTag}</span>`;
  }

  // Streak with RR - last game first
  const streakHTML = player.streak.map((game, idx) => {
    const isLast = idx === 0;
    const rrClass = game.result === 'W' ? 'streak-rr--positive' : 'streak-rr--negative';
    const rrSign = game.result === 'W' ? '+' : '-';
    return `
      <div class="streak-item ${isLast ? 'streak-item--last' : ''}">
        <span class="streak-rr ${rrClass}">${rrSign}${game.rr}</span>
        <div class="streak-dot streak-dot--${game.result==='W'?'win':'loss'}"></div>
      </div>
    `;
  }).join('');

  // Weapon slots - 2x2 grid with toggle
  const weaponsHTML = `
    <div class="player-card__weapons">
      <div class="weapon-slot weapon-slot--vandal" data-weapon="vandal" onclick="event.stopPropagation(); toggleWeapon(this)">
        <span class="weapon-slot__label">V</span>
      </div>
      <div class="weapon-slot weapon-slot--phantom" data-weapon="phantom" onclick="event.stopPropagation(); toggleWeapon(this)">
        <span class="weapon-slot__label">P</span>
      </div>
      <div class="weapon-slot weapon-slot--operator" data-weapon="operator" onclick="event.stopPropagation(); toggleWeapon(this)">
        <span class="weapon-slot__label">OP</span>
      </div>
      <div class="weapon-slot weapon-slot--melee" data-weapon="melee" onclick="event.stopPropagation(); toggleWeapon(this)">
        <span class="weapon-slot__label">K</span>
      </div>
    </div>`;

  const wrClass = parseFloat(player.winRate)>=52?'stat__value--high':parseFloat(player.winRate)<48?'stat__value--low':'';
  const kdClass = parseFloat(player.kd)>=1.2?'stat__value--high':parseFloat(player.kd)<0.9?'stat__value--low':'';
  const hsClass = player.hs>=28?'stat__value--high':player.hs<18?'stat__value--low':'';

  // Peak rank info (mock data)
  const peakRank = player.peakRank || { name: 'IMMORTAL 3', days: 45 };
  const peakTime = peakRank.days > 365 ? `${Math.floor(peakRank.days/365)}y ago` : 
                   peakRank.days > 30 ? `${Math.floor(peakRank.days/30)}mo ago` : 
                   `${peakRank.days}d ago`;

  const card = document.createElement('div');
  card.className = 'player-card';
  card.style.animationDelay = `${delay}s`;

  // Party dot near name
  const partyDot = partyColor !== 'transparent' ?
    `<span class="player-card__party-dot" style="background: ${partyColor}; box-shadow: 0 0 6px ${partyColor};"></span>` : '';

  card.innerHTML = `
    <div class="player-card__main">
      <div class="player-card__agent"><span style="font-size:0.65rem; font-weight:700; text-align:center; color:var(--text-primary);">${player.agent.substr(0,3).toUpperCase()}</span></div>
      <div class="player-card__info">
        <div class="player-card__name-row">
          ${partyDot}
          <span class="player-card__name">${player.name} <span class="player-card__gametag">${player.tag}</span></span>
          ${tagHTML}
        </div>

        <div class="player-card__stats">
          <div class="stat"><span class="stat__value ${wrClass}">${player.winRate}%</span><span class="stat__label">WR</span></div>
          <div class="stat"><span class="stat__value ${kdClass}">${player.kd}</span><span class="stat__label">K/D</span></div>
          <div class="stat"><span class="stat__value ${hsClass}">${player.hs}%</span><span class="stat__label">HS</span></div>
        </div>

        <div class="player-card__streak">${streakHTML}</div>

        ${weaponsHTML}
      </div>
    </div>

    <div class="player-card__rank-section">
      <div class="player-card__rank-img"></div>
      <div class="player-card__rank-info">
        <div class="player-card__rank-badge">${player.rank.name.toUpperCase()}</div>
        <span class="player-card__rr">${player.rank.rr} RR</span>
      </div>
      <div class="player-card__peak-rank">
        <div class="player-card__peak-icon"></div>
        <span class="player-card__peak-text">PEAK: ${peakRank.name} · ${peakTime}</span>
      </div>
    </div>
  `;

  // Click = open player modal with tabs
  card.addEventListener('click', () => openPlayerModal(player));
  // Right-click = tag modal
  card.addEventListener('contextmenu', (e) => { e.preventDefault(); openTagModal(player); });

  return card;
}

// Toggle weapon visibility
function toggleWeapon(slot) {
  slot.classList.toggle('weapon-slot--hidden');
}

// ---- Player Modal with Tabs ----
const playerModal = document.getElementById('playerModal');
const playerModalBody = document.getElementById('playerModalBody');
let currentModalPlayer = null;
let currentTab = 'loadout';

function openPlayerModal(player){
  currentModalPlayer = player;
  document.getElementById('playerModalTitle').textContent = `${player.name} ${player.tag}`;

  // Reset to loadout tab
  currentTab = 'loadout';
  document.querySelectorAll('.player-modal__tab').forEach(t => t.classList.remove('active'));
  document.querySelector('[data-tab="loadout"]').classList.add('active');

  renderModalContent();
  playerModal.classList.add('open');
}

function renderModalContent() {
  if (!currentModalPlayer) return;
  if (currentTab === 'loadout') renderLoadoutTab();
  else if (currentTab === 'stats') renderStatsTab();
}

// ---- LOADOUT TAB: Horizontal columns like Valorant collection screen ----
function renderLoadoutTab() {
  const p = currentModalPlayer;

  // Build weapon columns (exclude MELEE — handled separately)
  const weaponCats = Object.entries(WEAPON_CATEGORIES).filter(([cat]) => cat !== 'MELEE');
  const meleeSkin = p.skins['melee'];

  let weaponCols = weaponCats.map(([category, weapons]) => {
    const weaponCards = weapons.map(wKey => {
      const skin = p.skins[wKey];
      if (!skin) return '';
      const isDefault = skin.name === 'Default';
      const wName = wKey.toUpperCase();
      return `
        <div class="lc-weapon ${isDefault ? 'lc-weapon--default' : ''}">
          <div class="lc-weapon__img"></div>
          <div class="lc-weapon__label">${wName}</div>
          <div class="lc-weapon__skin">${skin.name}</div>
          ${skin.buddy ? `<div class="lc-weapon__buddy">${skin.buddy}</div>` : ''}
          ${skin.chroma ? `<div class="lc-weapon__chroma">${skin.chroma}</div>` : ''}
        </div>
      `;
    }).join('');
    return `
      <div class="lc-col">
        <div class="lc-col__header">${category}</div>
        <div class="lc-col__weapons">${weaponCards}</div>
      </div>
    `;
  }).join('');

  // Player card column
  const playerCardCol = `
    <div class="lc-col lc-col--accessories">
      <div class="lc-col__header">PLAYER CARD</div>
      <div class="lc-playercard">
        <div class="lc-playercard__img"></div>
        <div class="lc-playercard__name">${p.accessories.playerCard}</div>
        ${p.accessories.title ? `<div class="lc-playercard__title">"${p.accessories.title}"</div>` : ''}
      </div>
      ${meleeSkin ? `
        <div class="lc-col__header" style="margin-top: 12px;">MELEE</div>
        <div class="lc-weapon lc-melee">
          <div class="lc-weapon__img"></div>
          <div class="lc-weapon__skin">${meleeSkin.name}</div>
        </div>
      ` : ''}
    </div>
  `;

  // Sprays (expressions) column — triangular dial
  const spraysCol = `
    <div class="lc-col lc-col--sprays">
      <div class="lc-col__header">EXPRESSIONS</div>
      <div class="lc-sprays">
        ${p.accessories.sprays.map((s, i) => `
          <div class="lc-spray lc-spray--${i}">
            <div class="lc-spray__circle"></div>
            <div class="lc-spray__name">${s}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  playerModalBody.innerHTML = `
    <div class="loadout-columns">
      ${weaponCols}
      ${playerCardCol}
      ${spraysCol}
    </div>
  `;
}

// ---- STATS TAB: Comprehensive player statistics + recent history ----
function renderStatsTab() {
  const p = currentModalPlayer;
  const wrClass = parseFloat(p.winRate)>=52?'pstat--high':parseFloat(p.winRate)<48?'pstat--low':'';
  const kdClass = parseFloat(p.kd)>=1.2?'pstat--high':parseFloat(p.kd)<0.9?'pstat--low':'';
  const hsClass = p.hs>=28?'pstat--high':p.hs<18?'pstat--low':'';
  const peakRank = p.peakRank || { name: 'IMMORTAL', days: 45 };
  const peakTime = peakRank.days > 365 ? `${Math.floor(peakRank.days/365)}y ago` :
                   peakRank.days > 30 ? `${Math.floor(peakRank.days/30)}mo ago` : `${peakRank.days}d ago`;

  // Calculate wins/losses from matchesPlayed + winRate
  const totalWins = Math.round(p.matchesPlayed * parseFloat(p.winRate) / 100);
  const totalLosses = p.matchesPlayed - totalWins;
  const agentGamesPlayed = rand(10, Math.min(80, p.matchesPlayed));

  // Recent match history for this player (8 games)
  const recentMatches = Array.from({length: 8}, (_, i) => {
    const w = Math.random() > 0.4;
    const k = rand(5, 28); const d = rand(3, 20); const a = rand(1, 12);
    const dt = new Date(); dt.setDate(dt.getDate() - i * rand(1, 3));
    return {
      map: pick(MAPS), result: w ? 'WIN' : 'LOSS',
      kills: k, deaths: d, assists: a,
      score: w ? `13-${rand(4,11)}` : `${rand(4,11)}-13`,
      kdr: (k / Math.max(d, 1)).toFixed(2),
      agent: i === 0 ? p.agent : pick(AGENTS),
      timeAgo: getTimeAgo(dt)
    };
  });

  const historyRows = recentMatches.map(m => {
    const isWin = m.result === 'WIN';
    return `
      <div class="mh-row mh-row--${isWin ? 'win' : 'loss'}">
        <div class="mh-row__agent-img"></div>
        <div class="mh-row__map-img"></div>
        <div class="mh-row__info">
          <span class="mh-row__map">${m.map}</span>
          <span class="mh-row__agent-name">${m.agent}</span>
        </div>
        <span class="mh-row__result mh-row__result--${isWin ? 'win' : 'loss'}">${m.result}</span>
        <span class="mh-row__kda">${m.kills}/${m.deaths}/${m.assists}</span>
        <span class="mh-row__score">${m.score}</span>
        <span class="mh-row__time">${m.timeAgo}</span>
      </div>
    `;
  }).join('');

  playerModalBody.innerHTML = `
    <div class="stats-full">
      <!-- Rank Section -->
      <div class="stats-section">
        <div class="stats-section__title">RANK INFORMATION</div>
        <div class="stats-rank-row">
          <div class="stats-rank-card stats-rank-card--current">
            <div class="stats-rank-card__icon"></div>
            <div class="stats-rank-card__info">
              <span class="stats-rank-card__label">CURRENT RANK</span>
              <span class="stats-rank-card__value">${p.rank.name.toUpperCase()}</span>
              <span class="stats-rank-card__rr">${p.rank.rr} RR</span>
            </div>
          </div>
          <div class="stats-rank-card stats-rank-card--peak">
            <div class="stats-rank-card__icon"></div>
            <div class="stats-rank-card__info">
              <span class="stats-rank-card__label">PEAK RANK</span>
              <span class="stats-rank-card__value">${peakRank.name}</span>
              <span class="stats-rank-card__rr">${peakTime}</span>
            </div>
          </div>
          <div class="stats-rank-card stats-rank-card--prev">
            <div class="stats-rank-card__icon"></div>
            <div class="stats-rank-card__info">
              <span class="stats-rank-card__label">PREV SEASON</span>
              <span class="stats-rank-card__value">${p.prevSeasonRank}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Win/Loss/Agent Stats -->
      <div class="stats-section">
        <div class="stats-section__title">MATCH RECORD</div>
        <div class="stats-grid stats-grid--4">
          <div class="stats-card"><span class="stats-card__value pstat--high">${totalWins}</span><span class="stats-card__label">WINS</span></div>
          <div class="stats-card"><span class="stats-card__value pstat--low">${totalLosses}</span><span class="stats-card__label">LOSSES</span></div>
          <div class="stats-card"><span class="stats-card__value ${wrClass}">${p.winRate}%</span><span class="stats-card__label">WIN RATE</span></div>
          <div class="stats-card"><span class="stats-card__value">${agentGamesPlayed}</span><span class="stats-card__label">AS ${p.agent.toUpperCase()}</span></div>
        </div>
      </div>

      <!-- Performance Stats -->
      <div class="stats-section">
        <div class="stats-section__title">PERFORMANCE</div>
        <div class="stats-grid">
          <div class="stats-card"><span class="stats-card__value ${kdClass}">${p.kd}</span><span class="stats-card__label">K/D RATIO</span></div>
          <div class="stats-card"><span class="stats-card__value ${hsClass}">${p.hs}%</span><span class="stats-card__label">HEADSHOT %</span></div>
          <div class="stats-card"><span class="stats-card__value">${p.avgDamage}</span><span class="stats-card__label">AVG DAMAGE</span></div>
          <div class="stats-card"><span class="stats-card__value">${p.avgScore}</span><span class="stats-card__label">AVG SCORE</span></div>
          <div class="stats-card"><span class="stats-card__value">${p.firstBloodRate}%</span><span class="stats-card__label">FIRST BLOOD</span></div>
          <div class="stats-card"><span class="stats-card__value">${p.clutchRate}%</span><span class="stats-card__label">CLUTCH RATE</span></div>
        </div>
      </div>

      <!-- Career Stats -->
      <div class="stats-section">
        <div class="stats-section__title">CAREER</div>
        <div class="stats-grid">
          <div class="stats-card"><span class="stats-card__value">LV.${p.level}</span><span class="stats-card__label">LEVEL</span></div>
          <div class="stats-card"><span class="stats-card__value">${p.matchesPlayed}</span><span class="stats-card__label">MATCHES</span></div>
          <div class="stats-card"><span class="stats-card__value">${p.totalKills.toLocaleString()}</span><span class="stats-card__label">TOTAL KILLS</span></div>
          <div class="stats-card"><span class="stats-card__value">${p.totalDeaths.toLocaleString()}</span><span class="stats-card__label">TOTAL DEATHS</span></div>
          <div class="stats-card"><span class="stats-card__value">${p.totalAssists.toLocaleString()}</span><span class="stats-card__label">TOTAL ASSISTS</span></div>
          <div class="stats-card"><span class="stats-card__value">${p.prevSeasonRank}</span><span class="stats-card__label">PREV SEASON</span></div>
        </div>
      </div>

      <!-- Match History List -->
      <div class="stats-section">
        <div class="stats-section__title">RECENT MATCH HISTORY</div>
        <div class="mh-list">${historyRows}</div>
      </div>
    </div>
  `;
}

// ---- HISTORY TAB: Recent match history for this player ----
function renderHistoryTab() {
  // Generate some fake recent matches for this player
  const p = currentModalPlayer;
  const recentMatches = Array.from({length: 8}, (_, i) => {
    const w = Math.random() > 0.4;
    const k = rand(5, 28); const d = rand(3, 20); const a = rand(1, 12);
    const dt = new Date(); dt.setDate(dt.getDate() - i * rand(1, 3));
    return {
      map: pick(MAPS), result: w ? 'WIN' : 'LOSS',
      kills: k, deaths: d, assists: a,
      score: w ? `13-${rand(4,11)}` : `${rand(4,11)}-13`,
      kdr: (k / Math.max(d, 1)).toFixed(2),
      agent: i === 0 ? p.agent : pick(AGENTS),
      timeAgo: getTimeAgo(dt)
    };
  });

  let html = `<div class="modal-history">`;

  recentMatches.forEach(m => {
    const isWin = m.result === 'WIN';
    html += `
      <div class="modal-history__row modal-history__row--${isWin ? 'win' : 'loss'}">
        <div class="modal-history__map">${m.map}</div>
        <span class="modal-history__agent">${m.agent}</span>
        <span class="modal-history__result modal-history__result--${isWin ? 'win' : 'loss'}">${m.result}</span>
        <span class="modal-history__kda">${m.kills}/${m.deaths}/${m.assists}</span>
        <span class="modal-history__kdr" style="color:${parseFloat(m.kdr)>=1?'var(--green)':'var(--loss-red)'}">${m.kdr}</span>
        <span class="modal-history__score">${m.score}</span>
        <span class="modal-history__time">${m.timeAgo}</span>
      </div>
    `;
  });

  html += `</div>`;
  playerModalBody.innerHTML = html;
}

// Tab switching (supports loadout, stats, history)
document.querySelectorAll('.player-modal__tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.player-modal__tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentTab = tab.dataset.tab;
    renderModalContent();
  });
});

document.getElementById('playerModalClose').addEventListener('click', () => playerModal.classList.remove('open'));
playerModal.addEventListener('click', (e) => { if(e.target===playerModal) playerModal.classList.remove('open'); });
document.addEventListener('keydown', (e) => { if(e.key==='Escape') playerModal.classList.remove('open'); });

// ---- Render Live Match ----
function renderLiveMatch(){
  const ac=document.getElementById('allyPlayers'), ec=document.getElementById('enemyPlayers');
  ac.innerHTML=''; ec.innerHTML='';
  state.allyTeam.forEach((p,i)=>ac.appendChild(renderPlayerCard(p,i)));
  state.enemyTeam.forEach((p,i)=>ec.appendChild(renderPlayerCard(p,i)));
}

// ---- Match History ----
function renderMatchHistory(){
  const list=document.getElementById('historyList');
  list.innerHTML='';

  let filtered = state.matchHistory;
  if(state.historyFilter==='starred') filtered = filtered.filter(m=>m.starred);
  else if(state.historyFilter==='wins') filtered = filtered.filter(m=>m.result==='WIN');
  else if(state.historyFilter==='losses') filtered = filtered.filter(m=>m.result==='LOSS');

  const allW=state.matchHistory.filter(m=>m.result==='WIN').length;
  const allL=state.matchHistory.length-allW;
  document.getElementById('totalWins').textContent=allW;
  document.getElementById('totalLosses').textContent=allL;
  document.getElementById('totalGames').textContent=state.matchHistory.length;
  document.getElementById('winRate').textContent=((allW/state.matchHistory.length)*100).toFixed(1)+'%';

  filtered.forEach((match,i)=>{
    const row=document.createElement('div');
    const w=match.result==='WIN';
    row.className=`history-row history-row--${w?'win':'loss'}${match.starred?' history-row--starred':''}${match.note?' history-row--has-note':''}`;
    row.style.animationDelay=`${i*0.04}s`;
    row.innerHTML=`
      <div class="history-row__agent-img" title="${match.agent}"></div>
      <div class="history-row__map-img"></div>
      <div><span class="history-row__map">${match.map}</span><span class="history-row__map-sub">${match.agent}</span></div>
      <span class="history-row__result history-row__result--${w?'win':'loss'}">${match.result}</span>
      <div><span class="history-row__kda">${match.kills} / ${match.deaths} / ${match.assists}</span><span class="history-row__kda-ratio">KDR: ${match.kdr}</span></div>
      <span class="history-row__score">${match.score}</span>
      <div>
        <span class="history-row__date">${match.date}</span>
        <span class="history-row__time-ago">${match.timeAgo}</span>
      </div>
      <button class="history-row__note-btn ${match.note?'has-note':''}" title="Add note">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>
      <button class="history-row__star ${match.starred?'starred':''}">${match.starred?'★':'☆'}</button>`;

    row.addEventListener('click', () => openMatchDetailsModal(match));
    row.querySelector('.history-row__star').addEventListener('click', (e)=>{
      e.stopPropagation(); match.starred=!match.starred; renderMatchHistory();
    });
    row.querySelector('.history-row__note-btn').addEventListener('click', (e)=>{
      e.stopPropagation(); openMatchNoteModal(match);
    });
    list.appendChild(row);
  });
}

// History filter buttons
document.querySelectorAll('[data-filter]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    state.historyFilter = btn.dataset.filter;
    renderMatchHistory();
  });
});

// ---- Match Note Modal ----
const matchNoteModal = document.getElementById('matchNoteModal');
let currentNoteMatch = null;

function openMatchNoteModal(match){
  currentNoteMatch = match;
  document.getElementById('matchNoteTitle').textContent = `${match.map} — ${match.result} (${match.score})`;
  document.getElementById('matchNoteText').value = match.note || '';
  matchNoteModal.classList.add('visible');
}

document.getElementById('matchNoteClose').addEventListener('click', ()=>matchNoteModal.classList.remove('visible'));
matchNoteModal.addEventListener('click', (e)=>{ if(e.target===matchNoteModal) matchNoteModal.classList.remove('visible'); });

document.getElementById('matchNoteSave').addEventListener('click', ()=>{
  if(!currentNoteMatch) return;
  currentNoteMatch.note = document.getElementById('matchNoteText').value;
  matchNoteModal.classList.remove('visible');
  renderMatchHistory();
});

// ---- Match Details Modal ----
const matchDetailsModal = document.getElementById('matchDetailsModal');

function openMatchDetailsModal(match) {
  const body = document.getElementById('matchDetailsBody');
  const isWin = match.result === 'WIN';

  body.innerHTML = `
    <div class="match-details">
      <div class="match-details__header">
        <div class="match-details__map">
          <div class="match-details__map-img"></div>
          <div class="match-details__map-info">
            <h4>${match.map}</h4>
            <span>${match.date} • ${match.timeAgo}</span>
          </div>
        </div>
        <div class="match-details__result match-details__result--${isWin?'win':'loss'}">${match.result}</div>
      </div>

      <div class="match-details__score">
        <div class="match-details__score-team">
          <span>YOUR TEAM</span>
          <strong style="color: ${isWin?'var(--green)':'var(--loss-red)'}">${match.score.split('-')[0]}</strong>
        </div>
        <span class="match-details__score-divider">:</span>
        <div class="match-details__score-team">
          <span>ENEMY</span>
          <strong style="color: ${isWin?'var(--loss-red)':'var(--green)'}">${match.score.split('-')[1]}</strong>
        </div>
      </div>

      <div class="match-details__stats">
        <div class="match-details__stat">
          <span class="match-details__stat-value">${match.kills}</span>
          <span class="match-details__stat-label">KILLS</span>
        </div>
        <div class="match-details__stat">
          <span class="match-details__stat-value">${match.deaths}</span>
          <span class="match-details__stat-label">DEATHS</span>
        </div>
        <div class="match-details__stat">
          <span class="match-details__stat-value">${match.assists}</span>
          <span class="match-details__stat-label">ASSISTS</span>
        </div>
      </div>

      <div class="match-details__stats">
        <div class="match-details__stat">
          <span class="match-details__stat-value" style="color: ${parseFloat(match.kdr)>=1?'var(--green)':'var(--loss-red)'}">${match.kdr}</span>
          <span class="match-details__stat-label">K/D RATIO</span>
        </div>
        <div class="match-details__stat">
          <span class="match-details__stat-value">${Math.round((match.kills + match.assists) / Math.max(match.deaths, 1) * 100)}</span>
          <span class="match-details__stat-label">KDA</span>
        </div>
        <div class="match-details__stat">
          <span class="match-details__stat-value">${Math.round(match.kills / 13 * 100)}%</span>
          <span class="match-details__stat-label">KP</span>
        </div>
      </div>
    </div>
  `;

  matchDetailsModal.classList.add('visible');
}

document.getElementById('matchDetailsClose').addEventListener('click', ()=>{
  matchDetailsModal.classList.remove('visible');
});
matchDetailsModal.addEventListener('click', (e)=>{
  if(e.target===matchDetailsModal) matchDetailsModal.classList.remove('visible');
});

// ---- Tagged Players View ----
function renderTaggedPlayers(){
  const list=document.getElementById('playersList');
  const empty=document.getElementById('playersEmpty');
  list.innerHTML='';

  let filtered = state.taggedPlayers;
  if(state.playerFilter!=='all') filtered = filtered.filter(p=>p.playerTag===state.playerFilter);

  document.getElementById('playerCount').textContent = state.taggedPlayers.length;

  if(filtered.length===0){
    empty.style.display='flex'; list.style.display='none'; return;
  }
  empty.style.display='none'; list.style.display='grid';

  filtered.forEach(p=>{
    const card=document.createElement('div');
    const tagLower = (p.playerTag||'').toLowerCase();
    card.className=`player-memory-card player-memory-card--${tagLower}`;

    card.innerHTML=`
      <div class="player-memory-card__header">
        <div class="player-memory-card__avatar"></div>
        <div class="player-memory-card__info">
          <div class="player-memory-card__name">${p.name}</div>
          <span class="player-memory-card__tag player-memory-card__tag--${tagLower}">${p.playerTag||'—'}</span>
        </div>
      </div>
      ${p.notes?`<div class="player-memory-card__notes">"${p.notes}"</div>`:'<div class="player-memory-card__notes" style="opacity:0.5;">No notes added</div>'}
      <div class="player-memory-card__meta">
        <span>${p.lastSeen}</span>
        <span>${p.timeAgo || ''}</span>
      </div>
      <div class="player-memory-card__actions">
        <button class="edit-btn">EDIT</button>
        <button class="delete-btn">DELETE</button>
      </div>`;

    card.querySelector('.delete-btn').addEventListener('click', (e)=>{
      e.stopPropagation();
      state.taggedPlayers = state.taggedPlayers.filter(tp=>tp.id!==p.id);
      renderTaggedPlayers();
    });
    card.querySelector('.edit-btn').addEventListener('click', (e)=>{
      e.stopPropagation();
      openTagModalForMemory(p);
    });
    card.addEventListener('click', () => openTagModalForMemory(p));
    list.appendChild(card);
  });
}

// Player filter buttons
document.querySelectorAll('[data-pfilter]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('[data-pfilter]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    state.playerFilter = btn.dataset.pfilter;
    renderTaggedPlayers();
  });
});

// ---- Tag Modal ----
const tagModal = document.getElementById('tagModal');
let currentTagPlayer = null;
let isMemoryEdit = false;

function openTagModal(player){
  isMemoryEdit = false;
  currentTagPlayer = player;
  document.getElementById('modalPlayerName').textContent = `${player.name} ${player.tag}`;
  document.getElementById('modalNotes').value = player.notes || '';
  document.querySelectorAll('.tag-btn').forEach(btn=>btn.classList.toggle('active', btn.dataset.tag===(player.playerTag||'')));
  tagModal.classList.add('visible');
}

function openTagModalForMemory(memPlayer){
  isMemoryEdit = true;
  currentTagPlayer = memPlayer;
  document.getElementById('modalPlayerName').textContent = `${memPlayer.name} ${memPlayer.tag}`;
  document.getElementById('modalNotes').value = memPlayer.notes || '';
  document.querySelectorAll('.tag-btn').forEach(btn=>btn.classList.toggle('active', btn.dataset.tag===(memPlayer.playerTag||'')));
  tagModal.classList.add('visible');
}

document.getElementById('modalClose').addEventListener('click', ()=>tagModal.classList.remove('visible'));
tagModal.addEventListener('click', (e)=>{ if(e.target===tagModal) tagModal.classList.remove('visible'); });
document.querySelectorAll('.tag-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tag-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
});

document.getElementById('modalSave').addEventListener('click', ()=>{
  if(!currentTagPlayer) return;
  const activeTag = document.querySelector('.tag-btn.active');
  const newTag = activeTag ? activeTag.dataset.tag || null : null;
  const newNotes = document.getElementById('modalNotes').value;

  if(isMemoryEdit){
    // Update existing memory entry
    currentTagPlayer.playerTag = newTag;
    currentTagPlayer.notes = newNotes;
    if(!newTag) state.taggedPlayers = state.taggedPlayers.filter(p=>p.id!==currentTagPlayer.id);
    renderTaggedPlayers();
  } else {
    // Update live player + save to memory
    currentTagPlayer.playerTag = newTag;
    currentTagPlayer.notes = newNotes;

    if(newTag){
      const existing = state.taggedPlayers.find(p=>p.id===currentTagPlayer.id);
      if(existing){
        existing.playerTag = newTag;
        existing.notes = newNotes;
        existing.lastSeen = new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'});
      } else {
        state.taggedPlayers.push({
          id: currentTagPlayer.id, name: currentTagPlayer.name, tag: currentTagPlayer.tag,
          playerTag: newTag, notes: newNotes,
          lastSeen: new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'})
        });
      }
    } else {
      state.taggedPlayers = state.taggedPlayers.filter(p=>p.id!==currentTagPlayer.id);
    }
    renderLiveMatch();
  }
  tagModal.classList.remove('visible');
});

// ---- Settings ----
// True Stretch settings are now in a dedicated page

document.getElementById('clearPlayers').addEventListener('click', ()=>{
  if(state.taggedPlayers.length===0) return;
  state.taggedPlayers = [];
  renderTaggedPlayers();
});

// Weapon visibility is now controlled by clicking on weapon slots in Live Match

// ---- Navigation ----
document.querySelectorAll('.nav-tab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    const view = tab.dataset.view;
    document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));

    if(view==='live') document.getElementById('viewLive').classList.add('active');
    else if(view==='history'){ document.getElementById('viewHistory').classList.add('active'); renderMatchHistory(); }
    else if(view==='players'){ document.getElementById('viewPlayers').classList.add('active'); renderTaggedPlayers(); }
    else if(view==='settings') document.getElementById('viewSettings').classList.add('active');
    else if(view==='stretch') document.getElementById('viewStretch').classList.add('active');

    loadoutPanel.classList.remove('open');
  });
});

// ---- True Stretch Functionality ----
const stretchResButtons = document.querySelectorAll('.stretch-res-btn');
const stretchWarning = document.getElementById('stretchWarning');
const currentResSpan = document.getElementById('currentRes');
const newResSpan = document.getElementById('newRes');
const nativeResBtn = document.getElementById('nativeResBtn');
const applyStretchBtn = document.getElementById('applyStretch');
const customWidthInput = document.getElementById('customWidth');
const customHeightInput = document.getElementById('customHeight');

let currentResolution = { width: 1920, height: 1080, ratio: '16:9' };
let selectedResolution = null;

stretchResButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    stretchResButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const width = parseInt(btn.dataset.width);
    const height = parseInt(btn.dataset.height);
    const ratio = btn.dataset.ratio;

    selectedResolution = { width, height, ratio };

    // Show warning if not native
    if (width !== 1920 || height !== 1080) {
      newResSpan.textContent = `${width}×${height} (${ratio})`;
      stretchWarning.classList.add('show');
    } else {
      stretchWarning.classList.remove('show');
    }

    // Clear custom inputs
    customWidthInput.value = '';
    customHeightInput.value = '';
  });
});

// Apply button
applyStretchBtn.addEventListener('click', () => {
  const customW = parseInt(customWidthInput.value);
  const customH = parseInt(customHeightInput.value);

  if (customW && customH) {
    // Use custom resolution
    const ratio = calculateRatio(customW, customH);
    selectedResolution = { width: customW, height: customH, ratio };

    if (customW !== 1920 || customH !== 1080) {
      newResSpan.textContent = `${customW}×${customH} (${ratio})`;
      stretchWarning.classList.add('show');
    } else {
      stretchWarning.classList.remove('show');
    }

    // Clear preset selection
    stretchResButtons.forEach(b => b.classList.remove('active'));
  } else if (selectedResolution) {
    // Use selected preset
    currentResolution = selectedResolution;
    alert(`Resolution applied: ${selectedResolution.width}×${selectedResolution.height} (${selectedResolution.ratio})`);
  } else {
    alert('Please select a resolution or enter custom values');
  }
});

// Calculate aspect ratio
function calculateRatio(w, h) {
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(w, h);
  return `${w/divisor}:${h/divisor}`;
}

// Native resolution button
nativeResBtn.addEventListener('click', () => {
  stretchResButtons.forEach(b => b.classList.remove('active'));
  stretchWarning.classList.remove('show');
  customWidthInput.value = '';
  customHeightInput.value = '';
  selectedResolution = { width: 1920, height: 1080, ratio: '16:9' };
  currentResolution = selectedResolution;
  alert('Native resolution applied: 1920×1080 (16:9)');
});

// ---- Init ----
renderLiveMatch();
renderMatchHistory();
renderTaggedPlayers();
