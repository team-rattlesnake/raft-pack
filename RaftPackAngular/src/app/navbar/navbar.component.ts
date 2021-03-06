import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { Subject } from 'rxjs/Subject';
import { SearchService } from '../services/search.service';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
import { switchMap } from 'rxjs/operator/switchMap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  users$: Observable<User[]>;
  private searchTerms = new Subject<string>();

  constructor(private searchService: SearchService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.users$ = this.searchTerms.
      // wait 300ms after each keystroke before considering the term
      debounceTime(300).

      // ignore new term if same as previous term
      distinctUntilChanged().

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchService.searchUsers(term));
  }

}
