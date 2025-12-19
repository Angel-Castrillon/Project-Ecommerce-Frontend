import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductCatalogService } from './product-catalog.service';

describe('ProductCatalogService', () => {
  let service: ProductCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductCatalogService]
    });
    service = TestBed.inject(ProductCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
