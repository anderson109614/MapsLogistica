import { TestBed } from '@angular/core/testing';

import { SocketcliService } from './socketcli.service';

describe('SocketcliService', () => {
  let service: SocketcliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketcliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
