import { Component } from '@angular/core';
import { Auth } from './services/auth';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  template: `
    <div style="padding:20px;">
      <h1>Faaliyet Takip Uygulaması</h1>
      <nav>
        <a routerLink="/activities">Aktif Aktiviteler</a> |
        <a routerLink="/activities/create">Aktivite Ekle</a> |
        <a routerLink="/categories">Kategori Ekle</a> |
        <a routerLink="/register">Kayıt</a> |
        <a routerLink="/login">Giriş</a>
      </nav>
      <hr/>
      <div *ngIf="user">
        Hoşgeldin: {{ user.fullName || user.username }}
        <button (click)="logout()">Çıkış</button>
      </div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  user: any;

  constructor(public auth: Auth) {
    this.user = auth.currentUser();
  }

  logout() {
    this.auth.logout();
    location.reload();
  }
}
