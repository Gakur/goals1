import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalComponent } from './goals/goals.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: 'goals',component: GoalComponent},
  {path: 'about',component: AboutComponent},
  {path: '**',component: NotFoundComponent},
  {path: 'goals/:id',component: GoalComponent},
  { path: '', redirectTo:"/goals", pathMatch:"full"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
