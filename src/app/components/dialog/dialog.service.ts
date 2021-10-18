import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'https://api.github.com/';
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  headers = new HttpHeaders().append('Authorization', "Bearer  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");
  constructor(private http: HttpClient) { }

  getProjects(urlProjects: string) {
    return this.http.get(urlProjects, { headers:this.headers});
  }

}