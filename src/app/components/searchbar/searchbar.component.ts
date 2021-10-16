import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchbarService } from './searchbar.service'

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  queryText: string = ''
  
  showInput = false
  @ViewChild('searchbarInput') searchbarInput
  
  private timeout?: number
  
  constructor(
    private searchbarService: SearchbarService
  ) { }

  ngOnInit(): void {
  }

  debounce(event: Event) {
    if (event['key'] == 'Enter')
      return;

    window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => this.send(), 1000)
  }

  send() {
    this.searchbarService.updateQuery(this.queryText)
  }

  refresh(e: Event) {
    e.stopPropagation();

    this.queryText = ''
    this.showInput = false
    this.send()
  }
  
  toggleShowInput() {
    if (this.showInput) return;
    this.showInput = true
    
    setTimeout(() => {
      this.searchbarInput.nativeElement.focus()
    }, 150)

  }

}
