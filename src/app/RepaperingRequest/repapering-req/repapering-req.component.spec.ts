import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaperingReqComponent } from './repapering-req.component';

describe('RepaperingReqComponent', () => {
  let component: RepaperingReqComponent;
  let fixture: ComponentFixture<RepaperingReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepaperingReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepaperingReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
