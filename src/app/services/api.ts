import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private apiKey: string = environment.currencyApiKey;

  constructor(private http: HttpClient) { }

  /**
   * Creates common headers for API requests, including the API key.
   *
   * @returns {HttpHeaders} A `HttpHeaders` object containing the required API key.
   */
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`, // Add the API key in the Authorization header
    });
  }

  /**
   * Performs a GET request with optional query parameters.
   *
   * @param {string} url - The endpoint URL (relative or absolute).
   * @param {Record<string, any>} [params] - An optional object containing query parameters.
   * @returns {Observable<T>} The Observable for the HTTP GET request.
   */
  get<T>(url: string, params?: Record<string, any>): Observable<T> {
    const headers = this.createHeaders();
    let httpParams = new HttpParams();

    // Convert the `params` object into HttpParams (if provided)
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined) {
          // Override to get the latest data.
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    return this.http.get<T>(url, { headers, params: httpParams });
  }


}