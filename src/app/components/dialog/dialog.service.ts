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