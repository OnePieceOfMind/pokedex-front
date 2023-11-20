import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-show-pokemon',
  templateUrl: './show-pokemon.component.html',
  styleUrls: ['./show-pokemon.component.css'],
  providers: [PokemonService]
})
export class ShowPokemonComponent implements OnInit{

  id: number;
  public pokemon: any;
  private sub: any;
  constructor(private route: ActivatedRoute,

    private _pokemonService: PokemonService){
    this.id = 1;
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this._pokemonService.show(this.id)
        .subscribe(response => {
          this.pokemon = response.data;
          console.table(this.pokemon);
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe(); 
  }
}
