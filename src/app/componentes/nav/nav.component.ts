import { Component, OnInit,Inject , Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }
  ngOnInit(): void {
  }
  onClickSalir(){
    this.storage.set('Usuario',null);
  }

}
