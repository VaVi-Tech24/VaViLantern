'use strict';
// Loaded instead of online.js in the iOS bundle; web and Android stay unchanged.
let iosLandscape=false;
$('#landscape').onclick=()=>{
  window.webkit.messageHandlers.orientation.postMessage(iosLandscape?'auto':'landscape');
};
window.vaviOrientationChanged=landscape=>{
  iosLandscape=landscape;
  $('#landscape').textContent=landscape?'Auto rotate ↻':'▱ Landscape ↻';
};
const privacyButton=document.createElement('button');
privacyButton.textContent='Privacy policy ↗';
privacyButton.onclick=()=>modal('<div class="eyebrow">VAVITECH24</div><h2>Your privacy.</h2><p>VaVi Lantern for iPhone and iPad works offline. We do not collect or share personal data from this app. There are no accounts, ads, analytics, tracking, online leaderboards or in-app purchases.</p><p>Progress, scores and preferences stay in this app’s local storage. Apple device backups may include app data according to your device settings. Removing the app deletes its local records; restoring a backup may restore them.</p><p>If you contact vavitech24@gmail.com separately, we use your message and email address to answer your request. Do not send sensitive information.</p><p>Intended audience: ages 13 and older. Apple services and the separate website have their own privacy practices.</p><p>Publisher: VaViTech24<br>Contact: vavitech24@gmail.com<br>Policy date: September 12, 2026</p>');
document.querySelector('.playOptions').appendChild(privacyButton);
