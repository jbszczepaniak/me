import { Component } from '@angular/core';

export class Section {
  title: string;
  collapsed: boolean;
  items: Item[];
}
export class Item {
  title: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'app';
  public sections: Section[];

  public ngOnInit() {
    this.sections = [
      {
        title: 'What I am doing?',
        collapsed: false,
        items: [
          {
            title: 'gophercises',
            description: 'Well tested solutions for exercises from http://gophercises.com',
            url: 'https://github.com/jedruniu/gophercises-solutions',
          }
      ]
      },
      {title: 'What I am reading?', collapsed: true, items: [
        {
          title: 'The Go Programming language',
          description: null,
          url: 'https://www.amazon.com/Programming-Language-Addison-Wesley-Professional-Computing/dp/0134190440',
        },
        {
          title: 'Coders at Work: Reflections on the Craft of Programming',
          description: null,
          url: 'https://www.amazon.com/Coders-Work-Reflections-Craft-Programming/dp/1430219483',
      }
      ]},
      {title: 'What I did?', collapsed: true, items: [
        {
          title: 'Spotify CLI',
          description: 'Terminal base spotify client with player in the browser',
          url: 'https://github.com/jedruniu/spotify-cli/blob/master/README.md',
        },
        {
          title: 'ReactiveXArsenal',
          description: 'As I started to use Angular X at work, I prepared playground for trying out RxJS.',
          url: 'https://github.com/jedruniu/reactivex-arsenal',
        },
        {
          title: 'Presentation: Testable code in Go',
          description: 'Presentation given at STX Next with insights about code in go that is convinient to test.',
          url: null,
        },
        {
          title: 'Presentation: Networking in Docker',
          description: 'Presentation given at STX Next about how containers are communicating with each other.',
          url: null,
        },
      ]},
      // {title: 'What I read?', collapsed: true, items: []},
      {title: 'What I want to do next?', collapsed: true, items: [
        {
          title: "asyncio (python) and channels (go) comparision",
          description: "project or presentation, don't know yet",
          url: null,
        },
        {
          title: 'Status Bar for OS X',
          description: 'I want to do some application for MacOS',
          url: 'http://footle.org/WeatherBar/',
        },
        {
          title: 'Public speaking course',
          description: 'I want to improve these skills',
          url: 'https://www.edx.org/course/introduction-public-speaking-uwashingtonx-comm220x2',
        },
        {
          title: 'HTTP proxy/rate limiter',
          description: 'App in golang for HTTP requests control',
          url: '',
        },
        {
          title: 'OAuth 2.0 golang playground',
          description: 'Project where I wil ge to know really well OAuth 2.0 implementation and internals',
          url: null,
        },
        {
          title: 'Intro to Artificial Intelligence',
          description: 'AI Course by Peter Norvig',
          url: 'https://eu.udacity.com/course/intro-to-artificial-intelligence--cs271',
        },
        {
          title: 'Design of computer programs',
          description: 'Software course by Peter Norvig',
          url: 'https://eu.udacity.com/course/design-of-computer-programs--cs212',
        },
      ]},
      {title: 'What I want to read next?', collapsed: true, items: [
        {
          title: 'Peopleware',
          description: null,
          url: null,
        },
        {
          title: 'Code Complete',
          description: null,
          url: null,
        },
        {
          title: 'Test-driven development',
          description: null,
          url: null,
        },
        {
          title: 'Growing object-oriented software, guided by tests',
          description: null,
          url: null,
        },
        {
          title: 'Refactoring, improving the design of existing code',
          description: null,
          url: null,
        },
        {
          title: 'Structure and interpretation of computer programs',
          description: null,
          url: null,
        },
        {
          title: 'The practice of programming',
          description: null,
          url: null,
        },
        {
          title: 'Artificial Intelligence: A Modern Approach',
          description: null,
          url: 'https://www.amazon.com/Artificial-Intelligence-Modern-Approach-3rd/dp/0136042597',
        },
      ]},
    ];
  }
  public open(section) {
    this.sections.map(s => s.collapsed = true);
    section.collapsed = false;
  }
}