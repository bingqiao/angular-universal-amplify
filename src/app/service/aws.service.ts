import { Injectable } from '@angular/core';
import Amplify, { Auth, Hub, Signer } from 'aws-amplify';
import { awsConfig, config, signInUrl } from './aws-config';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwsService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor() {
    Amplify.configure(awsConfig);
    this.registerHubListener();

    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  async getCredentials() {
    try {
      return Auth.currentCredentials();
    } catch(e) {
      this.currentUserSubject.next(null);
    }
  };

  async isAuthenticated() {
    try {
      await Auth.currentAuthenticatedUser();
    } catch(e) {
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  };

  async authenticatedCall() {
    const credentials = await this.getCredentials();
    const opts = {
      method: "GET",
      path: "/require-auth",
      host: config.apiHost,
      url: `https://${config.apiHost}/require-auth`
    };

    // Get credentials from Auth and sign the request
    const accessInfo = {
      secret_key: credentials.secretAccessKey,
      access_key: credentials.accessKeyId,
      session_token: credentials.sessionToken,
    };
    
    const serviceInfo = { region: config.region, service: 'execute-api' };
    const request = Signer.sign(opts, accessInfo, serviceInfo);
    const fetchOptions = {
      headers: {
        'x-api-key': config.apiKey
      }
    };
    fetchOptions.headers = {...fetchOptions.headers, ...request.headers};

    const response = await fetch(opts.url, fetchOptions);

    if (response.ok) {
      return await response.json();
    } else return { message: response.statusText };
  }
  
  async noAuthCall() {
    const response = await fetch(`https://${config.apiHost}/no-auth`, {
      headers: { "x-api-key": config.apiKey }
    });
    return await response.json();
  }


  registerHubListener = () => {
    const authHandler = async (data) => {
      const { payload } = data;
      if (payload.event !== "signOut" && payload.event !== 'oAuthSignOut') {
        try {
          const user = await Auth.currentAuthenticatedUser();
          this.currentUserSubject.next(user);
        } catch(e) {
          console.log(`Should not try retrieving user with this event: ${payload.event}`);
        }
      }
    }
    Hub.listen("auth", authHandler);
  };

  get signInUrl() {
    return signInUrl;
  }

  signOut = async () => {
    try {
      await Auth.signOut();
    } catch (err) {
      console.error(err);
    } finally {
      this.currentUserSubject.next(null);
    }
  };
  
}
