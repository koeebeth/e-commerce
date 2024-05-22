import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import CommerceApiService from './commercetoolsapi.service';

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
