import { Component, EventEmitter, OnInit, Output,ViewChild} from '@angular/core';
import { ProductosService } from 'app/service/productos.service'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CargarProductoComponent } from '../cargar-producto/cargar-producto.component';
declare var $:any;

declare interface Producto {
  id:number;
  nombre:string;
  precio_venta:number;
  cantidad:number;
  codigo_barras:string;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{
  codigo_barras: string;
  nombre_producto: string;
  precio_venta: number;
  cantidad: number;
  consulta:boolean=true;
  registro:Producto[]=[];

  dataSource: any;
  displayedColumns: string[] = [ 'cantidad', 'nombre_producto', 'precio_venta','codigo_barras','eliminar']
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productoService: ProductosService,
    public dialog: MatDialog,
  ) { }



  ngOnInit() {
    this.actualizar()
    
  }

  actualizar(){
    this.productoService.getAll().subscribe(res => {
    this.dataSource = new MatTableDataSource<Producto>(res);
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource);
    })
  }

  cargarValor(event,id){
    var bandera:boolean=true;
    this.registro.forEach(element=>{
      if(element==id){
        bandera=false;
      }
    })
    if(bandera){
    this.registro=[...this.registro,id]
    // console.log(this.registro.find(id))
    }
    console.log(this.registro)
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

  cambiarValor(){
    if(this.consulta){
    this.consulta=false
    }else{
      this.consulta=true
    }
  }
  agregarNuevoProducto(){
    const dialogRef = this.dialog.open(CargarProductoComponent);
    dialogRef.afterClosed().subscribe(res=>{
      console.log(res);
      if(res){
        this.actualizar();
      }
      this.showNotification(res);
    });
  }

  actualizarProducto(){
    if(this.registro.length>0){
      this.registro.forEach((element,index)=>{
          let dt ={
            nombre: element.nombre,
            precio_venta:element.precio_venta,
            cantidad:element.cantidad,
            codigo_barras:element.codigo_barras
          }
          this.productoService.update(this.registro[index].id,dt).subscribe(res=>{
            console.log(res)
            this.cambiarValor();
            this.actualizar();
          })
        
      })
    }
      

  }

  eliminarProducto(id :number){
    if(confirm("Esta seguro que desea eliminar este producto?")){
      this.productoService.delete(id).subscribe(res=>{
        this.actualizar();
        console.log(res)
      })
    }
  }

  cancelar(){
    this.cambiarValor();
    this.actualizar();
  }
}

