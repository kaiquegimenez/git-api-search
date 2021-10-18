import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'https://api.github.com/';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  headers = new HttpHeaders().append('Authorization', "Bearer  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");
  constructor(private http: HttpClient) { }

  getUsers(userName: string) {
    const url = API + `search/users?q=${userName}&per_page=7`;
    return this.http.get(url, { headers: this.headers});
  }

  getFallowers(urlUser: string) {
    return this.http.get(urlUser, { headers:this.headers});
  }

  getProject(projectName: string) {
    const url = API + `search/repositories?q=${projectName}&per_page=7`;
    return this.http.get(url, { headers:this.headers});
  }

}