/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { Button } from "common/Components/Button/Button";
import { useCheckoutPageContext } from "./useCheckoutPageContext";

export const CheckoutResult = ({
  formSubmit
}) => {
  const { isFormCompleted, getValues, watch, ...form } = useCheckoutPageContext();

  const buttonTitle = !isFormCompleted ? "Заполните форму заказа" : "Оплатить 600 руб";

  const handleClick = () => {
    formSubmit(getValues());
  };

  useEffect(() => {
    const fieldsForm = getValues();
    const keysFieldsForm = Object.keys(fieldsForm);

    keysFieldsForm.reduce((acc, key) => {
      const valuesWatch = watch(key);

      if (valuesWatch) {
        acc[key] = Array.isArray(valuesWatch) ? valuesWatch : [valuesWatch];
      }

      return acc;
    }, {});
  }, []);

  return (
    <>
      <div className="padding-16 margin-y-16">
        <div className="box box__jcsb margin-bottom-8">
          <div>Стоимость заказа</div>
          <div>420 руб</div>
        </div>
        <div className="box box__jcsb">
          <div>Доставка</div>
          <div>180 руб</div>
        </div>
        <div className="block_line" />
        <div className="box box__jcsb">
          <div>К оплате</div>
          <div>600 руб</div>
        </div>
      </div>
      <Button
        title={buttonTitle}
        data-testid="btn-order"
        btnClassName="button-primary width-100"
        disabled={!isFormCompleted}
        onClick={handleClick}
      />
    </>
  );
};
