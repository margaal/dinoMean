import { Component, OnInit } from '@angular/core';
import { DinoService } from '../shared/dino.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(localStorage.getItem(DinoService.TOKEN_KEY));
  }

}
