import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-google-button',
  imports: [],
  templateUrl: './google-button.component.html',
  styleUrl: './google-button.component.css',
})
export class GoogleButtonComponent {
  @Input({ required: true }) isSignIn: boolean = true;
  @Input({ required: true }) onTap: () => Promise<void> = async () => {
    console.warn('onTap function not provided to GoogleButtonComponent');
  };
}
