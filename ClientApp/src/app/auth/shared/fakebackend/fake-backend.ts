import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";

import { User } from "../interfaces/user";

const users: User[] = [
  {
    name: "sveta",
    surname: "Vidova",
    login: "test",
    password: "test",
    email: "email@ukr.net",
    phone: "123456",
  },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (false) {
        case url.endsWith("/login") && method === "POST":
          return authenticate();
        case url.endsWith("/") && method === "GET":
          return getUsers();
        default:
          return next.handle(request);
      }
    }
    function authenticate() {
      const { login, password } = body;
      const user = users.find(
        (x) => x.login === login && x.password === password
      );
      if (!user) return error("Username or password is incorrect");
      return ok({
        login: user.login,
        name: user.name,
        surname: user.surname,
        token: "fake-jwt-token",
      });
    }
    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }
    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: "Unauthorised" } });
    }

    function isLoggedIn() {
      return headers.get("Authorization") === "Bearer fake-jwt-token";
    }
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
