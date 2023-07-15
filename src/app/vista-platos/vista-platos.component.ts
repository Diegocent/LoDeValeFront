import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var $:any;

declare interface Producto{
  id:number;
  nombre: string;
  precio_por_kilo:number;
}
@Component({
  selector: 'app-vista-platos',
  templateUrl: './vista-platos.component.html',
  styleUrls: ['./vista-platos.component.css']
})
export class VistaPlatosComponent implements OnInit {

  productos:Producto[]=[{id:1,nombre:'Milanesa',precio_por_kilo:35000},{id:3,nombre:'Plato Normal',precio_por_kilo:25000},{id:2,nombre:'Plato Especial',precio_por_kilo:30000},{id:4,nombre:'Plato de Asado',precio_por_kilo:80000}];

  seleccionado:Producto;

  peso!:number;
  total!:number;

  constructor(
    public dialogRef: MatDialogRef<VistaPlatosComponent>,
  ) { }

  ngOnInit(): void {
  }

  onClickNO(){
    this.dialogRef.close(false);
  }
  agregarValor(){
    console.log(this.seleccionado);
  }
  calcularCosto(event){
    if(this.seleccionado!=null){
      console.log(this.seleccionado);
      this.total = this.peso*this.seleccionado.precio_por_kilo;
      console.log(this.total);
    }else{
      this.showNotification();
      this.peso!=null;
    }
  }

  guardarPlato(){
    if(this.seleccionado!=null){
      var dato = {
        id: this.seleccionado.id,
        nombre: this.seleccionado.nombre,
        precio_kilo: this.seleccionado.precio_por_kilo,
        peso: this.peso,
        precio: this.total
      }
      this.dialogRef.close(dato);

    }else{
      this.showNotification();
    }
  }

  showNotification(){
    const type = ['','info','success','warning','danger'];
    var mensaje='';
    var color = 0;
    var icono='';
      color=4;
      mensaje='No ha agregado ningun tipo de plato'
      icono='pe-7s-close-circle'

    
    $.notify({
        icon: icono,
        message: mensaje + "</b>."
    },{
        type: type[color],
        timer: 1000,
    });
      
  }

}
