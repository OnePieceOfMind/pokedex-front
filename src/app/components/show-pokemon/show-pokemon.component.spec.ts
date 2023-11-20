import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPokemonComponent } from './show-pokemon.component';

describe('ShowPokemonComponent', () => {
  let component: ShowPokemonComponent;
  let fixture: ComponentFixture<ShowPokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowPokemonComponent]
    });
    fixture = TestBed.createComponent(ShowPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
