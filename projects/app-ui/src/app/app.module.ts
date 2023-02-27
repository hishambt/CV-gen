import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ApiModule } from 'projects/app-api/src/api.module';
import { BASE_PATH } from 'projects/app-api/src/variables';
import { HttpBackend, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';
import { ShellModule } from './shell/shell.module';
import { ServerHttpInterceptor } from './core/interceptors/server-http.interceptor';

export function HttpLoaderFactory(_httpBackend: HttpBackend) {
	return new MultiTranslateHttpLoader(_httpBackend, [
		'/assets/i18n/core/',
		'/assets/i18n/features/',
		'/assets/i18n/shared/',
		'/assets/i18n/shell/'
	]);
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
		ShellModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: true, // environment.production,
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000'
		})
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
			useValue: `https://administration-api.pilot.ecomz.local/api`
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ServerHttpInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
