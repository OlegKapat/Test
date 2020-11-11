import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.form=new FormGroup({
      name:new FormControl('',Validators.required),
      surname:new FormControl('',Validators.required),
      login:new FormControl('',Validators.required),
      password:new FormControl('', Validators.required),
      email:new FormControl('',[Validators.required, Validators.email]),
      phone:new FormControl('',Validators.required),
      additional:new FormControl('')

    })
  }
  onSubmitRegistration(){
    
  }
}
