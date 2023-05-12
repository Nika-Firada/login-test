import { fireEvent, render, screen, act, getByTestId } from "@testing-library/react";
import Login, { validateEmail } from "../Login";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";


const onSubmit = jest.fn();
describe("Test the Login component", () => {
    // აქვს თუ არა 2 ღილაკი
    test("render the login form submit button on the screen", async () => {
        render(<Login />);
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(2);
    });

    test("should be failed on email validation ", () => {
        const testEmail = "firada.com";
        expect(validateEmail(testEmail)).not.toBe(true);
    });
    test("email input field should accept email", () => {
        render(<Login />);
        const email = screen.getByPlaceholderText("Enter email");
        userEvent.type(email, "firada");
        expect(email.value).not.toMatch("firada@gmail.com");
    });

    test("passport input should have type password ", () => {
        render(<Login />);
        const password = screen.getByPlaceholderText("Password");
        expect(password).toHaveAttribute("type", "password");
    });

    test("should display alert if error", () => {
        render(<Login />);
        const email = screen.getByPlaceholderText("Enter email");
        const password = screen.getByPlaceholderText("Password");
        const buttonList = screen.getAllByRole("button");

        userEvent.type(email, "firada");
        userEvent.type(password, "123456");
        userEvent.click(buttonList[0]);
        const error = screen.getByText("Email is not valid");
        expect(error).toBeInTheDocument();
    });

    test("should be able to reset the form ", () => {
        const { getByLabelText, getByTestId } = render(<Login />);
        const resetBtn = getByTestId("reset");
        const emailInputNode = getByLabelText("Email");
        const passwordInputNode = getByLabelText("Password");
        fireEvent.click(resetBtn);
        expect(emailInputNode.value).toMatch("");
        expect(passwordInputNode.value).toMatch("");
    });

    test("should be able to submit the form", () => {
        render(<Login />);
        const submitBtn = screen.getByTestId("submit")
        const email = screen.getByPlaceholderText("Enter email");
        const password = screen.getByPlaceholderText("Password");
      
        userEvent.type(email, "firada@gmail.com");
        userEvent.type(password, "1234567");
        userEvent.click(submitBtn);
      
        const user = screen.getByTestId("user");
        expect(user).toHaveTextContent("firada@gmail.com");
      });
});