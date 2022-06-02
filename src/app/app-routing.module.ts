import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReturnProcessingComponent } from './ReturnProcessing/return-processing.component';


const routes: Routes = [
  {path :'', component : LoginComponent },
  {path :'\ReturnProcessing', component : ReturnProcessingComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
