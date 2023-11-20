import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pokemon } from 'src/app/models/pokemon';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  pokemon: Pokemon;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pokemon: Pokemon }
  ) {
    this.pokemon = data.pokemon;
    console.log(this.pokemon);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
