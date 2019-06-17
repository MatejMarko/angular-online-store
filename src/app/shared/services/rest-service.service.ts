import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APIResponse} from '../models/APIResponse';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  private httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  constructor(private http: HttpClient) {
  }

  authHttpRequest(path: string, bodyParams: any = {}): Promise<any> {

    console.log('it\'s happening');
    console.log('it\'s happening');
    console.log('it\'s happening');

    const postUrl = 'http://localhost:4000';
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${postUrl}/${path}`, bodyParams, this.httpOptions).subscribe(
        (data: APIResponse) => {

          if (!data.successful) {
            reject(new Error('Server responded with error code'));
          }
          resolve(data.response);
        },
        (error) => {
          reject(error);
        });
    });
  }
}
