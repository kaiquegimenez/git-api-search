import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  typeSearch = new BehaviorSubject<string>(null);

  getTypeSearch() {
    return this.typeSearch.asObservable();
  }
  updateTypeSearch(typeSearch: string) {
    this.typeSearch.next(typeSearch)
  }
}