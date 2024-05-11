import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqComponent } from './faq.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqComponent, NoopAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('powinien zostać stworzony', () => {
    expect(component).toBeTruthy();
  });

  it('powinien przełączać rozwijanie i zwijanie elementów akordeonu', () => {
    const initialItem = component.faqItems[0];
    expect(initialItem.expanded).toBeFalsy();
    component.toggleAccordion(0);
    expect(initialItem.expanded).toBeTruthy();
    component.toggleAccordion(0);
    expect(initialItem.expanded).toBeFalsy();
  });

  it('powinien sprawdzać, czy element akordeonu jest rozwinięty', () => {
    const initialItem = component.faqItems[1];
    expect(component.isExpanded(1)).toBeFalsy();
    component.toggleAccordion(1);
    expect(component.isExpanded(1)).toBeTruthy();
  });
});
