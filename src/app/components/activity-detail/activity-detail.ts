import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityParticipants } from '../activity-participants/activity-participants';
import { Auth } from '../../services/auth'; // Auth servisini buraya ekleyin

@Component({
  selector: 'app-activity-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ActivityParticipants],
  templateUrl: './activity-detail.html',
  styleUrls: ['./activity-detail.css']
})
export class ActivityDetail implements OnInit {
  activity: any = null;
  currentUser: any = null;
  isAdmin: boolean = false; // isAdmin değişkenini ekleyin

  constructor(private route: ActivatedRoute, private api: Api, private auth: Auth) {} // Auth servisini enjekte edin

  ngOnInit(): void {
    // Kullanıcı verisini doğru anahtarla ve Auth servisinden alın
    this.currentUser = this.auth.currentUser();
    this.isAdmin = this.auth.isAdmin(); // isAdmin durumunu buradan alın

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getActivity(id).subscribe((res:any) => this.activity = res);
  }
}