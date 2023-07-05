import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token-service/token.service';
import { LoginQuery } from 'src/app/models/login-query';
import { LoginModel } from 'src/app/models/login-model';
import { LoginResponse } from 'src/app/models/login-response';
import { SnakeBarService } from 'src/app/services/snake-bar-service/snake-bar.service';
import { LoginService } from 'src/app/services/login-service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoginUser = false;
  loginQuery = new LoginQuery("", "");

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  messageFailLogin = 'Вход не разрешен, имя или пароль неверны.';
  messageStatusTrue = 'Ваша сообщение в обработке.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';


  constructor(private router: Router,
    private titleService: Title,
    private loginService: LoginService,
    private tokenService: TokenService,
    private snackbarService: SnakeBarService) {
  }
  ngOnInit(): void {
    this.titleService.setTitle('Load Action');
  }

  loadingShow: boolean = false
  onClickLogin() {
    this.loadingShow = true
    this.loginService.getLogin(this.loginQuery).subscribe({
      next: response => {
        this.loadingShow = false
        if (this.checkResponse(response)) {
          if (response.adminCount === '1') {
            this.tokenService.setCookie(response);
            this.tokenService.logEvent(true);
            this.snackbarService.openSnackBar('Успешная авторизация', this.action);

            this.router.navigate(['loyalty/load']);
          } else
            this.snackbarService.openSnackBar('Доступ запрещен', this.action, this.styleNoConnect);
        }
        else
          this.snackbarService.openSnackBar(this.messageFailLogin, this.action, this.styleNoConnect);
      },
      error: error => {
        console.log(error);
        this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      }
    });
  }

  checkResponse(response: LoginResponse): boolean {
    if (response)
      if (response.token)
        if (response.token.length > 0)
          return true;
        else return false;
      else return false;
    else return false;
  }

}
