export interface LoginCommand {
	name: string;
	email: string;
	password: string;
	rememberMe?: boolean;
	tempToken?: string;
	skipNotifications?: boolean;
	impersonator?: boolean;
}
