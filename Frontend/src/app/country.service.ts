// country.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1'; // Base URL for the REST Countries API

  constructor(private http: HttpClient) {}

  getCountryDetails(countryName: string): Observable<any> {
    const url = `${this.baseUrl}/name/${countryName}`;
    return this.http.get(url);
  }
}
