import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Profile } from '@/entities/Profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { $api } from '@/shared/api/api';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
  id: '1',
  first: 'admin',
  lastname: 'admin',
  age: 20,
  currency: Currency.USD,
  country: Country.Kazakhstan,
  city: 'Moscow',
  username: 'admin',
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: { id: '1' },
    },
  },
  asyncReducers: { profile: profileReducer },
};

describe('features/EditableProfileCard', () => {
  test('readonly must switch', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
  });

  test('reset on cancel click', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('profile-card.firstname'));
    await userEvent.clear(screen.getByTestId('profile-card.lastname'));
    await userEvent.type(screen.getByTestId('profile-card.firstname'), 'user');
    await userEvent.type(screen.getByTestId('profile-card.lastname'), 'user');
    expect(screen.getByTestId('profile-card.firstname')).toHaveValue('user');
    expect(screen.getByTestId('profile-card.lastname')).toHaveValue('user');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));
    expect(screen.getByTestId('profile-card.firstname')).toHaveValue('admin');
    expect(screen.getByTestId('profile-card.lastname')).toHaveValue('admin');
  });

  test('error must shown', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
    await userEvent.clear(screen.getByTestId('profile-card.firstname'));
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));
    expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
  });

  test('when without error shoud send put request', async () => {
    const mockPutRequest = jest.spyOn($api, 'put');
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
    await userEvent.clear(screen.getByTestId('profile-card.firstname'));
    await userEvent.type(screen.getByTestId('profile-card.firstname'), 'user');
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));
    expect(mockPutRequest).toHaveBeenCalled();
  });
});
