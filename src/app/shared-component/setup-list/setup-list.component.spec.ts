import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupListComponent } from './setup-list.component';

describe('SetupListComponent', () => {
  let component: SetupListComponent;
  let fixture: ComponentFixture<SetupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
