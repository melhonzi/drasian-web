/* Dr. Asian — extras globales: acento holográfico (top), bloque de marca + molécula
   interactiva (footer) y botón flotante de WhatsApp. Un solo archivo para todas las páginas. */
(function () {
  var WA = "https://wa.me/595987210000?text=" + encodeURIComponent(
    "Hola, vengo de la web de Dr. Asian y tengo una consulta sobre los productos.");

  // ---------- estilos ----------
  var css = document.createElement("style");
  css.textContent = "\
  /* acento holográfico bajo el header (top ultra pro) */\
  .dax-holo{height:3px;width:100%;background:linear-gradient(90deg,#C8BCE6,#9DBEE4,#A8DDD0,#AAC9A0,#F2A28C,#C8BCE6);\
    background-size:300% 100%;animation:daxHolo 9s linear infinite}\
  @keyframes daxHolo{0%{background-position:0% 0}100%{background-position:300% 0}}\
  @media(prefers-reduced-motion:reduce){.dax-holo{animation:none}}\
  /* bloque de marca al pie */\
  .dax-brand{background:#0A0A0A;color:#fff;overflow:hidden;padding:0 0 8px}\
  .dax-marquee{border-top:1px solid #1c1c22;border-bottom:1px solid #1c1c22;overflow:hidden;white-space:nowrap;padding:14px 0}\
  .dax-mq-track{display:inline-block;white-space:nowrap;animation:daxMq 34s linear infinite;\
    font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.28em;color:#8f8f99;text-transform:uppercase}\
  .dax-mq-track span{padding:0 26px}.dax-mq-track b{color:#fff;font-weight:600}\
  @keyframes daxMq{from{transform:translateX(0)}to{transform:translateX(-50%)}}\
  @media(prefers-reduced-motion:reduce){.dax-mq-track{animation:none}}\
  .dax-logo{display:flex;flex-direction:column;align-items:center;gap:14px;padding:54px 20px 40px;text-align:center}\
  .dax-mol{width:104px;height:104px;color:#fff;opacity:.95;transition:transform .1s linear;will-change:transform}\
  .dax-mol polygon,.dax-mol line{fill:none;stroke:currentColor;stroke-width:1.4;stroke-linejoin:round}\
  .dax-wm{font-weight:800;letter-spacing:.02em;font-size:clamp(34px,8vw,64px);line-height:1}\
  .dax-sub{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.36em;color:#8f8f99;text-transform:uppercase}\
  .dax-sig{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:.2em;color:#6b6b76;text-transform:uppercase;margin-top:4px}\
  /* botón flotante WhatsApp */\
  .dax-wa{position:fixed;right:18px;bottom:18px;z-index:80;display:flex;align-items:center;gap:0;\
    background:#0A0A0A;color:#fff;border-radius:999px;padding:14px;box-shadow:0 6px 22px rgba(0,0,0,.22);\
    overflow:hidden;transition:padding .25s ease}\
  .dax-wa svg{width:26px;height:26px;flex:none}\
  .dax-wa .dax-wa-t{max-width:0;opacity:0;white-space:nowrap;font-size:14px;font-weight:600;transition:.25s ease;overflow:hidden}\
  .dax-wa:hover{padding:14px 20px 14px 16px}.dax-wa:hover .dax-wa-t{max-width:230px;opacity:1;margin-left:10px}\
  @media(max-width:600px){.dax-wa:hover .dax-wa-t{max-width:0;opacity:0;margin-left:0}}\
  ";
  document.head.appendChild(css);

  // ---------- molécula SVG (3 hexágonos) ----------
  function hex(cx, cy, r) {
    var p = [];
    for (var i = 0; i < 6; i++) {
      var a = Math.PI / 180 * (60 * i - 30);
      p.push((cx + r * Math.cos(a)).toFixed(1) + "," + (cy + r * Math.sin(a)).toFixed(1));
    }
    return '<polygon points="' + p.join(" ") + '"/>';
  }
  var R = 15;
  var mol = '<svg class="dax-mol" viewBox="0 0 100 100" aria-hidden="true">' +
    hex(50, 30, R) + hex(33, 60, R) + hex(67, 60, R) +
    '<line x1="50" y1="45" x2="50" y2="45"/>' +
    '<line x1="44" y1="41" x2="39" y2="50"/><line x1="56" y1="41" x2="61" y2="50"/>' +
    '<line x1="42" y1="66" x2="58" y2="66"/></svg>';

  // ---------- inserta acento holográfico bajo el header ----------
  var header = document.querySelector(".site-header");
  if (header && !document.querySelector(".dax-holo")) {
    var holo = document.createElement("div");
    holo.className = "dax-holo";
    header.insertAdjacentElement("afterend", holo);
  }

  // ---------- inserta bloque de marca antes del footer ----------
  var footer = document.querySelector(".site-footer, footer");
  if (footer && !document.querySelector(".dax-brand")) {
    var brand = document.createElement("section");
    brand.className = "dax-brand";
    var mqInner = "<span><b>DR. ASIAN</b></span><span>· THE SCIENCE OF ANCESTRAL BEAUTY ·</span>" +
      "<span>CIENCIA COREANA, HECHA EN PARAGUAY</span><span>· DERMOCOSMÉTICA HONESTA ·</span>";
    brand.innerHTML =
      '<div class="dax-marquee"><div class="dax-mq-track">' + mqInner + mqInner + '</div></div>' +
      '<div class="dax-logo">' + mol +
      '<div class="dax-wm">DR. ASIAN</div>' +
      '<div class="dax-sub">Beauty Lab</div>' +
      '<div class="dax-sig">The science of ancestral beauty · Hecho en Paraguay</div>' +
      '</div>';
    footer.insertAdjacentElement("beforebegin", brand);

    // molécula flota/gira con el scroll
    var molEl = brand.querySelector(".dax-mol");
    var ticking = false;
    function spin() {
      var rect = brand.getBoundingClientRect();
      var p = 1 - (rect.top / (window.innerHeight || 800));
      molEl.style.transform = "rotate(" + (p * 60).toFixed(1) + "deg) translateY(" + (p * -10).toFixed(1) + "px)";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(spin); ticking = true; }
    }, { passive: true });
    spin();
  }

  // ---------- botón flotante WhatsApp ----------
  if (!document.querySelector(".dax-wa")) {
    var a = document.createElement("a");
    a.className = "dax-wa";
    a.href = WA; a.target = "_blank"; a.rel = "noopener";
    a.setAttribute("aria-label", "WhatsApp +595 987 210 000");
    a.innerHTML =
      '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3C9 3 3.5 8.5 3.5 15.5c0 2.4.7 4.7 1.9 6.7L3 29l7-1.8c1.9 1 4 1.6 6 1.6 7 0 12.5-5.5 12.5-12.5S23 3 16 3zm0 22.7c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-4.2 1.1 1.1-4-.2-.4c-1-1.6-1.6-3.5-1.6-5.4C5.6 9.7 10.3 5 16 5s10.4 4.7 10.4 10.5S21.7 25.7 16 25.7zm5.7-7.8c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.6.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4z"/></svg>' +
      '<span class="dax-wa-t">WhatsApp +595 987 210 000</span>';
    document.body.appendChild(a);
  }
})();
