import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare interface Vuelto {
 vuelto:number | null;
 efectivo:number | null;
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
    let valor: number =this.detalle.efectivo ??0;
    this.detalle.vuelto=valor-this.total;
    console.log(this.detalle.vuelto)
  }

}
