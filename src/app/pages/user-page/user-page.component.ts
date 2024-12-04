import { Component, inject, input, type OnInit } from '@angular/core';
import type UserGetById from '../../interfaces/UserGetByIdInterface';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit {

  private userService = inject(UserServiceService);

  user: UserGetById = {
    name: "",
    birthday: new Date(),
    email: "",
    document: ""
  };

 dateToString = this.user.birthday.toLocaleDateString();

  ngOnInit(): void {
    this.userService.getUserById().subscribe({
      next: res => {
        this.user = res; 
      },
      error: err =>{
        console.error(err);
      }
    })
  }
  
}
