let profileId = '';
describe('user visit profile page', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login().then((data) => {
      cy.visit(`/profile/${data.id}`);
      profileId = data.id;
    });
  });
  afterEach(() => {
    cy.reserProfile(profileId);
  });
  it('profile ready', () => {
    cy.getByTestId('profile-card.firstname').should('have.value', 'testuser');
  });
  it('edit profile', () => {
    cy.updateProfile();
    cy.getByTestId('profile-card.firstname').should('have.value', 'new');
    cy.getByTestId('profile-card.lastname').should('have.value', 'new');
  });
});
