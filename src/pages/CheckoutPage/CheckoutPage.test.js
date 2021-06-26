import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutResult } from "./CheckoutResult";
import { CheckoutPageProvider } from "./CheckoutPageContext";

describe("CheckoutPage", () => {
  it("checkout process", async () => {
    const formSubmit = jest.fn().mockImplementation((data) => data);

    const { getByTestId } = render(
      <CheckoutPageProvider>
        <CheckoutForm formSubmit={formSubmit} />
        <CheckoutResult />
      </CheckoutPageProvider>
    );

    const address = getByTestId("address");
    const entrance = getByTestId("entrance");
    const floor = getByTestId("floor");
    const flat = getByTestId("flat");
    const cardNumber = getByTestId("cardNumber");
    const cardExpiryDate = getByTestId("cardExpiryDate");
    const codeCVV = getByTestId("codeCVV");
    const cardowner = getByTestId("cardowner");
    const button = getByTestId("btn-order");

    expect(button.innerHTML).toBe('Заполните форму заказа');
    expect(button).toBeDisabled();

    await act(async () => {
      fireEvent.blur(address, { target: { value: "Михаила Дудина 23" } });
      fireEvent.blur(entrance, { target: { value: "4" } });
      fireEvent.blur(floor, { target: { value: "3" } });
      fireEvent.blur(flat, { target: { value: "777" } });
      fireEvent.blur(cardNumber, { target: { value: "1234 5678 1234 5678" } });
      fireEvent.blur(cardExpiryDate, { target: { value: "12/2021" } });
      fireEvent.blur(codeCVV, { target: { value: "123" } });
      fireEvent.blur(cardowner, { target: { value: "Popovich Oleg" } });
    });

    expect(button).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(button);
    });

    expect(formSubmit).toBeCalledWith(expect.objectContaining({
      cardNumber: '1234 5678 1234 5678',
      cardExpiryDate: '12/2021',
      codeCVV: '123',
      address: 'Михаила Дудина 23',
      entrance: '4',
      floor: '3',
      flat: '777',
      cardowner: 'Popovich Oleg'
    }));
  });
});
