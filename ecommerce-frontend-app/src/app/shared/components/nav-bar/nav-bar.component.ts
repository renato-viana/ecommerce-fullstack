import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { UserTokenPayload } from 'src/app/models/userTokenPayload';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  faShoppingCart = faShoppingCart;
  userTokenPayload: UserTokenPayload | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userTokenPayload = this.authService.decodePayloadJWT();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }

}
