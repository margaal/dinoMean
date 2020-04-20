import { Component, OnInit } from '@angular/core';
import { DinoService } from '../../shared/dino.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Dinosaure,
  DinoRegistrationViewModel,
  DinoResponse,
} from 'src/app/shared/dinosaure.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [DinoService],
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  serverError: string;
  successMsg: string;
  isNewFriend: boolean;

  constructor(
    public dinoService: DinoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isNewFriend =
      localStorage.getItem('new_friend') == 'true' ? true : false;
    localStorage.removeItem('new_friend');

    this.registerForm = this.formBuilder.group(
      {
        family: ['', Validators.required],
        presentation: ['', [Validators.required, Validators.minLength(5)]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // call register service
    this.dinoService.register(this.registerForm.value).subscribe(
      (res) => {
        const newDino = DinoResponse.convertToDinosaureModel(res);
        // check if is new friend
        if (this.isNewFriend) {
          //add it
          this.onAddFriend(newDino.id);
        }
        this.successMsg = `<p>Compte crée avec succès! Votre identifiant est: <strong> ${newDino.name}</strong>!</p><p> Pour vous connecter, cliquez sur <em>"Connectez-vous"</em> en dessous du formulaire.</p>`;

        this.onReset();
      },
      (error) => {
        if (error.status === 422) {
          this.serverError = error.error.join('<br/>');
        } else {
          this.serverError = 'Oups Dino! Le serveur a rencontré une erreur.';
        }
      }
    );
    if (this.isNewFriend) {
      this.router.navigate([
        'profile/' + localStorage.getItem(DinoService.ID_KEY),
      ]);
      return;
    }
  }

  onReset() {
    this.submitted = false;
    this.serverError = '';
    this.registerForm.reset();
  }

  onAddFriend(friend_id: string): boolean {
    var id = localStorage.getItem(DinoService.ID_KEY);
    this.dinoService.addFriendDino(id, friend_id).subscribe(
      (res) => {
        DinoResponse.convertToDinosaureModel(res);
        return true;
      },
      (error) => {
        console.log('Erreur ' + error);
      }
    );
    return false;
  }
}

// Validator to verify two string matching
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
