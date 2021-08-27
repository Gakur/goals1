import { Component, OnInit } from '@angular/core';
import { Goal } from '../goals';
import { GoalService } from '../goal-service/goal.service';
import { AlertService } from '../alert-service/alert.service';
import { Quote } from '../quote-class/quote';
import { HttpClient } from '@angular/common/http';  
import { QuoteRequestService } from '../quote-http/quote-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})

// export class GoalComponent implements OnInit {

//   goals: Goal[] = [
//     {id:1, name:'Watch finding Nemo',description:'Find an online version and watch merlin find his son'},
//     {id:2,name:'Buy Cookies',description:'I have to buy cookies for the parrot'},
//     {id:3,name:'Get new Phone Case',description:'Diana has her birthday coming up soon'},
//     {id:4,name:'Get Dog Food',description:'Pupper likes expensive sancks'},
//     {id:5,name:'Solve math homework',description:'Damn Math'},
//     {id:6,name:'Plot my world domination plan',description:'Cause I am an evil overlord'},
//   ];
export class GoalComponent implements OnInit {
  goToUrl(id: any){
    this.router.navigate(['/goals',id])
  }
  goals: Goal[];
  alertService: AlertService;
  quote!: Quote;

  addNewGoal(goal: Goal){
    let goalLength = this.goals.length;
    goal.id = goalLength+1;
    goal.completeDate = new Date(goal.completeDate)
    this.goals.push(goal)
  }
  deleteGoal(isComplete:any, index:any){
    if (isComplete) {
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)

      if (toDelete){
        this.goals.splice(index,1)
        this.alertService.alertMe ("This goal has been deleted")
      }
    }
  }

    //   toggleDetails(index:any){
    //     this.goals[index].showDescription = !this.goals[index].showDescription;
    
    // }
  constructor(goalService: GoalService, alertService: AlertService, private http: HttpClient, private quoteService: QuoteRequestService, private router: Router) {
    this.goals = goalService.getGoals ()
    this.alertService = alertService;
   }

  ngOnInit(): void {

    this.quoteService.quoteRequest()
    this.quote = this.quoteService.quote
    interface ApiResponse{
      author:string;
      quote:string;
    }

    this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.uk/random.json").subscribe(data=>{
      // Succesful API request
      this.quote = new Quote(data.author, data.quote)
  },err=> {
    this.quote = new Quote ("Winston Churchil","Never ever give up!")
    console.log ("An Error Have occurred")
    })
  }

}
