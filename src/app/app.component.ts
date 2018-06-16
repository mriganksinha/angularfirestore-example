import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from 'angularfire2/firestore';
import { AppService } from './app.service';
import { Observable, of, from, range } from 'rxjs';
import { config } from './app.config';
import { map, filter, switchMap, catchError, tap, } from 'rxjs/operators';
import { Question } from './question';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'app';
  
  questionsCollection: AngularFirestoreCollection<Question>;
  questions: Observable<Question[]>;
  nextQuestionID: number;
  nextQuestion: Observable<Question>;
  currAnswer: string;

  constructor (private readonly db: AngularFirestore)
  {
    this.nextQuestionID = 0;
  }

  ngOnInit()
  {  

    this.getQuestions();
    
  }

  getQuestions(): Observable<Question[]>
  {
    this.questionsCollection = this.db.collection('questions', ref => { return ref.orderBy('QUESTION_ID')})
    this.questions = this.questionsCollection.valueChanges()
    this.nextQuestion = this.getNextQuestion();
    return this.questions;
  } 

  public  getNextQuestion(): Observable<Question>
  {
    return this.questions[2];
  }
 
}
