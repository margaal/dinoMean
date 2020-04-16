import { Component, OnInit } from '@angular/core';
import { DinoService } from '../shared/dino.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  serverError: string;
  successMsg: string;

  constructor(
    public dinoService: DinoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.dinoService.loggedIn && !this.dinoService.isTokenExpired)
      this.router.navigate([
        'profile/' + localStorage.getItem(DinoService.ID_KEY),
      ]);

    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    // appeler le service
    this.dinoService
      .login(this.loginForm.value.name, this.loginForm.value.password)
      .subscribe(
        (res) => {
          localStorage.setItem(DinoService.TOKEN_KEY, res.token);
          localStorage.setItem(DinoService.ID_KEY, res.id);
          //
          this.router.navigate([
            'profile/' + localStorage.getItem(DinoService.ID_KEY),
          ]);
        },
        (err) => {
          if (err.status == 404) {
            this.serverError = err.error['message'];
          } else {
            this.serverError = 'Oups Dino! Le serveur a rencontré une erreur.';
          }
        }
      );
    //Dino16210051
  }

  onReset() {
    this.submitted = false;
    this.serverError = '';
    this.loginForm.reset();
  }
}
