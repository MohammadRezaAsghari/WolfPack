import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  
  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

}
