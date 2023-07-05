import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateActionModel } from 'src/app/models/action-models/create-action';
import { GetActionGroupModel } from 'src/app/models/action-models/get-action-group-model';
import { GetStoreModel } from 'src/app/models/action-models/get-stores-model';
import { ActionService } from 'src/app/services/action-service/action.service';
import { TokenService } from 'src/app/services/token-service/token.service';

export interface eftSelect {
  id: number,
  name: string
}
export interface Days {
  name: string,
  selected: boolean,
  subDays?: Days[]
}

export interface Stores {
  name: string,
  selected: boolean,
  store?: GetStoreModel[]
}
@Component({
  selector: 'app-create-action-dialog',
  templateUrl: './create-action-dialog.component.html',
  styleUrls: ['./create-action-dialog.component.scss']
})
export class CreateActionDialogComponent implements OnInit {

  days: Days = {
    name: 'Выбрать все',
    selected: true,
    subDays: [
      { name: 'Понедельник', selected: true },
      { name: 'Вторник', selected: true },
      { name: 'Среда', selected: true },
      { name: 'Четверг', selected: true },
      { name: 'Пятница', selected: true },
      { name: 'Суббота', selected: true },
      { name: 'Воскресенье', selected: true },
    ],
  };
  storeList: GetStoreModel[] = []
  stores: Stores

  selectedAllStores: boolean = true
  constructor(private actionService: ActionService, private tokenService: TokenService, private dialogRef: MatDialogRef<string>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  algorithm: eftSelect[] = [
    { id: 7, name: 'на товары с заданным свойством для зарегистрированного клиента' },
    { id: 15, name: 'на штрихкод' },
    { id: 16, name: 'на чек для зарегистрированного клиента' },
    { id: 19, name: 'на классификатор и артикул' },
    { id: 108, name: 'скидка на чек по времени и сумме' }
  ]
  selectedAlgorithm: number = 19
  showDaySelecter: boolean = false
  showStoreSelecter: boolean = false
  allComplete: boolean = true;
  actionName: string
  selectedDateFrom = new Date()
  selectedDateTo = new Date()
  nowFormattedFrom: string
  nowFormattedTo: string
  ngOnInit(): void {
    this.getStore()
  }

  //#region checkBoxsSettings
  updateAllComplete() {
    this.allComplete = this.days.subDays != null && this.days.subDays.every(t => t.selected);
  }
  someComplete(): boolean {
    if (this.days.subDays == null) {
      return false;
    }
    return this.days.subDays.filter(t => t.selected).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.days.subDays == null) {
      return;
    }
    this.days.subDays.forEach(t => (t.selected = completed));
  }

  updateAllComplete1() {
    this.selectedAllStores = this.stores.store != null && this.stores.store.every(t => t.selected);
  }
  someComplete1(): boolean {
    if (this.stores.store == null) {
      return false;
    }
    return this.stores.store.filter(t => t.selected).length > 0 && !this.selectedAllStores;
  }

  setAll1(completed: boolean) {
    this.selectedAllStores = completed;
    if (this.stores.store == null) {
      return;
    }
    this.stores.store.forEach(t => (t.selected = completed));
  }
  //#endregion

  getStore() {
    this.actionService.GetStore(new GetActionGroupModel(this.tokenService.getToken())).subscribe({
      next: result => {
        console.log(result)
        this.storeList = result
        this.stores = {
          name: 'Выбрать все',
          selected: true,
          store: this.storeList
        }
      },
      error: error => {
        console.log(error)
      }
    })
  }

  createAction() {
    let day: number[] = []
    this.days.subDays?.forEach(x => {
      if (x.selected === true)
        day.push(1)
      else
        day.push(0)
    })
    let stores: number[] = []
    this.stores.store?.forEach(x => {
      if (x.selected == true)
        stores.push(+x.id)
    })
    this.nowFormattedFrom = formatDate(this.selectedDateFrom, 'dd.MM.yyyy', 'en-US');
    this.nowFormattedTo = formatDate(this.selectedDateTo, 'dd.MM.yyyy', 'en-US');
    const action = new CreateActionModel(this.tokenService.getToken(), this.actionName, String(this.selectedAlgorithm), this.nowFormattedFrom, this.nowFormattedTo, '', '', day[0], day[1], day[2], day[3], day[4], day[5], day[6], stores)
    this.actionService.CreateAction(action).subscribe({
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
