import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import EditProfileComponent from './edit-profile/edit-profile.component';
import ChangePasswordComponent from './change-password/change-password.component';
import ButtonComponent from '../../shared/components/button/button.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, EditProfileComponent, ChangePasswordComponent, ButtonComponent, ManageAddressComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export default class EditUserComponent {
  editMode: 'personal-info' | 'password' | 'address' = 'personal-info';

  @Output() closeHandler = new EventEmitter();

  changeMode(mode: 'personal-info' | 'password' | 'address') {
    this.editMode = mode;
  }

  onClose() {
    this.closeHandler.emit();
  }
}
