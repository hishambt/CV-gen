import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private isAuthenticated = new BehaviorSubject<boolean>(false);
	isAuthenticated$ = this.isAuthenticated.asObservable();
}
