import { DOCUMENT } from '@angular/common';
import { AfterContentInit, Component, Inject, OnInit } from '@angular/core';
import * as chroma from 'chroma-js';
import { InterpolationMode } from 'chroma-js';

@Component({
	selector: 'app-white-labeling-theme',
	templateUrl: './white-labeling-theme.component.html',
	styleUrls: ['./white-labeling-theme.component.scss']
})
export class WhiteLabelingThemeComponent implements OnInit, AfterContentInit {
	palettePrimary: string[] = [];
	paletteAccent: string[] = [];
	paletteWarn: string[] = [];
	private rootTag!: HTMLElement;

	title = 'app-ui';
	inputs: any = { 0: 'white', 50: '', 100: '', 200: '', 300: '', 400: '', 500: '#298da5', 600: '', 700: '', 800: '', 900: '', 1000: 'black' };
	inputs2: any = { 0: 'white', 50: '', 100: '', 200: '', 300: '', 400: '', 500: '#8DB768', 600: '', 700: '', 800: '', 900: '', 1000: 'black' };
	inputs3: any = { 0: 'white', 50: '', 100: '', 200: '', 300: '', 400: '', 500: '#E91E63', 600: '', 700: '', 800: '', 900: '', 1000: 'black' };
	// mode:InterpolationMode = 'rgb' | 'hsl' | 'hsv' | 'hsi' | 'lab' | 'lch' | 'hcl' | 'lrgb';

	mode: InterpolationMode = 'rgb';

	constructor(@Inject(DOCUMENT) private document: Document) {
		this.rootTag = this.document.documentElement;
	}

	ngAfterContentInit(): void {
		this.generatePalette(this.inputs, 'primary');
		this.generatePalette(this.inputs2, 'accent');
		this.generatePalette(this.inputs3, 'warn');
	}

	ngOnInit(): void {
		console.log('test');
	}

	onclick() {
		this.rootTag.style.setProperty('--theme-primary-500', '#ff0000');
	}

	regeneratePalette(target: 'primary' | 'accent' | 'warn', color: string) {
		switch (target) {
			case 'primary':
				this.inputs[500] = color;
				this.generatePalette(this.inputs, 'primary');
				break;
			case 'accent':
				this.inputs2[500] = color;
				this.generatePalette(this.inputs2, 'accent');

				break;
			case 'warn':
				this.inputs3[500] = color;
				this.generatePalette(this.inputs3, 'warn');

				break;
			default:
				break;
		}
	}

	generatePalette(inputPalette: any, target: 'primary' | 'accent' | 'warn') {
		// If the hue level 500 is available, use it to calculate the beginning
		// and the end colors to be something other than pure white and pure black
		const inputs = inputPalette;
		const hue500 = inputs[500];

		if (hue500 && chroma.valid(hue500)) {
			inputs[0] = chroma.scale(['white', hue500]).domain([0, 1]).mode(this.mode).colors(50)[1];

			inputs[1000] = chroma.scale(['black', hue500]).domain([0, 1]).mode(this.mode).colors(10)[1];
		} else {
			inputs[0] = 'white';
			inputs[1000] = 'black';
		}

		// Create the colors array from the inputs
		const colors: any = Object.entries(inputs).map(([hue, color]) => {
			if (!chroma.valid(color)) {
				return undefined;
			}

			return color;
		});
		// Clone the colors and remove the white and black
		// so only the user provided values are left
		const userColors = [...colors];
		userColors.shift();
		userColors.pop();

		// Build the domain array
		const domain = [
			0,
			...(() => {
				const map: any = [];

				userColors.forEach((color, index) => {
					if (color !== undefined) {
						if (index === 0) {
							map.push(50);
						} else {
							map.push(index * 100);
						}
					}
				});

				return map;
			})(),
			1000
		];
		// Generate the color scale
		const scale = chroma
			.scale(colors.filter((color: any) => color !== undefined))
			.domain(domain)
			.mode(this.mode);
		const tempPalette = [
			scale(0).hex(),
			scale(50).hex(),
			scale(100).hex(),
			scale(200).hex(),
			scale(300).hex(),
			scale(400).hex(),
			scale(500).hex(),
			scale(600).hex(),
			scale(700).hex(),
			scale(800).hex(),
			scale(900).hex(),
			scale(1000).hex()
		];
		// Build the palette
		switch (target) {
			case 'primary':
				this.palettePrimary = tempPalette;
				this.generateGlobalCssVariables(this.palettePrimary, 'primary');

				break;
			case 'accent':
				this.paletteAccent = tempPalette;
				this.generateGlobalCssVariables(this.paletteAccent, 'accent');

				break;
			case 'warn':
				this.paletteWarn = tempPalette;
				this.generateGlobalCssVariables(this.paletteWarn, 'warn');

				break;
			default:
				break;
		}

		// primary logs
		console.log('primary inputs: ', inputs);
		console.log('primary colors: ', colors);
		console.log('primary user colors: ', userColors);
		console.log('primary domain: ', domain);
		console.log('primary palette : ', this.palettePrimary);

		// accent logs
		console.log('accent inputs: ', inputs);
		console.log('accent colors: ', colors);
		console.log('accent user colors: ', userColors);
		console.log('accent domain: ', domain);
		console.log('accent palette : ', this.paletteAccent);

		// warn logs
		console.log('warn inputs: ', inputs);
		console.log('warn colors: ', colors);
		console.log('warn user colors: ', userColors);
		console.log('warn domain: ', domain);
		console.log('warn palette : ', this.paletteWarn);
	}

	/**
	 * Convert the given hex color to HSL format
	 */
	convertToHSL(hex: string) {
		const hsl = chroma(hex).hsl();
		hsl.pop();

		return hsl.map((value, index) => {
			// Since the Saturation and Lightness is between 0 and 1,
			// multiply them with 100 for better compatibility with
			// tools like Figma.
			if (index !== 0) {
				value = value * 100;
			}

			// Round all values
			return value.toFixed(0);
		});
	}

	private generateGlobalCssVariables(palette: any, target: 'primary' | 'accent' | 'warn') {
		const doc = this.rootTag;

		palette.forEach((varient: any, i: number) => {
			doc.style.setProperty(`--theme-${target}-${i <= 1 ? i * 50 : (i - 1) * 100}`, varient);
		});
	}
}
