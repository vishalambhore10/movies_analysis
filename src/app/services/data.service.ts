import { HttpHeaders,HttpClient } from '@angular/common/http';
import { movieDetail } from '../movieDetail'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class DataService{

     private _url:string='/assets/data/response.json'
    constructor(private http:HttpClient){

    }
    getData():Observable<movieDetail[]>{
        
     return this.http.get<movieDetail[]>(this._url)
       
    }
}