# France Contrôle — site vitrine

Site statique (HTML / CSS / JS, sans dépendance ni étape de build), indépendant de l'application métier hébergée sur `vgp.francecontrole.fr`.

## Structure

```
index.html              Accueil
prestations.html        Nos prestations
obligations.html        Obligations réglementaires
qui-sommes-nous.html    Qui sommes-nous
contact.html            Contact + formulaire
mentions-legales.html   Mentions légales
assets/css/style.css    Styles (variables de couleur en tête de fichier)
assets/js/main.js       Menu mobile + formulaire de contact
assets/img/favicon.svg  Icône
```

## Prévisualiser en local

Ouvrir `index.html` dans un navigateur, ou lancer un petit serveur :

```
python -m http.server 8000
```

puis aller sur http://localhost:8000.

## Parti pris graphique

- Polices : Archivo (variable, largeur 62–125 %) pour titres et texte, IBM Plex Mono pour références, index et échéances — hébergées dans `assets/fonts/` (sous-ensembles latin et latin étendu, licence SIL OFL jointe). Aucun appel à Google Fonts.
- Couleurs (variables en tête de `style.css`) : papier `#f4f2ed`, encre `#111a22`, jaune signal `#f9a800` réservé à l'action principale et aux mois poinçonnés.
- Le macaron (logo + outil « À quelle fréquence vérifier votre matériel ? ») reprend la pastille de VGP poinçonnée. Les périodicités de l'outil sont définies dans `assets/js/main.js` (objet `EQUIPEMENTS`).
- Le bouton « Faire vérifier ce matériel » ouvre `contact.html?materiel=…` : le formulaire est pré-rempli. `?objet=…` présélectionne l'objet.

## Formulaire de contact

Dans `contact.html`, la balise `<form id="contact-form">` porte deux attributs :

- `data-mailto` : adresse de réception (mode actuel : ouverture du logiciel de messagerie de l'internaute avec le message pré-rempli).
- `data-endpoint` : laisser vide pour le mode mailto. Pour un envoi direct, créer un formulaire sur [Formspree](https://formspree.io) et y coller l'URL fournie (`https://formspree.io/f/xxxxxxx`). Aucun autre changement n'est nécessaire.

## Mise en ligne

Déposer l'ensemble des fichiers à la racine de l'hébergement (OVH, o2switch, Netlify, Cloudflare Pages, GitHub Pages…). Le domaine `francecontrole.fr` pointe vers ce site ; le sous-domaine `vgp.francecontrole.fr` est géré séparément pour l'application.

## En ligne

Publié sur GitHub Pages (branche `main`, racine) avec le domaine https://francecontrole.fr (fichier `CNAME`). DNS chez OVH : enregistrements A/AAAA vers GitHub Pages, `www` en CNAME vers `zalextort.github.io` ; `app` reste dédié à l'application.

Les pages sont indexables ; `robots.txt` déclare `sitemap.xml` (à mettre à jour si une page est ajoutée). Seule `mentions-legales.html` reste en `noindex`.

L'en-tête et le pied de page sont dupliqués dans chaque page : toute modification de la navigation est à reporter dans les 6 fichiers.
