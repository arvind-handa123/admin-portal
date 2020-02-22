import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {


  @Input() columnHeaders = [];
  @Input() columnData = [];


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.columnHeaders = changes.columnHeaders.currentValue;
    this.columnData = changes.columnData.currentValue;
  }
}


