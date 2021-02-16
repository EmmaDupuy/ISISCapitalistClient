import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestserviceComponent } from './restservice.component';

describe('RestserviceComponent', () => {
  let component: RestserviceComponent;
  let fixture: ComponentFixture<RestserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
