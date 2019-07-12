import { TestBed } from '@angular/core/testing';

import { AwsService } from './aws.service';

describe('AwsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsService = TestBed.get(AwsService);
    expect(service).toBeTruthy();
  });
});
