import { Component, HostListener  } from '@angular/core';
import { UserService } from './services/user.service';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, PokemonService]
})
export class AppComponent {
  title = 'curso-angular-front';
  public isCollapsed : boolean = true;
  public identity: any;
  public token: any;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const footer = document.querySelector('.transition-footer');
    if (footer) {
      if (window.scrollY > 50) { // Ajusta este valor según cuánto quieras que el usuario haga scroll antes de que desaparezca el footer
        footer.classList.add('hidden');
      } else {
        footer.classList.remove('hidden');
      }
    }
  }
  
  constructor(
    public _userService: UserService
  ){
    this.loadUser();

  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}

