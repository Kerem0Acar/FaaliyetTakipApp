import { ActivatedRoute } from "@angular/router";
import { Api } from "../../services/api";
import { Auth } from "../../services/auth";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivityParticipants } from "../activity-participants/activity-participants";

@Component({
  selector: 'app-activity-detail',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ActivityParticipants
  ],
  templateUrl: './activity-detail.html',
  styleUrls: ['./activity-detail.css']
})
export class ActivityDetail implements OnInit {
  activityId!: number;
  activity: any = null;
  user: any = null;
  msg = '';

  constructor(private route: ActivatedRoute, private api: Api, private auth: Auth){}

  ngOnInit(): void {
    this.user = this.auth.currentUser();
    this.route.params.subscribe(params => {
      this.activityId = Number(params['id']);
      this.loadActivity();
    });
  }

  join(){
    if(!this.user){ this.msg = 'Önce giriş yapmalısınız'; return; }
    if(!this.activity || !this.activity.id) { this.msg = "Aktivite seçili değil"; return; }

    this.api.addParticipant(this.activity.id, this.user.id).subscribe({
      next: (res:any) => { this.activity = res; this.msg = 'Katılım sağlandı.'; },
      error: e => this.msg = "Hata: " + (e.error || e.statusText)
    });
  }

  loadActivity() {
    if (!this.activityId) return;
    this.api.getActivity(this.activityId).subscribe({
      next: (res: any) => this.activity = res,
      error: (err) => console.error('Activity load error:', err)
    });
  }

  leave(){
    if(!this.user){ this.msg = 'Önce giriş yapmalısınız.'; return; }
    if(!this.activity || !this.activity.id) { this.msg = "Aktivite seçili değil"; return; }

    this.api.removeParticipant(this.activity.id, this.user.id).subscribe({
      next: (res:any) => { this.activity = res; this.msg = 'Ayrıldınız.'; },
      error: e => this.msg = 'Hata: ' + (e.error || e.statusText)
    });
  }
}
