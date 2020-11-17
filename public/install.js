'use strict';

let deferredInstallPrompt = null;
const installButton = document.getElementById('instalar');
installButton.addEventListener('click', installPWA);

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(ev){
	deferredInstallPrompt = ev;
	installButton.removeAttribute('hidden');
}

function installPWA(ev){
	deferredInstallPrompt.prompt();
	ev.scrElement.setAttribute('hidden', true);
	deferredInstallPrompt.userChoice.then((choice) => {
		if (choice.outcome === "accepted"){
			console.log("Aceptado");
		}else {
			console.log("NO aceptado");
		}
		deferredInstallPrompt = null;
	})
}


window.addEventListener('appinstalled', logAppInstalled);

function logAppInstalled(ev){
	console.log('App Matamarcianos instalado');
}