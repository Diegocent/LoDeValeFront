import { Injectable } from '@angular/core';
declare interface Usuario{
  id:number;
  cedula:string;
  nombre:string;
  apellido:string;
  contraseña:string;
  CajaId:number;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  defecto: Usuario ={
    id:0,
    cedula:"0",
    nombre:"0",
    apellido:"0",
    contraseña:"0",
    CajaId:0
  }
  usuario:Usuario = this.defecto;
  total:number = 0;
  
  constructor() {
   }
  anadirCliente(user: Usuario) {
    this.usuario = user;
  }
  obtenerCliente(){
    return this.usuario;
  }
  cargarMonto(monto:number){
    this.total= this.total + monto;
    console.log('el total actual en el servicio es: ',this.total);
  }
  obtenerTotal(){
    return this.total;
  }
  cerrarSesion(){
    this.usuario = this.defecto;
  }
}