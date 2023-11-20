import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
  providers: [UserService]

})
export class UserUpdateComponent implements OnInit{
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
    this.page_title = 'Ajustes de Usuario';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.status = '';
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();

    this.user = new User(
      this.identity.id,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email, '',
      this.identity.description,
      this.identity.image,
      );
  }

  ngOnInit() {
  }

  onSubmit(form: any) {

    this._userService.update(this.token, this.user).subscribe(
      
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          console.log(response.data);
          this._userService.updateLocalStorageUser(response.data);
          //form.reset();

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
