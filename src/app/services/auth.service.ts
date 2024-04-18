import { HttpClient ,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string="http://localhost:5162/api/User/"
  constructor( private http:HttpClient) {
   }

   signUp(userobj:any){
    return this.http.post<any>(`${this.baseUrl}register`, userobj)
   }

   signin(userobj:any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, userobj).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          // Handle 404 error (user not found)
          alert('User not found');
        }
        return throwError(error);
      })
    )
   }
}
