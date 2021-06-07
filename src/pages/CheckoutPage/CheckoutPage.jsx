import { Order } from "pages/OrderPage/Order/Order";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutResult } from "./CheckoutResult";
import { ProviderCheckoutPage } from "./useCheckoutPageContext";

export const CheckoutPage = () => {
  const handleClick = (data) => {
    console.log(data);
  };

  return (
    <div className="page">
      <div className="two__col">
        <ProviderCheckoutPage>
          <div className="col">
            <CheckoutForm />
          </div>
          <div className="col">
            <Order />
            <CheckoutResult formSubmit={handleClick} />
          </div>
        </ProviderCheckoutPage>
      </div>
    </div>
  );
};
