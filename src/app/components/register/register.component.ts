import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit{
  
  public page_title: string;
  public user: User;
  public status: string;
  public token: any;

  constructor(
    private _userService: UserService,
    private _router: Router,

  ) {
    this.page_title = 'Registrate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.status = '';
  }

  ngOnInit() {
    const token = localStorage.getItem('token');

    // Redirigir a la página principal si hay un token
    if (token) {
      this._router.navigate(['']); // Reemplaza 'home' con la ruta de tu página principal
    }
  }

  onSubmit(form: any) {
    this._userService.register(this.user).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          console.log(response);
          form.reset();
        } else {
          this.status = 'error';
          console.error(response); // Imprime el error en la consola para depuración
        }
      },
      error => {
        this.status = 'error';
        console.error(error); // Imprime el error en la consola para depuración
      }
    );
  }
  
}