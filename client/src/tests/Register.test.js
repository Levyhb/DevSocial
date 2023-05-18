import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Register from "../pages/register/register";
import "@testing-library/jest-dom/extend-expect";


describe("Register page tests", () => {

  it('Checks for a "Username", "Email", "Password", "Password Again" field', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText("Username");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const passwordAgainInput = screen.getByPlaceholderText("Password Again");
    const signUpButton = screen.getByText('Sign Up');

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordAgainInput).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();

  });

  it("An error alert is generated when trying to register with an email already registered", async () => {
    render(
      <MemoryRouter>
        <Register />
        <ToastContainer />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText("Username");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const passwordAgainInput = screen.getByPlaceholderText("Password Again");
    const signUpButton = screen.getByText('Sign Up');

    fireEvent.change(usernameInput, { target: { value: "aloha-teste" } });
    fireEvent.change(emailInput, { target: { value: "aloha@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.change(passwordAgainInput, { target: { value: "123456" } });

    fireEvent.click(signUpButton);
  
    expect(toast.error).toHaveBeenCalledWith('Email already registered', { autoClose: 4000 });  
  });
});
