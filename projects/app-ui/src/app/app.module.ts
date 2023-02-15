import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ApiModule } from 'projects/app-api/src/api.module';
import { BASE_PATH } from 'projects/app-api/src/variables';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';
import { ShellModule } from './shell/shell.module';

// export function createTranslateLoader(http: HttpClient) {
// 	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

export function HttpLoaderFactory(_httpBackend: HttpBackend) {
	return new MultiTranslateHttpLoader(_httpBackend, ['/assets/i18n/core/', '/assets/i18n/shared/']);
}

export function initAppAuthenticationService(authService: AuthService) {
	return () => authService.autoLogin();
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpBackend]
			}
		}),
		BrowserAnimationsModule,
		AppRoutingModule,
		ApiModule,
		HttpClientModule,
		ShellModule
	],
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
