import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FirmaElectronicaResponse } from '../model/firma-electronica.model';
import payload from '../payload';

@Injectable({
  providedIn: 'root'
})
export class FirmaElectronicaService {

  constructor(private http: HttpClient) { }


  postPdf(firmaElectronicaForm): Observable<HttpResponse<FirmaElectronicaResponse>> {
    return this.http.post<FirmaElectronicaResponse>('http://localhost:8086/ws/efirma', firmaElectronicaForm, { observe: 'response' })
      .pipe(retry(3), catchError(this.handleError));
  }

 

  private handleError(error: HttpErrorResponse) {
    let message;
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      message = 'Ha ocurrido un error, por favor intentelo más tarde.';
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      message = error.error.descripcion;
    }
    // return an observable with a user-facing error message
    return throwError(message);
  }
}
