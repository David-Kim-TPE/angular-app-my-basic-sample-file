import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HomeService {

  constructor(private httpClient: HttpClient, private http: Http) {
  }

  checkWallet() {
    return this.httpClient.get('/api/wallet', { withCredentials: true })
      .catch(this.handleError)
      .toPromise();
  }

  signUp(data) {
    const participantUser = {
      $class: 'org.example.basic.SampleParticipant',
      'participantId': data.id,
      'firstName': data.firstName,
      'lastName': data.surname
    };

    return this.httpClient.post('http://localhost:3001/api/SampleParticipant', participantUser).toPromise()
      .then(() => {
        const identity = {
          participant: 'org.example.basic.SampleParticipant#' + data.id,
          userID: data.id,
          options: {}
        };

        return this.httpClient.post('http://localhost:3001/api/system/identities/issue', identity, { responseType: 'blob' }).toPromise();
      })
      .then((cardData: Blob) => {
        console.log('CARD-DATA', cardData);
        const file = new File([cardData], 'myCard.card', { type: 'application/octet-stream', lastModified: Date.now() });

        const formData = new FormData();
        formData.append('card', file);

        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        return this.httpClient.post('/api/wallet/import', formData, {
          withCredentials: true,
          headers
        }).toPromise();
      });
  }


  getCurrentUser() {
    return this.httpClient.get('/api/system/ping', { withCredentials: true })
      .toPromise()
      .then((data) => {
        return data['participant'];
      });
  }

  getUserCard(cardName) {
    return this.httpClient.get('/api/wallet/'+cardName+'/export', { withCredentials: true })
      .toPromise()
      .then((result:Blob) => {
        console.log('getUserCard() result:', result);
        return result;
      });
  }

  private handleError(error: any): Observable<string> {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
