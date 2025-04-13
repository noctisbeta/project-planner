import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectButtonComponent } from './add-project-button.component';

describe('AddProjectComponent', () => {
  let component: AddProjectButtonComponent;
  let fixture: ComponentFixture<AddProjectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProjectButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProjectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
