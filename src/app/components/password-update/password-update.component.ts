import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent implements OnInit{

  public page_title: string;
  public user: User;
  public status: string;
  public response: string;
  public token: any;
  public identity: any;
  public password_old: string;
  public password_new: string;
  public password_confirm: string;
  public form: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute

  ) {
    this.page_title = 'Ajustes de Usuario';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.status = '';
    this.response = '';
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.password_old = '',
    this.password_new = '',
    this.password_confirm = '',
    this.form = {
      password_old: '',
      password_new: '',
      password_confirm: ''
    };  
  }

  ngOnInit() {

    // Redirigir a la página principal si hay un token
    if (!this.token) {
      this._router.navigate(['']); // Reemplaza 'home' con la ruta de tu página principal
    }
  }

  onSubmit(form: any) {

    this._userService.password_update(this.token, this.form).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = response.status;
          this.response = response.message;
          form.reset();

        }
      },
      error => {
        this.status = error.error.status;
        this.response = error.error.message;
      }
    );
  }

}
