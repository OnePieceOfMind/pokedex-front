import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { Region } from 'src/app/models/region';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Type } from 'src/app/models/type';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { takeUntil, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PokemonService]
})
export class HomeComponent implements OnInit, OnDestroy {
  page = 1;
  filterForm!: FormGroup;
  regionForm!: FormGroup;
  pokemon: Pokemon[] = [];
  public regionList!: Region[];
  selectedRegions: number[] = [];
  public typeList!: Type[];
  selectedTypes: number[] = [];
  private regionListSubscription: Subscription | undefined;
  private typeListSubscription: Subscription | undefined;
  pageSize = 9;
  pageSizeOptions: number[] = [9, 18, 27, 99];
  searchRegionTerm$ = new Subject<string>();
  private onDestroy$ = new Subject<void>();
  private listSubscription: Subscription | undefined;
  animal!: string;
  name!: string;
  constructor(
    private _pokemonService: PokemonService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.filterForm = this.fb.group({
      regions: [],
      types: [],
      searchText: ''
   });
   
   this.regionForm = this.fb.group({
      regionText: [],
   });

  }

  ngOnInit() {
    this.loadPokemonList();


    this.regionListSubscription = this._pokemonService.getRegion().subscribe(
      (result) => {
        this.regionList = result;
      },
      (error) => {
        console.error('Error fetching region list:', error);
      }
    );

    this.typeListSubscription = this._pokemonService.getTypes().subscribe(
      (result) => {
        this.typeList = result;
      },
      (error) => {
        console.error('Error fetching type list:', error);
      });

      this.filterForm.setValue({
        regions: [],    // valores iniciales de regions
        types: [],      // valores iniciales de types
        searchText: ''  // valor inicial de searchText
      });

      this.regionForm.setValue({
        regionText: [],    // valores iniciales de regions
      });
      
  }

  ngOnDestroy() {
    if (this.regionListSubscription) {
      this.regionListSubscription.unsubscribe();
    }

    if (this.typeListSubscription) {
      this.typeListSubscription.unsubscribe();
    }

    this.regionListSubscription?.unsubscribe();
    this.typeListSubscription?.unsubscribe();
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  openDialog(selectedPokemon: Pokemon): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { pokemon: selectedPokemon },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  filterRegion(regionOption: any) {
    const valueRegion = regionOption.value;
    const isChecked = regionOption.selected;
  
    if (isChecked && !this.selectedRegions.includes(valueRegion)) {
      this.selectedRegions.push(valueRegion);
    } else if (!isChecked && this.selectedRegions.includes(valueRegion)) {
      this.selectedRegions = this.selectedRegions.filter(id => id !== valueRegion);
    }
  
    // Actualizamos la lista solo si hay regiones seleccionadas
    if (this.selectedRegions.length > 0) {
      this.searchRegion();
    } else {
      // Si no hay regiones seleccionadas, cargamos la lista completa
      this._pokemonService.getRegion()
        .subscribe(
          (result: Region[]) => {
            this.regionList = result;
          },
          (error) => {
            console.error('Error obteniendo la lista completa de Pokémon:', error);
          }
        );
    }
  
    this.page = 1;
    this.filterList();
  }
  
  

  filterType(typeOption: any) {
    const valueTypes = typeOption.value;
    const isChecked = typeOption.selected;
  
    if (isChecked && !this.selectedTypes.includes(valueTypes)) {
      this.selectedTypes.push(valueTypes);
    } else if (!isChecked && this.selectedTypes.includes(valueTypes)) {
      this.selectedTypes = this.selectedTypes.filter(id => id !== valueTypes);
    }
    this.page = 1;
    this.filterList();
  }
  
  onSearchRegionKeyUp(): void {
    this.searchRegion();
  }

  onSearchTypeKeyUp(): void {
    console.log('ok')
  }

  onSearchKeyUp(): void {
    this.page = 1;
    this.filterList();
  }

  private loadPokemonList() {
    this.listSubscription = this._pokemonService.list()
      .subscribe(
        result => {
          this.pokemon = result;
        },
        error => {
          console.error('Error fetching Pokémon list:', error);
        }
      );
  }

  filterList(): void {
    if (this.listSubscription) {
      this.listSubscription.unsubscribe();
    }
    
    try {
      const searchText = this.filterForm.get('searchText')?.value;
      const regions = this.selectedRegions;
      const types = this.selectedTypes;
      const filters = {searchText,
                       regions,
                       types
                      }
  
      // Verificar si todos los filtros están vacíos
      if (!searchText && (!regions || regions.length === 0) && (!types || types.length === 0)) {
        // Si todos los filtros están vacíos, mostrar todos los resultados
        this._pokemonService.list()
          .subscribe(
            (result: Pokemon[]) => {
              this.pokemon = result; // Actualiza la lista de Pokémon con todos los resultados
            },
            (error) => {
              console.error('Error obteniendo la lista completa de Pokémon:', error);
            }
          );
        return; // Salir de la función para evitar llamar al servicio de filtrado
      }else{

        this._pokemonService.filterPokemon(filters)
          .subscribe(
            (result) => {
              if(!result){
                this.pokemon = [];
              }else{
                this.pokemon = result.data; // Actualiza la lista de Pokémon con todos los resultados
              }
            },
            (error) => {
              console.error('Error obteniendo la lista completa de Pokémon:', error);
            }
          );
        return;

      }
    
    } catch (error) {
      console.error('Error en filterList:', error);
    }
  }

  searchRegion(): void {
    /*if (this.regionListSubscription) {
      this.regionListSubscription.unsubscribe();
    }*/
    try {
      const regionText = this.regionForm.get('regionText')?.value;
      const selectedRegionsBeforeSearch = [...this.selectedRegions]; // Copia de las regiones seleccionadas
  
      const filters = { regionText };
  
      if (!regionText) {
        this._pokemonService.getRegion()
          .subscribe(
            (result: Region[]) => {
              this.regionList = result;
              this.selectedRegions = selectedRegionsBeforeSearch; // Restaura las regiones seleccionadas
            },
            (error) => {
              console.error('Error obteniendo la lista completa de Pokémon:', error);
            }
          );
      } else {
        this._pokemonService.regionSearch(filters)
          .subscribe(
            (result) => {
              if (!result) {
                this.regionList = [];
              } else {
                this.regionList = result.data;
                this.selectedRegions = selectedRegionsBeforeSearch; // Restaura las regiones seleccionadas
                //console.log( this.selectedRegions );
              }
            },
            (error) => {
              console.error('Error obteniendo la lista completa de Pokémon:', error);
            }
          );
      }
    } catch (error) {
      console.error('Error en filterList:', error);
    }
  }
  

  getPokemonForPage(): any[] {
    if (this.pokemon && Array.isArray(this.pokemon)) {
      const startIndex = (this.page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.pokemon.slice(startIndex, endIndex);
    } else {
      return [];
    }
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    //this.filterList();
  }
  
}
