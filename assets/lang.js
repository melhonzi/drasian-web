(function(){
  function apply(next){
    document.querySelectorAll('[data-pt]').forEach(function(el){
      if(el.dataset.es===undefined) el.dataset.es = el.innerHTML;
      el.innerHTML = (next==='pt') ? el.dataset.pt : el.dataset.es;
    });
    document.documentElement.lang = (next==='pt') ? 'pt-BR' : 'es-PY';
    var l=document.getElementById('langLabel'), a=document.getElementById('langAlt');
    if(l&&a){ l.textContent=next.toUpperCase(); a.textContent=(next==='pt')?'ES':'PT'; }
    window.__lang=next;
  }
  window.__lang='es';
  document.addEventListener('click',function(e){
    var b=e.target.closest('[data-lang-toggle]');
    if(b){ e.preventDefault(); apply(window.__lang==='es'?'pt':'es'); }
  });
})();
