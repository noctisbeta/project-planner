import { TestBed } from '@angular/core/testing';

import { FirestoreProjectsService } from './firestore-projects.service';

describe('FirestoreProjectsService', () => {
  let service: FirestoreProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
