import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnakeBarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string, className: string = 'standart-snackbar') {
    this.snackBar.open(message, action, {
      duration: 8000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }
}