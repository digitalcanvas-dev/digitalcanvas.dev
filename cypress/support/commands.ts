import { faker } from '@faker-js/faker';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Logs in with a random user. Yields the user and adds an alias to the user
       *
       * @returns {typeof login}
       * @memberof Chainable
       * @example
       *    cy.login()
       * @example
       *    cy.login({ email: 'whatever@example.com' })
       */
      login: typeof login;
      /**
       * Extends the standard visit command to wait for the page to load
       *
       * @returns {typeof visitAndCheck}
       * @memberof Chainable
       * @example
       *    cy.visitAndCheck('/')
       *  @example
       *    cy.visitAndCheck('/', 500)
       */
      visitAndCheck: typeof visitAndCheck;
      /**
       * Extends the standard visit command to wait for the page to load
       *
       * @returns {typeof isWithinViewport}
       * @memberof Chainable
       * @example
       *    cy.findByText('Important content').isWithinViewport();
       */
      isWithinViewport(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

function login({
  email = faker.internet.email(undefined, undefined, 'example.com'),
}: {
  email?: string;
} = {}) {
  cy.then(() => ({ email })).as('user');
  cy.request('POST', '/__tests/create-user', { email });
  return cy.get('@user');
}

// We're waiting a second because of this issue happen randomly
// https://github.com/cypress-io/cypress/issues/7306
// Also added custom types to avoid getting detached
// https://github.com/cypress-io/cypress/issues/7306#issuecomment-1152752612
// ===========================================================
function visitAndCheck(url: string, waitTime: number = 1000) {
  cy.visit(url);
  cy.location('pathname').should('contain', url).wait(waitTime);
}

function isWithinViewport(subject: JQuery<HTMLElement>) {
  const rect = subject[0].getBoundingClientRect();

  expect(rect.top).to.be.within(0, Cypress.config().viewportHeight);
  expect(rect.right).to.be.within(0, Cypress.config().viewportWidth);
  expect(rect.bottom).to.be.within(0, Cypress.config().viewportHeight);
  expect(rect.left).to.be.within(0, Cypress.config().viewportWidth);

  return cy.wrap(subject);
}

Cypress.Commands.add('visitAndCheck', visitAndCheck);

Cypress.Commands.add(
  'isWithinViewport',
  { prevSubject: true },
  isWithinViewport,
);
