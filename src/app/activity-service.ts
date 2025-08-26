import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = 'http://localhost:8080/api/activities';

  constructor(private http: HttpClient) {}

  // Katılımcıları getir
  getParticipants(activityId: number, adminId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${activityId}/participants?adminId=${adminId}`);
  }

  // Katılımcı ekle
  addParticipant(activityId: number, userId: number, adminId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${activityId}/addParticipant/${userId}?adminId=${adminId}`, {});
  }

  // Katılımcı çıkar
  removeParticipant(activityId: number, userId: number, adminId: number) {
  return this.http.delete(
    `${this.apiUrl}/activities/${activityId}/removeParticipant/${userId}?adminId=${adminId}`
  );
}

}
