/* Aula gratuita 5 Erros do Confinamento: configuração e utilitários compartilhados. */
(function () {
  'use strict';

  var CFG = {
    // URL do webhook n8n que grava na planilha (aba "Lançamento 18-11") e dispara o Lead na API de Conversões.
    // PENDENTE: preencher com a URL de produção do workflow antes de ligar a campanha.
    // Vazio = o formulário funciona e redireciona, mas NÃO grava a inscrição (aviso no console).
    WEBHOOK: '',
    GRUPO_URL: 'https://chat.whatsapp.com/LGnowgPFDCtCb4QQ1UE6EY',
    PIXEL_ID: '974661415006489',
    CONTENT_NAME: 'Aula 5 Erros 18/11',
    OBRIGADO: '/5-erros-do-confinamento/obrigado',
    // Aula: quarta 18/11/2026, 19h30 (Brasília, UTC-3), duração padrão 90 min
    AULA_INICIO_UTC: '20261118T223000Z',
    AULA_FIM_UTC: '20261119T000000Z'
  };

  var KEY = 'lb_aula_18_11';

  function load() {
    try { return JSON.parse(sessionStorage.getItem(KEY) || '{}'); } catch (e) { return {}; }
  }
  function save(patch) {
    var d = load();
    for (var k in patch) d[k] = patch[k];
    try { sessionStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
    return d;
  }
  function cookie(n) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + n + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  }
  function utms() {
    var q = new URLSearchParams(location.search), r = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) {
      if (q.get(k)) r[k] = q.get(k);
    });
    return r;
  }
  function fbc() {
    var c = cookie('_fbc');
    if (c) return c;
    var id = new URLSearchParams(location.search).get('fbclid');
    return id ? 'fb.1.' + Date.now() + '.' + id : '';
  }
  function eventId() {
    var r = (window.crypto && crypto.getRandomValues) ? crypto.getRandomValues(new Uint32Array(2)) : [Math.random() * 4e9, Math.random() * 4e9];
    return 'lead_' + Date.now() + '_' + (r[0] >>> 0).toString(36) + (r[1] >>> 0).toString(36);
  }
  function post(payload, beacon) {
    if (!CFG.WEBHOOK) {
      if (window.console) console.warn('[aula-5-erros] CFG.WEBHOOK vazio: inscrição NÃO enviada.', payload);
      return Promise.resolve();
    }
    var body = new URLSearchParams(payload).toString();
    if (beacon && navigator.sendBeacon) {
      try {
        if (navigator.sendBeacon(CFG.WEBHOOK, new Blob([body], { type: 'application/x-www-form-urlencoded' }))) return Promise.resolve();
      } catch (e) {}
    }
    return fetch(CFG.WEBHOOK, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body }).catch(function () {});
  }
  function track(type, name, params, opts) {
    try { if (window.fbq) { opts ? fbq(type, name, params, opts) : fbq(type, name, params); } } catch (e) {}
  }
  function gaEvent(name, params) {
    try { if (window.gtag) gtag('event', name, params || {}); } catch (e) {}
  }
  function primeiroNome(n) {
    n = (n || '').trim().split(/\s+/)[0] || '';
    return n.charAt(0).toUpperCase() + n.slice(1).toLowerCase();
  }

  window.LB = { CFG: CFG, load: load, save: save, cookie: cookie, utms: utms, fbc: fbc, eventId: eventId, post: post, track: track, gaEvent: gaEvent, primeiroNome: primeiroNome };
})();
