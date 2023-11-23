import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;
  public identity: any;
  public token: any;

  constructor(
    public __http: HttpClient
    ) { 
    this.url = global.url;
  }
  
  test() {
    return "servicio ok";
  }

  register(user: any): Observable<any> {
    let json = JSON.stringify(user);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.__http.post(this.url+'register', params, {headers: headers})
  }
  
  login(user: any, getToken = null): Observable<any> {
    if(getToken != null){
      user.getToken = 'true';
    }
    let json = JSON.stringify(user);
    let params = 'login='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.__http.post(this.url+'login', params, {headers: headers})
  }

  update( token: any, user: any): Observable<any>{

    let json = JSON.stringify(user);
    let params = 'update_user='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', `Bearer ${token}`);
    return this.__http.patch(this.url+'auth/user/update', params, {headers: headers})
  }

  password_update( token: any, user: any): Observable<any>{

    let json = JSON.stringify(user);
    let params = 'password='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', `Bearer ${token}`);
    return this.__http.patch(this.url+'auth/user/password', params, {headers: headers})
  }

    // Agregar un nuevo método para actualizar el usuario en el localStorage
  updateLocalStorageUser(updatedUser: any): void {
    // Recuperar el usuario almacenado actualmente en el localStorage
    const storedUser = JSON.parse(localStorage.getItem('identity') || '{}');   
    // Actualizar los campos necesarios del usuario almacenado
    storedUser.name = updatedUser.name;
    storedUser.surname = updatedUser.name;
    storedUser.email = updatedUser.name;
    storedUser.description = updatedUser.description; // Asegúrate de ajustar según la estructura de tu usuario    
    localStorage.setItem('identity', JSON.stringify(storedUser));
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem("identity")!);
      if(identity && identity != "undefined"){
        this.identity = identity;
      }else {
        this.identity = null;
      }
      return this.identity;
  }

  getToken () {
    let token = localStorage.getItem("token");
      if(token && token != "undefined"){
        this.token = token;
      }else {
        this.token = null;
      }
      return this.token;
  }

}