import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from 'app/config/app-settings';

const baseUrl = `${URL}/api/cierre/`;


@Injectable({
  providedIn: 'root'
})
export class CierreService {

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}`);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  filtrar(fecha1,fecha2): Observable<any> {
    return this.http.get(`${baseUrl}/?FechaInicio=${fecha1} 00:00:00.000&FechaFin=${fecha2} 23:59:00.000`);
  }

}
