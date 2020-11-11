import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../interfaces/user";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userSubject$: BehaviorSubject<User>;
  user$: Observable<User>;
  constructor(private http: HttpClient) {
    this.userSubject$ = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser")) || {}
    );
    this.user$ = this.userSubject$.asObservable();
  }

  public get currentUserValue(): User {
    return this.userSubject$.value;
  }
  login(login: string, password: string): Observable<any> {
    return this.http
      .post<any>(`login`, { login, password })
      .pipe(
        map((user) => {
          localStorage.setItem("currentUser", JSON.stringify(user.token));
          this.userSubject$.next(user);
          return user;
        })
      );
  }
  logout() {
    localStorage.removeItem("currentUser");
    this.userSubject$.next(null);
  }
}
