describe('Navigation', () => {
  beforeEach(() => {
    cy.request('/api/debug/reset/');
    cy.visit('/');
    cy.contains('Monday');
  });
  it('should book an interview', () => {
    cy.get('[alt=Add]').first().click();
    cy.get('[data-testid=student-name-input]').type('Lindia Miller-Jones');
    cy.get(':nth-child(1) > .interviewers__item-image').click();
    cy.contains('Save').click();
    cy.contains('.appointment__card--show', 'Archie Cohen');
    cy.contains('.appointment__card--show', 'Lindia Miller-Jones');
  });
  it('should edit an interview', () => {
    cy.get('.appointment__card').click();
    cy.get('[src="images/edit.png"]').first().click({ force: true });
    cy.get('.schedule').click();
    cy.get('[data-testid=student-name-input]')
      .first()
      .clear()
      .type('Caldwell Tidicue');
    cy.get(':nth-child(2) > .interviewers__item-image').first().click();
    cy.get('.button--confirm').first().click();
  });
  it('should cancel an interview', () => {
    cy.get('[alt=Delete]').click({ force: true });
    cy.contains('Confirm').click();

    cy.contains('Deleting').should('exist');
    cy.contains('Deleting').should('not.exist');
    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
  });
});
