import { Page, Locator, expect } from '@playwright/test';

export class PracticeFormPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly genderMale: Locator;
  readonly genderFemale: Locator;
  readonly genderOther: Locator;
  readonly mobile: Locator;
  readonly dateOfBirth: Locator;
  readonly subjects: Locator;
  readonly hobbySports: Locator;
  readonly hobbyReading: Locator;
  readonly hobbyMusic: Locator;
  readonly pictureUpload: Locator;
  readonly currentAddress: Locator;
  readonly stateDropdown: Locator;
  readonly cityDropdown: Locator;
  readonly submitButton: Locator;
  readonly modalTitle: Locator;
  readonly modalCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#userEmail');
    this.genderMale = page.locator('label[for="gender-radio-1"]');
    this.genderFemale = page.locator('label[for="gender-radio-2"]');
    this.genderOther = page.locator('label[for="gender-radio-3"]');
    this.mobile = page.locator('#userNumber');
    this.dateOfBirth = page.locator('#dateOfBirthInput');
    this.subjects = page.locator('#subjectsInput');
    this.hobbySports = page.locator('label[for="hobbies-checkbox-1"]');
    this.hobbyReading = page.locator('label[for="hobbies-checkbox-2"]');
    this.hobbyMusic = page.locator('label[for="hobbies-checkbox-3"]');
    this.pictureUpload = page.locator('#uploadPicture');
    this.currentAddress = page.locator('#currentAddress');
    this.stateDropdown = page.locator('#state');
    this.cityDropdown = page.locator('#city');
    this.submitButton = page.locator('#submit');
    this.modalTitle = page.locator('#example-modal-sizes-title-lg');
    this.modalCloseButton = page.locator('#closeLargeModal');
  }

  async navigate() {
    await this.page.goto('/automation-practice-form', { waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector('#firstName', { state: 'visible', timeout: 15000 });
    
    await this.page.evaluate(() => {
      const ads = document.querySelectorAll('#fixedban, iframe[title*="Advertisement"], iframe[data-google-container-id]');
      ads.forEach(ad => {
        const element = ad as HTMLElement;
        element.style.display = 'none';
        element.style.visibility = 'hidden';
        element.style.height = '0';
        element.style.width = '0';
      });
    });
    
    await this.page.waitForTimeout(500);
  }

  async fillFirstName(value: string) {
    await this.firstName.fill(value);
  }

  async fillLastName(value: string) {
    await this.lastName.fill(value);
  }

  async fillEmail(value: string) {
    await this.email.fill(value);
  }

  async selectGender(gender: 'Male' | 'Female' | 'Other') {
    let genderLocator: Locator;
    if (gender === 'Male') {
      genderLocator = this.genderMale;
    } else if (gender === 'Female') {
      genderLocator = this.genderFemale;
    } else {
      genderLocator = this.genderOther;
    }
    
    await genderLocator.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(300);
    
    try {
      await genderLocator.click({ timeout: 5000 });
    } catch (error) {
      await this.page.evaluate((genderValue) => {
        const radio = document.querySelector(`input[value="${genderValue}"]`) as HTMLInputElement;
        if (radio) {
          radio.click();
        }
      }, gender);
    }
  }

  async fillMobile(value: string) {
    await this.mobile.fill(value);
  }

  async fillDateOfBirth(date: string) {
    await this.dateOfBirth.click();
    await this.page.keyboard.press('Control+A');
    await this.dateOfBirth.type(date);
    await this.page.keyboard.press('Enter');
  }

  async fillSubjects(subject: string) {
    await this.subjects.click();
    await this.subjects.fill(subject);
    await this.page.waitForTimeout(500); // Esperar a que aparezcan las sugerencias
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(300); // Esperar a que se aplique la selección
  }

  async selectHobby(hobby: 'Sports' | 'Reading' | 'Music') {
    const hobbyId = hobby === 'Sports' ? '1' : hobby === 'Reading' ? '2' : '3';
    
    // Usar JavaScript directamente para hacer clic en el checkbox
    await this.page.evaluate((id) => {
      const checkbox = document.querySelector(`input[id="hobbies-checkbox-${id}"]`) as HTMLInputElement;
      if (checkbox && !checkbox.checked) {
        checkbox.click();
      }
    }, hobbyId);
    
    await this.page.waitForTimeout(200);
  }

  async uploadPicture(filePath: string) {
    await this.pictureUpload.setInputFiles(filePath);
  }

  async fillCurrentAddress(address: string) {
    await this.currentAddress.fill(address);
  }

  async selectState(state: string) {
    await this.stateDropdown.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(300);
    
    // Abrir el dropdown con Playwright
    try {
      await this.stateDropdown.click();
    } catch {
      // Fallback: usar JavaScript para hacer click
      await this.page.evaluate(() => {
        const stateContainer = document.querySelector('#state');
        if (stateContainer) {
          const control = stateContainer.querySelector('[class*="control"]') as HTMLElement;
          if (control) control.click();
        }
      });
    }
    
    // Esperar a que aparezca al menos una opción
    await this.page.waitForSelector('div[id*="react-select-3-option"]', { state: 'visible', timeout: 5000 });
    
    // Seleccionar la opción con Playwright
    const optionLocator = this.page.locator(`div[id*="react-select-3-option"]:has-text("${state}")`);
    await optionLocator.click({ timeout: 5000 });
    
    await this.page.waitForTimeout(300);
  }

  async selectCity(city: string) {
    await this.page.waitForTimeout(500); // Esperar a que el dropdown se habilite después de seleccionar estado
    
    // Abrir el dropdown con Playwright
    try {
      await this.cityDropdown.click();
    } catch {
      // Fallback: usar JavaScript para hacer click
      await this.page.evaluate(() => {
        const cityContainer = document.querySelector('#city');
        if (cityContainer) {
          const control = cityContainer.querySelector('[class*="control"]') as HTMLElement;
          if (control) control.click();
        }
      });
    }
    
    // Esperar a que aparezca al menos una opción
    await this.page.waitForSelector('div[id*="react-select-4-option"]', { state: 'visible', timeout: 5000 });
    
    // Seleccionar la opción con Playwright
    const optionLocator = this.page.locator(`div[id*="react-select-4-option"]:has-text("${city}")`);
    await optionLocator.click({ timeout: 5000 });
    
    await this.page.waitForTimeout(300);
  }

  async submit() {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
    await this.submitButton.click({ force: true });
    await this.page.waitForTimeout(1000); // Esperar a que el modal aparezca
  }

  async verifyModalAppears() {
    await expect(this.modalTitle).toBeVisible({ timeout: 10000 });
  }

  async verifyModalContent(expectedData: Record<string, string>) {
    const modalContent = this.page.locator('.modal-body');
    await expect(modalContent).toBeVisible();

    for (const [key, value] of Object.entries(expectedData)) {
      const fieldText = await modalContent.textContent();
      expect(fieldText).toContain(value);
    }
  }

  async closeModal() {
    await this.modalCloseButton.click();
  }

  async verifyFieldValidation(fieldLocator: Locator, shouldBeValid: boolean) {
    if (shouldBeValid) {
      await expect(fieldLocator).not.toHaveClass(/invalid/);
    } else {
      await expect(fieldLocator).toHaveClass(/invalid/);
    }
  }
}

