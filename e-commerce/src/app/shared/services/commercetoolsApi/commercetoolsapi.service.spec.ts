import { TestBed } from '@angular/core/testing';

import { CommercetoolsapiService } from './commercetoolsapi.service';

describe('CommercetoolsapiService', () => {
  let service: CommercetoolsapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommercetoolsapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
