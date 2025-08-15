import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../../services/api';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-activity-participants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activity-participants.html',
  styleUrls: ['./activity-participants.css']
})
export class ActivityParticipants implements OnInit {

  activityId!: number;
  activity: any = null;
  user: any = null;
  msg = '';

  constructor(
    private api: Api,
    private auth: Auth,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.auth.currentUser();
    this.activityId = Number(this.route.snapshot.paramMap.get('id')); // Route'dan id al
    this.loadActivity();
    console.log('ActivityParticipants Yüklendi, ID:', this.activityId);
  }

  loadActivity() {
    if (!this.activityId) return;
    this.api.getActivity(this.activityId).subscribe({
      next: (res: any) => this.activity = res,
      error: (err) => console.error('Activity load error:', err)
    });
  }

  join() {
    if (!this.user) {
      this.msg = 'Önce giriş yapmalısınız';
      return;
    }
    this.api.addParticipant(this.activity.id, this.user.id).subscribe({
      next: (res: any) => {
        this.activity = res;
        this.msg = 'Katıldınız.';
      },
      error: (err) => {
        console.error('Join error:', err);
        this.msg = 'Katılım sırasında hata oluştu';
      }
    });
  }

  leave() {
    if (!this.user) {
      this.msg = 'Önce giriş yapmalısınız';
      return;
    }
    this.api.removeParticipant(this.activity.id, this.user.id).subscribe({
      next: (res: any) => {
        this.activity = res;
        this.msg = 'Ayrıldınız.';
      },
      error: (err) => {
        console.error('Leave error:', err);
        this.msg = 'Ayrılma sırasında hata oluştu';
      }
    });
  }

  isParticipant(userId: number): boolean {
    if (!this.activity || !this.activity.participants) return false;
    return this.activity.participants.some((p: any) => p.id === userId);
  }
}
