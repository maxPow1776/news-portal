let currentArticleId = '';
describe('article-details', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.visit(`articles/${article.id}`);
    });
  });
  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });
  it('check article', () => {
    cy.getByTestId('article-details.info').should('exist');
  });
  it('show recommendations', () => {
    cy.getByTestId('article-recommendation-list').should('exist');
  });
  it('send comment', () => {
    cy.getByTestId('article-details.info');
    cy.getByTestId('add-comment-form').scrollIntoView();
    cy.addComment('text');
    cy.getByTestId('comment-card.content').should('have.length', 1);
  });
  it('send rating', () => {
    cy.getByTestId('article-details.info');
    cy.getByTestId('rating-card').scrollIntoView();
    cy.setRate(4, 'feedback');
    cy.get('[data-selected=true]').should('have.length', 4);
  });
});
