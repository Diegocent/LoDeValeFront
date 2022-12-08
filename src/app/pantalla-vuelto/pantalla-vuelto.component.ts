import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { texttospeech } from 'googleapis/build/src/apis/texttospeech';

declare interface Vuelto {
 vuelto:number;
 efectivo:number;
}

@Component({
  selector: 'app-pantalla-vuelto',
  templateUrl: './pantalla-vuelto.component.html',
  styleUrls: ['./pantalla-vuelto.component.scss']
})
export class PantallaVueltoComponent implements OnInit {
  detalle:Vuelto = {vuelto:null,efectivo:null};
  constructor(
    public dialogRef: MatDialogRef<PantallaVueltoComponent>,
    @Inject(MAT_DIALOG_DATA) public total:number,
  ) { }

  ngOnInit(): void {
  }
  onClickNO(){
    this.dialogRef.close(false);
  }
  clickSi(){
    this.dialogRef.close(this.detalle);
  }
  calcularVuelto(event){
    this.detalle.vuelto=this.detalle.efectivo-this.total;
    console.log(this.detalle.vuelto)
  }

}
