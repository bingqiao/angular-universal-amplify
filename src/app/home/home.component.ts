import { Component, OnInit } from '@angular/core';
import { AwsService } from '../service/aws.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private awsService: AwsService) { }

  ngOnInit() {
  }

  get signInUrl() {
    return this.awsService.signInUrl;  
  }

  signOut() {
    this.awsService.signOut().then();
  }

  get authenticated() {
    return !!this.awsService.currentUserValue;
  }

  callNoAuth() {
    this.awsService.noAuthCall().then(
      (result) => alert(JSON.stringify(result))
    );
  }

  callAuth() {
    this.awsService.authenticatedCall().then(
      (result) => alert(JSON.stringify(result))
    );
  }
}
