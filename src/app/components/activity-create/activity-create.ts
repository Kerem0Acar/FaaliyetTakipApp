import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-create',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './activity-create.html',
  styleUrl: './activity-create.css'
})
export class ActivityCreate implements OnInit{
  model: any = {
    title: '',
    description: '',
    category: {id: null} ,
    startTime: '',
    endTime: '',
    active: true};
  categories: any[] = [];
  activity: any = {category: null};
  msg = '';


  constructor(private api: Api, private router: Router){}

  ngOnInit(): void {
      this.api.getCategories().subscribe(res => {
      this.categories = res;
      console.log(this.categories)
    });
  }

   save() {
  if (this.model.category.id === null || this.model.category.id === undefined) {
    alert('Lütfen kategori seçin');
    return;
  }

  this.model.category = { id: Number(this.model.category.id) };

  const s = localStorage.getItem('user');
  const currentUser = s ? JSON.parse(s) : null;

  this.api.createActivity(this.model, currentUser.id).subscribe({
    next: () => {
      alert('Aktivite başarıyla eklendi');
      this.router.navigate(['/activities']);
    },
    error: (err) => {
      console.error('Aktivite eklenirken hata:', err);
      alert('Aktivite eklenirken bir hata oluştu');
    }
  });
}

}
