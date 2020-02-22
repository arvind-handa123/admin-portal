import { GeneralService } from './../../../services/general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-embed',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.css']
})
export class EmbedComponent implements OnInit {
  iFrameSrc: any;

  constructor(public generalService: GeneralService) { }

  ngOnInit() {
    this.generalService.getHtmlPage().subscribe(
      res => this.iFrameSrc = res,
      err => console.error(err)
    );
  }

}
