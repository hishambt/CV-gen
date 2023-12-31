import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginStorageService } from './_services/login-storage.services';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [SharedModule, AuthRoutingModule],
	providers: [LoginStorageService]
})
export class AuthModule {}
