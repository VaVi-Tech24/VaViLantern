'use strict';
// This script replaces online.js only in the Android asset bundle.
const privacyButton=document.createElement('button');
privacyButton.textContent='Privacy policy ↗';
privacyButton.onclick=()=>{window.location.href='android-privacy.html';};
document.querySelector('.playOptions').appendChild(privacyButton);
