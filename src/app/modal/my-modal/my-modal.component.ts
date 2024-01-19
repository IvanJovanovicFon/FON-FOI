import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Movie } from 'src/app/model/movie';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css'],
})
export class MyModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Movie
  ) {}
  ngOnInit() {console.log(this.data.actors)
  }
}