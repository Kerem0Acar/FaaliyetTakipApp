import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './notification.html',
  styleUrls: ['./notification.css']
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];       // Bildirimleri array olarak tut
  currentUser: any;                // Şu anki kullanıcı
  dropdownOpen = false;

  constructor(private api: Api) {}

  ngOnInit(): void {
    // LocalStorage'dan kullanıcı bilgilerini al
this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');  }

  // Bildirimleri yükle
  loadNotifications(): void {
    if (!this.currentUser?.id) return;
    this.api.getNotifications(this.currentUser.id).subscribe({
      next: (n: any[]) => this.notifications = n,
      error: err => console.error('Bildirim yüklenemedi:', err)
    });
  }

  // Bildirime yanıt ver (accept: true ise kabul, false ise reddet)
  respond(notificationId: number, accept: boolean): void {
  const response = accept ? 'ACCEPT' : 'REJECT';
  this.api.respondNotification(notificationId, response).subscribe({
    next: () => this.loadNotifications(),
    error: err => console.error('Cevap gönderilemedi:', err)
  });
}

private subscribeToInvites() {
  // Sadece admin kullanıcılar için çalışır
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event: MessageEvent) => {
      const data = event.data;
      if (data && data.type === 'NEW_INVITE') {
        console.log('Yeni davet geldi:', data);
        this.loadNotifications(); // Yeni davet geldiğinde listeyi yenile
      }
    });
  }
}

  toggleDropdown(): void {
  this.dropdownOpen = !this.dropdownOpen;
  
  if (this.dropdownOpen) {
    // Dropdown açıldığında bildirimleri yeniden yükle
    this.loadNotifications();
  }
}

  get pendingCount(): number {
    return this.notifications.filter(n => n.status === 'PENDING').length;
  }



}
