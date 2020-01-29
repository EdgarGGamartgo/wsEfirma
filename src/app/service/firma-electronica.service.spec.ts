import { TestBed } from '@angular/core/testing';

import { FirmaElectronicaService } from './firma-electronica.service';

describe('FirmaElectronicaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirmaElectronicaService = TestBed.get(FirmaElectronicaService);
    expect(service).toBeTruthy();
  });
});
