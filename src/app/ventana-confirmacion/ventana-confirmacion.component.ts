import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ventana-confirmacion',
  templateUrl: './ventana-confirmacion.component.html',
  styleUrls: ['./ventana-confirmacion.component.css']
})
export class VentanaConfirmacionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VentanaConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje:string,
  ) { }

  ngOnInit(): void {
  }
  onClickNO(){
    this.dialogRef.close(false);
  }
  clickSi(){
    this.dialogRef.close(true);
  }

}
