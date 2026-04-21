import { Component, inject, OnInit } from '@angular/core';

import { Auth } from '../../../auth/service/auth';
import { UserResponse } from '../../../auth/interfaces';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-profile',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  public user!: UserResponse;
  private readonly auth = inject(Auth);

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData() {
    this.auth.getUserInfo().subscribe((user) => {
      this.user = user;
    });
  }

}
