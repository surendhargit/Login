import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
   formdata ={name:"",email:"",password:""};
   submit = false;
   errorMessage="";
   loading=false;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    }
    onSubmit(){
      
      this.loading=true;
      this.auth.register(this.formdata.name,this.formdata.email,this.formdata.password)
      .subscribe({
        next:data=>{
             this.auth.storeToken(data.idToken);
             console.log('Register idtoken is '+ data.idToken);
          

        },
        error:data=>{
          if (data.error.error.message=="INVALID_EMAIL") {
             this.errorMessage = "  invalid Email";
            
          }else if (data.error.error.message=="EMAIL_EXIST ") { 
                this.errorMessage = "Alrady Email Exists! "
            
          }else{
            this.errorMessage = "unknown  error occured when  creating  this account "
          }
        }
        
      }).add(()=>{

        this.loading=false;
        console.log('Register compeleted ')
      })

    }
  }


