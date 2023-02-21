import { ThemePalette } from '@angular/material/core';

export interface ActionButton {
	visible: boolean;
	disabled: boolean;
	class: string;
	color: ThemePalette;
	text: string;
	options?: Array<{
		text: string;
	}>;
}
