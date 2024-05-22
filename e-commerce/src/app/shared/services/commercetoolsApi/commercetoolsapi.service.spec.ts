import { TestBed } from '@angular/core/testing';

import CommerceApiService from './commercetoolsapi.service';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';

describe('CommercetoolsapiService', () => {
  let service: CommerceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideStore()],
    });
    service = TestBed.inject(CommerceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
