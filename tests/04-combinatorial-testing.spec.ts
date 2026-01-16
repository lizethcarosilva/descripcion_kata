import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { DataGenerator } from '../helpers/DataGenerator';
import { STATES } from '../helpers/TestData';

test.describe('Caso de Prueba 4: Pruebas Combinatorias - Género, Hobbies y Estados', () => {
  const genders: Array<'Male' | 'Female' | 'Other'> = ['Male', 'Female', 'Other'];
  const hobbies: Array<'Sports' | 'Reading' | 'Music'> = ['Sports', 'Reading', 'Music'];
  const stateCityCombinations = [
    { state: 'NCR', city: 'Delhi' },
    { state: 'NCR', city: 'Gurgaon' },
    { state: 'Uttar Pradesh', city: 'Agra' },
    { state: 'Haryana', city: 'Karnal' },
    { state: 'Rajasthan', city: 'Jaipur' },
  ];

  test('debe validar combinación: Male + Sports + NCR/Delhi', async ({ page }) => {
    const formPage = new PracticeFormPage(page);
    const testData = {
      firstName: DataGenerator.generateFirstName(),
      lastName: DataGenerator.generateLastName(),
      email: DataGenerator.generateEmail(),
      mobile: DataGenerator.generateMobile(),
      address: DataGenerator.generateAddress(),
    };

    await formPage.navigate();
    await formPage.fillFirstName(testData.firstName);
    await formPage.fillLastName(testData.lastName);
    await formPage.fillEmail(testData.email);
    await formPage.selectGender('Male');
    await formPage.fillMobile(testData.mobile);
    await formPage.fillDateOfBirth(DataGenerator.generateDateOfBirth());
    await formPage.selectHobby('Sports');
    await formPage.fillCurrentAddress(testData.address);
    await formPage.selectState('NCR');
    await formPage.selectCity('Delhi');

    await formPage.submit();
    await formPage.verifyModalAppears();

    const modalContent = await page.locator('.modal-body').textContent();
    expect(modalContent).toContain('Male');
    expect(modalContent).toContain('Sports');
    expect(modalContent).toContain('Delhi');
  });

  test('debe validar combinación: Female + Reading + Uttar Pradesh/Agra', async ({ page }) => {
    const formPage = new PracticeFormPage(page);
    const testData = {
      firstName: DataGenerator.generateFirstName(),
      lastName: DataGenerator.generateLastName(),
      email: DataGenerator.generateEmail(),
      mobile: DataGenerator.generateMobile(),
      address: DataGenerator.generateAddress(),
    };

    await formPage.navigate();
    await formPage.fillFirstName(testData.firstName);
    await formPage.fillLastName(testData.lastName);
    await formPage.fillEmail(testData.email);
    await formPage.selectGender('Female');
    await formPage.fillMobile(testData.mobile);
    await formPage.fillDateOfBirth(DataGenerator.generateDateOfBirth());
    await formPage.selectHobby('Reading');
    await formPage.fillCurrentAddress(testData.address);
    await formPage.selectState('Uttar Pradesh');
    await formPage.selectCity('Agra');

    await formPage.submit();
    await formPage.verifyModalAppears();

    const modalContent = await page.locator('.modal-body').textContent();
    expect(modalContent).toContain('Female');
    expect(modalContent).toContain('Reading');
    expect(modalContent).toContain('Agra');
  });

  test('debe validar combinación: Other + múltiples hobbies + Haryana/Karnal', async ({ page }) => {
    const formPage = new PracticeFormPage(page);
    const testData = {
      firstName: DataGenerator.generateFirstName(),
      lastName: DataGenerator.generateLastName(),
      email: DataGenerator.generateEmail(),
      mobile: DataGenerator.generateMobile(),
      address: DataGenerator.generateAddress(),
    };

    await formPage.navigate();
    await formPage.fillFirstName(testData.firstName);
    await formPage.fillLastName(testData.lastName);
    await formPage.fillEmail(testData.email);
    await formPage.selectGender('Other');
    await formPage.fillMobile(testData.mobile);
    await formPage.fillDateOfBirth(DataGenerator.generateDateOfBirth());
    await formPage.selectHobby('Sports');
    await formPage.selectHobby('Music');
    await formPage.fillCurrentAddress(testData.address);
    await formPage.selectState('Haryana');
    await formPage.selectCity('Karnal');

    await formPage.submit();
    await formPage.verifyModalAppears();

    const modalContent = await page.locator('.modal-body').textContent();
    expect(modalContent).toContain('Other');
    expect(modalContent).toContain('Sports');
    expect(modalContent).toContain('Music');
    expect(modalContent).toContain('Karnal');
  });

  test('debe validar todas las combinaciones de hobbies', async ({ page }) => {
    const formPage = new PracticeFormPage(page);
    const testData = {
      firstName: DataGenerator.generateFirstName(),
      lastName: DataGenerator.generateLastName(),
      email: DataGenerator.generateEmail(),
      mobile: DataGenerator.generateMobile(),
      address: DataGenerator.generateAddress(),
    };

    await formPage.navigate();
    await formPage.fillFirstName(testData.firstName);
    await formPage.fillLastName(testData.lastName);
    await formPage.fillEmail(testData.email);
    await formPage.selectGender('Male');
    await formPage.fillMobile(testData.mobile);
    await formPage.fillDateOfBirth(DataGenerator.generateDateOfBirth());
    await formPage.selectHobby('Sports');
    await formPage.selectHobby('Reading');
    await formPage.selectHobby('Music');
    await formPage.fillCurrentAddress(testData.address);
    await formPage.selectState('Rajasthan');
    await formPage.selectCity('Jaipur');

    await formPage.submit();
    await formPage.verifyModalAppears();

    const modalContent = await page.locator('.modal-body').textContent();
    expect(modalContent).toContain('Sports');
    expect(modalContent).toContain('Reading');
    expect(modalContent).toContain('Music');
  });
});
