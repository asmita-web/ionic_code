import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.page.html',
  styleUrls: ['./loginpage.page.scss'],
})
export class LoginpagePage implements OnInit {

  public logindata:any;
  public getdatabyid:any;
  
 public username
 public password
  constructor(private http: HttpClient,
    private route:Router){}
 

  ngOnInit() {
  }

  submitdata(){
   
    // alert('okk')
    this.http.get('https://retoolapi.dev/B13laa/getusers')
    .subscribe((response)=>{
      this.logindata = response
       this.logindata.map(val=>{
        if(this.username !== val.user_id || this.password !== val.password){
          //  alert('username or password incorrect')
          console.log('false data')
        }
        else{
          this.route.navigate(['./homepage'])
          this.getuserid(val.id) 
          localStorage.setItem('userdata',this.getdatabyid)
          localStorage.setItem('islogin','true')
        
          
        }
       })
     
     
      console.log("data.userdata.username")
      console.log(this.username)
      console.log(this.password)
      console.log("response")
      console.log(response)
    })
    
  }

  getuserid(id){
    this.http.get('https://retoolapi.dev/B13laa/getusers?user_id='+id)
      .subscribe((response)=>{
        this.getdatabyid = response
        localStorage.setItem('userdata',this.getdatabyid)
        console.log("getbyid")
        console.log(response)
      })
    
  }


}
