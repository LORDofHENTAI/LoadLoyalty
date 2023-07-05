import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginQuery } from 'src/app/models/login-query';
import { LoginModel } from 'src/app/models/login-model';
import { LoginResponse } from 'src/app/models/login-response';
import { Logout } from 'src/app/models/logout';
import { Status } from 'src/app/models/status';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlLogin = environment.apiUrl + '/Login/'; //адрес для логинизации
  private urlLogout = environment.apiUrl + '/Logout/'; //адрес для логаута


  constructor(private http: HttpClient) { }

  getLogin(login: LoginQuery): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.urlLogin}`, login);
  }

  postLogout(login: Logout): Observable<Status> {
    console.log(login)
    return this.http.post<Status>(`${this.urlLogout}`, login);
  }
}
