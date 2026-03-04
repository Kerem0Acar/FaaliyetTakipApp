import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { CategoryList } from './components/category-list/category-list';
import { ActivityList } from './components/activity-list/activity-list';
import { ActivityDetail } from './components/activity-detail/activity-detail';
import { ActivityCreate } from './components/activity-create/activity-create';
import { ActivityParticipants } from './components/activity-participants/activity-participants';


export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'register', component: Register},
  {path: 'login', component: Login},
  {path: 'categories', component: CategoryList},
  {path: 'activities', component: ActivityList},
  {path: 'activities/create', component: ActivityCreate},
  {path: 'activities/:id', component: ActivityDetail},
  {path: 'activities/:id/participants', component: ActivityParticipants}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
