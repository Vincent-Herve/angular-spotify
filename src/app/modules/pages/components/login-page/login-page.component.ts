import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginWithSpotifyComponent } from 'src/app/modules/login/components/login-with-spotify/login-with-spotify.component';

@Component({
  selector: 'app-login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, AfterViewInit {
  @ViewChild(LoginWithSpotifyComponent)
  loginWithSpotify: LoginWithSpotifyComponent;

  code: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.code = params['code'];
    });
  }

  ngAfterViewInit(): void {
    this.loginWithSpotify.initLogin(this.code);
  }
}
