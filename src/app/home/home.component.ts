/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private authenticated = false;
  private loggedIn = false;

  private currentUser;
  private cardUrl;
  private signUpInProgress = false;

  private signUp = {
    id: '',
    firstName: '',
    surname: '',
  };

  constructor(private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService) {
  }

  ngOnInit() {
    console.log('onInit()');
    this.route
      .queryParams
      .subscribe((queryParams) => {
        const passportloggedIn = queryParams['loggedIn'];
        if (passportloggedIn) {
          this.authenticated = true;
          console.log('authenticated: '+ this.authenticated);
          console.log('passportloggedIn: ' + passportloggedIn);
          return this.router.navigate(['/'])
            .then(() => {
              return this.checkWallet();
            });
          
         //this.checkWallet();
        }
      });
      console.log('this.loggedIn: ' + this.loggedIn);
      console.log('this.authenticated: ' + this.authenticated);
  }

  checkWallet() {
    console.log('checkWalet()');
    return this.homeService.checkWallet()
      .then((results) => {
        console.log('checkWallet() results: ', results)
        if (results['length'] > 0) {
          this.loggedIn = true;
          const cardName = results[0].name;
          console.log('cardName: ' + cardName);
          console.log('this.loggedIn: ' + this.loggedIn);
          
          //return this.getCurrentUserAndCard(cardName);
          return this.getCurrentUser();
          
        } 
      })
      .catch(error => { 
        this.loggedIn = false;
        console.log('checkWalet()');
        console.log('this.loggedIn: ' + this.loggedIn);
        console.log('this.authenticated: ' + this.authenticated);
        console.log('error: ' + error) 
      }
      );
  }

  onSignUp() {
    this.signUpInProgress = true;
    return this.homeService.signUp(this.signUp)
      .then(() => {
        return this.getCurrentUser();
      })
      .then(() => {
        this.loggedIn = true;
        this.signUpInProgress = false;
      });
  }

  getCurrentUser() {
    return this.homeService.getCurrentUser()
      .then((currentUser) => {
        console.log('getCurrentUser(): ', currentUser);
        this.currentUser = currentUser;
      });
  }

  getUserCard(cardName) {
    return this.homeService.getUserCard(cardName)
      .then((cardUrl) => {
        console.log('cardUrl: ' + cardUrl);
        this.cardUrl = cardUrl;
      })
  }

  getCurrentUserAndCard(walletName) {
    this.getCurrentUser();
    this.getUserCard(walletName);
  }
}
