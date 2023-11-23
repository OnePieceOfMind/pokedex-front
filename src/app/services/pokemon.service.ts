import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public url: string;
  
  //public identity: any;
  //public token: any;

  constructor(
    public __http: HttpClient
    ) { 
    this.url = global.url;
  }
  
  test() {
    return "servicio ok";
  }

  list(): Observable<any> {
    return this.__http.get(this.url+'pokemon/')
  }

  show(id: number): Observable<any> {
    return this.__http.get(`${this.url}pokemon/${id}/show`);
  }  

  getRegion(): Observable<any> {
    return this.__http.get(`${this.url}region/`);
  } 

  getTypes(): Observable<any> {
    return this.__http.get(`${this.url}types/`);
  }

  filterPokemon(filters: any): Observable<any> {
    let json = JSON.stringify(filters);
    let params = 'filters='+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.__http.post(`${this.url}pokemon/filter`, params, {headers: headers});
  }

  regionSearch(filters: any): Observable<any> {
    let json = JSON.stringify(filters);
    let params = 'regionSearch='+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.__http.post(`${this.url}region/filter`, params, {headers: headers});
  }

  //filterPokemon(term: string, regions: number[], types: number[]): Observable<any> {
  /*filterPokemon(term: string): Observable<any> {

    if (regions.length > 0) {
      params.regions = regions.join(',');
    }

    if (types.length > 0) {
      params.types = types.join(',');
    }

    return this.__http.get(`${this.url}pokemon/filter/${term}`);
  }*/
  
}
