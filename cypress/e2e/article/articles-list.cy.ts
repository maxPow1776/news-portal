describe('article list', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit('articles');
    });
  });
  it('articles loading', () => {
    cy.getByTestId('article-list').should('exist');
    cy.getByTestId('article-list-item').should('have.length.greaterThan', 3);
  });
});
