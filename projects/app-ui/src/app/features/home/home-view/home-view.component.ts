import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-home-view',
	templateUrl: './home-view.component.html',
	styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnDestroy {
	isExpanded = true;
	showSubmenu: boolean = false;
	isShowing = false;
	showSubSubMenu: boolean = false;
	seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
	panelOpenState = false;

	mobileQuery: MediaQueryList;

	fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
	today = new Date();
	month = this.today.getMonth();
	year = this.today.getFullYear();
	campaignOne = new FormGroup({
		start: new FormControl(new Date(this.year, this.month, 13)),
		end: new FormControl(new Date(this.year, this.month, 16))
	});

	campaignTwo = new FormGroup({
		start: new FormControl(new Date(this.year, this.month, 15)),
		end: new FormControl(new Date(this.year, this.month, 19))
	});

	fillerContent = Array.from(
		{ length: 5 },
		() =>
			`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
	);

	private _mobileQueryListener: () => void;

	constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addEventListener('change', this._mobileQueryListener, false);
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeEventListener('change', this._mobileQueryListener, false);
	}
}
