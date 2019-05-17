import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {Token} from '@angular/compiler';

export interface WorkerDetails {
  id: number
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
  exp: number
  iat: number
}

interface TokenResponse{
  token: string
}

export interface TokenPayload{
  id: number
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
}

@Injectable()
export class WorkerAuthService {
  private token: string

  constructor(private http: HttpClient, private router: Router){}

  private saveToken(token: string): void {
    localStorage.setItem('workerToken',token)
    this.token = token
  }

  private getToken(): string {
    if(!this.token){
      this.token = localStorage.getItem('workerToken')
    }
    return this.token
  }

  public getWorkerDetails(): WorkerDetails {
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
    const user = this.getWorkerDetails()
    if(user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }


  public register(user: TokenPayload) : Observable<any> {
    const base = this.http.post('/api/WorkerRegister',user)

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
    const base = this.http.post('/api/WorkerLogin',user)

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
    return this.http.get('/api/WorkerProfile', {
      headers: { Authorization: `${this.getToken()}` }
    })
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('workerToken')
    this.router.navigateByUrl('/worker-login')
  }

  public workerById(id): Observable<any> {
    return this.http.get('/api/workerById/'+id)
  }

  public addReview(review): Observable<any> {
    return this.http.post('/api/worker-review',review)
  }

}
