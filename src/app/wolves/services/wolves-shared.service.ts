import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { postsModel } from '../models/wolves.model';

@Injectable({
  providedIn: 'root'
})
export class WolvesSharedService {

  private completeEditWolves = new BehaviorSubject({});
  currentCompleteEditWolves = this.completeEditWolves.asObservable();

  constructor() { }

  completeEditingProcess(wolve : (postsModel | {})) {
    this.completeEditWolves.next(wolve);
  }
}
