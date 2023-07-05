import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token-service/token.service';
import { ActionService } from 'src/app/services/action-service/action.service';
import { environment } from 'src/app/environments/environment';
import { LoginService } from 'src/app/services/login-service/login.service';
import { Logout } from 'src/app/models/logout';
import { SnakeBarService } from 'src/app/services/snake-bar-service/snake-bar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoginUser = false;
  userName = '';
  isAdminIshop = false;


  messageNoConnect = 'Нет соединения, попробуйте позже.';
  messageFailLogin = 'Вход не разрешен, имя или пароль неверны.';
  messageStatusTrue = 'Ваша сообщение в обработке.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';


  constructor(
    private router: Router,
    private tokenService: TokenService,
    private loginService: LoginService,
    private snackBarService: SnakeBarService
  ) {
    this.tokenService.events$.forEach(value => { this.eventLogin(value) });
  }
  ngOnInit(): void {
    if (this.tokenService.isLoginUser()) {
      this.isLoginUser = true;
      this.userName = this.tokenService.getLogin();
      // this.router.navigate(['/orders']);
    }
    else {
      this.isLoginUser = false;
      this.router.navigate(['/login']);
    }
  }

  eventLogin(event: boolean) {
    if (event === true)
      this.isLoginUser = event;
    else {
      this.isLoginUser = event;
      this.router.navigate(['/login']);
    }
  }

  onClickLogout() {
    this.loginService.postLogout(new Logout(this.tokenService.getLogin(), this.tokenService.getToken())).subscribe({
      next: result => {

        switch (result.status) {
          case 'BadAuth':
            this.snackBarService.openSnackBar('Токен недействителен', this.action, this.styleNoConnect)
            break
          case 'error':
            this.snackBarService.openSnackBar('Ошибка', this.action, this.styleNoConnect)
            break
          case 'null':
            this.snackBarService.openSnackBar('Таблица пуста', this.action, this.styleNoConnect)
            break
          case 'true':
            this.snackBarService.openSnackBar('Выход из учетной записи', this.action)
            localStorage.clear();
            this.tokenService.deleteCookie();
            this.isLoginUser = false;
            this.router.navigate(['/login']);
            break
        }
      },
      error: error => {
        console.log(error);
        this.snackBarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    })
  }
}
