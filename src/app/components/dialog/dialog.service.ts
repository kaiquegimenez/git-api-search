import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'https://api.github.com/';
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  headers = new HttpHeaders().append('Authorization', "Bearer  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");
  constructor(private http: HttpClient) { }

  getProjects(urlProjects: string, page: number) {
    return this.http.get(urlProjects + `?page=${page}`, { headers:this.headers});
  }

}