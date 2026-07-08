/* ============================================================
   nuclê · estúdio — câmera/lente com segmentos + carrossel de salas
   ============================================================ */

/* ---- CÂMERA / SEGMENTOS ---- */
(function(){
  const services = [
    {id:'audiovisual', name:'audiovisual',
     tagline:'a história contada em movimento. Do roteiro à entrega final.',
     desc:'Produção audiovisual completa: vídeos institucionais, campanhas, social cuts e filmes corporativos. Da concepção ao corte final, tudo sob uma única inteligência criativa.',
     items:['Vídeo Institucional','Campanhas','Social Cuts','Filmes Corporativos','Roteiro','Storyboard']},
    {id:'filmmaker', name:'filmmaker',
     tagline:'direção autoral com olhar de cinema.',
     desc:'Filmmaker próprio com sensibilidade cinematográfica. Pra marcas que querem ser contadas em frames memoráveis, não em vídeos genéricos.',
     items:['Direção Autoral','Cinematografia','Look Development','Filme de Marca','Documentário','Curta-metragem']},
    {id:'captacao', name:'captação',
     tagline:'equipamento e técnica que entregam qualidade pristine.',
     desc:'Captação em 4K e 6K com equipamentos profissionais. Câmera, iluminação e som integrados pra resultado de cinema, em estúdio ou on-location.',
     items:['Captação 4K/6K','Cinema Cameras','Iluminação Profissional','Áudio Direto','On-location','Drone & Aéreas']},
    {id:'direcao', name:'direção',
     tagline:'a visão que orienta cada frame.',
     desc:'Direção criativa e técnica em cada projeto. Garantia de coerência narrativa entre marca, roteiro e execução, do briefing à entrega.',
     items:['Direção Criativa','Direção de Fotografia','Direção de Arte','Storyboard','Planejamento de Cena','Casting']},
    {id:'pos', name:'pós-produção',
     tagline:'onde o filme realmente ganha vida.',
     desc:'Edição, colorização, sound design e finalização. O ajuste final que transforma material bruto em obra acabada e entrega o tom certo pra cada peça.',
     items:['Edição','Color Grading','Motion Graphics','Sound Design','VFX','Finalização']}
  ];

  const svg = document.getElementById('camSvg'),
        frames = document.querySelectorAll('.frame'),
        segments = document.querySelectorAll('.segment'),
        sideL = document.querySelector('.info-left'),
        sideR = document.querySelector('.info-right'),
        infoName = document.getElementById('infoName'),
        infoTagline = document.getElementById('infoTagline'),
        infoDesc = document.getElementById('infoDesc'),
        infoItems = document.getElementById('infoItems'),
        infoCloseBtn = document.getElementById('infoCloseBtn');

  let idx = 0;
  let selected = false;

  function renderInfo(){
    const s = services[idx];
    infoName.textContent = s.name;
    infoTagline.textContent = s.tagline;
    infoDesc.textContent = s.desc;
    infoItems.innerHTML = s.items.map(i=>`<li>${i}</li>`).join('');
  }

  function focusOn(i){
    idx = (i + services.length) % services.length;
    svg.style.transform = `rotate(${-idx*72}deg)`;
    segments.forEach((s,j)=>s.classList.toggle('active', j === idx));
    frames.forEach(f=>f.classList.toggle('active', f.dataset.id === services[idx].id));
    sideL.classList.remove('show');
    sideR.classList.remove('show');
    setTimeout(()=>{
      renderInfo();
      sideL.classList.add('show');
      sideR.classList.add('show');
    }, 200);
    selected = true;
  }

  function closeSelection(){
    segments.forEach(s=>s.classList.remove('active'));
    sideL.classList.remove('show');
    sideR.classList.remove('show');
    selected = false;
  }

  segments.forEach((seg,i)=>{
    seg.addEventListener('click', ()=>{
      if (selected && i === idx) closeSelection();
      else focusOn(i);
    });
  });

  if (infoCloseBtn) infoCloseBtn.addEventListener('click', closeSelection);

  const infoCta = document.querySelector('.info-cta');
  if (infoCta) infoCta.addEventListener('click', ()=>{
    const s = services[idx];
    const msg = 'Olá, vim pelo site da nuclê. Quero falar sobre '+s.name+'.';
    window.open('https://wa.me/5519993832455?text='+encodeURIComponent(msg), '_blank', 'noopener');
  });

  document.addEventListener('keydown', e=>{
    if (e.key === 'Escape'){ closeSelection(); return; }
    if (e.key === 'ArrowRight'){ focusOn(idx+1); }
    if (e.key === 'ArrowLeft'){ focusOn(idx-1 + services.length); }
  });

  renderInfo();
  setTimeout(()=>{
    sideL.classList.add('show');
    sideR.classList.add('show');
    selected = true;
  }, 250);
})();

/* ---- CARROSSEL DE SALAS + SCROLL OBSERVER ---- */
(function(){
  const section = document.getElementById('studioSection'),
        carousel = document.getElementById('roomsCarousel'),
        cards = document.querySelectorAll('.room-card'),
        dots = document.querySelectorAll('.room-dot');
  if (!section || !cards.length) return;

  const N = cards.length;
  let active = 0;

  function update(){
    cards.forEach((c,i)=>{
      let off = i - active;
      if (off > N/2) off -= N;
      if (off < -N/2) off += N;
      c.setAttribute('data-pos', off);
    });
    dots.forEach((d,i)=>d.classList.toggle('active', i === active));
  }

  function go(dir){
    active = (active + dir + N) % N;
    update();
  }

  cards.forEach((c,i)=>{
    c.addEventListener('click', ()=>{
      if (i !== active){ active = i; update(); }
    });
  });

  dots.forEach((d,i)=>{
    d.addEventListener('click', ()=>{ active = i; update(); });
  });

  let wheelLock = false;
  carousel.addEventListener('wheel', e=>{
    const ax = Math.abs(e.deltaX), ay = Math.abs(e.deltaY);
    const dom = ax > ay ? e.deltaX : e.deltaY;
    if (Math.abs(dom) < 10) return;
    if (ax > ay){
      e.preventDefault();
      if (wheelLock) return;
      go(dom > 0 ? 1 : -1);
      wheelLock = true;
      setTimeout(()=>{ wheelLock = false; }, 420);
    }
  }, {passive:false});

  let touchX = 0, touchY = 0;
  carousel.addEventListener('touchstart', e=>{
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  }, {passive:true});
  carousel.addEventListener('touchend', e=>{
    const dx = e.changedTouches[0].clientX - touchX;
    const dy = e.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)){
      go(dx < 0 ? 1 : -1);
    }
  }, {passive:true});

  document.addEventListener('keydown', e=>{
    if (document.body.classList.contains('info-open')) return;
    const rect = section.getBoundingClientRect();
    const visible = rect.top < innerHeight*0.5 && rect.bottom > innerHeight*0.5;
    if (!visible) return;
    if (e.key === 'ArrowRight'){ go(1); }
    if (e.key === 'ArrowLeft'){ go(-1); }
  });

  update();

  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries=>{
      entries.forEach(en=>{
        if (en.isIntersecting) section.classList.add('in');
      });
    }, {threshold:.15});
    io.observe(section);
  } else {
    section.classList.add('in');
  }
})();
