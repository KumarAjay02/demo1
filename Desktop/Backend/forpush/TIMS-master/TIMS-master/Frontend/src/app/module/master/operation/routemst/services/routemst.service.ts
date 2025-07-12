import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RouteMaster } from '../model/routemst.model';
 
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { ApiResponse } from '../../../../../shared/model/ApiResponseMsg';
 

@Injectable({
  providedIn: 'root'
})
export class RoutemstService {


  private resourseUrl=environment.apiUrl+'/api/RouteMaster';
 private http=inject(HttpClient);


 GetRouteList():Observable<ApiResponse<RouteMaster[]>|undefined>{
return this.http.get<ApiResponse<RouteMaster[]>>(
  `${this.resourseUrl}`)
 }

 GetSingleRoute(id:string):Observable<ApiResponse<RouteMaster[] |undefined>>{
  return this.http.get<ApiResponse<RouteMaster[]>>(`${this.resourseUrl}/${id}`)
 }

 CreateRoute(data:RouteMaster):Observable<ApiResponse<RouteMaster>>{
  return this.http.post<ApiResponse<RouteMaster>>(this.resourseUrl,data)
 }

 update(id:any,data:RouteMaster):Observable<ApiResponse<RouteMaster>>{
  return this.http.put<ApiResponse<RouteMaster>>(`${this.resourseUrl}/${id}`,data)
 }

 Delete(id:any):Observable<ApiResponse<RouteMaster>>{
  return this.http.delete<ApiResponse<RouteMaster>>(`${this.resourseUrl}/${id}`)
 }






   

   
}
