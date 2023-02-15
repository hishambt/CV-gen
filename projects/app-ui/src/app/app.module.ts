import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiModule } from 'projects/app-api/src/api.module';
import { BASE_PATH } from 'projects/app-api/src/variables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';
import { ShellModule } from './shell/shell.module';

export function initAppAuthenticationService(authService: AuthService) {
	return () => authService.autoLogin();
}

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, ApiModule, HttpClientModule, ShellModule],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: initAppAuthenticationService,
			deps: [AuthService],
			multi: true
		},
		{
			provide: BASE_PATH,
			useValue: `/assets/mock`
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
