import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "common/Components/Button/Button";
import { Input } from "common/Components/Input/Input";
import { Form } from "common/Components/Form/Form";
import "./index.css";

const schema = Yup.object().shape({
  login: Yup.string().required("Логин обязательное поле").min(5, "Логин должен быть не меньше 5 символов").max(10, "Логин должен быть не больше 10 символов"),
  password: Yup.string()
    .required("Пароль обязательное поле")
    .matches(/^[A-Za-z0-9]{1,}$/, "Пароль некорректный, пароль может содержать только латинские буквы и цифры!")
    .min(5, "Пароль должен быть не меньше 5 символов")
    .max(10, "Пароль должен быть не больше 10 символов"),
});

export const RegistrationForm = ({ formSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    formSubmit(data);
  };

  return (
    <div className="wrapper__auth">
      <Form classNameForm="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="txt-center">Регистрация</h1>
        <Input data-testid="login" {...register("login")} type="text" label="Логин" error={errors.login} />
        <Input data-testid="password" {...register("password")} type="text" label="Пароль" error={errors.password} />
        <div className="margin-bottom-16 txt-right">
          <Link to="/auth">Авторизоваться</Link>
        </div>
        <Button title="Зарегистрироваться" type="submit" btnClassName="button-primary width-100" />
      </Form>
    </div>
  );
};
