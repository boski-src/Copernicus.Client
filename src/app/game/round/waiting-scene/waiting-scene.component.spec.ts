import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingSceneComponent } from './waiting-scene.component';

describe('WaitingSceneComponent', () => {
  let component: WaitingSceneComponent;
  let fixture: ComponentFixture<WaitingSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
