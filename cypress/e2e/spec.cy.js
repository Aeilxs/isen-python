function generateRandomString(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

function checkFav() {
  cy.contains('FAVOURITE').click();
  cy.url().should('include', '/favourite');
  cy.get('table').should('exist');
  cy.get('tbody tr').should('have.length.at.least', 1);
  cy.get('tbody tr').first().within(() => {
    cy.get('a').click();
  });
  cy.contains('No Product in your favourite list').should('exist');
}

const randomUser = generateRandomString();
const randomEmail = `${randomUser}@test.com`;
const randomPassword = `P@ssw0rd${Math.floor(Math.random() * 10000)}`;

describe('Create and connect to an account', () => {
  it('Visits the Oc commerce site and creates an account', () => {
    cy.visit('/home');
    cy.contains('SIGNUP').click();
    cy.url().should('include', '/user/signup');
    cy.get('[id^=fname]').type('fakeFirstName');
    cy.get('[id^=lname]').type('fakeLastName');
    cy.get('[id^=username]').type(randomUser);
    cy.get('[id^=email]').type(randomEmail);
    cy.get('[id^=pass]').type(randomPassword);
    cy.get('[id^=re_pass]').type(randomPassword);
    cy.get('form').contains('Register').click();
    cy.url().should('include', '/user/login');
    cy.get('[id^=your_name]').type(randomUser);
    cy.get('[id^=your_pass]').type(randomPassword);
    cy.get('form').contains('Log in').click();
    cy.url().should('include', '/home');
    cy.contains('FAVOURITE');
  });
});

describe('Put item in favourite', () => {
  beforeEach(() => {
    cy.visit('/user/login');
    cy.get('[id^=your_name]').type(randomUser);
    cy.get('[id^=your_pass]').type(randomPassword);
    cy.get('form').contains('Log in').click();
    cy.url().should('include', '/home');
  });

  it('Put and remove item in favourite', () => {
    cy.contains('FAVOURITE').click();
    cy.url().should('include', '/favourite');
    cy.contains('No Product in your favourite list').should('exist');
    cy.contains('OC-commerce').click();
    cy.url().should('include', '/home');
    cy.get('.portfolio-item').first().trigger('mouseover').within(() => {
      cy.get('a').click();
    });
    checkFav();
  });
});

describe('Put item in favourite from detail view', () => {
  beforeEach(() => {
    cy.visit('/user/login');
    cy.get('[id^=your_name]').type(randomUser);
    cy.get('[id^=your_pass]').type(randomPassword);
    cy.get('form').contains('Log in').click();
    cy.url().should('include', '/home');
  });

  it('Put and remove item in favourite from detail view', () => {
    cy.contains('OC-commerce').click();
    cy.url().should('include', '/home');
    cy.get('.portfolio-item').first().trigger('mouseover').within(() => {
      cy.get('svg[data-icon="info-circle"]').click();
    });
    cy.get('.portfolio-modal.show').should('be.visible').within(() => {
      cy.get('svg[data-icon="heart"]').click();
    });
    cy.reload(); // refresh la page parce que la modale voulait pas disparaître
    checkFav();
  });
});
