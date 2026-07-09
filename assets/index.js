/* ============================================================
   nuclê · index — preloader + menu overlay + blob 3D
   ============================================================ */

/* ---- PRELOADER ---- */
(function(){
  const plNum = document.getElementById('plNum');
  const plBar = document.getElementById('plBar');
  const pre   = document.getElementById('preloader');
  const body  = document.body;
  let p = 0;
  let done = false;
  const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  function finish(){
    if (done) return;
    done = true;
    plNum.textContent = 100;
    plBar.style.width = '100%';
    body.classList.add('reveal');
    pre.classList.add('done');
  }

  if (reduce){
    finish();
  } else {
    const tick = setInterval(()=>{
      p += Math.max(1, Math.round((100-p)*0.08));
      if (p >= 100){ p = 100; clearInterval(tick); }
      plNum.textContent = p;
      plBar.style.width = p + '%';
      if (p >= 100){ setTimeout(finish, 200); }
    }, 55);

    /* redes de segurança: nunca deixa a página presa na tela do preloader,
       mesmo se o timer for pausado (aba em 2º plano, CDN lento etc.) */
    window.addEventListener('load', ()=> setTimeout(finish, 600));
    setTimeout(finish, 3500);
  }
})();

/* ---- MENU OVERLAY ---- */
(function(){
  const overlay = document.getElementById('overlay');
  const openBtn = document.getElementById('openMenu');
  const menuLogoBtn = document.getElementById('menuLogoBtn');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const body = document.body;
  const focusableSel = 'a[href], button:not([disabled])';

  const open = ()=>{
    overlay.classList.add('open');
    body.classList.add('locked');
    openBtn.setAttribute('aria-expanded', 'true');
    setTimeout(()=>{
      const first = overlay.querySelector(focusableSel);
      if (first) first.focus();
    }, 100);
  };
  const close = ()=>{
    overlay.classList.remove('open');
    body.classList.remove('locked');
    openBtn.setAttribute('aria-expanded', 'false');
    openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  if (menuLogoBtn) menuLogoBtn.addEventListener('click', close);
  if (menuCloseBtn) menuCloseBtn.addEventListener('click', close);
  overlay.addEventListener('click', e=>{ if (e.target === overlay) close(); });
  document.addEventListener('keydown', e=>{
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape'){ close(); return; }
    if (e.key === 'Tab'){
      const items = overlay.querySelectorAll(focusableSel);
      if (!items.length) return;
      const first = items[0], last = items[items.length-1];
      if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  });

  /* chegou de uma seção com #menu → abre o menu só nessa chegada
     e remove o #menu da URL, pra que recarregar mostre a página inicial */
  if (location.hash === '#menu'){
    history.replaceState(null, '', location.pathname + location.search);
    setTimeout(open, 400);
  }
})();

/* ---- BLOB 3D (Three.js r128 + SimplexNoise) ---- */
(function(){
  const canvas = document.getElementById('blob');
  const stage = document.querySelector('.stage');
  if (!canvas || !window.THREE || !window.SimplexNoise){
    if (stage) stage.classList.add('no-webgl');
    return;
  }

  class BlobEffect {
    constructor(opt){
      this.canvas = opt.canvas;
      this.zoom = opt.zoom || 2;
      this.color = opt.color != null ? opt.color : 0x252525;
      /* parâmetros reais do fleava */
      this.speedSlider = 1;
      this.spikesSlider = 0.6;
      this.processingSlider = 1.3;
      this.reduceMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

      let ctx = null;
      try { ctx = this.canvas.getContext('webgl2'); } catch(e) {}
      const rendererOpts = { canvas: this.canvas, antialias: true, alpha: true };
      if (ctx) rendererOpts.context = ctx;
      this.renderer = new THREE.WebGLRenderer(rendererOpts);
      this.renderer.setPixelRatio(window.devicePixelRatio || 1);

      this.simplex = new SimplexNoise();

      const w = innerWidth, h = innerHeight;
      this.renderer.setSize(w, h);

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 1000);
      this.camera.position.set(0, 0, this.zoom);
      this.camera.lookAt(0, 0, 0);

      this.geometry = new THREE.SphereGeometry(1, 128, 128);
      this.basePos = this.geometry.attributes.position.array.slice();
      this.material = new THREE.MeshPhongMaterial({ color: this.color, shininess: 10 });

      this.lightTop = new THREE.PointLight(0xffffff, 1);
      this.lightTop.position.set(0, 500, 300);
      this.scene.add(this.lightTop);

      this.lightBottom = new THREE.PointLight(0xffffff, 1);
      this.lightBottom.position.set(0, 600, 100);
      this.scene.add(this.lightBottom);

      this.sphere = new THREE.Mesh(this.geometry, this.material);
      this.sphere.position.x = 0.55;
      this.scene.add(this.sphere);

      this.run = this.run.bind(this);
      this.resize = this.resize.bind(this);
      addEventListener('resize', this.resize);
      this.run();
    }

    update(){
      const t = this.reduceMotion ? 0
        : performance.now() * 3e-5 * this.speedSlider * Math.pow(this.processingSlider, 5);
      const spikes = this.spikesSlider * this.processingSlider;
      const pos = this.geometry.attributes.position;
      const base = this.basePos;
      const arr = pos.array;
      for (let i = 0; i < pos.count; i++){
        const x = base[i*3], y = base[i*3+1], z = base[i*3+2];
        const r = 1 + 0.3 * this.simplex.noise3D(x*spikes, y*spikes, z*spikes + t);
        arr[i*3] = x*r; arr[i*3+1] = y*r; arr[i*3+2] = z*r;
      }
      pos.needsUpdate = true;
      this.geometry.computeVertexNormals();
    }

    run(){
      this.update();
      if (!this.reduceMotion){
        const dt = performance.now() * 0.0003;
        const breath = (Math.sin(dt) + 1) * 0.5;
        this.sphere.position.x = 0.55 - breath * 0.32;
        this.sphere.scale.setScalar(1 - breath * 0.18);
      }
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.run);
    }

    resize(){
      const w = innerWidth, h = innerHeight;
      this.camera.aspect = w/h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    }
  }

  try {
    new BlobEffect({ canvas, zoom: 2, color: 0x252525 });
  } catch(e) {
    canvas.style.display = 'none';
    stage.classList.add('no-webgl');
  }
})();
