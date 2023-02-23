export interface LoginResponse {
	name: string;
	email: string;
	token: string;
}

export interface LoginEResponse {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	roles: string;
}
