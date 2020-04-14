import { Component, OnInit, Input } from '@angular/core';
import { Dinosaure, DinoResponse } from 'src/app/shared/dinosaure.model';
import { DinoService } from 'src/app/shared/dino.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list-dino',
  templateUrl: './list-dino.component.html',
  styleUrls: ['./list-dino.component.css']
})
export class ListDinoComponent implements OnInit {

  @Input() idDino;
  @Input() isProfile;
  dinos: any;
  id:string;
  year:number;
  

  constructor(private dinoService: DinoService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.year = (new Date()).getFullYear();
    this.id = this.idDino || localStorage.getItem(DinoService.ID_KEY);
    this.dinos = [];

    if(this.idDino){
      
      // Liste personnalisée des dinos
      this.dinoService.getDinosFriends(this.idDino).subscribe(
        res => {
          for(let d of this.dinos){
            console.log("EEEE");
            this.dinos.push(DinoResponse.convertToDinosaureModel(d));
          }
        },
        error =>{
          
          if(error.status===403){
            this.router.navigate(['signin']);
          }else{
            this.router.navigate(['error/'+error.status]);
            console.log(error);
          }
          
        }
      );
    }else{
      //console.log("E "+this.dinos.length);
      // Liste globale des dino
      this.dinoService.getDinos().subscribe(
        res => {
          var friends = [];
          friends.push(this.getFriendsId());
          for(let d of res){
            let dConvert = DinoResponse.convertToDinosaureModel(d);
            if(d._id!=this.id){
              
              if(friends.includes(d._id)){
                // est déja amis
                dConvert.isCurrentDinoFriend = true;
              }else{
                dConvert.isCurrentDinoFriend = false;
              }
              this.dinos.push(dConvert);
            }
              
          }
          
        },
        error =>{
          
          if(error.status===403){
            this.router.navigate(['signin']);
          }else{
            this.router.navigate(['error/'+error.status]);
            console.log(error);
          }
          
        }
      );
    }
  }

   getFriendsId(){
    this.dinoService.getDinoById(this.id).subscribe(
      res => {
        
        let dino = DinoResponse.convertToDinosaureModel(res);
        return dino.friends;
      },
      error =>{
        return [];
      }
    );
   }

   onAddFriend(name:string, friend_id: string){

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: "Souhaites tu ajouter '"+name+"' comme ami?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log("Before adding...");
        this.dinoService.addFriendDino(this.id, friend_id).subscribe(
          res => {
            console.log("After adding...");
            this.ngOnInit();
          },
          error =>{
            console.log("Erreur "+error);
          }
        );
      }
    });

     
   }

   onRemoveFriend(name:string, friend_id: string){

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: "Souhaites tu retirer '"+name+"' comme ami?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dinoService.removeFriendDino(this.id, friend_id).subscribe(
          res => {
            this.ngOnInit();
          },
          error =>{
            console.log("Erreur "+error);
          }
        );
      }
    });

     
   }

}
