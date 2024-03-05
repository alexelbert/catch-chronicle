import SignInForm from './SignInForm';
import axios from 'axios';

jest.mock('axios');

describe('SignInForm Component', () => {
  it('renders input fields for username and password', () => {
    const { getByPlaceholderText } = render(<SignInForm />);
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('submits the form data and makes a POST request with user credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignInForm />);
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const signInButton = getByText('Sign in');

    axios.post.mockResolvedValue({ data: { user: 'testUser' } });

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(signInButton);

    expect(axios.post).toHaveBeenCalledWith('/dj-rest-auth/login/', {
      username: 'testUser',
      password: 'testPassword',
    });
  });
});