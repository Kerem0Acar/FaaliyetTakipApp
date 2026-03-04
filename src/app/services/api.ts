import { HttpClient, HttpParams } from '@angular/common/http';
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

  createActivity(activity: any, adminId: number): Observable<any> {
  if (!activity.category || isNaN(Number(activity.category.id))) {
    throw new Error("Geçersiz kategori ID");
  }
  return this.http.post(`${API}/activities/create?adminId=${adminId}`, activity);
}

  deleteActivity(activityId: string): Observable<any> {
    return this.http.delete(`${API}/activities/${activityId}`);
  }

  getActiveActivities(){return this.http.get(`${API}/activities/active`);}
  getActivity(id:number){return this.http.get(`${API}/activities/${id}`);}
  
  addParticipant(activityId: number, userId: number){
  return this.http.post(
    `http://localhost:8080/api/activities/${activityId}/addParticipant/${userId}`, {}
  );
}
  removeParticipant(activityId: number, userId: number, adminId: number) {
  return this.http.delete(
    `${API}/activities/${activityId}/removeParticipant/${userId}?adminId=${adminId}`
  );
}


 getActivityById(id: number): Observable<any> {
    if (isNaN(id)) throw new Error("Geçersiz ID");
    return this.http.get(`${API}/activities/${id}`);
  }


getUsers() {
  return this.http.get<User[]>(`${API}/auth/users`);
}

getParticipants(activityId: number) {
  return this.http.get<any[]>(`${API}/activities/${activityId}/participants`);
}

getNotifications(userId: number): Observable<any[]> {
  return this.http.get<any[]>(`${API}/notifications/${userId}`);
}

respondNotification(notificationId: number, response: 'ACCEPT' | 'REJECT'): Observable<any> {
    const accept = response === 'ACCEPT'; 
    
    const params = new HttpParams().set('accept', accept.toString());

    
    return this.http.post(`${API}/notifications/${notificationId}/respond`, null, { params });
  }

sendNotification(adminId: number, userId: number, activityId: number, message: string) {
  return this.http.post(`${API}/notifications/send?adminId=${adminId}&userId=${userId}&activityId=${activityId}`, message);
}

sendActivityInvite(activityId: number, userId: number, adminId: number) {
  return this.http.post(
    `${API}/activities/${activityId}/invite?userId=${userId}&adminId=${adminId}`,
    {}, // boş body
    { responseType: 'text' }   // <--- önemli
  );
}



}
