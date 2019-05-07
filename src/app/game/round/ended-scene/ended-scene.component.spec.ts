import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndedSceneComponent } from './ended-scene.component';

describe('EndedSceneComponent', () => {
  let component: EndedSceneComponent;
  let fixture: ComponentFixture<EndedSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndedSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndedSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
