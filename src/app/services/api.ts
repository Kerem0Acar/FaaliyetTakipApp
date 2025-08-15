import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
const API = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class Api {
  
  constructor(private http: HttpClient){}

  register(user:any){return this.http.post(`${API}/auth/register`, user);}

  login(user:any){return this.http.post(`${API}/auth/login`, user);}

  getCategories(): Observable<any> {
    return this.http.get(`${API}/categories`);
  }

  createCategory(category:any){return this.http.post(`${API}/categories`,category);}

  createActivity(activity: any): Observable<any> {
    if (!activity.category || isNaN(Number(activity.category.id))) {
      throw new Error("Geçersiz kategori ID");
    }
    return this.http.post(`${API}/activities`, activity);
  }
  
  getActiveActivities(){return this.http.get(`${API}/activities/active`);}
  getActivity(id:number){return this.http.get(`${API}/activities/${id}`);}
  
  addParticipant(activityId:number, userId:number){
    return this.http.post(`${API}/activities/${activityId}/addParticipant/${userId}`, {});
  }
  removeParticipant(activityId:number, userId:number){
    return this.http.delete(`${API}/activities/${activityId}/removeParticipant/${userId}`, {});
  }

 getActivityById(id: number): Observable<any> {
    if (isNaN(id)) throw new Error("Geçersiz ID");
    return this.http.get(`${API}/activities/${id}`);
  }


getUsers() {
  return this.http.get<User[]>(`${API}/users`);
}

getParticipants(activityId: number) {
  return this.http.get<any[]>(`${API}/activities/${activityId}/participants`);
}

}
