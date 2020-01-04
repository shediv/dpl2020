import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { DragdropService } from "../dragdrop.service";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})

export class PlayerFormComponent implements OnInit {

  complexForm : FormGroup;
  progress: number = 0;
  msg: String;
  formSubmitted: Boolean = false;

  constructor(
    fb: FormBuilder,
    public dragdropService: DragdropService){
    this.complexForm = fb.group({
      'firstName' : [null, Validators.required],
      'middleName': "",
      'lastName': "",
      'day': "",
      'month': "",
      'year': "",
      'mobile': "",
      'wado': "",
      'panchayat': "",
      'taluka': "",
      'lastDPL': "",
      'gdsClub': "",
      'batting' : false,
      'bowling' : false,
      'wk' : false,
      'registrationDate': new Date(),
      'photo': localStorage.getItem('userImage'),
      'paymentPerson': ""
    })
  }

  ngOnInit() { }

  submitForm(value: any){
    console.log(value);

    // Upload to server
    this.dragdropService.addPlayer(value)
    .subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Player Registered ! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('Player Registered successfully!', event.body);
          this.formSubmitted = true;
          setTimeout(() => {
            this.progress = 0;
            this.msg = "Player Registered successfully!"
          }, 3000);
      }
    })
  }

}
