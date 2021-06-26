import { render } from "@testing-library/react";
import { CheckoutResult } from "./CheckoutResult";
import { CheckoutPageProvider } from "./CheckoutPageContext";

describe("CheckoutResult", () => {
  it("renders", () => {
    const orderPrice = 600;
    const deliveryPrice = 200;
    const toPay = orderPrice + deliveryPrice;

    const { getByText, getByTestId } = render(
      <CheckoutPageProvider>
        <CheckoutResult orderPrice={orderPrice} deliveryPrice={deliveryPrice} />
      </CheckoutPageProvider>
    );

    const orderPriceTitle = getByText("Стоимость заказа");
    const delivaryTitle = getByText("Доставка");
    const toPayTitle = getByText("К оплате");
    const button = getByTestId("btn-order");

    expect(orderPriceTitle).toBeInTheDocument();
    expect(orderPriceTitle.nextSibling.innerHTML).toBe(`${orderPrice} руб`);

    expect(delivaryTitle).toBeInTheDocument();
    expect(delivaryTitle.nextSibling.innerHTML).toBe(`${deliveryPrice} руб`);

    expect(toPayTitle).toBeInTheDocument();
    expect(toPayTitle.nextSibling.innerHTML).toBe(`${toPay} руб`);

    expect(button).toBeDisabled();
  });
});
