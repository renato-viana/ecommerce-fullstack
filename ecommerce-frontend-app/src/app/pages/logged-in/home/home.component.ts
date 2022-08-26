import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserTokenPayload } from 'src/app/models/userTokenPayload';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: UserTokenPayload = {} as UserTokenPayload;

  constructor(private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {
    const user = this.authService.decodePayloadJWT();
    this.user = user !== null ? user : {} as UserTokenPayload;
    console.log("Teste: " + this.user.name);
  }

  openModal(content: any) {
    this.modalService.open(content).result.then((result) => {
      console.log('Modal closed');
    }, (reason) => {
      console.log('Modal dismissed');
    });
  }

}
