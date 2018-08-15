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
        ]
      },
      {title: 'What I am reading?', collapsed: true, items: [
        {
          title: '500 Lines or Less',
          description: null,
          url: 'http://aosabook.org/en/index.html',
        },
      ]},
      {title: 'What I did?', collapsed: true, items: [
        {
          title: 'Training routes plotter',
          description: 'I want to be able to plot routes from all my trainings from given month and observe all routes at once, preferably with some statistics',
          url: null,
        },
        {
          title: 'gophercises',
          description: 'Well tested solutions for exercises from http://gophercises.com',
          url: 'https://github.com/jedruniu/gophercises-solutions',
        },
        {
          title: 'Spotify CLI',
          description: 'Terminal base spotify client with player in the browser, written in Go.',
          url: 'https://github.com/jedruniu/spotify-cli/blob/master/README.md',
        },
        {
          title: 'ReactiveXArsenal',
          description: 'As I started to use Angular X at work, I prepared playground for trying out RxJS.',
          url: 'https://github.com/jedruniu/reactivex-arsenal',
        },
        {
          title: 'Presentation "Testable code in Go"',
          description: 'Presentation given at STX Next with insights about code in go that is convinient to test.',
          url: null,
        },
        {
          title: 'Presentation "Networking in Docker"',
          description: 'Presentation given at STX Next about how containers are communicating with each other.',
          url: null,
        },
      ]},
      {
        title: 'What I recently read?', collapsed: true, items: [
          {
            title: 'Peopleware',
            description: null,
            url: 'https://www.amazon.com/Peopleware-Productive-Projects-Tom-DeMarco/dp/0932633439',
          },
          {
            title: 'Coders at Work: Reflections on the Craft of Programming',
            description: null,
            url: 'https://www.amazon.com/Coders-Work-Reflections-Craft-Programming/dp/1430219483',
          },
        ]
      },
      {
        title: 'What I want to do next?', collapsed: true, items: [
        {
          title: 'asyncio (python) and channels (go) comparision',
          description: 'project or presentation, don\'t know yet',
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
        {
          title: 'dgraph playground',
          description: 'Play with graph databases, this looks kind of fun',
          url: 'https://github.com/dgraph-io/dgraph',
        }
      ]},
      {title: 'What I want to read next?', collapsed: true, items: [
        {
          title: 'The Architecture of Open Source Applications, Volume I',
          description: null,
          url: 'http://aosabook.org/en/index.html',
        },
        {
          title: 'The Architecture of Open Source Applications, Volume II',
          description: null,
          url: 'http://aosabook.org/en/index.html',
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
        {
          title: 'Writing an interpreter in go',
          description: null,
          url: 'https://www.amazon.com/Writing-Interpreter-Go-Thorsten-Ball-ebook',
        }
      ]},
    ];
    
    // Uncollapse first non-empty section.
    for (const section of this.sections) {
      if (section.items.length === 0) {
        section.collapsed = true;
      } else {
        section.collapsed = false;
        break;
      }
    }
  }
  public open(section) {
    this.sections.map(s => s.collapsed = true);
    section.collapsed = false;
  }
}