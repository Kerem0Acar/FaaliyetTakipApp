import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityParticipants } from './activity-participants';

describe('ActivityParticipants', () => {
  let component: ActivityParticipants;
  let fixture: ComponentFixture<ActivityParticipants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityParticipants]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityParticipants);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
