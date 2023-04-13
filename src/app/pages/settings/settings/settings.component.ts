import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth/auth.service";
import {ObservableExampleService} from "../../../services/testing/observable-example.service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  oldPassword:string;
  newPassword:string;
  confirmPassword:string;
  isTouched:boolean = false;
  private subjectScope: Subject<string> = this.testing.getSubject();
  private subjectUnsubscribe: Subscription = this.subjectScope.subscribe((data) => {
    console.log('data1', data)
  });

  constructor(private authService:AuthService,
              private messageService:MessageService,
              private testing: ObservableExampleService
              ) { }

  ngOnInit(): void {
    this.subjectScope.subscribe((data) => {
      console.log('data2 Subject', data)
    });
    setTimeout(() => {
      this.subjectScope.next('subject value');
    }, 3000)

  }

  ngOnDestroy(): void{
    this.subjectUnsubscribe.unsubscribe();
  }



  changePassword(){
    this.isTouched=true;
    if (this.confirmPassword!=this.newPassword) return;
    const res =this.authService.changePassword(this.oldPassword,this.newPassword);
    if(res){
      this.messageService.add({
        severity: 'success',
        summary: `Пароль успешно изменен`,
      });
      this.isTouched=false;
      this.oldPassword='';
      this.newPassword='';
      this.confirmPassword='';
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Пароль не удалось изменить',
      });
    }

  }
}
