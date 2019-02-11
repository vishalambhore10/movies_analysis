import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { movieDetail} from './movieDetail';
import { Subscriber } from 'rxjs';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Movie-Analysis';
  public movies:movieDetail[];
  search:string;
  onsearch:false;
  whicharr:movieDetail[];
  searchMovies:movieDetail[];
  firstItemIndex:number=0;
  lastItemIndex:number=10;
  totalIndex:number;
  indexes:number=1;
  p: number = 1;
  multiclass={
    bgdark:false
  }
  
  constructor(private DataService:DataService){
    
  }
  ngOnInit(){
    this.DataService.getData()
      .subscribe((data)=>{
        this.movies=data;
        this.whicharr=data;
        this.totalIndex=this.movies.length;
      })
   
  }
  counter(i:number){
    return new Array(i);
  }

  

  onSearchChange(e){
  if(e!==''){
          this.searchMovies = [];
          this.movies.map((movie,i)=>{
          if(movie.movie_title.toLowerCase().match(e.toLowerCase())){
            this.searchMovies.push(movie)
          }
        })
        this.whicharr=this.searchMovies;
        
    }
  else
    this.whicharr=this.movies;
  }
  theme(s){
    if(s=='dark'){
      this.multiclass.bgdark=true;
      
    }
    else{
      this.multiclass.bgdark=false;
    }
  }

  prepage(){
    if(this.p>1){
      this.firstItemIndex-=10;
      this.lastItemIndex-=10;
      this.p--;
      console.log(this.p)
    }
  }
  nextpage(){
    if(this.p<=(this.totalIndex/10-1)){
      this.firstItemIndex+=10;
      this.lastItemIndex+=10;
      this.p++;
      console.log(this.p);
      
    }
    
  }
  page(i:number){
   if(!(i<1 || i>Math.floor(this.totalIndex/10))){
      this.firstItemIndex=10*(i);
      this.lastItemIndex=10+this.firstItemIndex;
      
      this.p=i;
      console.log(this.p)
   }
  }

  firstpage(){
    this.firstItemIndex=0;
    this.lastItemIndex=10;
    this.p=1;
  }
  lastpage(){
    this.firstItemIndex=this.totalIndex-9;
    this.lastItemIndex=this.totalIndex;
    this.p=Math.floor(this.totalIndex/10);
    
  }
  front(){
    if(this.p>=6){
      this.page(this.p-=5)
      
    }
  }
  back(){
    if(this.p<=(this.totalIndex/10-5)){
       this.page(this.p+=4);
       this.indexes+=5;
    }
  }

  asnname=true;
  asnyear=true;
  asnbudget=true;
  mysort(){
    if(this.asnbudget)
      this.movies.sort((a,b)=>parseInt(a.budget)-parseInt(b.budget))
    else
      this.movies.sort((a,b)=>parseInt(b.budget)-parseInt(a.budget))
    this.asnbudget=!this.asnbudget;
  }
  sortyear(){
    if(this.asnyear)
      this.movies.sort((a,b)=>parseInt(a.title_year)-parseInt(b.title_year))
    else
     this.movies.sort((a,b)=>parseInt(b.title_year)-parseInt(a.title_year))
    this.asnyear=!this.asnyear;
  }
  sortname(){
    if(this.asnname)
      this.movies.sort((a,b)=>( a.movie_title).localeCompare(b.movie_title))
    else
      this.movies.sort((a,b)=>-( a.movie_title).localeCompare(b.movie_title))
    this.asnname=!this.asnname;
  }

}
