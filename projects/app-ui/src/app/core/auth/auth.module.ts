import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthStorageService } from './services/auth-storage.services';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [SharedModule, AuthRoutingModule],
	providers: [AuthStorageService]
})
export class AuthModule {}
