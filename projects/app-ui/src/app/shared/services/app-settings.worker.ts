/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
	if (data == 'start') {
		fetchLoop();
	}
});

function fetchLoop() {
	let myHeaders = new Headers();
	myHeaders.append('login-as-a-service', 'integrations@ecomz.com');
	myHeaders.append(
		'Authorization',
		'Bearer O6cBFEKxF_H7fwK0wjK7nVAXh406_QME9NOCYy6ShXikhIpKhv-Gs8e783D7B-r6Np9DHvI3p7Pk0iXR6n_93DsrpehpPcKvqsUycotdljox5hgewREVp8KH6OjBi0uS0h7v0zexiXkpXTWPcvChNt8qb3o8cyv_Xrelhxq_TlKqzQNCUonMk0XJyb_ZWRGFoolIbiF04PEUYAEsUks3SkVOBpV4o7jJCBZwykHoiTBIEOq8iCDJ_76JzO06_7vxme3Pr8Sk-XGiUt-qP5WDQAfrr2BK2yD4QokU-5UbkkpEvQNhuhI-XLVr2Qg4-yDrpUEIhA53tUXTteCzNs94Zzby2kRKkgjuKs34pLmbw7yq7wplK7nY32lq_Ri3Yb3XC1MzftItDx6Xjejrt8_1Zopcdh4qYRPUKgSNa0X--zKDjYub2yns7j9ix_7yMqExsb90rx0PNhJlddBx3ierSTMs81K0bwATYypM2mssyQROqIH6UVOdsvj6NfqzQCQRCPX3I-YdyHSLdVaOjlF2aHmpFwppgS_cr-W8s9t3G5z509bl0CnECwlXTN9MXTUViTsXMZ4gsDdHUaPmXm5HkEwyDOYnLlM7eRG-EhoxRh2z_IbWWvP0MMViYyyI6d0y'
	);

	fetch('https://administration-api.pilot.ecomz.local/api/account/authorizedping', {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	})
		.then((response) => response.text())
		.then((response) => {
			console.log('server response: ' + response);
			self.postMessage('stop');
		})
		.catch((error) => {
			console.log('recall  fetch');
			setTimeout(fetchLoop, 5000);
		});
}
