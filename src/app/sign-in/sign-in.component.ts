import { Component, OnInit } from '@angular/core';
import { DinoService } from '../shared/dino.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  registerForm: FormGroup;
  submitted = false;
  serverError: string;
  successMsg: string;

  constructor(public dinoService: DinoService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    if(this.dinoService.loggedIn && !this.dinoService.isTokenExpired) this.router.navigate(['profile/'+localStorage.getItem(DinoService.ID_KEY)]);

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      
      if (this.registerForm.invalid) {
          return;
      }

      // appeler le service
      const res = this.dinoService.login(this.registerForm.value.name, this.registerForm.value.password);
      if(res==0){
        this.router.navigate(['profile/'+localStorage.getItem(DinoService.ID_KEY)]);
      }else{
        this.serverError = "Oups Dino! Le serveur a rencontré une erreur.";
      }

  }

  onReset() {
      this.submitted = false;
      this.serverError = "";
      this.registerForm.reset();
  }


}
