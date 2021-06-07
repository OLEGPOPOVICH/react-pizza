import { render } from "@testing-library/react";
import { CheckoutResult } from "./CheckoutResult";
import { ProviderCheckoutPage } from "./useCheckoutPageContext";

describe("CheckoutResult", () => {
  it("renders", () => {
    const { getByText, getByRole } = render(
      <ProviderCheckoutPage>
        <CheckoutResult />
      </ProviderCheckoutPage>
    );

    const orderCost = getByText("Стоимость заказа");
    const delivary = getByText("Доставка");
    const toPay = getByText("К оплате");
    const button = getByRole("button", "Заполните форму заказа");

    expect(orderCost).toBeInTheDocument();
    expect(orderCost.nextSibling.innerHTML).toBe("420 руб");

    expect(delivary).toBeInTheDocument();
    expect(delivary.nextSibling.innerHTML).toBe("180 руб");

    expect(toPay).toBeInTheDocument();
    expect(toPay.nextSibling.innerHTML).toBe("600 руб");

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
