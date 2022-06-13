import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  public filterdata=""
  public datalist:any
  public id;
  public getiddata
  public newarraydata=[]
  public detailpage = false
  // public managepage = true
  constructor(private http:HttpClient,
    private route:Router) { }
 

  ngOnInit() {
    this.getemployeedata()
  }

  getemployeedata(){
    this.http.get('https://retoolapi.dev/GFHqAV/getemployees')
    .subscribe((response)=>{
      this.detailpage = false
      this.datalist = response;
      this.id = this.datalist.id
      console.log(response);
    })
  }

  getemployeebyid(id){
    this.detailpage = true
    this.route.navigate(['./homepage',id])
    this.http.get('https://retoolapi.dev/H2F0Ui/getemployedetail?id='+id)
    .subscribe((response)=>{
      this.getiddata = response;
      console.log(response)
    })
  }

  backmanagepage(){
    this.detailpage = false
  }
 
  searchdata(){
  this.datalist.filter(val=>{
   if(val.name.toLowerCase().search(this.filterdata.toLowerCase()) !== -1 ||
    val.company.toLowerCase().search(this.filterdata.toLowerCase()) !== -1||
    val.designation.toLowerCase().search(this.filterdata.toLowerCase()) !== -1
    )
    {
       this.newarraydata = val
      return true
    }
    else{
      return false
    }
  })
  this.newarraydata = this.datalist
  console.log(this.newarraydata)
  console.log("this.filterdata")
  console.log(this.filterdata)
  }
 
  logout(){
    localStorage.clear();
    this.route.navigate(['./login'])
    // location.reload()
  }

}
