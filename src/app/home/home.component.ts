import { Component, OnInit } from '@angular/core';
import { DinoService } from '../shared/dino.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  idDino: string;

  constructor(public dinoService: DinoService) { }

  ngOnInit(): void {
    this.idDino = localStorage.getItem(DinoService.ID_KEY);
  }

}
