describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/api/debug/reset');
    cy.visit('/');
  });
  it('should visit root', () => {});
  // //bad
  // it('should navigate to Tuesday', () => {
  //   cy.get('ul > :nth-child(2)').click();
  //   cy.get('.day-list__item--selected')
  //     .contains('Tuesday')
  //     .not('have.css', 'background-color', 'rgb(242, 242, 242)')
  //     .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
  // });
  // //better
  // it('should navigate to Tuesday', () => {
  //   cy.contains('[data-testid=day]', 'Tuesday')
  //     .click()
  //     .contains('Tuesday')
  //     .not('have.css', 'background-color', 'rgb(242, 242, 242)')
  //     .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
  // });
  it('should navigate to Tuesday', () => {
    cy.contains('[data-testid=day]', 'Tuesday')
      .click()
      .parent()
      .should('have.class', 'day-list__item--selected');
  });
});
