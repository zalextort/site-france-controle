# France Contrôle — site vitrine

Site statique (HTML / CSS / JS, sans dépendance ni étape de build), indépendant de l'application métier hébergée sur `app.francecontrole.fr`.

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

- Polices : Archivo (variable, largeur 62–125 %) pour titres et texte, IBM Plex Mono pour références, index et échéances — chargées depuis Google Fonts.
- Couleurs (variables en tête de `style.css`) : papier `#f4f2ed`, encre `#111a22`, jaune signal `#f9a800` réservé à l'action principale et aux mois poinçonnés.
- Le macaron (logo + outil « À quelle fréquence vérifier votre matériel ? ») reprend la pastille de VGP poinçonnée. Les périodicités de l'outil sont définies dans `assets/js/main.js` (objet `EQUIPEMENTS`).
- Le bouton « Faire vérifier ce matériel » ouvre `contact.html?materiel=…` : le formulaire est pré-rempli. `?objet=…` présélectionne l'objet.

## Formulaire de contact

Dans `contact.html`, la balise `<form id="contact-form">` porte deux attributs :

- `data-mailto` : adresse de réception (mode actuel : ouverture du logiciel de messagerie de l'internaute avec le message pré-rempli).
- `data-endpoint` : laisser vide pour le mode mailto. Pour un envoi direct, créer un formulaire sur [Formspree](https://formspree.io) et y coller l'URL fournie (`https://formspree.io/f/xxxxxxx`). Aucun autre changement n'est nécessaire.

## Mise en ligne

Déposer l'ensemble des fichiers à la racine de l'hébergement (OVH, o2switch, Netlify, Cloudflare Pages, GitHub Pages…). Le domaine `francecontrole.fr` pointe vers ce site ; le sous-domaine `app.francecontrole.fr` est géré séparément pour l'application.

## Préversion en ligne

Publiée sur GitHub Pages : https://zalextort.github.io/site-france-controle/ (branche `main`, racine).
Tant que le contenu n'est pas finalisé, chaque page porte `<meta name="robots" content="noindex">` et `robots.txt` bloque l'indexation : supprimer les deux à la mise en ligne définitive (sauf sur `mentions-legales.html`).

## Éléments à compléter

Rechercher `[` et `00 00 00 00 00` dans les fichiers HTML :

- téléphone, adresse, horaires (pied de page de chaque page + `contact.html`) ;
- e-mail de contact si différent de `contact@francecontrole.fr` ;
- informations légales et hébergeur (`mentions-legales.html`) ;
- historique / présentation détaillée (`qui-sommes-nous.html`, commentaire « À compléter »).

L'en-tête et le pied de page sont dupliqués dans chaque page : toute modification de la navigation est à reporter dans les 6 fichiers.
