import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http'

@Component({
  selector: 'app-simple-demo',
  templateUrl: './simple-demo.component.html',
  styleUrls: ['./simple-demo.component.css']
})
export class SimpleDemoComponent implements OnInit {


  ngOnInit() {
  }

}
