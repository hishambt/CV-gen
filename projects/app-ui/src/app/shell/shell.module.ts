import { NgModule } from '@angular/core';

import { ShellComponent } from './shell/shell.component';
import { SharedModule } from '../shared/shared.module';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DrawerHostDirective } from '../shared/directives/drawer-host.directive';
import { DrawerComponent } from './drawer/drawer.component';
import { DrawerEmptyComponent } from './drawer/drawer-empty.component';

@NgModule({
	declarations: [ShellComponent, SideNavbarComponent, HeaderComponent, FooterComponent, DrawerComponent, DrawerEmptyComponent],
	imports: [SharedModule, DrawerHostDirective]
})
export class ShellModule {}
