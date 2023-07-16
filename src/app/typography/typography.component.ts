import { Component, OnInit,ViewChild } from '@angular/core';
import { DescripcionVentaService } from 'app/service/descripcion-venta.service';
import { VentaService } from 'app/service/venta.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

declare interface Cliente{
  id:number,
  cedula: string,
  nombre: string,
  apellido: string,
}
declare interface Usuario{
  id:number,
  cedula: string,
  nombre: string,
  apellido: string,
  CajaId:number
}

declare interface Venta {
  id: number;
  fecha:string;
  monto:number;
  usuario:Usuario;
  cliente:Cliente;

}

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  temp: Venta[] = []
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'fecha', 'monto', 'usuario','cliente','detalle']
  total:number = 0;
  fecha_inicio:Date | undefined = new Date();
  fecha_fin:Date | undefined = new Date();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
constructor(
  private ventaService: VentaService,
  private descripcionVentaService: DescripcionVentaService

) { }

ngOnInit() {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var dia = yyyy + '/' + mm + '/' +dd;
  this.actualizar(dia);

}

actualizar(dia){
  this.ventaService.filtrar(dia,dia).subscribe(res => {
    this.temp=[];
    this.total=0;
    res.forEach(element=>{
      var fecha = new Date(element.fecha)
      this.total=element.monto + this.total;
      var mes = fecha.getMonth()+1
      var dato = {
        id:element.id,
        fecha: fecha.getDate()+'/'+mes+'/'+fecha.getFullYear(),
        monto: element.monto,
        usuario:element.Usuario,
        cliente:element.Cliente
      }
      this.temp=[...this.temp,dato]
      this.dataSource = new MatTableDataSource<Venta>(this.temp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.fecha_fin=undefined;
      this.fecha_inicio=undefined;
    })
    console.log('las fechas son ',this.fecha_fin,this.fecha_inicio);
  })
}

filtrar(){
  if(this.fecha_inicio!=undefined && this.fecha_fin!=undefined){
    this.ventaService.filtrar(this.fecha_inicio,this.fecha_fin).subscribe(res=>{
      this.temp=[];
      this.total=0;
      res.forEach(element=>{
        var fecha = new Date(element.fecha)
        this.total=element.monto + this.total;
        var mes = fecha.getMonth()+1
        var dato = {
          id:element.id,
          fecha: fecha.getDate()+'/'+mes+'/'+fecha.getFullYear(),
          monto: element.monto,
          usuario:element.Usuario,
          cliente:element.Cliente
        }
        this.temp=[...this.temp,dato]
        this.dataSource = new MatTableDataSource<Venta>(this.temp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.fecha_fin=undefined;
        this.fecha_inicio=undefined;
      })
      console.log('el registro es',res,'para las fechas',this.fecha_fin,this.fecha_inicio);
    })
  }else{
    var today = new Date();
    var dd = today.getDate();
  
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var dia = yyyy + '/' + mm + '/' +dd;
    this.actualizar(dia);
  }

}

verDetalle(dato){
    // this.descripcionVentaService.getAll()
}

}

