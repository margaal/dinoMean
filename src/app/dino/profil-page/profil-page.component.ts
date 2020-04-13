import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DinoService } from 'src/app/shared/dino.service';
import { Dinosaure, DinoResponse } from 'src/app/shared/dinosaure.model';

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {

  currentDinoId: string;
  dino: Dinosaure;

  constructor(private route: ActivatedRoute, private dinoService: DinoService) { }

  ngOnInit(): void {
    this.currentDinoId = this.route.snapshot.paramMap.get('id');
    //console.log(localStorage.getItem(DinoService.TOKEN_KEY));
    this.dinoService.getDinoById(this.currentDinoId).subscribe(
      res => {
        this.dino = DinoResponse.convertToDinosaureModel(res);
      },
      error =>{
        console.log(error);
        
      }
    );
  }

}
