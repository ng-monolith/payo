import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  const mockDialogRef = {
    close: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ConfirmationDialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { message: 'Czy na pewno chcesz kontynuować?' } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('powinien utworzyć', () => {
    expect(component).toBeTruthy();
  });

  it('powinien wyświetlać przekazaną wiadomość', () => {
    const dialogContent = fixture.debugElement.query(By.css('mat-dialog-content')).nativeElement;
    expect(dialogContent.textContent).toContain('Czy na pewno chcesz kontynuować?');
  });

  it('powinien zamknąć dialog z wynikiem "confirm" po kliknięciu "Potwierdź"', () => {
    const confirmButton = fixture.debugElement.query(By.css('button[color="warn"]')).nativeElement;
    confirmButton.click();
    expect(mockDialogRef.close).toHaveBeenCalledWith('confirm');
  });

  it('powinien zamknąć dialog bez wyniku po kliknięciu "Anuluj"', () => {
    const cancelButton = fixture.debugElement.query(By.css('button[color="primary"]')).nativeElement;
    cancelButton.click();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
