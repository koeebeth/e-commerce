import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface DevsInfo {
  name: string;
  photoAI: string;
  photoOrig: string;
  icon: string;
  biography: string;
  contribution: string;
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
      biography:
        'Marianna is a former business analyst, consequently, she assumed the role of team leader. Her skills in requirements management and experience working with development teams in an agile environment helped in process mapping and enabled her to develop efficient workflows.',
      contribution:
        'Maryana configured CommerceTools processes and was responsible for managing the CommerceTools platform, including implementing server requests to retrieve key data such as tokens, logins, registrations, products, and more. She also developed the catalog product page with filters, sorting, pagination options, and an About page, and implemented promo code functionality. Quickly mastering complex tasks such as server configuration, she also led the implementation of creative ideas and solutions.',
      gitLogo: '../../../assets/github.svg',
      role: 'Front-End Developer',
      link: 'https://github.com/MaruyYak',
    },
    {
      name: 'Angelina',
      photoAI: '../../../assets/avatars/angelina_ai.jpg',
      photoOrig: '../../../assets/avatars/angelina_orig.jpg',
      icon: '🤓',
      biography:
        'Angelina graduated from the University with a degree in information technology in economics. Since then, she has worked as a master-data analyst. Angelina describes herself as an analytical-minded and disciplined person.',
      contribution:
        'As a part of this project Angelina completed tasks such as configuring the project repository, creating layouts for the application pages, routing between pages, creating a detailed product page, implementing sliders and zoom functionality on this page, writing requests to add and remove items from the Cart, updating the Store and much more. She is a master of code attention to detail, she not only writes clean, error-free code but also diligently notices and raises concerns about potential issues.',
      gitLogo: '../../../assets/github.svg',
      role: 'Front-End Developer',
      link: 'https://github.com/angelinabz',
    },
    {
      name: 'Liza',
      photoAI: '../../../assets/avatars/liza_ai.jpg',
      photoOrig: '../../../assets/avatars/liza_orig.jpg',
      icon: '😎',
      biography:
        'Liza started learning programming after graduating from high school, before starting Computer Science studies. She is generally seen as a flexible person and a quick thinker.',
      contribution:
        'In creating of this project she was responsible for creating key and reusable components and forms for Login and Registration pages. She implemented validation functionality for these forms and designed and implemented pages such as Categories, Profile and Cart. Additionally, she wrote complex service and store methods for the Profile page, handling tasks such as updating user data and addresses. Also developed the main functionality for the Cart page. Liza is a guru in writing concise, understandable, and readable reusable code.',
      gitLogo: '../../../assets/github.svg',
      role: 'Front-End Developer',
      link: 'https://github.com/koeebeth',
    },
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
