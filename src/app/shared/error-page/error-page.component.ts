import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  errorCode: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.errorCode = this.route.snapshot.paramMap.get('code');
  }

}
