import { Component, OnInit, Input } from '@angular/core';
import { Dinosaure, DinoResponse } from 'src/app/shared/dinosaure.model';
import { DinoService } from 'src/app/shared/dino.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list-dino',
  templateUrl: './list-dino.component.html',
  styleUrls: ['./list-dino.component.css'],
})
export class ListDinoComponent implements OnInit {
  @Input() idDino;
  @Input() isProfile;
  dinos: any;
  id: string;
  year: number;
  currentDino: Dinosaure;

  constructor(
    private dinoService: DinoService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.id = this.idDino || localStorage.getItem(DinoService.ID_KEY);
    this.dinos = [];

    this.dinoService.getDinoById(this.id).subscribe(
      (res) => {
        this.currentDino = DinoResponse.convertToDinosaureModel(res);
        this.loadFriendsList();
      },
      (error) => {
        return [];
      }
    );
  }

  loadFriendsList() {
    if (this.idDino) {
      // Custom list
      this.dinoService.getDinosFriends(this.idDino).subscribe(
        (res) => {
          for (let d of res) {
            this.dinos.push(DinoResponse.convertToDinosaureModel(d, true));
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
    } else {
      // General list

      this.dinoService.getDinos().subscribe(
        (res) => {
          for (let d of res) {
            let dConvert = DinoResponse.convertToDinosaureModel(d);
            if (d._id != this.id) {
              if (this.currentDino.friends.includes(d._id)) {
                // already friend
                dConvert.isCurrentDinoFriend = true;
              } else {
                dConvert.isCurrentDinoFriend = false;
              }
              this.dinos.push(dConvert);
            }
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
  }

  getFriendsId() {
    this.dinoService.getDinoById(this.id).subscribe(
      (res) => {
        let dino = DinoResponse.convertToDinosaureModel(res);
        return dino.friends;
      },
      (error) => {
        return [];
      }
    );
  }

  onAddFriend(name: string, friend_id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: "Souhaites tu ajouter '" + name + "' comme ami?",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dinoService.addFriendDino(this.id, friend_id).subscribe(
          (res) => {
            this.currentDino = DinoResponse.convertToDinosaureModel(res);
            this.reloadListComponent();
          },
          (error) => {
            console.log('Erreur ' + error);
          }
        );
      }
    });
  }

  onRemoveFriend(name: string, friend_id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: "Souhaites tu retirer '" + name + "' comme ami?",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dinoService.removeFriendDino(this.id, friend_id).subscribe(
          (res) => {
            this.currentDino = DinoResponse.convertToDinosaureModel(res);
            this.reloadListComponent();
          },
          (error) => {
            console.log('Erreur ' + error);
          }
        );
      }
    });
  }

  reloadListComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/list']);
  }
}
