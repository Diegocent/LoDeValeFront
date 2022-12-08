import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductosService } from 'app/service/productos.service';

@Component({
  selector: 'app-cargar-producto',
  templateUrl: './cargar-producto.component.html',
  styleUrls: ['./cargar-producto.component.scss']
})

export class CargarProductoComponent implements OnInit {
  dato:string='funciona';

  nombre:string;
  precio_venta:number;
  codigo_barras:string;

  constructor(public dialogRef: MatDialogRef<CargarProductoComponent>,
    private productoService: ProductosService) { }

  ngOnInit(): void {
  }

  onClickNO(){
    this.dialogRef.close(false);
  }

  guardarProducto(){
    if(this.nombre!='' && this.precio_venta!=null){
      let dato = {
        nombre:  this.nombre,
        precio_venta: this.precio_venta,
        codigo_barras: this.codigo_barras
      }
      this.productoService.create(dato).subscribe(res=>{
        console.log(res);
        this.dialogRef.close(true);
      });
    }
  }
}
