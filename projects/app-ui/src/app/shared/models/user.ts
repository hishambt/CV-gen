export class User {
	constructor(public name: string, public email: string, private _token: string, private _tokenExpirationDate: Date) {}

	get token() {
		if (isNaN(this._tokenExpirationDate.getTime()) || new Date() > this._tokenExpirationDate) {
			return null;
		}

		return this._token;
	}
}
