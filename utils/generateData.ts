import { faker } from '@faker-js/faker';
export {
  generateHomes,
  generateInspectors,
  generateInspections,
  generateUsers,
};

function generateHome() {
  const secondaryAddress: boolean = Math.random() > 0.5;
  return {
    addressField1: faker.location.streetAddress(),
    addressField2: secondaryAddress ? faker.location.secondaryAddress() : '',
    city: faker.location.city(),
    state: 'NC',
    zipCode: faker.location.zipCode(),
  };
}

function generateInspector() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number(),
    fireLevel: Math.floor(Math.random() * 3),
    structuralLevel: Math.floor(Math.random() * 3),
    plumbingLevel: Math.floor(Math.random() * 3),
    electricalLevel: Math.floor(Math.random() * 3),
  };
}

function generateChecklist() {
  const itemCnt = Math.floor(Math.random() * 10);

  return Array.from({ length: itemCnt }, () => generateChecklistItem());
}

function generateChecklistItem() {
  const status = Math.random() > 0.8 ? 'pass' : 'fail';

  const numUrls = status === 'fail' ? Math.floor(Math.random() * 3) + 1 : 0;
  const videoUrls = Array.from({ length: numUrls }, () => faker.internet.url());
  const photoUrls = Array.from({ length: numUrls }, () => faker.internet.url());

  return {
    item: faker.lorem.sentence(),
    status: status,
    explanation: status === 'fail' ? faker.lorem.paragraph() : '',
    picturesUrls: photoUrls,
    videosUrls: videoUrls,
  };
}

function generateInspection() {
  return {
    inspectorId: Math.floor(Math.random() * 50),
    homeId: Math.floor(Math.random() * 100),
    fireChecklist: generateChecklist(),
    structuralChecklist: generateChecklist(),
    plumbingChecklist: generateChecklist(),
    electricalChecklist: generateChecklist(),
  };
}

function generateUser() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    admin: faker.datatype.boolean(0.75),
  };
}

function generateHomes(n: number) {
  return Array.from({ length: n }, generateHome);
}

function generateInspectors(n: number) {
  return Array.from({ length: n }, generateInspector);
}

function generateInspections(n: number) {
  return Array.from({ length: n }, generateInspection);
}

function generateUsers(n: number) {
  return Array.from({ length: n }, generateUser);
}
