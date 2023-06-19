describe('smoke tests', () => {
  it('should navigate to contact form when contact buttons are clicked', () => {
    cy.visitAndCheck('/');
    cy.findByRole('button', { name: /Contact us/i }).click();

    cy.wait(1000);

    cy.findByRole('heading', { name: /Get in Touch/ }).isWithinViewport();
  });
});
