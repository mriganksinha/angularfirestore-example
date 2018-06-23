import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from 'angularfire2/firestore';
import { AppService } from './app.service';
import { Observable, of, from, range } from 'rxjs';
import { config } from './app.config';
import { map, filter, switchMap, catchError, tap, } from 'rxjs/operators';
import { Question } from './question';
import { SCORES } from './mock-scorecard';
import { Score } from './score';
import { NgSwitch, NgSwitchCase } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'app';
  BarChart: any;
  
  questionsCollection: AngularFirestoreCollection<Question>;
  
  questions: Observable<Question[]>;
  nextQuestionID: number;
  nextQuestion: Observable<Question[]>;
  currAnswer: string;
  subGroup1Score: number;
  subGroup2Score: number;
  subGroup3Score: number;
  subGroup4Score: number;
  currSubGroup: number;

  constructor (private readonly db: AngularFirestore)
  {
    this.nextQuestionID = 1;
    this.currAnswer = "0";
    this.subGroup1Score = 0;
    this.subGroup2Score = 0;
    this.subGroup3Score = 0;
    this.subGroup4Score = 0;
  }

  ngOnInit()
  {  
    this.getFirstQuestions();
  }

  getQuestions(): Observable<Question[]>
  {
    //console.log(this.nextQuestionID);
    //var docRef = this.db.collection("profiles").doc("sample1").collection("answer_set_1");
    /*var docData = {
      QUESTION_ID : this.nextQuestionID,
      ANSWER: Number.parseInt(this.currAnswer)
    }
    docRef.add(docData)
    .then(function(docRef) {
        console.log("Document written successfully: ", docData);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });*/
    this.setSubGroupScore();
    this.nextQuestionID += 1;
    this.questionsCollection = this.db.collection('questions', ref => { return ref.where('QUESTION_ID', "==", this.nextQuestionID)})
    this.questions = this.questionsCollection.valueChanges();
    
    return this.questions;
  } 

  getFirstQuestions(): Observable<Question[]>
  {
    console.log(this.nextQuestionID);
    this.questionsCollection = this.db.collection('questions', ref => { return ref.where('QUESTION_ID', "==", this.nextQuestionID)})
    this.questions = this.questionsCollection.valueChanges();
    return this.questions;
  } 

  getReport(): void
  {
    console.log("Final SubGroup1 Score : ", this.subGroup1Score);
    console.log("Final SubGroup2 Score : ", this.subGroup2Score);
    console.log("Final SubGroup3 Score : ", this.subGroup3Score);
    console.log("Final SubGroup4 Score : ", this.subGroup4Score);
    
    /*
    Chart code placeholder

    */
  }

  setSubGroupScore(): void
  {
    var docData = {
      QUESTION_ID : this.nextQuestionID,
      ANSWER: Number.parseInt(this.currAnswer)
    }
    var currScore: Score;
    
    currScore = SCORES.find(function(score)
    {
      return score.QUESTION_ID === docData.QUESTION_ID;
    });
    
    switch(currScore.SUBGROUP_ID)
    {
      case ( currScore.SUBGROUP_ID = parseInt("1") ) : this.subGroup1Score = this.subGroup1Score + (currScore.WEIGHTAGE * parseInt(this.currAnswer)); break;
      case ( currScore.SUBGROUP_ID = parseInt("2") ) : this.subGroup2Score = this.subGroup2Score + (currScore.WEIGHTAGE * parseInt(this.currAnswer)); break;
      case ( currScore.SUBGROUP_ID = parseInt("3") ) : this.subGroup3Score = this.subGroup3Score + (currScore.WEIGHTAGE * parseInt(this.currAnswer)); break;
      case ( currScore.SUBGROUP_ID = parseInt("4") ) : this.subGroup4Score = this.subGroup4Score + (currScore.WEIGHTAGE * parseInt(this.currAnswer)); break;;
    }
    console.log("response : ", docData);
    console.log("score details : ", currScore);
    console.log("subgroup1 score : ", this.subGroup1Score);
    console.log("subgroup2 score : ", this.subGroup2Score);
    console.log("subgroup3 score : ", this.subGroup3Score);
    console.log("subgroup4 score : ", this.subGroup4Score);
  }
  
  

 
}
