import { TestBed } from '@angular/core/testing';

import AuthService from './commercetoolsapi.service';

describe('CommercetoolsapiService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
