import { Component } from '@angular/core';

export class Section {
  title string
  collapsed boolean
  items []string
}
export class Item {
  title string
  description string
  url string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'app';
  public collapsed = [false, true, true, true, true, true];
  public sections: Section[];

  public ngOnInit() {
    this.sections = [
      {title: 'What I am doing?', collapsed: false, items:[{title: "gophercises", description: "Well tested solutions for exercises from http://gophercises.com", url: "https://github.com/jedruniu/gophercises-solutions" }]},
      {title: 'What I am reading?', collapsed: true},
      {title: 'What I did?', collapsed: true},
      {title: 'What I read', collapsed: true},
      {title: 'What I will do?', collapsed: true},
      {title: 'What I will read?', collapsed: true},
    ];
  }
  public open(section) {
    this.sections.map(s => s.collapsed = true);
    section.collapsed = false;
  }
}