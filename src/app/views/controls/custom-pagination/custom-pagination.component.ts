import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.css']
})
export class CustomPaginationComponent implements OnInit {

  @Input() totalItems: any;
  @Input() itemsPerPage: any;
  @Output() pageChange: EventEmitter<any> = new EventEmitter<any>();
  noOfPages: any;
  lastPage: any;

  constructor() { }

  ngOnInit() {
    this.noOfPages = Array(Math.ceil(this.totalItems / this.itemsPerPage)).fill(Math.ceil(this.totalItems / this.itemsPerPage));
    this.lastPage = Math.ceil(this.totalItems / this.itemsPerPage) - 1;
  }

  pageChanged(page){
    this.pageChange.emit(page);
  }

}
