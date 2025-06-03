import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredTasklist } from './filtered-tasklist';

describe('FilteredTasklist', () => {
  let component: FilteredTasklist;
  let fixture: ComponentFixture<FilteredTasklist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredTasklist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteredTasklist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
