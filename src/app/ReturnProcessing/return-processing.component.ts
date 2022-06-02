import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { FormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return-processing',
  templateUrl: './return-processing.component.html',
  styleUrls: ['./return-processing.component.css']
})
export class ReturnProcessingComponent implements OnInit {

  public token: any;
  public message : any;
  public status : any;
  public flag:number=0;
  public data: {requestId: number , processingCharge : number,
    packagingandDeliveryCharge : number, dateOfDelivery : any} ={requestId: 0 , processingCharge : 0,
      packagingandDeliveryCharge : 0, dateOfDelivery : ''} ;
  public apidata: {requestId: number , processingCharge : number,
    packagingandDeliveryCharge : number, dateOfDelivery : any} ={requestId: 0 , processingCharge : 0,
      packagingandDeliveryCharge : 0, dateOfDelivery : ''} ;
  

  constructor(private http:HttpClient, public router: Router) {
  // this.token= this.router.getCurrentNavigation().extras.state;
  // console.log(this.token);
   }

  ngOnInit(): void {
    this.token=history.state.token
    console.log(this.token);
  }

  ReturnDetails(returnProcessingForm: NgForm): void {   
    //console.log(returnProcessingForm.value);
    
    console.log(returnProcessingForm.value);
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+this.token,
       skip:"true"
        
    });

         const httpOptions = {
          headers: headers_object
        };

        

    this.http.post('http://20.121.179.95/ProcessResponses/ProcessResponses', returnProcessingForm.value,  httpOptions)
    .subscribe(
      (result)=>{
        
        console.log(result);   
             
        this.processReturn(this.flag,result, this.router);        
      })
      //this.flag=1
  }
  

   processReturn(flag: any, result: any, router: Router) {
     

    this.data=result;
    console.log(result.status);
     this.flag=1;
  }

  CompleteProcessing(returnconfirmationForm: NgForm): void { 

    //console.log(returnconfirmationForm.value);
  
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+this.token,
       skip:"true"
    });

         const httpOptions = {
          headers: headers_object
        };


    this.http.post('http://20.121.179.95/ProcessResponses/CompleteProcessing', this.data,  httpOptions)
    .subscribe(
      (result)=>{
                
        this.processComplete(result, this.router);        
      }) 
  }
  processComplete( result: Object, router: Router) {
    this.message=result
    console.log("result",result);
    this.flag=2;

  }
  

}

