import { Component, Inject, OnInit } from '@angular/core';
import { ActionService } from 'src/app/services/action-service/action.service';
import { SnakeBarService } from 'src/app/services/snake-bar-service/snake-bar.service';
import { TokenService } from 'src/app/services/token-service/token.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateActionDialogComponent } from '../create-action-dialog/create-action-dialog.component';
import { DiscountMdel } from 'src/app/models/action-models/discoun-model';
import { GetActionGroupModel } from 'src/app/models/action-models/get-action-group-model';
import { ActionGroupModel } from 'src/app/models/action-models/action-group-model';
import { ActionGroupRequest } from 'src/app/models/action-models/action-group-request';
import { DeleteActionRequest } from 'src/app/models/action-models/delete-action-request';
import { LoadActionModel } from 'src/app/models/action-models/load-action';
import { GetActionItemsModel } from 'src/app/models/action-models/get-action-items-model';
import { ActionItemsModel } from 'src/app/models/action-models/action-items-model';
import { LoadExcelRequestModel } from 'src/app/models/action-models/load-excel-request-model';
@Component({
  selector: 'app-loyalty-load',
  templateUrl: './loyalty-load.component.html',
  styleUrls: ['./loyalty-load.component.scss']
})
export class LoyaltyLoadComponent implements OnInit {

  constructor(private actionService: ActionService, private tokenService: TokenService, private snackBarService: SnakeBarService, public dialog: MatDialog) { }

  discouts: DiscountMdel[]
  groups: ActionGroupModel[]
  group: string
  percent: string

  selectedFiles: File[];
  selectedFile: File;
  selectedFileName: string = 'Выберите файл';

  selectFile(event: any): void {
    this.selectedFileName = '';
    this.selectedFiles = event.target.files;
    this.selectedFileName = this.selectedFiles[0].name;
    this.selectedFile = this.selectedFiles[0];
  }

  ngOnInit(): void {
    this.getDiscounts()
    this.getGroups()
    console.log(this.tokenService.getToken())
  }

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  messageFailLogin = 'Вход не разрешен, имя или пароль неверны.';
  messageStatusTrue = 'Ваша сообщение в обработке.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';


  sendFile() {
    this.actionService.ActionFromExcel(new LoadExcelRequestModel(this.tokenService.getToken(), this.selectedFile)).subscribe({
      next: result => {
        if (result.status === "true") {
          this.snackBarService.openSnackBar('Группы загружены', this.action)
          this.getGroups()
        }
      },
      error: error => {
        console.log(error);
        this.snackBarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      }
    })
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateActionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      switch (result) {
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
          this.snackBarService.openSnackBar('Группы добавлены в акцию', this.action)
          this.getDiscounts();
          break
      }
    });
  }

  openLoadDialog() {
    const dialogRef = this.dialog.open(LoyaltyLoadDioalogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      switch (result) {
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
          this.snackBarService.openSnackBar('Группы добавлены в акцию', this.action)
          break
      }
    });
  }

  getDiscounts() {
    this.actionService.GetAllAction(new GetActionGroupModel(this.tokenService.getToken())).subscribe({
      next: result => {
        this.discouts = result
        console.log(this.discouts)
      },
      error: error => {
        console.log(error)
        this.snackBarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      }
    })
  }
  getGroups() {
    this.actionService.GetActionGroup(new GetActionGroupModel(this.tokenService.getToken())).subscribe({
      next: result => {
        this.groups = result;
      },
      error: error => {
        console.log(error)
      }
    })
  }

  addGroup() {
    if (!this.selectedFile) {
      this.actionService.AddActionGroup(new ActionGroupRequest(this.tokenService.getToken(), this.group, String(this.percent))).subscribe({
        next: result => {
          switch (result.status) {
            case 'BadAuth':
              this.snackBarService.openSnackBar('Токен недействителен', this.action, this.styleNoConnect)
              break
            case 'error':
              this.snackBarService.openSnackBar('Ошибка', this.action, this.styleNoConnect)
              break
            case 'null':
              this.snackBarService.openSnackBar('Группа не найдена', this.action, this.styleNoConnect)
              break
            case 'true':
              this.snackBarService.openSnackBar('Группа добавлена', this.action)
              this.getGroups()
              break
          }
        },
        error: error => {
          console.log(error)
          this.snackBarService.openSnackBar('Ошибка', this.action, this.styleNoConnect)
        }
      })
    } else {
      this.sendFile();
    }
  }

  deleteGroup(element: number) {
    this.actionService.DeleteAction(new DeleteActionRequest(element, this.tokenService.getToken())).subscribe({
      next: result => {
        switch (result.status) {
          case 'BadAuth':
            this.snackBarService.openSnackBar('Токен недействителен', this.action, this.styleNoConnect)
            break
          case 'error':
            this.snackBarService.openSnackBar('Ошибка', this.action, this.styleNoConnect)
            break
          case 'null':
            this.snackBarService.openSnackBar('Группа не найдена', this.action, this.styleNoConnect)
            break
          case 'true':
            this.snackBarService.openSnackBar('Запись удалена', this.action)
            this.getGroups()
            break
        }
      },
      error: error => {
        console.log(error)
        this.snackBarService.openSnackBar('Ошибка', this.action, this.styleNoConnect)
      }
    })
  }

  deleteAllGroups() {
    this.actionService.DeleteAllAction(new GetActionGroupModel(this.tokenService.getToken())).subscribe({
      next: result => {
        switch (result.status) {
          case 'BadAuth':
            this.snackBarService.openSnackBar('Токен недействителен', this.action, this.styleNoConnect)
            break
          case 'error':
            this.snackBarService.openSnackBar('Ошибка', this.action, this.styleNoConnect)
            break
          case 'null':
            this.snackBarService.openSnackBar('Группа не найдена', this.action, this.styleNoConnect)
            break
          case 'true':
            this.snackBarService.openSnackBar('Таблица очищена', this.action)
            this.getGroups()
            break
        }
      },
      error: error => {
        console.log(error)
      }
    })
  }
  ationItems: ActionItemsModel[]
  showActionInfo: string = '';
  idElem: string = ''
  showInfo(element: any) {
    this.actionService.GetActionItems(new GetActionItemsModel(this.tokenService.getToken(), element)).subscribe({
      next: result => {
        this.ationItems = result
      },
      error: error => {
        console.log(error)
      }
    })
    this.showActionInfo = element
    this.idElem = element
  }
  hideInfo(element: any) {
    this.showActionInfo = '';
  }
  actionDelete(element: string) {
    this.actionService.DeleteActionUkm(new DeleteActionRequest(Number(element), this.tokenService.getToken())).subscribe({
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
            this.snackBarService.openSnackBar('Акция удалена', this.action)
            break
        }
      },
      error: error => {
        console.log(error)
        this.snackBarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect)
      }
    })
  }

}

@Component({
  selector: 'load-group-dialog',
  templateUrl: './dialog/load-group-dialog.html',
  styleUrls: ['./loyalty-load.component.scss']
})
export class LoyaltyLoadDioalogComponent implements OnInit {

  constructor(private actionService: ActionService, private tokenService: TokenService, private dialogRef: MatDialogRef<string>, @Inject(MAT_DIALOG_DATA) public data: any,) { }
  ngOnInit(): void {

  }

  actionId: number

  loadAction() {
    this.actionService.LoadAction(new LoadActionModel(this.tokenService.getToken(), this.actionId)).subscribe({
      next: result => {
        this.dialogRef.close(result.status)
      },
      error: error => {
        console.log(error)
        this.dialogRef.close('error')
      }
    })
  }

}
