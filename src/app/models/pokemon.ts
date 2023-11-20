export class Pokemon{
    constructor(
        public id: number,
        public code: string,
        public name: string,
        public image: string,
        public pokemon_region_id: number,
        public description: string,
        public created_at: any,
    ){}
    
}
export interface Pokemon {
    // Otras propiedades del Pokemon
    types?: Type[]; // Asegúrate de tener una propiedad llamada 'types' que es un array de objetos 'Type'
    pokemon_region?: PokemonRegion; // Asegúrate de tener una propiedad llamada 'pokemon_region' que es un objeto 'PokemonRegion'
  }
  
  export interface Type {
    name: string;
    image: string;
    color: string;
    // Otras propiedades de Type si las tienes
  }
  
  export interface PokemonRegion {
    name: string;
    // Otras propiedades de PokemonRegion si las tienes
  }
