import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private currentUserSubject = new BehaviorSubject<any>(this.loadUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private api: Api){}

  register(u:any){
    return this.api.register(u)
  }

  login(u:any){
    return this.api.login(u)
  }

  saveUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSubject.next(user); // reactive güncelleme
  }

  private loadUser(){
    const s = localStorage.getItem('user');
    return s ? JSON.parse(s) : null;
  }

  currentUser() {   // ✅ eski metodu geri ekledik
    return this.currentUserSubject.value;
  }

  isAdmin(){
    const user = this.currentUser();
    return user && user.role === 'ADMIN';
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSubject.next(null); // reactive logout
  }

  getCurrentUser() { // yeni versiyon
    return this.currentUserSubject.value;
  }
}
