import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(
		_route: ActivatedRouteSnapshot,
		_state: RouterStateSnapshot
	): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
		return this.authService.user$.pipe(
			take(1),
			map((user) => {
				const isAuth = !!user;

				if (isAuth) {
					return true;
				} else {
					this.router.navigate(['/auth']);

					return false;
				}
			})
		);
	}
}
