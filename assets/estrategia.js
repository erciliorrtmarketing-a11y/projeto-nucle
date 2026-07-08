/* ============================================================
   nuclê · estratégia — rota: desenha a linha e revela cada fase
   (aparece rolando pra baixo, some rolando pra cima)
   ============================================================ */
(function(){
  'use strict';
  document.documentElement.classList.add('js');
  var route = document.getElementById('route');
  var prog  = document.getElementById('routeProg');
  if (!route || !prog) return;
  var stops = [].slice.call(document.querySelectorAll('.stop'));

  function onScroll(){
    var r = route.getBoundingClientRect();
    var passed = Math.min(r.height, Math.max(0, window.innerHeight * 0.5 - r.top));
    prog.style.height = passed + 'px';
  }

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ e.target.classList.toggle('on', e.isIntersecting); });
  }, { rootMargin: '-22% 0px -22% 0px' });
  stops.forEach(function(s){ io.observe(s); });

  window.addEventListener('scroll', function(){ window.requestAnimationFrame(onScroll); }, { passive:true });
  onScroll();
})();
