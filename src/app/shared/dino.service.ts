import { Injectable } from '@angular/core';
import { Dinosaure, DinoRegistrationViewModel, DinoResponse } from './dinosaure.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class DinoService {

  static TOKEN_KEY = "token";
  static AUTH_BASE_URI = "/auth";
  static DINO_BASE_URI = "/dino";

  //selectedDino: Dinosaure = new Dinosaure();

  constructor(private http: HttpClient) { }

  // 
  public getDinos(){
    return this.http.get<DinoResponse[]>(`${environment.apiBaseUrl}${DinoService.DINO_BASE_URI}`); 
  }

  public getDinosFriends(id: string){
    return this.http.get<DinoResponse[]>(`${environment.apiBaseUrl}${DinoService.DINO_BASE_URI}/freinds/${id}`); 
  }

  public getDinoById(id: string){
    return this.http.get<DinoResponse>(`${environment.apiBaseUrl}${DinoService.DINO_BASE_URI}/${id}`);
  }

  public updateDino(dino: Dinosaure){
    return this.http.put<DinoResponse>(`${environment.apiBaseUrl}${DinoService.DINO_BASE_URI}/${dino.id}`, dino);
  }

  public deleteDino(id: string){
    return this.http.delete<DinoResponse>(`${environment.apiBaseUrl}${DinoService.DINO_BASE_URI}/${id}`);
  }


  // auth methods
  public register(dino: DinoRegistrationViewModel) {
    let password = dino.password;
    console.log("register");
    return this.http.post<DinoResponse>(`${environment.apiBaseUrl}${DinoService.AUTH_BASE_URI}/signup`, dino).pipe(tap(res => {
      
      this.login(res.name, password);
    }));
  }

  public login(name:string, password:string) {
    
    return this.http.post<{token:string}>(`${environment.apiBaseUrl}${DinoService.AUTH_BASE_URI}/login`, {name, password}).subscribe(
      res => {
        localStorage.setItem(DinoService.TOKEN_KEY, res.token);
        
      },
      err => {
        console.log(err);
      });
  }

  public logout() {
    localStorage.removeItem(DinoService.TOKEN_KEY);
  }


  // Properties
  public get loggedIn(): boolean{
    return localStorage.getItem(DinoService.TOKEN_KEY) !==  null;
  }

  public get verifyTokenAvailability() : boolean{
    const helperJwt = new JwtHelperService();
    return helperJwt.isTokenExpired(localStorage.getItem(DinoService.TOKEN_KEY));
  }
}
