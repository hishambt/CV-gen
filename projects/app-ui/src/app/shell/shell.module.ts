import { NgModule } from '@angular/core';

import { ShellComponent } from './shell/shell.component';
import { SharedModule } from '../shared/shared.module';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DrawerHostDirective } from '../shared/directives/drawer-host.directive';
import { DialogComponent } from './_components/dialog/dialog.component';
import { DrawerComponent } from './_components/drawer/drawer.component';
import { ShellConnectionIssueComponent } from './_components/shell-connection-issue/shell-connection-issue.component';
import { ShellLoadingBarComponent } from './_components/shell-loading-bar/shell-loading-bar.component';

@NgModule({
	declarations: [
		ShellComponent,
		SideNavbarComponent,
		HeaderComponent,
		FooterComponent,
		DrawerComponent,
		DialogComponent,
		ShellConnectionIssueComponent,
		ShellLoadingBarComponent
	],
	imports: [SharedModule, DrawerHostDirective]
})
export class ShellModule {}
