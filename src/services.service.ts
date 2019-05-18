import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

export interface ServiceDetails {
  name: string;
  type: string;
  desc: string;
  price: number;
  image: string;
}

export interface IdType {
  idType: string;
}



@Injectable()
export class ServicesService {

  constructor(private http: HttpClient, private router: Router) {
    var firebaseConfig = {
      apiKey: "AIzaSyAXY8b8nzGuZyipX-WtoUa_qemKIZnkSfk",
      authDomain: "myservices-123.firebaseapp.com",
      databaseURL: "https://myservices-123.firebaseio.com",
      projectId: "myservices-123",
      storageBucket: "myservices-123.appspot.com",
      messagingSenderId: "777087620663",
      appId: "1:777087620663:web:8234ff1ad806bcb6"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  public addService2(service: ServiceDetails): Promise<any> {
    return new Promise((resolve) => {
      console.log(service);
      this.http.post('/api/addService', service).subscribe(() => {
        console.log('service added');
        resolve()
      });
    })
  }

  public modifyService(image, service: ServiceDetails,id): Promise<any> {
    if(image !== 'assets/images/service.jpg'){
      const storageRef = firebase.storage().refFromURL(image)
      storageRef.delete().then(
        () => {
          console.log('Last image removed')
        },
        (error) => {
          console.log('Could not remove photo! : ' + error)
        }
      )
    }

    return new Promise((resolve) => {
      console.log(service);
      this.http.put('/api/modifyService/'+id, service).subscribe(() => {
        console.log('service modified');
        resolve()
      });
    })
  }


  public getTypes(): Observable<any> {
    return this.http.get('/api/typeServices');
  }

  public getServices(): Observable<any> {
    return this.http.get('/api/getServices');
  }

  public getAservice(id): Observable<any> {
    return this.http.get('/api/getService/'+id);
  }

  public LibelleOfServices(idType): Observable<any>{
    return this.http.get('/api/LibelleOfServices/'+idType)
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const UniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + UniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
            console.log('Uploading ...');
          },
          (error) => {
            console.log('Error while uploading the file : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          })
      }
    )
  }

  public delete(name, image): Observable<any> {
    if(image !== 'assets/images/service.jpg'){
      const storageRef = firebase.storage().refFromURL(image)
      storageRef.delete().then(
        () => {
          console.log('Image removed')
        },
        (error) => {
          console.log('Could not remove photo! : ' + error)
        }
      )
    }
    return this.http.delete('/api/deleteServices/'+name)
  }
}
