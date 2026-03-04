import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-activity-participants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activity-participants.html',
  styleUrls: ['./activity-participants.css']
})
export class ActivityParticipants implements OnInit {

  @Input() activityId!: number;   // Parent componentten gelen aktivite ID
  @Input() isAdmin!: boolean;     // Admin kontrolü parent componentten

  activity: any = null;
  users: any[] = [];              // Tüm kullanıcılar
  selectedUserId!: number;        // Seçilen kullanıcı ID
  msg = '';
  showUsers: boolean = false;     
  currentUserId!: number;         

  constructor(private api: Api) {}

  ngOnInit(): void {
    if (!this.activityId) return;

    this.loadActivity();

    if (this.isAdmin) {
      // Tüm kullanıcıları al
      this.api.getUsers().subscribe({
        next: res => this.users = res,
        error: err => console.error('Users load error:', err)
      });

      // TODO: Auth servisinden admin ID al
      this.currentUserId = Number(localStorage.getItem("userId")) || 1;
    }
  }

  // Aktiviteyi yenile
  private loadActivity() {
    this.api.getActivity(this.activityId).subscribe({
      next: res => this.activity = res,
      error: err => console.error('Activity load error:', err)
    });
  }

  // Kullanıcı ekle/davet et
  inviteUser() {
    if (!this.selectedUserId) return alert('Lütfen bir kullanıcı seçin');

    this.api.sendActivityInvite(this.activity.id, this.selectedUserId, this.currentUserId).subscribe({
      next: () => {
        this.msg = 'Katılımcı ekleme isteği gönderildi ✅';
        this.loadActivity(); 
      },
      error: err => {
        console.error('Hata:', err);
        this.msg = 'İstek gönderilirken hata oluştu ❌';
      }
    });
  }

  // Kullanıcı çıkar
  removeUser(userId: number) {
    this.api.removeParticipant(this.activity.id, userId, this.currentUserId).subscribe({
      next: () => {
        this.msg = 'Kullanıcı aktiviteden çıkarıldı ✅';
        this.loadActivity(); // Listeyi yenile
      },
      error: err => {
        console.error('Remove participant error:', err);
        this.msg = 'Kullanıcı çıkarma sırasında hata oluştu ❌';
      }
    });
  }
}
