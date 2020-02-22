import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.css']
})
export class IFrameComponent implements OnInit {

  iFrameSrc: any;
  myTemplate: any;


  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.iFrameSrc = this.sanitizer.bypassSecurityTrustResourceUrl(param.src);
    });
  }

}
