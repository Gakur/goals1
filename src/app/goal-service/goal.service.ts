import { Injectable } from '@angular/core';
import { Goals } from '../goalList';
// import { Goals } from '../goalList';
import { Goal } from '../goals';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  getGoals(){
    return Goal
  }
  getGoal(id: number){
    for (let goal of Goals){
      if (goal.id == id){
        return goal;
      }
    }
  }

  constructor() { }
}
