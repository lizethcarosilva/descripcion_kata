import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { DataGenerator } from '../helpers/DataGenerator';

test.describe('Caso de Prueba 5: Validación de Email', () => {
  test('debe aceptar email válido', async ({ page }) => {
    const formPage = new PracticeFormPage(page);
    const validEmail = DataGenerator.generateEmail();

    await formPage.navigate();
    await formPage.fillFirstName(DataGenerator.generateFirstName());
    await formPage.fillLastName(DataGenerator.generateLastName());
    await formPage.fillEmail(validEmail);
    await formPage.selectGender('Male');
    await formPage.fillMobile(DataGenerator.generateMobile());
    await formPage.fillDateOfBirth(DataGenerator.generateDateOfBirth());
    await formPage.fillCurrentAddress(DataGenerator.generateAddress());
    await formPage.selectState('NCR');
    await formPage.selectCity('Delhi');

    await formPage.submit();
    await formPage.verifyModalAppears();

    const modalContent = await page.locator('.modal-body').textContent();
    expect(modalContent).toContain(validEmail);
  });

  test('debe rechazar email sin formato válido', async ({ page }) => {
    const formPage = new PracticeFormPage(page);
    const invalidEmail = DataGenerator.generateInvalidEmail();

    await formPage.navigate();
    await formPage.fillFirstName(DataGenerator.generateFirstName());
    await formPage.fillLastName(DataGenerator.generateLastName());
    await formPage.fillEmail(invalidEmail);
    await formPage.selectGender('Male');
    await formPage.fillMobile(DataGenerator.generateMobile());
    await formPage.fillDateOfBirth(DataGenerator.generateDateOfBirth());
    await formPage.fillCurrentAddress(DataGenerator.generateAddress());
    await formPage.selectState('NCR');
    await formPage.selectCity('Delhi');

    await formPage.submit();

    const validationState = await formPage.email.evaluate((el: HTMLInputElement) => {
      return el.validity.valid;
    });
    expect(validationState).toBeFalsy();
  });
});
