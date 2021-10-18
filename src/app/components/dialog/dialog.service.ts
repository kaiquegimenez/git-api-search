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