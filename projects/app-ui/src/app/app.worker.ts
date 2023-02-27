/// <reference lib="webworker" />

self.addEventListener('message', function (e) {
	let online = navigator.onLine;

	self.postMessage(online);
});

setInterval(() => {
	let online = navigator.onLine;
	self.postMessage(online);
}, 5000); //
