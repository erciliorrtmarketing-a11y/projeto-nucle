/* ============================================================
   nuclê · criação — lógica de slides + scroll + visualizações
   ============================================================ */
(function(){
  'use strict';

  const SERVICES = [
    {id:'branding', name:'branding',
     tag:'o posicionamento que sustenta tudo. Antes do logo, a estratégia.',
     desc:'Construção de marca a partir da raiz: propósito, território, atributos e narrativa.',
     items:['Posicionamento','Plataforma de Marca','Atributos','Persona','Narrativa','Tom de Voz']},
    {id:'identidade', name:'identidade',
     tag:'o sistema visual completo, do logo à aplicação.',
     desc:'Identidade visual construída como sistema. Logo, paleta, tipografia, grid e regras de uso.',
     items:['Logo & Símbolo','Paleta de Cores','Tipografia','Grid & Layout','Iconografia','Sistema Visual']},
    {id:'design', name:'design',
     tag:'a estética traduzida em peças que funcionam.',
     desc:'Design gráfico aplicado em qualquer mídia: papelaria, institucional, embalagem, sinalização.',
     items:['Design Gráfico','Papelaria','Institucional','Embalagem','Sinalização','Editorial']},
    {id:'sites', name:'sites',
     tag:'presença digital sob medida pra cada marca.',
     desc:'Sites institucionais e plataformas digitais com performance, UX cuidado e velocidade.',
     items:['Site Institucional','UX / UI Design','Desenvolvimento','Performance','SEO Técnico','Hospedagem']},
    {id:'landing', name:'landing pages',
     tag:'página feita pra converter, ponto.',
     desc:'Landing pages estratégicas pra campanhas, lançamentos e captação focada em conversão.',
     items:['LP de Campanha','LP de Lançamento','Captação','Copywriting','A/B Test','Integração CRM']},
    {id:'brandbook', name:'brand book',
     tag:'o manual que mantém a marca coerente no tempo.',
     desc:'Documento completo de uso da marca: regras de aplicação, paleta, tipografia, grid, padrões.',
     items:['Manual da Marca','Regras de Uso','Padrões','Exemplos','Variações','Boas Práticas']}
  ];
  const N = SERVICES.length, STOPS = N + 1;

  /* ===== visualizações premium por serviço ===== */
  const VIZ = {
    branding: `<div class="vb">
      <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
        <line class="gd" x1="0" y1="100" x2="400" y2="100"/>
        <line class="gd" x1="200" y1="0" x2="200" y2="200"/>
        <line class="gd" x1="100" y1="0" x2="100" y2="200"/>
        <line class="gd" x1="300" y1="0" x2="300" y2="200"/>
        <circle class="mk anim" cx="140" cy="100" r="60" style="--len:380"/>
        <circle class="accent" cx="140" cy="100" r="60"/>
        <line class="mk anim d2" x1="140" y1="40" x2="140" y2="160" style="--len:120"/>
        <path class="mk anim d3" d="M 230 130 L 270 60 L 310 130" style="--len:160"/>
        <line class="gh" x1="60" y1="100" x2="80" y2="100"/>
        <line class="gh" x1="200" y1="100" x2="220" y2="100"/>
        <line class="gh" x1="140" y1="30" x2="140" y2="22"/>
        <text class="lbl" x="84" y="98">R 60</text>
        <text class="lbl" x="245" y="155">∠ 60°</text>
      </svg>
    </div>`,

    identidade: `<div class="vi">
      <div class="ty">
        <div class="big">A<span class="l">a</span></div>
        <div class="specs">
          <div class="spec"><span>FAMÍLIA</span><b>Montserrat</b></div>
          <div class="spec"><span>PESOS</span><b>300 · 500 · 700</b></div>
          <div class="spec"><span>TRACK</span><b>-0.025em</b></div>
        </div>
      </div>
      <div class="pal">
        <div class="sw" style="background:#ECECEF"><span class="hex" style="color:#0a0a0c">ECECEF</span></div>
        <div class="sw" style="background:#9a9aa2"><span class="hex" style="color:#0a0a0c">9A9AA2</span></div>
        <div class="sw" style="background:#5c5c64"><span class="hex" style="color:rgba(255,255,255,.7)">5C5C64</span></div>
        <div class="sw" style="background:#2b2b30"><span class="hex" style="color:rgba(255,255,255,.55)">2B2B30</span></div>
        <div class="sw" style="background:#0a0a0c;box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)"><span class="hex" style="color:rgba(255,255,255,.5)">0A0A0C</span></div>
        <div class="sw" style="background:linear-gradient(135deg,#fff,#9a9aa2)"><span class="hex" style="color:rgba(0,0,0,.6)">GRAD</span></div>
      </div>
    </div>`,

    design: `<div class="vd">
      <div class="poster">
        <div>
          <div class="tag">CAMPANHA · 2026</div>
          <div class="title">Design que<br/>resolve.</div>
        </div>
        <div class="glyph"></div>
      </div>
      <div class="specs">
        <div class="row"><span>FORMATO</span><b>A3 — 297×420mm</b></div>
        <div class="row"><span>GRID</span><b>12 colunas</b></div>
        <div class="row"><span>MARGEM</span><b>24mm</b></div>
        <div class="row"><span>TIPOGRAFIA</span><b>Montserrat Bold</b></div>
        <div class="row"><span>IMPRESSÃO</span><b>CMYK · 300dpi</b></div>
      </div>
    </div>`,

    sites: `<div class="vs">
      <div class="bar">
        <span class="d r"></span><span class="d y"></span><span class="d g"></span>
        <span class="url">nucle.com.br</span>
      </div>
      <div class="body">
        <div class="nav"><b>nuclê</b><span class="menu"><span>obra</span><span>estúdio</span><span>contato</span></span></div>
        <div class="hero">
          <h4>O núcleo estratégico da sua marca.</h4>
          <p>Branding, identidade, design e digital integrados num só núcleo. Estratégia, narrativa e execução sob o mesmo teto.</p>
          <div class="hero-cta"><span class="bt">começar projeto →</span><span class="lk">ver portfólio</span></div>
        </div>
        <div class="cards">
          <div class="c">
            <div class="c-img"><div class="c-shape s1"></div></div>
            <div class="c-meta"><span class="c-tag">branding</span><span class="c-name">aurora · 2025</span></div>
          </div>
          <div class="c">
            <div class="c-img"><div class="c-shape s2"></div></div>
            <div class="c-meta"><span class="c-tag">identidade</span><span class="c-name">forma · 2025</span></div>
          </div>
          <div class="c">
            <div class="c-img"><div class="c-shape s3"></div></div>
            <div class="c-meta"><span class="c-tag">site</span><span class="c-name">vetor · 2024</span></div>
          </div>
        </div>
      </div>
    </div>`,

    landing: `<div class="vl">
      <div class="micro">campanha lançamento</div>
      <h3>Transforme cliques em <em>clientes reais.</em></h3>
      <p>copy focado, hierarquia limpa, CTA destacado, integração CRM</p>
      <button class="cta">QUERO COMEÇAR<span class="ar">→</span></button>
      <div class="stats">
        <div class="st"><b>3.2×</b><span>conversão</span></div>
        <div class="st"><b>1.4s</b><span>load time</span></div>
        <div class="st"><b>A/B</b><span>otimizado</span></div>
      </div>
    </div>`,

    brandbook: `<div class="vk">
      <div class="pg">
        <div class="top"><div class="pn">01 · capa</div><div class="ti">manual da marca</div></div>
        <div class="body"><div class="r"></div><div class="r m"></div><div class="r s"></div></div>
        <div class="bot">nuclê · 2026</div>
      </div>
      <div class="pg">
        <div class="top"><div class="pn">02 · cores</div><div class="ti">paleta</div></div>
        <div class="body">
          <div class="sw"><span style="background:#ECECEF"></span><span style="background:#9a9aa2"></span><span style="background:#5c5c64"></span><span style="background:#2b2b30"></span></div>
          <div class="r"></div><div class="r m"></div>
        </div>
        <div class="bot">página 04</div>
      </div>
      <div class="pg">
        <div class="top"><div class="pn">03 · tipo</div><div class="ti">tipografia</div></div>
        <div class="body"><div class="r"></div><div class="r m"></div><div class="r s"></div><div class="r"></div></div>
        <div class="bot">página 07</div>
      </div>
    </div>`
  };

  /* ===== monta slides dentro da tela ===== */
  const screenEl = document.getElementById('screen');
  const idle = document.createElement('div');
  idle.className = 'slide slide-idle on';
  idle.dataset.stop = '0';
  idle.innerHTML = `
    <div class="logo">nuclê</div>
    <div class="tagline">o núcleo estratégico</div>`;
  screenEl.appendChild(idle);

  SERVICES.forEach((s, i)=>{
    const el = document.createElement('div');
    el.className = 'slide';
    el.dataset.stop = (i+1).toString();
    el.innerHTML = `
      <div class="viz">
        <div class="viz-body">${VIZ[s.id]}</div>
      </div>`;
    screenEl.appendChild(el);
  });

  /* scroll hint — esconde após primeira rolagem */
  const scrollHint = document.getElementById('scrollHint');

  /* spacer pro scroll funcionar */
  document.getElementById('spacer').insertAdjacentHTML('beforeend',
    SERVICES.map(s=>`<section><h2 class="sr">${s.name}</h2><p class="sr">${s.tag}</p></section>`).join(''));

  /* ===== card lateral ===== */
  const card = document.getElementById('card');
  const bigname = document.getElementById('bigname');

  function introCard(){
    return `<p class="p-tag">A construção da marca, do símbolo ao sistema completo.</p>
      <p class="p-desc">A área de criação da nuclê reúne seis frentes integradas: branding, identidade visual, design aplicado, sites, landing pages e brand book.</p>
      <a class="p-cta" href="#" onclick="goTo(1);return false;">começar pelo branding →</a>`;
  }
  function serviceCard(s){
    return `<p class="p-tag">${s.tag}</p>
      <p class="p-desc">${s.desc}</p>
      <ul class="p-items">${s.items.map(it=>`<li>${it}</li>`).join('')}</ul>
      <a class="p-cta" href="https://wa.me/5519993832455?text=${encodeURIComponent('Olá, vim pelo site da nuclê. Quero falar sobre '+s.name+'.')}" target="_blank" rel="noopener">falar com a equipe →</a>`;
  }

  /* ===== state ===== */
  let cur = -1;
  function showStop(s){
    if(s === cur) return;
    cur = s;
    screenEl.querySelectorAll('.slide').forEach(sl=>{
      sl.classList.toggle('on', parseInt(sl.dataset.stop,10) === s);
    });
    card.classList.add('swap');
    bigname.classList.add('swap');
    setTimeout(()=>{
      if(s===0){
        card.innerHTML = introCard();
        bigname.textContent = 'CRIAÇÃO';
      } else {
        card.innerHTML = serviceCard(SERVICES[s-1]);
        bigname.textContent = SERVICES[s-1].name.toUpperCase();
      }
      card.classList.remove('swap');
      bigname.classList.remove('swap');
    }, 200);
  }

  function goTo(s){ window.scrollTo({top: s * window.innerHeight, behavior:'smooth'}); }
  window.goTo = goTo;

  /* ===== scroll handler ===== */
  const progressBar = document.getElementById('progress');
  const deviceEl = document.getElementById('device');
  function onScroll(){
    const sY = window.scrollY || document.documentElement.scrollTop;
    const segH = window.innerHeight;
    const raw = Math.max(0, Math.min(STOPS-1, sY/segH));
    showStop(Math.round(raw));
    const max = (STOPS-1) * segH;
    progressBar.style.width = (max>0 ? (sY/max*100) : 0) + '%';
    const t = (raw / (STOPS-1)) * 4 - 2;
    deviceEl.style.transform = `perspective(2200px) rotateX(${t*0.4}deg) rotateY(${t*0.6}deg)`;
    if (scrollHint && sY > 40) scrollHint.classList.add('hide');
    else if (scrollHint) scrollHint.classList.remove('hide');
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  showStop(0);
  onScroll();

  /* ===== ajuste responsivo: encolhe cada "print" pra caber na telinha ===== */
  function fitViz(el){
    if(!el) return;
    if(el.classList.contains('vs')){ el.style.transform=''; return; } // .vs preenche a tela toda
    el.style.transform='';
    const sb = screenEl.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if(!sb.width || !r.width || !r.height) return;
    const scale = Math.min(1, (sb.width*0.96)/r.width, (sb.height*0.94)/r.height);
    el.style.transformOrigin = 'center center';
    el.style.transform = scale < 0.995 ? 'scale(' + scale.toFixed(3) + ')' : '';
  }
  function fitAllViz(){
    screenEl.querySelectorAll('.slide .viz-body > *').forEach(fitViz);
  }
  window.addEventListener('load', function(){ setTimeout(fitAllViz, 120); });
  window.addEventListener('resize', fitAllViz);
  setTimeout(fitAllViz, 60);
})();
