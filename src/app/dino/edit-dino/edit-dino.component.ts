import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DinoService } from 'src/app/shared/dino.service';
import { Router } from '@angular/router';
import { DinoResponse, Dinosaure } from 'src/app/shared/dinosaure.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-dino',
  templateUrl: './edit-dino.component.html',
  styleUrls: ['./edit-dino.component.css']
})
export class EditDinoComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  serverError: string;
  successMsg: string;
  dino:Dinosaure;

  constructor(public dinoService: DinoService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      family: ['', Validators.required],
      presentation: ['', [Validators.required, Validators.minLength(5)]],
      color: [],
      weight: [],
      food: [],
      dob: ['', [Validators.maxLength(4)]]
    });

     this.getInfoDino();
    if(this.dino){
      this.registerForm.value.family = this.dino.family;
      this.registerForm.value.presentation = this.dino.presentation;
      this.registerForm.value.color = this.dino.color;
      this.registerForm.value.weight = this.dino.weight;
      this.registerForm.value.food = this.dino.food;
      this.registerForm.value.dob = this.dino.dob;
      console.log(this.dino);
    }
    
  }

  get f() { return this.registerForm.controls; }
  get p() { return this.registerForm.value; }

  getInfoDino(){
    

    this.dinoService.getDinoById(localStorage.getItem(DinoService.ID_KEY)).pipe(map(
      res => {
        
        this.dino = DinoResponse.convertToDinosaureModel(res);
        console.log(res);
      },
      error =>{
        if(error.status===403){
          this.router.navigate(['signin']);
        }else{
          this.router.navigate(['error/'+error.status]);
          console.log(error);
        }
      }
    ));

  
   }

  onSubmit() {
      this.submitted = true;
      
      if (this.registerForm.invalid) {
          return;
      }
      this.dino.family = this.registerForm.value.family;
      this.dino.presentation = this.registerForm.value.presentation;
      this.dino.color = this.registerForm.value.color;
      this.dino.food = this.registerForm.value.food;
      this.dino.weight = this.registerForm.value.weight;
      this.dino.dob = this.registerForm.value.dob;
      // appeler les services
      this.dinoService.updateDino(this.dino).pipe(map(
        res => {
          DinoResponse.convertToDinosaureModel(res);

          this.successMsg = `Modification effectuée avec succès`;
          this.onReset();
          setTimeout(() => {;
            this.router.navigate(['profile/'+localStorage.getItem(DinoService.ID_KEY)])
          }, 5000);
        }, error => {
          if(error.status === 422){
            this.serverError = error.error.join('<br/>');
          }else{
            this.serverError = "Oups Dino! Le serveur a rencontré une erreur."
          }
        }
      ));

  }

  onReset() {
      this.submitted = false;
      this.serverError = "";
      this.registerForm.reset();
  }

}
