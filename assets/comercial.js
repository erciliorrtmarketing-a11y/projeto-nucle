/* ============================================================
   nuclê · comercial — clicar em "comercial" sobe o título e revela
   as frentes em linha; passar o mouse numa frente mostra a explicação.
   ============================================================ */
(function(){
  'use strict';
  document.documentElement.classList.add('js');

  var FRENTES = [
    { t:'prospecção',
      d:'O topo do funil: achar e abordar quem tem o problema que a nuclê resolve. A gente monta o perfil de cliente ideal, garimpa as listas certas e começa a conversa com uma mensagem que fala da dor real, sem disparo genérico. A meta é transformar um desconhecido em conversa com quem realmente pode comprar.' },
    { t:'qualificação',
      d:'Separar quem tem fit, orçamento e urgência de quem só está olhando. A nuclê investiga cedo o cenário: qual o problema, quanto ele custa hoje e quem decide. Quem tem encaixe avança; quem não tem, sai com respeito. Isso poupa o tempo dos dois lados e mantém o funil só com oportunidade real.' },
    { t:'proposta',
      d:'A dor mapeada vira uma solução clara e sob medida. A proposta mostra o caminho, traz prova de casos parecidos e responde às duas perguntas que travam qualquer decisão: por que agora e por que a nuclê. O preço aparece como consequência do valor, na última linha, não na primeira.' },
    { t:'negociação',
      d:'Objeção quase nunca é não, é pedido de clareza. Aqui a nuclê trata cada dúvida, ajusta escopo, prazo e forma de pagamento e alinha expectativas até o valor percebido superar o custo. É conversa franca, sem empurrar: o bom acordo é o que os dois lados assinam sem arrependimento depois.' },
    { t:'fechamento',
      d:'Tornar o sim fácil: contrato claro, próximo passo óbvio e zero fricção na assinatura. Assim que fecha, já começa o onboarding e o kickoff, pro cliente sentir ritmo desde o primeiro dia. Vender bem é só o começo de uma relação que se paga em recompra e indicação.' }
  ];

  var ex = document.getElementById('ex');
  var coreBtn = document.getElementById('core');
  var body = document.getElementById('readoutIn');
  var elText = document.getElementById('rText');
  var ghost = document.getElementById('exGhost');
  if (!ex || !coreBtn || !body) return;
  var nodeEls = [].slice.call(ex.querySelectorAll('.node'));
  var opened = false, active = -1, tmr = null, locked = -1;

  function render(i){ elText.textContent = FRENTES[i].d; if (ghost) ghost.textContent = FRENTES[i].t; }
  function activate(i){
    nodeEls.forEach(function(el,k){ el.classList.toggle('active', k===i); });
    if (i === active) return;
    if (active === -1){ active = i; render(i); return; }
    active = i;
    body.classList.add('swap');
    clearTimeout(tmr);
    tmr = setTimeout(function(){ render(i); body.classList.remove('swap'); }, 220);
  }

  coreBtn.addEventListener('click', function(){ if (!opened){ opened = true; ex.classList.add('is-open'); } });

  nodeEls.forEach(function(el,i){
    el.addEventListener('mouseenter', function(){ if (opened){ activate(i); ex.classList.add('is-hover'); } });
    el.addEventListener('mouseleave', function(){ if (opened){ if (locked >= 0){ activate(locked); } else { ex.classList.remove('is-hover'); } } });
    el.addEventListener('focus', function(){ if (opened){ activate(i); ex.classList.add('is-hover'); } });
    el.addEventListener('blur', function(){ if (opened && locked < 0){ ex.classList.remove('is-hover'); } });
    el.addEventListener('click', function(){ if (opened){ locked = i; activate(i); ex.classList.add('is-hover'); } });
  });
})();
