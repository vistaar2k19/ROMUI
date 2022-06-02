import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReturnProcessingComponent } from './ReturnProcessing/return-processing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { GlobalHttpInterceptorService } from './global-http-interceptor-service.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReturnProcessingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [ { provide: HTTP_INTERCEPTORS,    useClass: GlobalHttpInterceptorService,    multi: true  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
