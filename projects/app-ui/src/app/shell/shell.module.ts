import { NgModule } from '@angular/core';

import { ShellComponent } from './shell/shell.component';
import { SharedModule } from '../shared/shared.module';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
	declarations: [ShellComponent, SideNavbarComponent, HeaderComponent, FooterComponent],
	imports: [SharedModule]
})
export class ShellModule {}
