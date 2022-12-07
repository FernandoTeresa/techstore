import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultirangeComponent } from './multirange.component';

describe('MultirangeComponent', () => {
  let component: MultirangeComponent;
  let fixture: ComponentFixture<MultirangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultirangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultirangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
