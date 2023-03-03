import { NgModule } from '@angular/core';

import { ShellComponent } from './shell/shell.component';
import { SharedModule } from '../shared/shared.module';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DrawerHostDirective } from '../shared/directives/drawer-host.directive';
import { DialogComponent } from './_components/dialog/dialog.component';
import { AppLoadingBarComponent } from './_components/app-loading-bar/app-loading-bar.component';
import { AppConnectionIssueComponent } from './_components/app-connection-issue/app-connection-issue.component';
import { DrawerComponent } from './_components/drawer/drawer.component';

@NgModule({
	declarations: [
		ShellComponent,
		SideNavbarComponent,
		HeaderComponent,
		FooterComponent,
		DrawerComponent,
		DialogComponent,
		AppLoadingBarComponent,
		AppConnectionIssueComponent
	],
	imports: [SharedModule, DrawerHostDirective]
})
export class ShellModule {}
