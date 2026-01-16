import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { DataGenerator } from '../helpers/DataGenerator';
import { VALIDATION_LIMITS } from '../helpers/TestData';

test.describe('Caso de Prueba 3: Análisis de Valores Límite - Teléfono Móvil', () => {
  test('debe aceptar número de teléfono con exactamente 10 dígitos', async ({ page }) => {
    const formPage = new PracticeFormPage(page);
    const validMobile = DataGenerator.generateMobile();

    await formPage.navigate();
    await formPage.fillFirstName(DataGenerator.generateFirstName());
    await formPage.fillLastName(DataGenerator.generateLastName());
    await formPage.fillEmail(DataGenerator.generateEmail());
    await formPage.selectGender('Male');
    await formPage.fillMobile(validMobile);
    await formPage.fillDateOfBirth(DataGenerator.generateDateOfBirth());
    await formPage.fillCurrentAddress(DataGenerator.generateAddress());
    await formPage.selectState('NCR');
    await formPage.selectCity('Delhi');

    await formPage.submit();
    await formPage.verifyModalAppears();

    const modalContent = await page.locator('.modal-body').textContent();
    expect(modalContent).toContain(validMobile);
  });

  test('debe rechazar número de teléfono con menos de 10 dígitos', async ({ page }) => {
    const formPage = new PracticeFormPage(page);
    const invalidMobile = DataGenerator.generateInvalidMobile(9);

    await formPage.navigate();
    await formPage.fillFirstName(DataGenerator.generateFirstName());
    await formPage.fillLastName(DataGenerator.generateLastName());
    await formPage.fillEmail(DataGenerator.generateEmail());
    await formPage.selectGender('Male');
    await formPage.fillMobile(invalidMobile);
    await formPage.fillDateOfBirth(DataGenerator.generateDateOfBirth());
    await formPage.fillCurrentAddress(DataGenerator.generateAddress());
    await formPage.selectState('NCR');
    await formPage.selectCity('Delhi');

    await formPage.submit();

    const validationState = await formPage.mobile.evaluate((el: HTMLInputElement) => {
      return el.validity.valid;
    });
    expect(validationState).toBeFalsy();
  });

  test('debe rechazar número de teléfono con más de 10 dígitos', async ({ page }) => {
    const formPage = new PracticeFormPage(page);
    const invalidMobile = DataGenerator.generateInvalidMobile(11);

    await formPage.navigate();
    await formPage.fillFirstName(DataGenerator.generateFirstName());
    await formPage.fillLastName(DataGenerator.generateLastName());
    await formPage.fillEmail(DataGenerator.generateEmail());
    await formPage.selectGender('Male');
    
    await formPage.mobile.click();
    await formPage.mobile.fill('');
    await formPage.mobile.type(invalidMobile);
    
    const actualValue = await formPage.mobile.inputValue();
    expect(actualValue.length).toBeLessThanOrEqual(10);
    
    await formPage.fillDateOfBirth(DataGenerator.generateDateOfBirth());
    await formPage.fillCurrentAddress(DataGenerator.generateAddress());
    await formPage.selectState('NCR');
    await formPage.selectCity('Delhi');

    await formPage.submit();

    const validationState = await formPage.mobile.evaluate((el: HTMLInputElement) => {
      return el.validity.valid;
    });
    
    const finalValue = await formPage.mobile.inputValue();
    if (finalValue.length === 10) {
      expect(validationState).toBeTruthy();
    } else {
      expect(validationState).toBeFalsy();
    }
  });
});
