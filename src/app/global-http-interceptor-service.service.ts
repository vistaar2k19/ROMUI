
import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})


export class GlobalHttpInterceptorService implements HttpInterceptor {
 
  constructor(public router: Router) {
  }
 
  //1.  No Errors
  intercept1(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error in intercept')
        console.error(error);
        return throwError(() => new Error(error.message));
      })
    )
  }
 
  //2. Sending an Invalid Token will generate error
  intercept2(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    const token: string = 'invald token';
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
 
    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error in intercept')
        console.error(error);
        return throwError(() => new Error(error.message));
      })
    )
  }
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    const token: string = 'invald token';
    
    req.headers.getAll
    if (req.headers.get("skip"))
           return next.handle(req)

    //req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    
 
    return next.handle(req).pipe(
      catchError((error) => {
 
        let handled: boolean = false;
        console.error(error);
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("Error Event");
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 401:      //login
                this.router.navigateByUrl("/");
                console.log(`redirect to login`);
                alert(error.status+" : Invalid Login")
                handled = true;
                break;
              case 403:     //forbidden
                this.router.navigateByUrl("/login");
                console.log(`redirect to login`);
                handled = true;
                break;
            }
          }
        }
        else {
          console.error("Other Errors");
        }
 
        if (handled) {
          console.log('return back ');
          return of(error);
        } else {
          alert(error.status+" : Error occured")
          return throwError(() => new Error(error.message));
        }
 
      })
    )
  }
}