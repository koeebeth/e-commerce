import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-unauthorized',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-unauthorized.component.html',
  styleUrl: './profile-unauthorized.component.scss',
})
export default class ProfileUnauthorizedComponent {}
