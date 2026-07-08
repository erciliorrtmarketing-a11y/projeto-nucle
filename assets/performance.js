/* ============================================================
   nuclê · performance — dashboard visual (sem números) + 5 frentes
   ============================================================ */
(function(){
  'use strict';

  /* ===== Dados das 5 frentes (com label do hero por perfil) ===== */
  const SERVICES = [
    {
      id:'trafego', name:'tráfego pago',
      tag:'cada real investido com destino e atribuição claros.',
      desc:'Campanhas pagas em Google Ads, Meta Ads, LinkedIn Ads e programmatic. Estrutura, criativos, lances e atribuição multi-touch focados em resultado.',
      items:['Google Ads','Meta Ads','LinkedIn Ads','TikTok Ads','Programmatic','Atribuição'],
      heroLabel:'campanhas por canal'
    },
    {
      id:'seo', name:'SEO',
      tag:'tráfego orgânico que escala sem depender de budget diário.',
      desc:'SEO técnico, de conteúdo e off-page. Arquitetura, EEAT, link building white-hat e conteúdo focado em intenção de busca.',
      items:['SEO Técnico','Pesquisa de Keywords','Conteúdo','Link Building','EEAT','Schema'],
      heroLabel:'crescimento orgânico composto'
    },
    {
      id:'inbound', name:'inbound',
      tag:'leads que chegam quentes e seguem nutridos por automação.',
      desc:'Captação, nutrição e qualificação automatizadas. CRM, automação de email, lead scoring e sequências focadas no perfil ideal de cliente.',
      items:['Lead Magnet','Email Automation','CRM Setup','Lead Scoring','Nurturing','RD/HubSpot'],
      heroLabel:'fluxo de nutrição'
    },
    {
      id:'cro', name:'CRO',
      tag:'mais conversão do mesmo tráfego, antes de gastar mais.',
      desc:'Otimização de conversão por hipótese e teste. Heatmaps, gravações, A/B testing, redesign de fluxos e UX optimization.',
      items:['A/B Testing','Heatmaps','User Recording','Copy Testing','Checkout UX','Hipóteses'],
      heroLabel:'teste a/b · controle vs vencedor'
    },
    {
      id:'metricas', name:'métricas',
      tag:'do dado bruto à decisão. Dashboard que vira ação.',
      desc:'Setup de GA4, GTM, Looker Studio e BI completo. Tracking, atribuição, dashboards executivos e relatórios mensais com clareza.',
      items:['GA4','GTM','Looker Studio','BI Setup','Atribuição','Dashboards'],
      heroLabel:'fontes de dados integradas'
    }
  ];

  const DEFAULT_HERO_LABEL = 'crescimento';

  /* ===== Refs ===== */
  const cardEl = document.getElementById('panelCard');
  const navTabs = document.querySelectorAll('.dn-tab');
  const dashEl = document.getElementById('dash');
  const vizHero = document.getElementById('vizHero');
  const vizHeroLabel = document.getElementById('vizHeroLabel');
  const vizLiveLabel = document.getElementById('vizLiveLabel');
  const vizReachLabel = document.getElementById('vizReachLabel');
  const vizChannelsLabel = document.getElementById('vizChannelsLabel');
  const vizOptLabel = document.getElementById('vizOptLabel');
  const bignameEl = document.getElementById('bigname');
  const BIGNAME_DEFAULT = 'PERFORMANCE';
  let active = -1;

  function setBigname(text){
    if (!bignameEl) return;
    bignameEl.classList.add('swap');
    setTimeout(() => {
      bignameEl.textContent = text;
      bignameEl.classList.remove('swap');
    }, 180);
  }

  /* ===== Labels dos 4 cards auxiliares por perfil ===== */
  const AUX_LABELS = {
    default:  { live:'campanhas ao vivo',    reach:'alcance',                 channels:'canais ativos',       opt:'otimização contínua' },
    trafego:  { live:'anúncios rodando',     reach:'mix de canais',           channels:'plataformas',         opt:'gasto diário' },
    seo:      { live:'palavras monitoradas', reach:'autoridade de domínio',   channels:'posições no ranking', opt:'tráfego orgânico' },
    inbound:  { live:'sequências ativas',    reach:'jornada do lead',         channels:'etapas do fluxo',     opt:'nutrição em curso' },
    cro:      { live:'testes rodando',       reach:'balança a/b',             channels:'variantes testadas',  opt:'iteração rápida' },
    metricas: { live:'fontes integradas',    reach:'radar de dados',          channels:'eventos monitorados', opt:'streams ao vivo' }
  };

  /* ===== 24 SVGs distintos (4 cards × 6 perfis) ===== */
  // helpers
  const repeat = (n, fn) => Array.from({length:n}, (_,i) => fn(i)).join('');

  const VISUALS = {
    // --- CARD 1: LIVE ACTIVITY ---
    live: {
      default: () => `<div class="dots-grid">${repeat(12, () => `<span class="d-pulse"></span>`)}</div>`,
      trafego: () => `<svg class="vz" viewBox="0 0 200 80" preserveAspectRatio="none">
        ${repeat(5, i => `<g class="vz-coin" style="animation-delay:${i*.2}s"><circle cx="${20+i*40}" cy="40" r="14" fill="none" stroke="#fff" stroke-width="1.5"/><text x="${20+i*40}" y="44" text-anchor="middle" font-family="JetBrains Mono" font-size="12" font-weight="700" fill="#fff">$</text></g>`)}
      </svg>`,
      seo: () => `<div class="vz-rank">${repeat(5, i => `<div class="vz-rank-row" style="animation-delay:${i*.12}s"><span class="vz-rank-pos">${i+1}</span><span class="vz-rank-bar" style="--w:${100-i*15}%"></span></div>`)}</div>`,
      inbound: () => `<svg class="vz" viewBox="0 0 200 60" preserveAspectRatio="none">
        <line class="vz-chain-line" x1="22" y1="30" x2="178" y2="30"/>
        ${repeat(4, i => `<g><rect class="vz-mail" x="${10+i*50}" y="22" width="24" height="16" rx="2" style="animation-delay:${i*.18}s"/><line class="vz-mail-flap" x1="${10+i*50}" y1="22" x2="${22+i*50}" y2="32" style="animation-delay:${i*.18+.1}s"/><line class="vz-mail-flap" x1="${34+i*50}" y1="22" x2="${22+i*50}" y2="32" style="animation-delay:${i*.18+.1}s"/></g>`)}
      </svg>`,
      cro: () => `<div class="vz-ab"><div class="vz-ab-col vz-ab-a"><span class="vz-ab-lbl">A</span>${repeat(4, i => `<span class="vz-ab-cell" style="animation-delay:${i*.1}s"></span>`)}</div><div class="vz-ab-vs">vs</div><div class="vz-ab-col vz-ab-b"><span class="vz-ab-lbl">B</span>${repeat(4, i => `<span class="vz-ab-cell vz-ab-cell-win" style="animation-delay:${i*.1+.4}s"></span>`)}</div></div>`,
      metricas: () => `<svg class="vz" viewBox="0 0 200 60" preserveAspectRatio="none">
        ${repeat(3, row => repeat(8, col => `<rect class="vz-cell" x="${5+col*24}" y="${6+row*18}" width="20" height="14" rx="2" style="animation-delay:${(row*8+col)*.05}s"/>`))}
      </svg>`
    },

    // --- CARD 2: REACH / GAUGE ---
    reach: {
      default: () => `<svg class="vz vz-gauge-svg" viewBox="0 0 100 60" aria-hidden="true">
        <path class="gauge-track" d="M 10 55 A 40 40 0 0 1 90 55" fill="none"/>
        <path class="gauge-fill" d="M 10 55 A 40 40 0 0 1 90 55" fill="none"/>
        <circle class="gauge-tip" cx="90" cy="55" r="3.5"/>
      </svg>`,
      trafego: () => `<svg class="vz vz-pie" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="14"/>
        <circle class="vz-slice s1" cx="50" cy="50" r="38" fill="none" stroke="#fff" stroke-width="14"/>
        <circle class="vz-slice s2" cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="14"/>
        <circle class="vz-slice s3" cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="14"/>
      </svg>`,
      seo: () => `<svg class="vz vz-rings" viewBox="0 0 100 100" aria-hidden="true">
        <circle class="vz-ring" cx="50" cy="50" r="42" style="animation-delay:0s"/>
        <circle class="vz-ring" cx="50" cy="50" r="32" style="animation-delay:.15s"/>
        <circle class="vz-ring" cx="50" cy="50" r="22" style="animation-delay:.3s"/>
        <circle class="vz-ring vz-ring-core" cx="50" cy="50" r="10" style="animation-delay:.45s"/>
        <circle class="vz-ring-dot" cx="50" cy="50" r="4"/>
      </svg>`,
      inbound: () => `<svg class="vz vz-funnel" viewBox="0 0 120 100" aria-hidden="true">
        <rect class="vz-stack" x="10"  y="14" width="100" height="14" rx="2" style="animation-delay:.0s"/>
        <rect class="vz-stack" x="20"  y="34" width="80"  height="14" rx="2" style="animation-delay:.12s"/>
        <rect class="vz-stack" x="30"  y="54" width="60"  height="14" rx="2" style="animation-delay:.24s"/>
        <rect class="vz-stack vz-stack-end" x="40" y="74" width="40" height="14" rx="2" style="animation-delay:.36s"/>
      </svg>`,
      cro: () => `<svg class="vz vz-balance" viewBox="0 0 120 80" aria-hidden="true">
        <line class="vz-bal-pivot" x1="60" y1="55" x2="60" y2="74"/>
        <line class="vz-bal-base" x1="40" y1="74" x2="80" y2="74"/>
        <line class="vz-bal-arm" x1="20" y1="48" x2="100" y2="62"/>
        <rect class="vz-bal-box vz-bal-a" x="10" y="32" width="22" height="22" rx="2"/>
        <rect class="vz-bal-box vz-bal-b" x="88" y="46" width="22" height="22" rx="2"/>
        <text class="vz-bal-lbl" x="21" y="46" text-anchor="middle">A</text>
        <text class="vz-bal-lbl vz-bal-lbl-win" x="99" y="60" text-anchor="middle">B</text>
      </svg>`,
      metricas: () => `<svg class="vz vz-radar" viewBox="0 0 120 100" aria-hidden="true">
        <g transform="translate(60,50)">
          <polygon class="vz-radar-bg" points="0,-38 33,-19 33,19 0,38 -33,19 -33,-19"/>
          <polygon class="vz-radar-bg" points="0,-26 22,-13 22,13 0,26 -22,13 -22,-13"/>
          <polygon class="vz-radar-bg" points="0,-14 12,-7 12,7 0,14 -12,7 -12,-7"/>
          <polygon class="vz-radar-fill" points="0,-32 28,-12 25,17 0,30 -27,14 -29,-15"/>
          ${repeat(6, i => {
            const a = (i*60 - 90) * Math.PI / 180;
            return `<line class="vz-radar-spoke" x1="0" y1="0" x2="${(Math.cos(a)*38).toFixed(1)}" y2="${(Math.sin(a)*38).toFixed(1)}"/>`;
          })}
        </g>
      </svg>`
    },

    // --- CARD 3: CHANNELS / BARS ---
    channels: {
      default: () => `<div class="bars">${repeat(7, () => `<span class="bar"></span>`)}</div>`,
      trafego: () => `<div class="vz-platforms">${['G','M','LI','TT','D'].map((p,i) => `<div class="vz-plat" style="animation-delay:${i*.1}s"><span class="vz-plat-bar" style="--h:${[62,90,48,75,55][i]}%"></span><span class="vz-plat-lbl">${p}</span></div>`).join('')}</div>`,
      seo: () => `<div class="vz-ladder">${repeat(5, i => `<div class="vz-step" style="--w:${30+i*16}%;animation-delay:${i*.12}s"><span class="vz-step-pos">${5-i}</span></div>`)}</div>`,
      inbound: () => `<div class="vz-stages">${['captação','nutrição','qualif.','conversão'].map((s,i) => `<div class="vz-stage" style="--h:${100-i*22}%;animation-delay:${i*.12}s"><span class="vz-stage-lbl">${s}</span></div>`).join('')}</div>`,
      cro: () => `<div class="vz-ab-bars">${[[42,82],[55,88],[38,75],[60,92]].map((pair,i) => `<div class="vz-ab-pair" style="animation-delay:${i*.12}s"><span class="vz-ab-b-a" style="--h:${pair[0]}%"></span><span class="vz-ab-b-b" style="--h:${pair[1]}%"></span></div>`).join('')}</div>`,
      metricas: () => `<div class="vz-grid-bars">${repeat(8, i => `<span class="vz-gb" style="--h:${[68,72,78,74,80,76,73,79][i]}%;animation-delay:${i*.06}s"></span>`)}</div>`
    },

    // --- CARD 4: OPT / PULSE ---
    opt: {
      default: () => `<svg class="vz" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
        <path class="pulse-line" d="M 0 30 L 30 30 L 38 30 L 42 12 L 48 48 L 54 30 L 90 30 L 98 30 L 102 18 L 108 42 L 114 30 L 150 30 L 158 30 L 162 8 L 168 52 L 174 30 L 200 30"/>
      </svg>`,
      trafego: () => `<svg class="vz" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
        <path class="vz-spend-fill" d="M 0 50 C 30 40, 50 45, 80 28 C 110 12, 140 35, 170 18 C 185 10, 195 22, 200 15 L 200 60 L 0 60 Z"/>
        <path class="vz-spend-line" d="M 0 50 C 30 40, 50 45, 80 28 C 110 12, 140 35, 170 18 C 185 10, 195 22, 200 15"/>
      </svg>`,
      seo: () => `<svg class="vz" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
        <path class="vz-smooth-fill" d="M 0 55 C 50 53, 90 48, 120 35 C 150 22, 175 12, 200 5 L 200 60 L 0 60 Z"/>
        <path class="vz-smooth-line" d="M 0 55 C 50 53, 90 48, 120 35 C 150 22, 175 12, 200 5"/>
      </svg>`,
      inbound: () => `<svg class="vz" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
        <path class="vz-drip-line" d="M 0 50 L 35 50 L 35 38 L 75 38 L 75 26 L 120 26 L 120 14 L 200 14"/>
        ${repeat(5, i => `<circle class="vz-drip-dot" cx="${[35,75,120,160,195][i]}" cy="${[50,38,26,14,14][i]}" r="2.5" style="animation-delay:${i*.15}s"/>`)}
      </svg>`,
      cro: () => `<svg class="vz" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
        <path class="vz-split-a" d="M 0 35 C 50 36, 100 34, 200 32"/>
        <path class="vz-split-b" d="M 0 35 C 50 28, 100 18, 200 8"/>
        <text class="vz-split-lbl" x="190" y="36">A</text>
        <text class="vz-split-lbl vz-split-lbl-b" x="190" y="6">B</text>
      </svg>`,
      metricas: () => `<svg class="vz" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
        <path class="vz-stream s1" d="M 0 45 L 25 40 L 50 35 L 80 38 L 110 28 L 140 32 L 170 22 L 200 25"/>
        <path class="vz-stream s2" d="M 0 30 L 25 28 L 50 32 L 80 22 L 110 25 L 140 18 L 170 20 L 200 15"/>
        <path class="vz-stream s3" d="M 0 18 L 25 22 L 50 16 L 80 14 L 110 18 L 140 10 L 170 12 L 200 8"/>
      </svg>`
    }
  };

  function renderVisuals(profile){
    const p = VISUALS.live[profile] ? profile : 'default';
    const areas = ['live','reach','channels','opt'];
    areas.forEach(key => {
      const id = 'viz' + key.charAt(0).toUpperCase() + key.slice(1) + 'Area';
      const el = document.getElementById(id);
      if (el && VISUALS[key] && VISUALS[key][p]){
        el.innerHTML = VISUALS[key][p]();
      }
    });
  }

  function setProfile(id, heroLabel){
    // hero
    if (vizHero) vizHero.dataset.profile = id;
    if (vizHeroLabel) vizHeroLabel.textContent = heroLabel;
    // dashboard inteiro
    if (dashEl) dashEl.dataset.profile = id;
    // labels dos 4 cards auxiliares
    const lbl = AUX_LABELS[id] || AUX_LABELS.default;
    if (vizLiveLabel)     vizLiveLabel.textContent = lbl.live;
    if (vizReachLabel)    vizReachLabel.textContent = lbl.reach;
    if (vizChannelsLabel) vizChannelsLabel.textContent = lbl.channels;
    if (vizOptLabel)      vizOptLabel.textContent = lbl.opt;
    // re-renderiza os 4 SVGs auxiliares para o perfil
    renderVisuals(id);
  }

  /* ===== Cards do painel ===== */
  const introCard = () => `
    <span class="p-eyebrow">5 frentes integradas</span>
    <h2 class="p-name">performance</h2>
    <p class="p-tag">cliques que viram clientes reais, não vaidade. Conversão.</p>
    <p class="p-desc">A área de performance da nuclê transforma investimento em retorno mensurável. Cinco frentes integradas operando como um único motor de crescimento: tráfego pago, SEO orgânico, inbound, CRO e métricas.</p>
    <button class="p-cta" type="button" data-jump="trafego">começar pelo tráfego pago →</button>`;

  const serviceCard = (s) => `
    <h2 class="p-name">${s.name}</h2>
    <p class="p-tag">${s.tag}</p>
    <p class="p-desc">${s.desc}</p>
    <ul class="p-items">${s.items.map(it=>`<li>${it}</li>`).join('')}</ul>
    <a class="p-cta" href="https://wa.me/5519993832455?text=${encodeURIComponent('Olá, vim pelo site da nuclê. Quero falar sobre '+s.name+'.')}" target="_blank" rel="noopener">falar com a equipe →</a>`;

  function setActiveTab(id){
    navTabs.forEach(b => b.classList.toggle('on', b.dataset.id === id));
  }

  /* ===== Seleção de serviço ===== */
  function selectService(idx){
    if (idx === active) return;
    active = idx;
    const s = SERVICES[idx];
    setActiveTab(s.id);
    setBigname(s.name.toUpperCase());
    cardEl.classList.add('swap');
    setTimeout(() => {
      cardEl.innerHTML = serviceCard(s);
      cardEl.classList.remove('swap');
      bindCta();
    }, 220);
    setProfile(s.id, s.heroLabel);
    pulseDashboard();
  }

  function resetToIntro(){
    if (active === -1) return;
    active = -1;
    setActiveTab('default');
    setBigname(BIGNAME_DEFAULT);
    cardEl.classList.add('swap');
    setTimeout(() => {
      cardEl.innerHTML = introCard();
      cardEl.classList.remove('swap');
      bindCta();
    }, 220);
    setProfile('default', DEFAULT_HERO_LABEL);
  }

  function bindCta(){
    const btn = cardEl.querySelector('[data-jump]');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const id = btn.dataset.jump;
      const idx = SERVICES.findIndex(s => s.id === id);
      if (idx >= 0) selectService(idx);
    });
  }

  /* ===== Re-dispara animações dos visuais ao trocar tab/serviço ===== */
  function pulseDashboard(){
    if (!dashEl) return;
    dashEl.classList.remove('replay');
    // força reflow pra reiniciar animação
    void dashEl.offsetWidth;
    dashEl.classList.add('replay');
  }

  /* ===== Click handlers das 6 abas (default + 5 frentes) ===== */
  navTabs.forEach(b => {
    b.addEventListener('click', () => {
      const id = b.dataset.id;
      if (id === 'default'){
        resetToIntro();
        return;
      }
      const idx = SERVICES.findIndex(s => s.id === id);
      if (idx >= 0){
        if (active === idx) resetToIntro();
        else selectService(idx);
      }
    });
  });

  /* ===== Inicia ===== */
  bindCta();
  renderVisuals('default');
})();
