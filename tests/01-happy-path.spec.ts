import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { DataGenerator } from '../helpers/DataGenerator';
import { STATES } from '../helpers/TestData';

test.describe('Caso de Prueba 1: Registro Exitoso Completo', () => {
  test('debe completar y enviar el formulario con todos los campos válidos', async ({ page }) => {
    const formPage = new PracticeFormPage(page);
    const testData = {
      firstName: DataGenerator.generateFirstName(),
      lastName: DataGenerator.generateLastName(),
      email: DataGenerator.generateEmail(),
      gender: DataGenerator.generateGender(),
      mobile: DataGenerator.generateMobile(),
      dateOfBirth: DataGenerator.generateDateOfBirth(),
      subject: DataGenerator.generateSubject(),
      hobbies: DataGenerator.generateHobbies(),
      address: DataGenerator.generateAddress(),
      state: 'NCR',
      city: 'Delhi',
    };

    await formPage.navigate();
    await formPage.fillFirstName(testData.firstName);
    await formPage.fillLastName(testData.lastName);
    await formPage.fillEmail(testData.email);
    await formPage.selectGender(testData.gender);
    await formPage.fillMobile(testData.mobile);
    await formPage.fillDateOfBirth(testData.dateOfBirth);

    await formPage.fillSubjects(testData.subject);

    for (const hobby of testData.hobbies) {
      await formPage.selectHobby(hobby);
      await page.waitForTimeout(200);
    }

    await formPage.uploadPicture('test-data/sample-image.png');
    await formPage.fillCurrentAddress(testData.address);
    await formPage.selectState(testData.state);
    await formPage.selectCity(testData.city);

    // Esperar a que todos los campos estén listos antes de enviar
    await page.waitForTimeout(1000);
    await formPage.submit();
    await formPage.verifyModalAppears();

    // El formato de fecha en el modal es diferente (ej: "15 January,1995" vs "15 Jan 1995")
    const modalContent = await page.locator('.modal-body').textContent();
    expect(modalContent).toContain(testData.firstName);
    expect(modalContent).toContain(testData.lastName);
    expect(modalContent).toContain(testData.email);
    expect(modalContent).toContain(testData.gender);
    expect(modalContent).toContain(testData.mobile);
    expect(modalContent).toContain(testData.subject);
    expect(modalContent).toContain(testData.hobbies.join(', '));
    expect(modalContent).toContain(testData.address);
    expect(modalContent).toContain(testData.state);
    expect(modalContent).toContain(testData.city);

    await formPage.closeModal();
  });
});
