import { faker } from '@faker-js/faker';

export class DataGenerator {
  static generateFirstName(): string {
    return faker.person.firstName();
  }

  static generateLastName(): string {
    return faker.person.lastName();
  }

  static generateEmail(): string {
    return faker.internet.email();
  }

  static generateInvalidEmail(): string {
    return faker.string.alphanumeric(10);
  }

  static generateMobile(): string {
    return faker.string.numeric(10);
  }

  static generateInvalidMobile(length: number): string {
    return faker.string.numeric(length);
  }

  static generateDateOfBirth(minAge: number = 18, maxAge: number = 65): string {
    const birthDate = faker.date.birthdate({ min: minAge, max: maxAge, mode: 'age' });
    const day = String(birthDate.getDate()).padStart(2, '0');
    const month = birthDate.toLocaleString('en-US', { month: 'short' });
    const year = birthDate.getFullYear();
    return `${day} ${month} ${year}`;
  }

  static generateAddress(): string {
    return faker.location.streetAddress(true);
  }

  static generateShortText(minLength: number = 1, maxLength: number = 2): string {
    return faker.string.alpha({ length: { min: minLength, max: maxLength } });
  }

  static generateLongText(length: number = 100): string {
    return faker.string.alpha(length);
  }

  static generateGender(): 'Male' | 'Female' | 'Other' {
    return faker.helpers.arrayElement(['Male', 'Female', 'Other']);
  }

  static generateHobbies(): ('Sports' | 'Reading' | 'Music')[] {
    const allHobbies: ('Sports' | 'Reading' | 'Music')[] = ['Sports', 'Reading', 'Music'];
    return faker.helpers.arrayElements(allHobbies, { min: 1, max: 3 });
  }

  static generateSubject(): string {
    const subjects = ['Math', 'Physics', 'Chemistry', 'English', 'Computer Science', 'Arts'];
    return faker.helpers.arrayElement(subjects);
  }
}
