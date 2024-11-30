import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifTileComponent } from './gif-tile.component';

describe('GifTileComponent', () => {
  let component: GifTileComponent;
  let fixture: ComponentFixture<GifTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GifTileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GifTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
