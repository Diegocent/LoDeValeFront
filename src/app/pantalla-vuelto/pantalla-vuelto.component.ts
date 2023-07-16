import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var $:any;

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

  showNotification(isTrue){
    const type = ['','info','success','warning','danger'];
    var mensaje='';
    var color = 0;
    var icono='';
    if(isTrue){
      color=2;
      mensaje='Producto creado exitosamente'
      icono='pe-7s-check'
    }else{
      color=4;
      mensaje='No ha creado ningun producto'
      icono='pe-7s-close-circle'
    }
      $.notify({
        icon: icono,
        message: mensaje + "</b>."
    },{
        type: type[color],
        timer: 1000,
    });
      
  }


  clickSi(){
    if (this.detalle.efectivo != null && this.detalle.efectivo >= this.total){
      this.dialogRef.close(this.detalle);
    }else{
      alert("El efectivo debe ser mayor o igual al precio del producto");
    }
    
  }
  calcularVuelto(event){
    let valor: number =this.detalle.efectivo ??0;
    this.detalle.vuelto=valor-this.total;
    console.log(this.detalle.vuelto)
  }

}
