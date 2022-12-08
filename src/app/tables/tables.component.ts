import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'app/service/productos.service'
import { VentaService } from 'app/service/venta.service'
import { DescripcionVentaService } from 'app/service/descripcion-venta.service'
import { ClientesService } from 'app/service/clientes.service'

import { MatDialog } from '@angular/material/dialog';
import { VistaPlatosComponent } from 'app/vista-platos/vista-platos.component';
import { PantallaVueltoComponent } from 'app/pantalla-vuelto/pantalla-vuelto.component';

import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import {UserOptions} from 'jspdf-autotable';
import { UserComponent } from 'app/user/user.component';
import { UsuarioService } from 'app/service/usuario.service';

import { CanActivate, Router } from '@angular/router';


interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

declare interface Usuario{
  id:number;
  cedula:string;
  nombre:string;
  apellido:string;
  contraseña:string;
  CajaId:number;
}

declare interface Ventas {
    codigo:string;
    descripcion:string;
    cantidad:number;
    precio:number;
    subtotal:number;
}

declare interface Ids {
    id:number;
    cantidad:number;
    monto_total:number;
    monto_unitario:number;
    cantOriginal:number;
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
    nombre: string;
    documento: string;
    cantidad: number = 1;
    codigo: string;

    id_cliente:number=1;
    total: number = 0;

    ids_temp: Ids[]=[];

    dataSource: Ventas[] = []
    displayedColumns: string[] = [ 'codigo', 'descripcion', 'cantidad','precio','subtotal']

    vuelto:number = 0;
    efectivo:number=0;

    ver:boolean;

    usuario:Usuario;
    id_user:number;

  constructor(
    private productosService: ProductosService,
    private ventaService: VentaService,
    private descripcionVentaService:DescripcionVentaService,
    private clientesService: ClientesService,
    public dialog: MatDialog,
    private usuarioService:UsuarioService,
    private router: Router,

  ) { }

  ngOnInit() {
    if(this.usuarioService.obtenerCliente()==undefined){
      // this.ver=true;
      this.router.navigate(['/login'])
    }else{
      this.actualizar();
    }
   
      
  }
    // console.log(dato);
  actualizar(){
    this.productosService.getAll().subscribe(respuesta =>{
      this.usuario=this.usuarioService.obtenerCliente();
      this.id_user=this.usuario[0].id;
      console.log('el ide del cajero es el siguiente',this.usuario[0].id)
    });
  }    
    
  llamar(monto){
    this.total=monto;
  }

  guardarVenta(text){
    if(this.total>0){
    console.log(this.ids_temp);
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var dia = yyyy + '/' + mm + '/' +dd;
    // var dia= dd + '/'+mm+'/'+yyyy;
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();
    var hora = hour+':'+minute+':'+second;
    const dialogRef = this.dialog.open(PantallaVueltoComponent,{data:this.total});
    dialogRef.afterClosed().subscribe(res=>{
      this.vuelto=res.vuelto;
      this.efectivo=res.efectivo;
      console.log(this.usuario.id);
      if(res){
        this.usuarioService.cargarMonto(this.total);
        this.ventaService.create({
          fecha:dia+' '+hora,
          monto:this.total,
          UsuarioId:this.id_user,
          ClienteId:this.id_cliente
      }).subscribe(res=>{
          console.log(res);
          this.ids_temp.forEach(element => {
              this.descripcionVentaService.create({
                  monto_unitario:element.monto_unitario,
                  cantidad:element.cantidad,
                  monto_total:element.monto_total,
                  VentaId:res.id,
                  VentumId:res.id,
                  ProductoId:element.id
              }).subscribe(respuesta=>{
                  console.log('la descripcion generada es =',respuesta)
              });
            this.createPDF();
          });
          this.ids_temp.forEach(elemento=>{ 
            let conf = elemento.cantOriginal - elemento.cantidad
            console.log('la resta es = ',conf)
            var dato={
                cantidad:conf
            }
            this.productosService.update(elemento.id,dato).subscribe(rs=>{
              console.log('agregado el siguiente elemento ',rs)
            })
          })
          this.nombre = '';
          this.documento= '';
          this.cantidad = 1;
          this.ids_temp=[];
          this.total=0;
          this.dataSource=[];
          this.vuelto=0;
          this.efectivo=0;
          text.focus();
      })
      }
    });
    
  }
  }

  buscarCliente(event,text){
    console.log(this.documento);
    this.clientesService.getClienteCI(this.documento).subscribe(respuesta=>{
        if(respuesta){
            this.clientesService.getPorCI(this.documento).subscribe(res=>{
            console.log(res[0].nombre,res[0].id);
            this.nombre=res[0].nombre +' '+ res[0].apellido;
            this.id_cliente=res[0].id
        });
    }else{
      const dialogRef = this.dialog.open(UserComponent,{height: '400px',
      width: '600px',});
      dialogRef.afterClosed().subscribe(res=>{
        if(res){
          this.nombre=res.nombre +' '+ res.apellido;
            this.id_cliente=res.id
            text.focus();
        }else{
          this.nombre="NO NAME"
          text.focus();
        }
      });
    }
    text.focus();
    })
    

  }

  buscarProducto(event,text){
    this.productosService.buscar(this.codigo).subscribe(res=>{
      console.log(res);
      let subtotal: number;
      

      subtotal= this.cantidad*res[0].precio_venta;
      this.total= this.total+subtotal;
      this.llamar(this.total);
      let objetoid={
          id:res[0].id,
          cantidad:this.cantidad,
          monto_total:subtotal,
          monto_unitario:res[0].precio_venta,
          cantOriginal:res[0].cantidad
      }
      this.ids_temp = [...this.ids_temp,objetoid];

  let objeto2={codigo:res[0].codigo_barras,descripcion:res[0].nombre,cantidad:this.cantidad,precio:res[0].precio_venta,subtotal:subtotal};
  this.dataSource = [...this.dataSource,objeto2];
  
  // this.nombre = '';
  // this.documento= '';
  this.cantidad = 1;
  this.codigo= '';
  text.focus();


  })
  }
  reiniciar(text){
    this.nombre = '';
    this.documento= '';
    this.cantidad = 1;
    this.ids_temp=[];
    this.total=0;
    this.dataSource=[];
    this.vuelto=0;
    this.efectivo=0;
    text.focus();
  }


  mostrarPopUp(){
    const dialogRef = this.dialog.open(VistaPlatosComponent);
    dialogRef.afterClosed().subscribe(res=>{
      console.log(res);
      if(res){
      this.total= this.total+res.precio;
      var total= res.precio;
      let objetoid={
          id:res.id,
          cantidad:res.peso,
          monto_total:total,
          monto_unitario:res.precio_kilo,
          cantOriginal:100
      }
      this.ids_temp = [...this.ids_temp,objetoid];

  let objeto2={codigo:"1111",descripcion:res.nombre,cantidad:res.peso,precio:res.precio_kilo,subtotal:res.precio};
  this.dataSource = [...this.dataSource,objeto2];
      }
    });
  }
  mostrarPantallaVuelto(){
    const dialogRef = this.dialog.open(PantallaVueltoComponent,{data:this.total});
    dialogRef.afterClosed().subscribe(res=>{
      console.log(res);
      this.vuelto=res.vuelto;
      this.efectivo=res.efectivo;
    });
  }

  createPDF(){
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: [58, 210]
  }) as jsPDFWithPlugin;
    // var vector = [{nombre:'hola',dato:1,cantidad:15},{nombre:'hola',dato:1,cantidad:15},{nombre:'hola',dato:1,cantidad:15}]
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var dia= dd + '/'+mm+'/'+yyyy;
    var hour = today.getHours();
    var minute = today.getMinutes();
    var hora = hour+':'+minute;

    var vector = this.dataSource;
    //CASI PAZ DEL CHACO
    doc.setFontSize(12)
    doc.text("    COMEDOR LO DE VALE",1,5)
        doc.text("         AV.PITIANTUTA",1,10)
        doc.text("     CASI PAZ DEL CHACO",1,15)
        doc.text("================================",1,20)
        doc.text("Fecha:"+dia+"Hora:"+hora,1,25)
        doc.text("Caja: "+this.usuario[0].CajaId,1,30)
        doc.text("Cliente:  "+this.nombre,1,35)
        doc.text("Vendedor:"+this.usuario[0].nombre+' '+this.usuario[0].apellido,1,40)
        doc.text("================================",1,45)
        doc.text("Cant. Producto        SubTotal ",1,50)
        var i:number= 55;
        vector.forEach(element=>{
          doc.text(element.cantidad.toString(),1,i);
          doc.text(element.descripcion,12,i);
          doc.text(element.subtotal.toString(),41,i);
          i=i+5;
        })
        var j: number=i;
        doc.text("================================",1,j)
        doc.text("Total: "+this.total,1,j+5)
        doc.text("Efectivo: "+this.efectivo,1,j+10)
        doc.text("Su vuelto es:"+ this.vuelto,1,j+15)
        doc.text("================================",1,j+20)
        doc.text(" Ticket N°.: ",1,j+25)
        doc.text("================================",1,j+30)
        doc.setFontSize(11)
        doc.text("Muchas gracias por su compra",1,j+35)
    // doc.autoTable({
    //   head: [['Name', 'Email', 'Country']],
    //   body: [
    //     ['David', 'david@example.com', 'Sweden'],
    //     ['Castille', 'castille@example.com', 'Spain'],
    //     // ...
    //   ],
    // })
    doc.autoPrint();
    doc.output('dataurlnewwindow', {filename: 'comprobante.pdf'});    
      }
}
