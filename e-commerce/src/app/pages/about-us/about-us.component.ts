import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface devsInfo {
  name: string;
  photo: string;
  icon: string;
  text: string;
  link: string;
  role: string;
  gitLogo: string;
}

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export default class AboutUsComponent {
  devsInfo: devsInfo[] = [
    {
      name: 'Maryana',
      photo: '../../../assets/photo_2023.jpg',
      icon: '🧐',
      text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy.',
      gitLogo: '../../../assets/github.svg',
      role: 'Front-End Developer',
      link: 'https://github.com/MaruyYak',
    },
    {
      name: 'Angelina',
      photo: '../../../assets/photo_2023.jpg',
      icon: '🤓',
      text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy.',
      gitLogo: '../../../assets/github.svg',
      role: 'Front-End Developer',
      link: 'https://github.com/MaruyYak',
    },
    {
      name: 'Liza',
      photo: '../../../assets/photo_2023.jpg',
      icon: '😎',
      text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy.',
      gitLogo: '../../../assets/github.svg',
      role: 'Front-End Developer',
      link: 'https://github.com/MaruyYak',
    },
  ];
}
