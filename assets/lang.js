(function(){
  var LANGS=['es','pt','en'];
  var HTMLLANG={es:'es-PY',pt:'pt-BR',en:'en'};
  function apply(next){
    if(LANGS.indexOf(next)<0) next='es';
    document.querySelectorAll('[data-pt]').forEach(function(el){
      if(el.dataset.es===undefined) el.dataset.es = el.innerHTML;
      var v;
      if(next==='pt') v = el.dataset.pt;
      else if(next==='en') v = (el.dataset.en!==undefined && el.dataset.en!=='') ? el.dataset.en : el.dataset.es;
      else v = el.dataset.es;
      el.innerHTML = v;
    });
    document.documentElement.lang = HTMLLANG[next];
    window.__lang = next;
    document.querySelectorAll('[data-lang-set]').forEach(function(b){
      b.classList.toggle('active', b.getAttribute('data-lang-set')===next);
    });
  }
  function initLang(){
    var n=(navigator.language||'es').toLowerCase();
    if(n.indexOf('pt')===0) return 'pt';
    if(n.indexOf('en')===0) return 'en';
    return 'es';
  }
  window.__lang = initLang();
  document.addEventListener('click',function(e){
    var s=e.target.closest('[data-lang-set]');
    if(s){ e.preventDefault(); apply(s.getAttribute('data-lang-set')); return; }
    var t=e.target.closest('[data-lang-toggle]');
    if(t){ e.preventDefault(); var i=LANGS.indexOf(window.__lang); apply(LANGS[(i+1)%LANGS.length]); }
  });
  if(document.readyState!=='loading') apply(window.__lang);
  else document.addEventListener('DOMContentLoaded', function(){ apply(window.__lang); });
})();
