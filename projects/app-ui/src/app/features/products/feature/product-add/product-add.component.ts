import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'projects/app-ui/src/app/core/services/auth.service';
import { FormBaseComponent } from 'projects/app-ui/src/app/shared/bases/form-base.component';
import { AppErrorService } from 'projects/app-ui/src/app/shared/services/app-error.service';

@Component({
	selector: 'app-product-add',
	templateUrl: './product-add.component.html',
	styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent extends FormBaseComponent<any> implements OnInit {
	onLoadData() {
		return {
			productName: '',
			productCategory: ''
		};
	}

	submitRecord(status?: string | undefined): Promise<void> {
		throw new Error('Method not implemented.');
	}

	constructor(router: Router, route: ActivatedRoute, authService: AuthService, appErrorService: AppErrorService) {
		super(router, route, authService, appErrorService);
	}

	override ngOnInit(): void {
		super.ngOnInit();
	}

	onPageHeaderActionClick(value: any) {
		switch (value) {
			case 'Edit':
				this.router.navigate(['./edit'], { relativeTo: this.route });
				break;
		}
	}

	onActionClick(value: any, _mode?: string) {
		switch (value) {
			case 'Save and Close':
				this.submitRecord(value);
				break;
			case 'Save and New':
				this.submitRecord(value);
				break;
			case 'Cancel':
				if (this.formMode === 'add') {
					this.goBack();
				} else if (this.formMode === 'edit') {
					this.router.navigate(['../view'], { relativeTo: this.route });
				}

				break;
			case 'Reset':
				this.reloadRoute();
				break;
		}
	}
}
