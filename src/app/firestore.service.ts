import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AppService } from './app.service';
import { Question } from './question';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}; 


@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor() { }
}
