import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivityParticipants } from "../activity-participants/activity-participants";
import { Auth } from '../../services/auth';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ActivityParticipants
],
  templateUrl: './activity-list.html',
  styleUrl: './activity-list.css'
})
export class ActivityList implements OnInit{
  // Tüm aktiviteleri saklamak için bir değişken
  allActivities: any[] = [];
  // Görüntülenen aktiviteler için bir değişken
  activities: any[] = [];
  currentUser: any;
  isAdminUser: boolean = false;

  // Kategori filtreleme için yeni değişkenler
  categories: string[] = [];
  selectedCategory: string = 'Tüm Kategoriler';
  
  constructor(private api: Api, private router: Router,private auth: Auth){}

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser();
    this.isAdminUser = this.currentUser?.role?.toUpperCase() === 'ADMIN';
    this.api.getActiveActivities().subscribe((res:any) => {
      // Tüm aktiviteleri saklayalım ve görüntülenen aktivitelere atayalım.
      this.allActivities = res;
      this.activities = res;
      // Aktiviteler yüklendikten sonra kategorileri çıkar
      this.extractCategories();
    });
  }
  
  // Tüm aktiviteleri tekrar göstermek için bir metot
  showAllActivities(): void {
    this.selectedCategory = 'Tüm Kategoriler';
    this.activities = [...this.allActivities];
  }

  // Kategorileri dinamik olarak bir liste haline getiren metot
  extractCategories(): void {
    const uniqueCategories = new Set(this.allActivities.map(activity => activity.category?.name || 'Belirtilmemiş'));
    this.categories = ['Tüm Kategoriler', ...Array.from(uniqueCategories)];
  }

  // Kategori seçimine göre aktiviteleri filtreleyen metot
  filterByCategory(): void {
    if (this.selectedCategory === 'Tüm Kategoriler') {
      this.activities = [...this.allActivities];
    } else {
      this.activities = this.allActivities.filter(activity => 
        (activity.category?.name || 'Belirtilmemiş') === this.selectedCategory
      );
    }
  }

  // Bitiş tarihine 5 gün kalan aktiviteleri getiren metot
  getActivitiesEndingSoon(): void {
    const today = startOfDay(new Date());
    const fiveDaysFromNow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5);

    // Kategoriye göre filtrelenmiş listeden devam et
    let filteredList = this.activities;

    this.activities = filteredList.filter(activity => {
      const endDate = new Date(activity.endTime);
      const activityEndDate = startOfDay(endDate);
      return activityEndDate <= fiveDaysFromNow;
    });
  }

  // Bitiş tarihi geçmişse 'true' döndüren yeni fonksiyon
  isPastActivity(endTime: string): boolean {
    return new Date(endTime) < new Date();
  }
  
  // Bitiş tarihi 10 günden fazla geçmiş aktiviteleri silen metot
  deleteOldActivities(): void {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() + 9);
    
    const activitiesToDelete = this.allActivities.filter(activity => {
      return new Date(activity.endTime) < tenDaysAgo;
    });
    
    if (activitiesToDelete.length > 0) {
      
      activitiesToDelete.forEach(activity => {
        this.api.deleteActivity(activity.id).subscribe({
          next: () => {
            console.log(`Aktivite (ID: ${activity.id}) başarıyla silindi.`);
          },
          error: (err) => {
            console.error(`Aktivite silinirken bir hata oluştu (ID: ${activity.id}):`, err);
          }
        });
      });
      
      this.activities = this.activities.filter(activity => !activitiesToDelete.includes(activity));
      this.allActivities = this.allActivities.filter(activity => !activitiesToDelete.includes(activity));
    } else {
      console.log('10 günden eski aktivite bulunmamaktadır.');
    }
  }

  open(a: any){
    this.router.navigate(['/activities',a.id]);
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.role === 'ADMIN';
  }
}
