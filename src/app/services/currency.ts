import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { Api } from './api';
import { environment } from '../../environment';
import { 
  ICurrencyConvertParams, 
  ICurrencyConvertResponse, 
  ICurrencyResponse } from '../models/currency';

@Injectable({
  providedIn: 'root',
})
export class Currency {
  private baseUrl: string = environment.currencyApiBaseUrl;

  /**
   * Returns cached curriences and fetch iff not exist.
   */
  currencyList$ = this.apiService.get<ICurrencyResponse>(`${this.baseUrl}/currencies`)
    .pipe(
      map((data) => data.response),
      shareReplay(1)
    );

  constructor(private apiService: Api) { }

  /**
   * Convert an amount from one currency to another.
   *
   * @param {ICurrencyConvertParams} params - currency convert parameters.
   * @returns {Observable<number>} Observable that emits the conversion result.
   */
  convertCurrency(params: ICurrencyConvertParams): Observable<ICurrencyConvertResponse> {
    const endpoint = `${this.baseUrl}/convert`;
    return this.apiService.get(endpoint, params);
  }
}