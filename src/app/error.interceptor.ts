import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred. Please try again later.';

        if (error.status !== 200) {
          debugger;
          if (error.error && error.error.detail) {
            errorMessage = error.error.detail;
          } else {
            if (error.status === 400) {
              errorMessage = 'Bad request. Please check your input data.';
            } else if (error.status === 404) {
              errorMessage = 'The requested resource was not found.';
            } else if (error.status === 500) {
              errorMessage = 'Server error. Please try again later.';
            }
          }

          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
            panelClass: ['snack-bar-error']
          });
        }

        return throwError(error);
      })
    );
  }
}
