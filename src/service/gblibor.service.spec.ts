import { TestBed } from '@angular/core/testing';

import { GbliborService } from './gblibor.service';

describe('GbliborService', () => {
  let service: GbliborService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GbliborService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
