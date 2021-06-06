import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutResult } from "./CheckoutResult";
import { ProviderCheckoutPage } from "./useCheckoutPageContext";

describe("CheckoutPage", () => {
  it("checkout process", async () => {
    const formSubmit = jest.fn().mockImplementation((data) => data);

    const { getByTestId, getByRole } = render(
      <ProviderCheckoutPage>
        <CheckoutForm />
        <CheckoutResult formSubmit={formSubmit} />
      </ProviderCheckoutPage>
    );

    const address = getByTestId("address");
    const entrance = getByTestId("entrance");
    const floor = getByTestId("floor");
    const flat = getByTestId("flat");
    const cardNumber = getByTestId("cardNumber");
    const cardExpiryDate = getByTestId("cardExpiryDate");
    const codeCVV = getByTestId("codeCVV");
    const cardowner = getByTestId("cardowner");

    await act(async () => {
      fireEvent.input(address, { target: { value: "Михаила Дудина 23" } });
      fireEvent.input(entrance, { target: { value: "4" } });
      fireEvent.input(floor, { target: { value: "3" } });
      fireEvent.input(flat, { target: { value: "777" } });
      fireEvent.input(cardNumber, { target: { value: "1234 5678 1234 5678" } });
      fireEvent.input(cardExpiryDate, { target: { value: "12/2021" } });
      fireEvent.input(codeCVV, { target: { value: "123" } });
      fireEvent.input(cardowner, { target: { value: "Popovich Oleg" } });
    });

    const button = getByRole("button", "Оплатить 600 руб");

    expect(button).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(button);
    });

    expect(formSubmit).toBeCalledWith({
      address: "Михаила Дудина 23",
      entrance: "4",
      floor: "3",
      flat: "777",
      cardNumber: "1234 5678 1234 5678",
      cardExpiryDate: "12/2021",
      codeCVV: "123",
      cardowner: "Popovich Oleg",
    });
  });
});
