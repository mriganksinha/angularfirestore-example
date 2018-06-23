import { Component, OnInit } from '@angular/core';
import { SCORES } from '../mock-scorecard';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from 'angularfire2/firestore';
import { Observable, of, from, range } from 'rxjs';
import { map, filter, switchMap, catchError, tap, } from 'rxjs/operators';
import { Answer } from '../answer';

@Component({
  selector: 'app-reportcard',
  templateUrl: './reportcard.component.html',
  styleUrls: ['./reportcard.component.css']
})
export class ReportcardComponent implements OnInit {

  answersCollection: AngularFirestoreCollection<Answer>;
  answers: Observable<Answer[]>;
  subGroup1Score: number;
  subGroup2Score: number;
  currSubGroup: number;

  constructor(private readonly afs: AngularFirestore) 
  { 
    this.subGroup1Score = 1;
    this.subGroup2Score = 1;
    this.currSubGroup = 1;
  }

  ngOnInit() 
  {
    this.answersCollection = this.afs.collection("profiles").doc("sample1").collection("answer_set_1");
    this.answers = this.answersCollection.valueChanges();
  }

  
}
