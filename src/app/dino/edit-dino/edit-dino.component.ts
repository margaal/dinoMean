import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DinoService } from 'src/app/shared/dino.service';
import { Router } from '@angular/router';
import { DinoResponse, Dinosaure } from 'src/app/shared/dinosaure.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-dino',
  templateUrl: './edit-dino.component.html',
  styleUrls: ['./edit-dino.component.css'],
})
export class EditDinoComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  serverError: string;
  successMsg: string;
  dino: Dinosaure;
  current_id: string;

  constructor(
    public dinoService: DinoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.current_id = localStorage.getItem(DinoService.ID_KEY);
    this.editForm = this.formBuilder.group({
      family: ['', Validators.required],
      presentation: ['', [Validators.required, Validators.minLength(5)]],
      dob: ['', Validators.maxLength(4)],
      color: [],
      weight: [],
      food: [],
    });

    this.getInfoDino();
  }

  get f() {
    return this.editForm.controls;
  }

  getInfoDino() {
    this.dinoService
      .getDinoById(localStorage.getItem(DinoService.ID_KEY))
      .subscribe(
        (res) => {
          this.dino = DinoResponse.convertToDinosaureModel(res);

          if (this.dino) {
            this.editForm.patchValue(this.dino);
          }
        },
        (error) => {
          if (error.status === 403) {
            this.router.navigate(['signin']);
          } else {
            this.router.navigate(['error/' + error.status]);
            console.log(error);
          }
        }
      );
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    this.dino.family = this.editForm.value.family;
    this.dino.presentation = this.editForm.value.presentation;
    this.dino.color = this.editForm.value.color;
    this.dino.food = this.editForm.value.food;
    this.dino.weight = this.editForm.value.weight;
    this.dino.dob = this.editForm.value.dob;
    // call service to update Dino
    this.dinoService.updateDino(this.dino).subscribe(
      (res) => {
        DinoResponse.convertToDinosaureModel(res);

        this.successMsg = `Modification effectuée avec succès! Redirection vers le profile...`;
        this.onReset();
        setTimeout(() => {
          this.router.navigate([
            'profile/' + localStorage.getItem(DinoService.ID_KEY),
          ]);
        }, 3000);
      },
      (error) => {
        if (error.status === 422) {
          this.serverError = error.error.join('<br/>');
        } else {
          this.serverError = 'Oups Dino! Le serveur a rencontré une erreur.';
        }
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.serverError = '';
    this.editForm.reset();
  }
}
