import { selectByTestId } from '../../helpers/selectByTestId';

describe('routing', () => {
  describe('user is not authorized', () => {
    it('redirect to main page', () => {
      cy.visit('/');
      cy.get(selectByTestId('main-page')).should('exist');
    });
    it('redirect to profile page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('main-page')).should('exist');
    });
    it('non-existent route', () => {
      cy.visit('/test');
      cy.get(selectByTestId('not-found-page')).should('exist');
    });
  });
  describe('user is authorized', () => {
    beforeEach(() => {
      cy.login();
    });
    it('redirect to profile page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('profile-page')).should('exist');
    });
    it('redirect to articles page', () => {
      cy.visit('/articles');
      cy.get(selectByTestId('articles-page')).should('exist');
    });
  });
});
