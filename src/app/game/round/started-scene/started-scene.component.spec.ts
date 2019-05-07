import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartedSceneComponent } from './started-scene.component';

describe('StartedSceneComponent', () => {
  let component: StartedSceneComponent;
  let fixture: ComponentFixture<StartedSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartedSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartedSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
