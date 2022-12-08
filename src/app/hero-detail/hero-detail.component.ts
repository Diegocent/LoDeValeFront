import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompraService } from 'app/service/compra.service';
import { DescripcionCompraService } from 'app/service/descripcion-compra.service';
import { DescripcionProveedoresService } from 'app/service/descripcion-proveedores.service'
import { ProductosService } from 'app/service/productos.service';
import { type } from 'os';


declare interface Proveedor {
  id:number;
  ruc: number;
  empresa:string;

}
declare interface Producto{
  id:number;
  nombre:string;
  precio_venta:number;
  cantidad:number;
  codigo_barras:string;
}

declare interface Descripcion{
  id:number;
  precio_compra:number;
  Producto:Producto;
  Proveedor:Proveedor;
}

declare interface DatosTabla{
  id:number;
  nombre_producto:string;
  precio_compra:number;
  cantidad:number;
  id_producto:number;
}
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  datos:Producto[]=[];
  cant:number;
  nombre_proveedor:string;
  dataSource: DatosTabla[] = []
  displayedColumns: string[] = ['nombre_producto', 'precio_compra','cantidad']
  registro:DatosTabla[] = []
  productos:Producto[]=[]

  consulta:boolean=true;
  condicional1:boolean = false;
  condicional2:boolean=false;
  seleccionado:number;

  nombreNuevo:string;
  precio_compraNuevo:number;

  constructor(
    public dialogRef: MatDialogRef<HeroDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public id_proveedor:number,
    private descripcionProveedorService: DescripcionProveedoresService,
    private compraService: CompraService,
    private descripcionCompraService: DescripcionCompraService,
    private productosService: ProductosService
  ) { }

  ngOnInit(): void {
    this.actualizar();
  }

  actualizar(){
    this.dataSource=[]
    this.datos=[]
    this.productos=[]
    this.registro=[]
    this.descripcionProveedorService.buscar(this.id_proveedor).subscribe(respuesta=>{
      respuesta.forEach(element => {
        var dato={
          id: element.id,
          cantidad: null,
          precio_compra:element.precio_compra,
          nombre_producto:element.Producto.nombre,
          id_producto:element.Producto.id
        }
        this.dataSource = [...this.dataSource,dato]
        this.datos=[...this.datos,element.Producto]
      });
      this.productosService.getAll().subscribe(res=>{
        let bandera:boolean;
        for(let i = 0;i<res.length;i++){
          bandera=true;
          for(let j=0;j<this.datos.length;j++){
            if(res[i].id==this.datos[j].id){
              bandera=false
              j=this.datos.length
            }
          }
          if(bandera){
          this.productos=[...this.productos,res[i]]
          }
        }
        
      })
      this.nombre_proveedor=respuesta[0].Proveedor.empresa;
      console.log(this.registro,this.dataSource)
    });
  }

  onClickNO(){
    this.dialogRef.close();
  }

  cargarValor(event,id){
    this.registro=[...this.registro,id]
    console.log(id)
  }

  activarCeldas(){
    if(this.consulta){
    this.consulta=false;
  }else{
    this.consulta=true;
  }
  }

  modificarDescripcion(){
    if(this.registro.length>0){
      this.registro.forEach((element,index)=>{
        console.log('el id actual es:', this.dataSource[index].id)
        console.log('el id de antes era:', element.id)
          let dt ={
            precio_compra:this.registro[index].precio_compra,
          }
          this.descripcionProveedorService.update(this.registro[index].id,dt).subscribe(res=>{
            console.log(res)
          })
        
      })
    }
      this.activarCeldas();
      this.actualizar();
  }

  cancelarCarga(){
    this.activarCeldas();
      this.actualizar();
  }
  cargarCompra(){
    var total:number=0;
    var variable:number=0;
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    this.dataSource.forEach(element=>{
      variable = element.cantidad*element.precio_compra;
      total=total+variable;
    })
    if(total!=0){
    this.compraService.create({
        fecha:yyyy+"/"+mm+"/"+dd,
        monto:total,
        ProveedorId:this.id_proveedor,
    }).subscribe(res=>{
        console.log(res);
        this.dataSource.forEach(element => {
          if(element.cantidad!=0){
          var temp = element.cantidad*element.precio_compra;
            this.descripcionCompraService.create({
                monto_unitario:element.precio_compra,
                cantidad:element.cantidad,
                monto_total:temp,
                CompraId:res.id,
                ProductoId:element.id_producto
            }).subscribe(respuesta=>{
                console.log('agregado el siguiente elemento ',respuesta)
            });
          }
        });
        
        let conf:number;
        this.datos.forEach((element,index)=>{
          console.log(this.dataSource[index].precio_compra,typeof(this.dataSource[index].precio_compra))
          let n1= element.cantidad;
          let n2=this.dataSource[index].cantidad;
          conf = +n1 + +n2;
          console.log(conf);
          let datos={
            cantidad:conf,
          }
          if(conf!=n1){
          this.productosService.update(element.id,datos).subscribe(res=>{
            console.log(res)
          })
          }
        })
        this.dialogRef.close(true);
    })
    this.dialogRef.close(true);
  }
  }

  verProductosExistentes(){
    this.condicional1=true;
    this.condicional2=false;
  }

  agregarNuevoProducto(){
    this.condicional1=false;
    this.condicional2=true;
  }

  nuevoProducto(){
    console.log(this.nombreNuevo,this.precio_compraNuevo);
    let dato ={
      nombre:this.nombreNuevo
    }
    this.productosService.create(dato).subscribe(res=>{
      let dato={
        precio_compra:this.precio_compraNuevo,
        ProveedorId:this.id_proveedor,
        ProductoId:res.id
      }
      this.descripcionProveedorService.create(dato).subscribe(respuesta=>{
        console.log('la descripcion creada es',respuesta);
      })
      this.precio_compraNuevo=0;
      this.nombreNuevo='';
      this.actualizar();
      this.condicional2=false;
    })
  }

  nuevaDescripcion(){
    let dato={
      ProveedorId:this.id_proveedor,
      ProductoId:this.seleccionado
    }
    console.log(this.seleccionado)
    this.descripcionProveedorService.create(dato).subscribe(respuesta=>{
      console.log('la descripcion creada es',respuesta);
      this.precio_compraNuevo=0;
      this.nombreNuevo='';
      this.actualizar();
      this.condicional1=false;
    })

  }
}
