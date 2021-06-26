/* eslint-disable prettier/prettier */
/* eslint-disable import/named */
import { normalize } from "utils";
import { Form } from "common/Components/Form/Form";
import { Input } from "common/Components/Input/Input";
import { useCheckoutPageContext } from "./CheckoutPageContext";

export const CheckoutForm = ({
  formSubmit
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCheckoutPageContext();
  const cardNumber = register("cardNumber");
  const cardExpiryDate = register("cardExpiryDate");
  const codeCVV = register("codeCVV")

  return (
    <Form id="formCheckout" onSubmit={handleSubmit((data) => formSubmit(data))}>
      <h2>Адрес доставки</h2>
      <Input
        data-testid="address"
        {...register("address")}
        type="text"
        error={errors.address}
        placeholder="Введите адрес"
      />
      <div className="box input__box">
        <Input
          data-testid="entrance"
          {...register("entrance")}
          type="text"
          error={errors.entrance}
          label="подъезд"
        />
        <Input
          data-testid="floor"
          {...register("floor")}
          type="text"
          error={errors.floor}
          label="этаж"
        />
        <Input
          data-testid="flat"
          {...register("flat")}
          type="text"
          error={errors.flat}
          label="квартира"
        />
      </div>
      <div className="block_line" />
      <h2>Данные для оплаты</h2>
      <Input
        data-testid="cardNumber"
        {...cardNumber}
        type="text"
        error={errors.cardNumber}
        placeholder="Номер карты"
        onChange={(e) => {
          cardNumber.onChange(e);
          e.target.value = normalize.cardNumber(e.target.value);
        }}
      />
      <div className="box box__jcsb">
        <Input
          data-testid="cardExpiryDate"
          {...cardExpiryDate}
          type="text"
          error={errors.cardExpiryDate}
          placeholder="MM/YYYY"
          onChange={(e) => {
            cardExpiryDate.onChange(e);
            e.target.value = normalize.cardExpiryDate(e.target.value);
          }}
        />
        <Input
          data-testid="codeCVV"
          {...codeCVV}
          type="text"
          error={errors.codeCVV}
          placeholder="CVV"
          onChange={(e) => {
            codeCVV.onChange(e);
            e.target.value = normalize.codeCVV(e.target.value);
          }}
        />
      </div>
      <Input
        data-testid="cardowner"
        {...register("cardowner")}
        type="text"
        error={errors.cardowner}
        placeholder="Имя как на карте"
      />
      <div className="block_line" />
      <p>Доставим пиццу в течение часа или вернем деньги. Артем слов на ветер не бросает.</p>
    </Form>
  );
};
