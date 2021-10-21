import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'https://api.github.com/';
@Injectable({
  providedIn: 'root'
})
export class GitCardService {
  headers = new HttpHeaders().append('Authorization', "Bearer  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");
  constructor(private http: HttpClient) { }

  getUsers(userName: string, page: number) {
    const url = API + `search/users?q=${userName}&per_page=10&page=${page}`;
    return this.http.get(url, { headers: this.headers});
  }

  getFallowers(urlUser: string) {
    return this.http.get(urlUser, { headers:this.headers});
  }

  getProject(projectName: string, page: number) {
    const url = API + `search/repositories?q=${projectName}&per_page=10&page=${page}`;
    return this.http.get(url, { headers:this.headers});
  }

}