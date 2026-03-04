import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList implements OnInit{

  categories: any[] = [];
  model: any = {name: '', description: ''};
  msg = '';

  constructor(private api: Api){};

  ngOnInit(){
      this.load();
  }

  load(){
    this.api.getCategories().subscribe((res: any) => this.categories = res);
  }

  add(){
    if(!this.model.name){
      this.msg = 'İsim Gerekli'; return;
    }
    this.api.createCategory(this.model).subscribe({
      next: () => {this.msg= 'Kategori eklendi'; this.model = {name: '',description: ''}, this.load();},
      error: e => this.msg = 'Hata: ' + (e.error|| e.statusText)
    });
  }

}
