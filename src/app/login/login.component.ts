import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient, public router: Router) { }

  ngOnInit(): void {
  }

  LoginDetails(loginForm: NgForm): void {   
    console.log(loginForm.value);
    this.http.post('http://52.188.44.204/UserLogin/authenticate', loginForm.value )
    .subscribe(
      (result)=>{
        console.log("result",result);        
        processlogin(result, this.router);        
      })      
  }
}


function processlogin(result: any, router: Router) {
  
  let  token:any;
  let message: any ="Invalid";
  let userName:any;
  let error:any;

  token=result.token;
  message=result.message;

  if(message == "valid") 
  {
    let jwtData = token.split('.')[1]
     let decodedJwtJsonData = window.atob(jwtData)
     let decodedJwtData = JSON.parse(decodedJwtJsonData)

    userName = decodedJwtData.unique_name;
    console.log(userName);
    
    router.navigateByUrl('ReturnProcessing', { state: {token : token }})

  }
  else alert("Invalid Credentials");
}
/**
 * name
 */

