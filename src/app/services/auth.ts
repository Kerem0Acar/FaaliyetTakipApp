import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  constructor(private api: Api){}
  register(u:any){
    return this.api.register(u)
  }

  login(u:any){
    return this.api.login(u)
  }

  saveUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  currentUser(){
    const s = localStorage.getItem('user');
    return s ? JSON.parse(s) : null;
  }

  isAdmin(){
    const user = this.currentUser();
    return user && user.role === 'ADMIN';
  }

  logout(){
    localStorage.removeItem('user');
  }
  
}
