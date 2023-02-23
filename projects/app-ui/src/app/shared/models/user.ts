// export class User {
// 	constructor(public name: string, public email: string, private _token: string, private _tokenExpirationDate: Date) {}

// 	get token() {
// 		if (isNaN(this._tokenExpirationDate.getTime()) || new Date() > this._tokenExpirationDate) {
// 			return null;
// 		}

// 		return this._token;
// 	}
// }

// export class UserLegacy {
// 	constructor(public name: string, public email: string, public _token: string, public _refreshToken: string, public _tokenExpirationDate: Date) {}

// 	get token() {
// 		// if (isNaN(this._tokenExpirationDate.getTime()) || new Date() > this._tokenExpirationDate) {
// 		// 	return null;
// 		// }

// 		return this._token;
// 	}

// 	get refreshToken() {
// 		return this._refreshToken;
// 	}
// }

export interface User {
	name: string;
	email: string;
	token: string;
	refreshToken?: string;
	expirationDate: Date;
}
