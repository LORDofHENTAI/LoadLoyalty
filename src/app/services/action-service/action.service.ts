import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from 'src/app/models/status';
import { ActionGroupRequest } from 'src/app/models/action-models/action-group-request';
import { ActionGroupModel } from 'src/app/models/action-models/action-group-model';
import { GetActionGroupModel } from 'src/app/models/action-models/get-action-group-model';
import { DeleteActionRequest } from 'src/app/models/action-models/delete-action-request';
import { LoadActionModel } from 'src/app/models/action-models/load-action';
import { CreateActionModel } from 'src/app/models/action-models/create-action';
import { DiscountMdel } from 'src/app/models/action-models/discoun-model';
import { GetStoreModel } from 'src/app/models/action-models/get-stores-model';
import { GetActionItemsModel } from 'src/app/models/action-models/get-action-items-model';
import { ActionItemsModel } from 'src/app/models/action-models/action-items-model';
import { LoadExcelRequestModel } from 'src/app/models/action-models/load-excel-request-model';
@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private http: HttpClient) { }
  addActionGroupUrl = environment.apiUrl + '/AddAction/'
  getActionGroupUrl = environment.apiUrl + '/GetActionGroup/'
  deleteActionUrl = environment.apiUrl + '/DeleteAction/'
  deleteAllActionUrl = environment.apiUrl + '/DeleteAllAction/'
  loadActionUrl = environment.apiUrl + '/LoadAction/'
  createAction = environment.apiUrl + '/CreateAction/'
  getAllAction = environment.apiUrl + '/GetAllAction/'
  getStores = environment.apiUrl + '/GetStore/'
  getActionItemsUrl = environment.apiUrl + '/GetActionItems/'
  deleteActionUkmUrl = environment.apiUrl + '/DeleteActionUkm/'
  actionFromExcelURL = environment.apiUrl + '/ActionFromExcel/'

  AddActionGroup(data: ActionGroupRequest): Observable<Status> {
    console.log(data);
    return this.http.post<Status>(this.addActionGroupUrl, data)
  }
  GetActionGroup(data: GetActionGroupModel): Observable<ActionGroupModel[]> {
    return this.http.post<ActionGroupModel[]>(this.getActionGroupUrl, data)
  }
  DeleteAction(data: DeleteActionRequest): Observable<Status> {
    return this.http.post<Status>(this.deleteActionUrl, data)
  }
  DeleteAllAction(data: GetActionGroupModel): Observable<Status> {
    return this.http.post<Status>(this.deleteAllActionUrl, data)
  }
  LoadAction(data: LoadActionModel): Observable<Status> {
    return this.http.post<Status>(this.loadActionUrl, data)
  }
  CreateAction(data: CreateActionModel): Observable<Status> {
    return this.http.post<Status>(this.createAction, data)
  }
  GetAllAction(data: GetActionGroupModel): Observable<DiscountMdel[]> {
    return this.http.post<DiscountMdel[]>(this.getAllAction, data)
  }
  GetStore(data: GetActionGroupModel): Observable<GetStoreModel[]> {
    return this.http.post<GetStoreModel[]>(this.getStores, data)
  }
  GetActionItems(data: GetActionItemsModel): Observable<ActionItemsModel[]> {
    return this.http.post<ActionItemsModel[]>(this.getActionItemsUrl, data)
  }
  DeleteActionUkm(data: DeleteActionRequest): Observable<Status> {
    return this.http.post<Status>(this.deleteActionUkmUrl, data)
  }
  ActionFromExcel(data: LoadExcelRequestModel): Observable<Status> {
    let input = new FormData();
    input.append("token", data.token);
    input.append("file", data.file);
    return this.http.post<Status>(this.actionFromExcelURL, input)
  }
}
