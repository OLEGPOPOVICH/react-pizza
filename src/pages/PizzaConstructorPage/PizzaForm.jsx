/* eslint-disable prettier/prettier */
import { CheckBox } from "common/Components/CheckBox/CheckBox";
import { CheckBoxGroup } from "common/Components/CheckBoxGroup/CheckBoxGroup";
import { Form } from "common/Components/Form/Form";
import { RadioButton } from "common/Components/RadioButton/RadioButton";
import { RadioGroup } from "common/Components/RadioGroup/RadioGroup";
import { usePizzaConstructorContext } from "pages/PizzaConstructorPage/PizzaConstructorContext";

export const PizzaForm = ({
  onSubmit
}) => {
  const { register, pizzaData, handleSubmit, totalPrice } = usePizzaConstructorContext();

  const handleOnSubmit = (data) => {
    onSubmit({...data, price: totalPrice })
  }

  return (
    <>
      <Form id="order" onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="margin-bottom-16">
          <div className="pizza__param">
            <RadioGroup
              label="Размер"
              displayType="line"
            >
              {pizzaData.size.map((item) => (
                <RadioButton
                  key={item.slug}
                  defaultChecked={item.checked}
                  label={item.label}
                  value={item.value}
                  {...register('size')}
                />
              ))}
            </RadioGroup>
          </div>
          <div className="pizza__param">
            <RadioGroup
              label="Тесто"
              displayType="line"
            >
              {pizzaData.dough.map((item) => (
                <RadioButton
                  key={item.slug}
                  defaultChecked={item.checked}
                  label={item.label}
                  value={item.value}
                  {...register('dough')}
                />
              ))}
            </RadioGroup>
          </div>
        </div>
        <div className="margin-bottom-16">
          <div className="pizza__param">
            <RadioGroup
              label="Выберите соус"
              displayType="line"
            >
              {pizzaData.sauce.map((item) => (
                <RadioButton
                  key={item.slug}
                  defaultChecked={item.checked}
                  label={item.label}
                  value={item.value}
                  {...register('sauce')}
                />
              ))}
            </RadioGroup>
          </div>
        </div>
        <div className="margin-bottom-16">
          <div className="pizza__param">
            <CheckBoxGroup
              label="Добавьте сыр"
              displayType="line"
            >
              {pizzaData.cheese.map((item) => (
                <CheckBox
                  key={item.slug}
                  value={item.value}
                  name="cheese"
                  defaultChecked={item.checked}
                  {...register('cheese')}
                />
              ))}
            </CheckBoxGroup>
          </div>
        </div>
        <div className="margin-bottom-16">
          <div className="pizza__param">
            <CheckBoxGroup
              label="Добавьте овощи"
              displayType="line"
            >
              {pizzaData.vegetables.map((item) => (
                <CheckBox
                  key={item.slug}
                  value={item.value}
                  defaultChecked={item.checked}
                  {...register('vegetables')}
                />
              ))}
            </CheckBoxGroup>
          </div>
        </div>
        <div className="margin-bottom-16">
          <div className="pizza__param">
            <CheckBoxGroup
              label="Добавьте мясо"
              displayType="line"
            >
              {pizzaData.meat.map((item) => (
                <CheckBox
                  key={item.slug}
                  value={item.value}
                  defaultChecked={item.checked}
                  {...register('meat')}
                />
              ))}
            </CheckBoxGroup>
          </div>
        </div>
      </Form>
    </>
  );
};
