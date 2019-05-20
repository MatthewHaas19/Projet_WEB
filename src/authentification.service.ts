import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {Token} from '@angular/compiler';
import {WorkerDetails} from './WorkerAuth.service';
import {error} from '@angular/compiler/src/util';

export interface UserDetails {
  id: number
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
  city: string
  address: string
  code: string
  isAdmin: string
  image: string
  exp: number
  iat: number
}

interface TokenResponse{
  token: string;
}


export interface TokenPayload{
  id: number
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
  city: string
  address: string
  code: string
}

@Injectable()
export class AuthentificationService {
  private token: string

  constructor(private http: HttpClient, private router: Router){}

  private saveToken(token: string): void {
    localStorage.setItem('userToken', token)
    this.token = token
  }

  private getToken(): string {
    if(!this.token){
      this.token = localStorage.getItem('userToken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if(token){
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    }else{
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if(user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  public isAdmin(): boolean {
    const user = this.getUserDetails()

    if(user) {
      if(user.isAdmin === 'true'){
        return true
      }
      else{
        return false
      }
    } else {
      return false
    }
  }

  public register(user: TokenPayload) : Observable<any> {
    const base = this.http.post('/api/register',user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if(data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )
    return request
  }

  public login(user: TokenPayload) : Observable<any> {
    const base = this.http.post('/api/login',user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if(data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )
    return request
  }

  public profile(): Observable<any> {
    return this.http.get('/api/profile', {
      headers: { Authorization: `${this.getToken()}` }
    })
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('userToken')
    this.router.navigateByUrl('/')
  }

  public userById(id): Observable<any> {
    return this.http.get('/api/userById/'+id)
  }

  public getReview(idUser): Observable<any> {
    return this.http.get('/api/user-reviews/' + idUser)
  }

  public getReviewCount(idUser): Observable<any> {
    return this.http.get('/api/user-reviews-count/' + idUser)
  }

  public modify(id, image): Observable<any> {
    return this.http.put('/api/modify/' + id, {img: image})
  }

}
