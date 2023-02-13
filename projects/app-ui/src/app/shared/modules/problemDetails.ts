export interface ProblemDetails {
	type: string;
	title: string;
	status: number;
	detail: string;
	instance: string;
	error: string;
	extensions: { [key: string]: any };
}

export interface ValidationProblemDetails extends ProblemDetails {
	errors?: { [key: string]: Array<string> };
}
