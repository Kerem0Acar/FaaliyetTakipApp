import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCreate } from './activity-create';

describe('ActivityCreate', () => {
  let component: ActivityCreate;
  let fixture: ComponentFixture<ActivityCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
