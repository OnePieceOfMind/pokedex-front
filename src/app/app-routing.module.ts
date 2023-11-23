import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { ShowPokemonComponent } from './components/show-pokemon/show-pokemon.component';
import { PasswordUpdateComponent } from './components/password-update/password-update.component';

const routes: Routes = [

  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'logout/:sure',component:LoginComponent},
  {path:'register',component:RegisterComponent },
  {path:'user-data',component:UserUpdateComponent },
  {path:'password-reset',component:PasswordUpdateComponent },
  {path:'pokemon/:id',component:ShowPokemonComponent },
  {path:'**',component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
