import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;
  num: number=0;

  constructor(private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router) { }

  login(email,password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(logRef => {
      this.toastr.success('Logged In Successfully..');
      this.loadUser();

      this.loggedIn.next(true);
      this.isLoggedInGuard= true;

      this.router.navigate(['/']);
    }).catch(e => {
      this.toastr.warning('Invalid Credentials!..');
    });
  }

  loadUser() {
    this.afAuth.authState.subscribe(user => {

      localStorage.setItem('user', JSON.stringify(user));

    });
  }

  logOut() {
    this.afAuth.auth.signOut().then(() => {
      this.toastr.success('User Logged Out Successfully..');
      localStorage.removeItem('user');

      this.loggedIn.next(false);
      this.isLoggedInGuard = false;

      this.router.navigate(['/login']);
    });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  cameToLoginPage() {
    this.loggedIn.next(false);
    this.isLoggedInGuard = false;
    localStorage.removeItem('user');
  }

  count(num) {
    this.num;
  }

}
