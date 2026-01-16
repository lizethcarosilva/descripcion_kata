import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { DataGenerator } from '../helpers/DataGenerator';
import { VALIDATION_LIMITS } from '../helpers/TestData';

test.describe('Caso de Prueba 2: Análisis de Valores Límite - Nombres', () => {
  test('debe aceptar nombre con longitud mínima válida (1 carácter)', async ({ page }) => {
    const formPage = new PracticeFormPage(page);
    const shortName = DataGenerator.generateShortText(1, 1);

    await formPage.navigate();
    await formPage.fillFirstName(shortName);
    await formPage.fillLastName(DataGenerator.generateLastName());
    await formPage.fillEmail(DataGenerator.generateEmail());
    await formPage.selectGender('Male');
    await formPage.fillMobile(DataGenerator.generateMobile());
    await formPage.fillDateOfBirth(DataGenerator.generateDateOfBirth());
    await formPage.fillCurrentAddress(DataGenerator.generateAddress());
    await formPage.selectState('NCR');
    await formPage.selectCity('Delhi');

    await formPage.submit();
    await formPage.verifyModalAppears();

    const modalContent = await page.locator('.modal-body').textContent();
    expect(modalContent).toContain(shortName);
  });

  test('debe aceptar nombre con longitud máxima válida (50 caracteres)', async ({ page }) => {
    const formPage = new PracticeFormPage(page);
    const longName = DataGenerator.generateLongText(50);

    await formPage.navigate();
    await formPage.fillFirstName(longName);
    await formPage.fillLastName(DataGenerator.generateLastName());
    await formPage.fillEmail(DataGenerator.generateEmail());
    await formPage.selectGender('Female');
    await formPage.fillMobile(DataGenerator.generateMobile());
    await formPage.fillDateOfBirth(DataGenerator.generateDateOfBirth());
    await formPage.fillCurrentAddress(DataGenerator.generateAddress());
    await formPage.selectState('NCR');
    await formPage.selectCity('Delhi');

    await formPage.submit();
    await formPage.verifyModalAppears();

    const modalContent = await page.locator('.modal-body').textContent();
    expect(modalContent).toContain(longName);
  });

  test('debe rechazar nombre vacío', async ({ page }) => {
    const formPage = new PracticeFormPage(page);

    await formPage.navigate();
    await formPage.fillLastName(DataGenerator.generateLastName());
    await formPage.fillEmail(DataGenerator.generateEmail());
    await formPage.selectGender('Male');
    await formPage.fillMobile(DataGenerator.generateMobile());
    await formPage.fillDateOfBirth(DataGenerator.generateDateOfBirth());
    await formPage.fillCurrentAddress(DataGenerator.generateAddress());
    await formPage.selectState('NCR');
    await formPage.selectCity('Delhi');

    await formPage.submit();

    await expect(formPage.firstName).toHaveAttribute('required', '');
    const validationState = await formPage.firstName.evaluate((el: HTMLInputElement) => {
      return el.validity.valid;
    });
    expect(validationState).toBeFalsy();
  });
});
