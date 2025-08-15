import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './activity-list.html',
  styleUrl: './activity-list.css'
})
export class ActivityList implements OnInit{
  activities: any[] = [];

  constructor(private api: Api, private router: Router){}

  ngOnInit(): void {
        this.api.getActiveActivities().subscribe((res:any) => this.activities = res);
  }

  open(a: any){
    this.router.navigate(['/activities',a.id]);
  }

}
