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
  usuario:Usuario;
  total:number = 0;
  constructor() { }
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
}