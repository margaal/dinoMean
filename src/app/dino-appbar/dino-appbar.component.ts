import { Component, OnInit, Input } from '@angular/core';
import { DinoService } from '../shared/dino.service';
import { DinoResponse } from '../shared/dinosaure.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dino-appbar',
  templateUrl: './dino-appbar.component.html',
  styleUrls: ['./dino-appbar.component.css'],
})
export class DinoAppbarComponent implements OnInit {
  @Input() idDino;
  @Input() isProfile = false;
  dino: any;
  year: number;
  constructor(
    private dinoService: DinoService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.dinoService.getDinoById(this.idDino).subscribe(
      (res) => {
        this.dino = DinoResponse.convertToDinosaureModel(res);
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

  onLogout(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: 'Hé Dino! Souhaites-tu déjà nous quitter?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dinoService.logout();
        this.router.navigate(['home']);
      }
    });
  }

  onAddNewFriend() {
    localStorage.setItem('new_friend', 'true');
    this.router.navigate(['/signup']);
  }
}
