import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface DevsInfo {
  name: string;
  photoAI: string;
  photoOrig: string;
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
  devsInfo: DevsInfo[] = [
    {
      name: 'Maryana',
      photoAI: '../../../assets/avatars/maryana_ai.jpg',
      photoOrig: '../../../assets/avatars/maryana_orig.jpg',
      icon: '🧐',
      text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy.',
      gitLogo: '../../../assets/github.svg',
      role: 'Front-End Developer',
      link: 'https://github.com/MaruyYak',
    },
    {
      name: 'Angelina',
      photoAI: '../../../assets/avatars/maryana_ai.jpg',
      photoOrig: '../../../assets/avatars/maryana_orig.jpg',
      icon: '🤓',
      text: 'Angelina graduated from the University with a degree in information technology in economics. Since then, she has worked as a master-data analyst. Angelina describes herself as an analytical-minded and disciplined person. So in this project we organized the work in the way that each team member could accomplish various tasks, thereby we learned more different things. As a part of this project Angelina completed tasks such as configuring the project repository, creating layouts for the application pages, routing between pages, creating a detailed product page, writing requests to add and remove items from the cart, updating the Store and much more.',
      gitLogo: '../../../assets/github.svg',
      role: 'Front-End Developer',
      link: 'https://github.com/angelinabz',
    },
    {
      name: 'Liza',
      photoAI: '../../../assets/avatars/liza_ai.jpg',
      photoOrig: '../../../assets/avatars/liza_orig.jpg',
      icon: '😎',
      text: 'Liza started learning programming after graduating from high school, before starting Computer Science studies. She is generally seen as a flexible person and a quick thinker. In creating of this project she was responsible for creating reusable components and forms, designing and implementing some of the pages like profile and cart pages, writing some of the service and store methods etc.',
      gitLogo: '../../../assets/github.svg',
      role: 'Front-End Developer',
      link: 'https://github.com/koeebeth',
    },
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
