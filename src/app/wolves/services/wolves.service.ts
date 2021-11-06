import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WolvesService {
  token = 'Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6';
  url = 'https://join.wolfpackit.nl/api/v1/wolves';
  header = { 'Authorization': `${this.token}`};
  constructor(
    protected readonly http: HttpClient
  ) { }

  // GET
  getWolves(): Observable<any> {
    const headers = this.header;
    return this.http.get(this.url, {headers});
  }

  // POST
  createNewWolf(name:string, gender:string, birthday:string): Observable<any> {
    const headers = this.header;
    const params = {
      name: name,
      gender: gender,
      birthday: birthday
    }
    return this.http.post(this.url, {} , {headers, params})
  }

  // DELETE
  removeWolf(id:string) {
    const headers = this.header;
    const deleteUrl = this.url + '/' + id;
    return this.http.delete(deleteUrl, {headers});
  } 

  //PUT
  updateWolf({name, gender, birthday, id}): Observable<any> {
    const headers = this.header;
    const updateUrl = this.url + '/' + id;
    const params = {
      name, 
      gender, 
      birthday
    }
    return this.http.put(updateUrl, {} , {headers, params})
  }
  
}
