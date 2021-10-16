import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchbarService {
    showSearchbar = false;
    query = new BehaviorSubject<string>(null);
    

    cleanQuery() {
        this.query.next(null);
    }

    getQuery() {
        return this.query.asObservable();
    }

    updateQuery(query: string) {
        this.query.next(query)
    }
}