import { Component, OnInit,ViewChild } from '@angular/core';
import { ProveedoresService } from 'app/service/proveedores.service'
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { PopupProveedorComponent } from '../popup-proveedor/popup-proveedor.component';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { VentanaConfirmacionComponent } from 'app/ventana-confirmacion/ventana-confirmacion.component';

declare interface Proveedor {
  ruc: number;
  empresa:string;

}

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {
  ruc: string;
  proveedor: string;
  precio_compra: number;
  cantidad: number;

  dataSource: any;
  displayedColumns: string[] = [ 'ruc', 'empresa','accion','compra']
  @ViewChild(MatPaginator) paginator: MatPaginator;


constructor(
  private proveedoresService: ProveedoresService,
  public dialog: MatDialog

) { }

ngOnInit() {

  this.actualizar();
}
actualizar(){
  this.proveedoresService.getAll().subscribe(res => {
    this.dataSource = new MatTableDataSource<Proveedor>(res);
    this.dataSource.paginator = this.paginator;
    console.log('los valores de la tabla son ',this.dataSource);
  })
}


buscarProveedor(event){
  // this.proveedoresService.getPorRuc(this.proveedor).subscribe(res=>{
  //     console.log(res[0].empresa);
  //     this.producto=res[0].empresa;
  // });

}

crearProveedor(){
  const dialogRef = this.dialog.open(PopupProveedorComponent,{});
  dialogRef.afterClosed().subscribe(res=>{
    console.log(res);
    if(res){
      this.actualizar();
    }
  });
}

modificarProveedor(dato){
  console.log(dato);

  // const dialogRef = this.dialog.open(HeroDetailComponent,{data:this.clickedRows[0].empresa});
  //   dialogRef.afterClosed().subscribe(res=>{
  //     console.log(res);
  //   });

}
eliminarProveedor(dato,index){
  const dialogRef = this.dialog.open(VentanaConfirmacionComponent,{data:'este proveedor'});
  dialogRef.afterClosed().subscribe(res=>{
    console.log(res);
    if(res){
      console.log('los datos a elminarse son',dato,index);
      this.proveedoresService.delete(index).subscribe(res=>{
        this.actualizar();
      })
    }
  });


  // const dialogRef = this.dialog.open(HeroDetailComponent,{data:this.clickedRows[0].empresa});
  //   dialogRef.afterClosed().subscribe(res=>{
  //     console.log(res);
  //   });

}

cargarCompra(dato){
  const dialogRef = this.dialog.open(HeroDetailComponent,{data:dato.id});
  dialogRef.afterClosed().subscribe(res=>{
    console.log(res);
  });
}
}

