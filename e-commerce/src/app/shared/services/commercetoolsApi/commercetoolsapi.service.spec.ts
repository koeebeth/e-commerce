import { TestBed } from '@angular/core/testing';

import CommerceApiService from './commercetoolsapi.service';

describe('CommercetoolsapiService', () => {
  let service: CommerceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommerceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
