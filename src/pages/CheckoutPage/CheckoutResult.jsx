/* eslint-disable prettier/prettier */
import { Button } from "common/Components/Button/Button";
import { useCheckoutPageContext } from "./CheckoutPageContext";

export const CheckoutResult = ({
  orderPrice,
  deliveryPrice,
}) => {
  const { isFormCompleted } = useCheckoutPageContext();
  const toPay = orderPrice + deliveryPrice;
  const buttonTitle = !isFormCompleted ? "Заполните форму заказа" : `Оплатить ${toPay} руб`;

  return (
    <>
      <div className="padding-16 margin-y-16">
        <div className="box box__jcsb margin-bottom-8">
          <div>Стоимость заказа</div>
          <div>{ orderPrice } руб</div>
        </div>
        <div className="box box__jcsb">
          <div>Доставка</div>
          <div>{ deliveryPrice } руб</div>
        </div>
        <div className="block_line" />
        <div className="box box__jcsb">
          <div>К оплате</div>
          <div>{ toPay } руб</div>
        </div>
      </div>
      <Button
        form="formCheckout"
        title={buttonTitle}
        data-testid="btn-order"
        type="submit"
        btnClassName="button-primary width-100"
        disabled={!isFormCompleted}
      />
    </>
  );
};
