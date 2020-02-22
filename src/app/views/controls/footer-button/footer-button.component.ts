import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer-button',
  templateUrl: './footer-button.component.html',
  styleUrls: ['./footer-button.component.css']
})
export class FooterButtonComponent implements OnInit {

  @Input() iconName: any;
  @Input() iconLabel: any;
  @Input() rLink: any;
  @Input() allDocsRecieved: any;

  @Output() buttonClickEvent = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
  }

  buttonClick(value: string) {
    this.buttonClickEvent.emit(value);
  }

}
