import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit{
  
  public page_title: string;
  public user: User;
  public status: string;
  public token: any;
  public identity: any;



  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute

  ) {
    this.page_title = 'Inicia Sesion';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.status = '',
    this.token = null,
    this.identity = null
  }

  ngOnInit() {
    const token = localStorage.getItem('token');

    // Redirigir a la página principal si hay un token
    if (token) {
      this._router.navigate(['']); // Reemplaza 'home' con la ruta de tu página principal
    }

    this.logout();
  }

  onSubmit(form: any) {

    this._userService.login(this.user).subscribe(
      response => {
        if (response.status == 'success') {
          this.status ='success';
          this.token = response.token

          this._userService.login(this.user).subscribe(
            response => {
              this.identity = response.user;

              localStorage.setItem('identity', JSON.stringify(this.identity));
              localStorage.setItem('token', this.token);
              this._router.navigate(['']);
            }
          );
        } else {
          this.status = 'error';
          console.error(response); // Imprime el error en la consola para depuración
        }
      },
      error => {
        this.status = 'error';
        console.error(<any>error); // Imprime el error en la consola para depuración
      }
    );
  }
  logout() {
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        this._router.navigate(['']);

      }
    })
  }
}
