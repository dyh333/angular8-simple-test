import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouModuleComponent } from './you-module.component';

describe('YouModuleComponent', () => {
  let component: YouModuleComponent;
  let fixture: ComponentFixture<YouModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YouModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YouModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
