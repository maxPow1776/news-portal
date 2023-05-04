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
  it('articles loading (fixtures)', () => {
    cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
    cy.getByTestId('article-list').should('exist');
    cy.getByTestId('article-list-item').should('have.length.greaterThan', 3);
  });
});
