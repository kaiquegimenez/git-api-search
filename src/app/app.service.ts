import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'https://api.github.com/';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  headers = new HttpHeaders().append('Authorization', "Bearer  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");
  constructor(private http: HttpClient) { }
  
  importSimpleItems(formData: FormData) {
    const url = API + 'nm-category/xlsx/simple-item/import/v3';
    return this.http.post(url, formData, {observe: 'response'},);
  }

  getUsers(userName: string) {
    const url = API + `search/users?q=${userName}&per_page=7`;
    return this.http.get(url, { headers: this.headers});
  }

  getInfoUsers(urlUser: string) {
    return this.http.get(urlUser, { headers:this.headers});
  }

  getProject(projectName: string) {
    const url = API + `search/repositories?q=${projectName}&per_page=7`;
    return this.http.get(url, { headers:this.headers});
  }

}