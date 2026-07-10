/* ============================================================
   nuclê · navegação — esconde "voltar"/"menu" ao descer (mobile)
   ============================================================ */
(function(){
  'use strict';

  var back = document.querySelector('.back');
  var menu = document.querySelector('.to-menu');
  if (!back && !menu) return;

  /* estilo do estado escondido (só no mobile) */
  var st = document.createElement('style');
  st.textContent =
    '.back,.to-menu{transition:opacity .35s ease, transform .35s ease, color .3s}' +
    '@media(max-width:760px){' +
    '  body.nav-hidden .back,body.nav-hidden .to-menu{opacity:0;pointer-events:none;transform:translateY(-14px)}' +
    '}';
  document.head.appendChild(st);

  var last = 0;
  var mql = window.matchMedia('(max-width:760px)');

  function update(){
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    if (mql.matches && y > 64 && y > last + 2){
      document.body.classList.add('nav-hidden');      // descendo → esconde
    } else if (y < last - 2 || y <= 64){
      document.body.classList.remove('nav-hidden');    // subindo ou no topo → mostra
    }
    last = y;
  }

  window.addEventListener('scroll', update, {passive:true});
})();
