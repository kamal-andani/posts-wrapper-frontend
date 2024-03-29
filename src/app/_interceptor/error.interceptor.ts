import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

/* Interceptor to handle errors from requests */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError( (error: HttpErrorResponse) => {
        if (error){
          switch (error.status){
            case 400:
              if (error.error.errors){
                const modelStateErrors = []
                for(const key in error.error.errors){
                  if (error.error.errors[key]){
                    modelStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modelStateErrors.flat();
              }
              else if(error.error.error){
                this.toastr.error(error.error.error, error.status.toString());
              }
              else{
                this.toastr.error(error.error, error.status.toString());
              }
              break;
            case 401:
              this.toastr.error("Unauthorized", error.status.toString());
              break;
            case 404:
              this.toastr.error("Not Found", error.status.toString());
              break;
            case 500:
              this.toastr.error("Internal Server Error", error.status.toString());
              break;
            default:
              this.toastr.error("Something unexpected went wrong");
              console.log(error);
              break;
          }
        }
        throw error;
      })
    )
  }
}
