export const updateProfile = (firstname?: string, lastname?: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();
  cy.getByTestId('profile-card.firstname').clear().type(firstname ?? 'new');
  cy.getByTestId('profile-card.lastname').clear().type(lastname ?? 'new');
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const reserProfile = (profileId: string) => {
  return cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'test' },
    body: {
      id: '4',
      first: 'testuser',
      lastname: 'testuser',
      age: 23,
      currency: 'RUB',
      country: 'Belarus',
      city: 'Moscow',
      username: 'user',
      // eslint-disable-next-line max-len
      avatar: 'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png',
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstname?: string, lastname?: string): Chainable<void>;
      reserProfile(profileId: string): Chainable<void>;
    }
  }
}
