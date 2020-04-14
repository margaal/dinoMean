import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DinoService } from 'src/app/shared/dino.service';
import { Dinosaure, DinoResponse } from 'src/app/shared/dinosaure.model';

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {

  currentDinoId: string;
  //dino: Dinosaure;

  constructor(private route: ActivatedRoute, private dinoService: DinoService, private router: Router) { }

  ngOnInit(): void {
    this.currentDinoId = this.route.snapshot.paramMap.get('id');
    
    
    // this.dinoService.getDinoById(this.currentDinoId).subscribe(
    //   res => {
    //     this.dino = DinoResponse.convertToDinosaureModel(res);
    //   },
    //   error =>{
        
    //     if(error.status===403){
    //       this.router.navigate(['signin']);
    //     }else{
    //       this.router.navigate(['error/'+error.status]);
    //       console.log(error);
    //     }
        
    //   }
    // );
  }

}
