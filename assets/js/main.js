// France Contrôle — scripts du site vitrine
(function () {
  "use strict";

  // Espace client : passer à true le jour où l'application vgp.francecontrole.fr ouvre.
  var ESPACE_CLIENT_OUVERT = true;

  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var label = toggle.querySelector("span");
    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (label) label.textContent = open ? "Fermer" : "Menu";
    }
    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Espace client : bientôt disponible ---------- */
  if (!ESPACE_CLIENT_OUVERT) {
    document.documentElement.classList.add("client-soon");
    var toast = null, toastTimer = null, lastTrigger = null;
    function hideToast() {
      if (!toast) return;
      toast.classList.remove("is-visible");
      clearTimeout(toastTimer);
    }
    function showToast(trigger) {
      lastTrigger = trigger;
      if (!toast) {
        toast = document.createElement("div");
        toast.className = "soon-toast";
        toast.setAttribute("role", "status");
        toast.innerHTML = "<div><strong>L'espace client arrive bientôt.</strong>" +
          "Vous pourrez y consulter vos rapports et vos prochaines échéances. " +
          "D'ici là, contactez-nous au <a href=\"tel:+33623483571\">06 23 48 35 71</a>.</div>" +
          "<button type=\"button\" aria-label=\"Fermer le message\">×</button>";
        document.body.appendChild(toast);
        toast.querySelector("button").addEventListener("click", function () {
          hideToast();
          if (lastTrigger) lastTrigger.focus();
        });
      }
      toast.classList.add("is-visible");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(hideToast, 7000);
    }
    document.addEventListener("click", function (e) {
      var link = e.target.closest && e.target.closest("a[href^=\"https://vgp.francecontrole.fr\"]");
      if (!link) return;
      e.preventDefault();
      if (nav && nav.classList.contains("is-open") && toggle) toggle.click();
      showToast(link);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") hideToast();
    });
  }

  /* ---------- Année ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Périodicité par matériel + macaron ---------- */
  var A2004 = "Arrêté du 1<sup>er</sup> mars 2004";
  var A1993 = "Arrêté du 5 mars 1993";
  var EQUIPEMENTS = {
    "chariot":      { nom: "Chariot élévateur", per: 6, texte: A2004, cat: "Appareil mobile mû autrement que par la force humaine" },
    "nacelle":      { nom: "Nacelle / PEMP", per: 6, texte: A2004, cat: "Appareil déplaçant en élévation un poste de travail" },
    "hayon":        { nom: "Hayon élévateur", per: 6, texte: A2004, cat: "Appareil mobile mû autrement que par la force humaine" },
    "grue":         { nom: "Grue mobile ou auxiliaire", per: 6, texte: A2004, cat: "Appareil mobile mû autrement que par la force humaine" },
    "pont":         { nom: "Pont roulant", per: 12, texte: A2004, cat: "Appareil de levage fixe" },
    "palan":        { nom: "Palan", per: 12, texte: A2004, cat: "Appareil de levage fixe" },
    "accessoire":   { nom: "Accessoire de levage", per: 12, texte: A2004, cat: "Accessoire de levage : élingue, manille, palonnier…" },
    "pelle":        { nom: "Pelle / engin de terrassement", per: 12, texte: A1993, cat: "Équipement de travail sans fonction de levage" },
    "pelle-levage": { nom: "Pelle équipée pour le levage", per: 6, texte: A1993 + " et arrêté du 1<sup>er</sup> mars 2004", cat: "Engin de terrassement équipé pour le levage",
                      note: "Relevant des deux arrêtés, l'engin passe de 12 à 6 mois." }
  };

  var SVGNS = "http://www.w3.org/2000/svg";
  function el(name, attrs, text) {
    var n = document.createElementNS(SVGNS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }

  function drawMacaron(svg, per, startMonth) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var c = 100;
    svg.appendChild(el("circle", { cx: c, cy: c, r: 97, fill: "#fff", stroke: "#111a22", "stroke-width": 2 }));
    svg.appendChild(el("circle", { cx: c, cy: c, r: 54, fill: "none", stroke: "#d6d1c6", "stroke-width": 1 }));
    var punched = {};
    for (var m = 0; m < 12; m += per) punched[(startMonth + m) % 12] = true;
    for (var i = 0; i < 12; i++) {
      // le mois 12 en haut, sens horaire, comme sur un macaron
      var a = ((i + 1) * 30 - 90) * Math.PI / 180;
      var x = c + 76 * Math.cos(a), y = c + 76 * Math.sin(a);
      var t = ((i + 1) * 30 - 75) * Math.PI / 180;
      svg.appendChild(el("line", {
        x1: c + 88 * Math.cos(t), y1: c + 88 * Math.sin(t),
        x2: c + 93 * Math.cos(t), y2: c + 93 * Math.sin(t),
        stroke: "#b9b3a6", "stroke-width": 1.5
      }));
      if (punched[i]) {
        var g = el("g", { "class": "punch", style: "transform-origin:" + x + "px " + y + "px" });
        g.appendChild(el("circle", { cx: x, cy: y, r: 15, fill: "#f9a800", stroke: "#111a22", "stroke-width": 2 }));
        svg.appendChild(g);
      }
      svg.appendChild(el("text", {
        x: x, y: y + 5, "text-anchor": "middle",
        "font-family": "IBM Plex Mono, monospace", "font-size": 14,
        "font-weight": punched[i] ? 600 : 400,
        fill: punched[i] ? "#111a22" : "#59626b"
      }, String(i + 1)));
    }
    svg.appendChild(el("text", {
      x: c, y: c + 12, "text-anchor": "middle",
      "font-family": "Archivo, sans-serif", "font-size": 58, "font-weight": 800,
      style: "font-stretch:80%", fill: "#111a22"
    }, String(per)));
    svg.appendChild(el("text", {
      x: c, y: c + 32, "text-anchor": "middle",
      "font-family": "IBM Plex Mono, monospace", "font-size": 11, "letter-spacing": 1.5, fill: "#59626b"
    }, "MOIS"));
  }

  var chips = document.getElementById("checker-chips");
  var macaron = document.getElementById("macaron");
  if (chips && macaron) {
    var facts = {};
    document.querySelectorAll(".facts [data-k]").forEach(function (n) { facts[n.getAttribute("data-k")] = n; });
    var cta = document.getElementById("checker-cta");
    var now = new Date();
    var month = now.getMonth();

    function update(key) {
      var d = EQUIPEMENTS[key];
      if (!d) return;
      var next = new Date(now.getFullYear(), month + d.per, 1);
      facts.per.textContent = d.per + " mois";
      facts.texte.innerHTML = d.texte;
      facts.cat.textContent = d.cat;
      if (facts.next) facts.next.textContent = MOIS[next.getMonth()] + " " + next.getFullYear();
      facts.note.textContent = d.note || "";
      drawMacaron(macaron, d.per, month);
      macaron.setAttribute("aria-label", "Macaron de vérification : tous les " + d.per + " mois");
      if (cta) cta.href = "contact.html?materiel=" + encodeURIComponent(d.nom);
    }

    chips.addEventListener("change", function (e) {
      if (e.target.name === "materiel") update(e.target.value);
    });
    var checked = chips.querySelector("input:checked");
    update(checked ? checked.value : "chariot");
  }

  /* ---------- Formulaire de contact ---------- */
  var form = document.getElementById("contact-form");
  if (!form) return;

  // Pré-remplissage depuis l'URL (?materiel=…&objet=…)
  var params = new URLSearchParams(window.location.search);
  var materiel = params.get("materiel");
  var objet = params.get("objet");
  if (materiel && form.elements.materiel) form.elements.materiel.value = materiel.slice(0, 120);
  if (objet && form.elements.objet) {
    Array.prototype.forEach.call(form.elements.objet.options, function (o) {
      if (o.value === objet) form.elements.objet.value = objet;
    });
  }
  if (materiel && form.elements.objet && !form.elements.objet.value) form.elements.objet.value = "Demande de vérification";

  var status = document.getElementById("form-status");
  var endpoint = form.getAttribute("data-endpoint");
  var mailto = form.getAttribute("data-mailto");
  var submitBtn = form.querySelector("button[type=submit]");
  var submitLabel = submitBtn.innerHTML;

  var MESSAGES = {
    nom: "Indiquez votre nom.",
    email: "Indiquez une adresse e-mail valide, par exemple nom@entreprise.fr.",
    objet: "Choisissez l'objet de votre demande.",
    message: "Décrivez votre besoin en quelques mots.",
    rgpd: "Cochez cette case pour que nous puissions traiter votre demande."
  };

  function fieldValid(input) {
    var ok = input.checkValidity();
    input.setAttribute("aria-invalid", ok ? "false" : "true");
    return ok;
  }

  Object.keys(MESSAGES).forEach(function (name) {
    var input = form.elements[name];
    var err = document.getElementById("err-" + name);
    if (err) err.textContent = MESSAGES[name];
    var evt = input.type === "checkbox" || input.tagName === "SELECT" ? "change" : "input";
    input.addEventListener(evt, function () {
      if (input.getAttribute("aria-invalid") === "true") fieldValid(input);
    });
    input.addEventListener("blur", function () {
      if (input.value && input.type !== "checkbox") fieldValid(input);
    });
  });

  function showStatus(msg, ok) {
    status.hidden = false;
    status.className = "form-status " + (ok ? "ok" : "err");
    status.innerHTML = msg;
    status.focus();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.hidden = true;
    if (form.elements._gotcha.value) return;

    var firstInvalid = null;
    Object.keys(MESSAGES).forEach(function (name) {
      var input = form.elements[name];
      if (!fieldValid(input) && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) { firstInvalid.focus(); return; }

    var data = new FormData(form);

    if (endpoint) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Envoi en cours…";
      fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error(res.status);
          form.reset();
          showStatus("<strong>Demande envoyée.</strong> Nous vous répondons sous un jour ouvré.", true);
        })
        .catch(function () {
          showStatus("<strong>L'envoi n'a pas abouti.</strong> Réessayez, ou écrivez-nous directement à <a href=\"mailto:" + mailto + "\">" + mailto + "</a>.", false);
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitLabel;
        });
      return;
    }

    var subject = (data.get("objet") || "Demande") + (data.get("materiel") ? " — " + data.get("materiel") : "");
    var body = [
      "Nom : " + data.get("nom"),
      "Société : " + (data.get("societe") || "-"),
      "E-mail : " + data.get("email"),
      "Téléphone : " + (data.get("telephone") || "-"),
      "Matériel concerné : " + (data.get("materiel") || "-"),
      "Objet : " + data.get("objet"),
      "",
      data.get("message")
    ].join("\n");

    window.location.href = "mailto:" + mailto + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    showStatus("<strong>Votre messagerie s'ouvre avec la demande pré-remplie.</strong> Il ne reste qu'à l'envoyer. Rien ne s'ouvre&nbsp;? Écrivez-nous à <a href=\"mailto:" + mailto + "\">" + mailto + "</a>.", true);
  });
})();
