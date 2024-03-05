import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUpForm from './SignUpForm';
import axios from 'axios';

jest.mock('axios');

const renderSignUpForm = () => {
  render(
    <BrowserRouter>
      <SignUpForm />
    </BrowserRouter>
  );
};

describe('SignUpForm Component', () => {
  test('renders SignUpForm with username, password1 and password2 fields', () => {
    renderSignUpForm();
    const usernameInput = screen.getByPlaceholderText('Username');
    const password1Input = screen.getByPlaceholderText('Password');
    const password2Input = screen.getByPlaceholderText('Confirm password');
    expect(usernameInput).toBeInTheDocument();
    expect(password1Input).toBeInTheDocument();
    expect(password2Input).toBeInTheDocument();
  });

  test('calls handleSubmit on form submission', async () => {
    renderSignUpForm();
    const usernameInput = screen.getByPlaceholderText('Username');
    const password1Input = screen.getByPlaceholderText('Password');
    const password2Input = screen.getByPlaceholderText('Confirm password');
    const signUpButton = screen.getByRole('button', { name: 'Sign up' });

    axios.post.mockResolvedValue({ data: { user: 'testUser' } });

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(password1Input, { target: { value: 'testPassword1' } });
    fireEvent.change(password2Input, { target: { value: 'testPassword2' } });
    fireEvent.click(signUpButton);

    expect(axios.post).toHaveBeenCalledWith('/dj-rest-auth/registration/', {
      username: 'testUser',
      password1: 'testPassword1',
      password2: 'testPassword2',
    });
  });

  test('sign in link works correctly', () => {
    renderSignUpForm();
    const signInLink = screen.getByRole('link', { name: /You already have an account? Sign In/i });
    expect(signInLink).toBeInTheDocument();
  });
});