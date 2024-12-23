// ==UserScript==
// @name     Outlook.com categories
// @version  1
// @grant    window
// @match    https://outlook.live.com/mail/*
// ==/UserScript==

var logo = document.body.appendChild(document.createElement('div'));
with (logo.style) {
  width = height = '10px';
  background = 'red';
  position = 'absolute';
  top = right = 0;
  border = 'solid white 1px';
}
setInterval(() => {
	var contenu = document.querySelector('[aria-label="Volet de contenu"]');
  logo.style.background = contenu ? 'green' : 'red';
}, 200);

document.addEventListener('keypress', e => {
	if (e.code !== "KeyC") return;
  if (!document.querySelector('[aria-label="Volet de contenu"]')) return;
  document.querySelector('[name="Catégoriser"]').click();
});

document.addEventListener('keypress', e => {
	if (e.code !== "NumpadSubtract" && e.code !== "Minus") return;
  categorize(e.shiftKey ? '_' : '-');
});

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function categorize(cat) {
  if (!document.querySelector('[aria-label="Volet de contenu"]')) return;
  document.querySelector('[name="Catégoriser"]').click();
  
  var input = document.querySelector('[placeholder="Rechercher/créer une catégorie"]');
  while (!input) {
    await sleep(50);
    input = document.querySelector('[placeholder="Rechercher/créer une catégorie"]');
  }
  input.value = cat;
  input.dispatchEvent(new Event('input', {bubbles: true}));
  input.dispatchEvent(new KeyboardEvent('keydown', {"keyCode": 13, "bubbles": true}));
}