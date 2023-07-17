import { Component, OnInit,ViewChild } from '@angular/core';  
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { CierreService } from 'app/service/cierre.service';

declare interface Usuario{
  id:number,
  cedula: string,
  nombre: string,
  apellido: string,
  CajaId:number
}

// declare interface Cierre{
//   id: number,
//   usuario: Usuario,
//   monto_parcial: number,
//   monto_final: number,
//   en_caja: number,
//   createAt: Date
// }

declare interface Tabla{
  id: number,
  usuario: String,
  monto_parcial: number,
  monto_final: number,
  en_caja: number,
  fecha: String,
  hora : String
}


@Component({
  selector: 'app-reporte-cierre',
  templateUrl: './reporte-cierre.component.html',
  styleUrls: ['./reporte-cierre.component.scss']
})
export class ReporteCierreComponent implements OnInit {
  temp: Tabla[] = []
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'usuario', 'total_ingresado', 'total_caja','diferencia','fecha', 'hora']
  total:number = 0;
  fecha_inicio:Date | undefined = new Date();
  fecha_fin:Date | undefined = new Date();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
constructor(
  private cierreService:CierreService
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
  this.cierreService.filtrar(dia,dia).subscribe(res => {
    this.temp=[];
    this.total=0;
    res.forEach(element=>{
      var fecha = new Date(element.fecha)
      this.total=element.monto + this.total;
      var mes = fecha.getMonth()+1
      var dato = {
        id:element.id,
        usuario: element.Usuario.nombre + " " + element.Usuario.apellido,
        monto_parcial: element.monto_parcial,
        monto_final: element.monto_final,
        en_caja: element.en_caja,
        fecha: fecha.getDate()+'/'+mes+'/'+fecha.getFullYear(),
        hora : fecha.getHours() + ':' + fecha.getMinutes() 
      }
      this.temp=[...this.temp,dato]
      this.dataSource = new MatTableDataSource<Tabla>(this.temp);
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
    this.cierreService.filtrar(this.fecha_inicio,this.fecha_fin).subscribe(res=>{
      this.temp=[];
      this.total=0;
      res.forEach(element=>{
        var fecha = new Date(element.fecha)
        this.total=element.monto + this.total;
        var mes = fecha.getMonth()+1
        var dato = {
          id:element.id,
          usuario: element.Usuario.nombre + " " + element.Usuario.apellido,
          monto_parcial: element.monto_parcial,
          monto_final: element.monto_final,
          en_caja: element.en_caja,
          fecha: fecha.getDate()+'/'+mes+'/'+fecha.getFullYear(),
          hora : fecha.getHours() + ':' + fecha.getMinutes() 
        }
        this.temp=[...this.temp,dato]
        this.dataSource = new MatTableDataSource<Tabla>(this.temp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.fecha_fin=undefined;
        this.fecha_inicio=undefined;
      })
      if (res.length == 0){
        this.dataSource = new MatTableDataSource<Tabla>([]);
      }
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

}

