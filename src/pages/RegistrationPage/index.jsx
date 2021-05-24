/* eslint-disable prettier/prettier */
import { Button } from 'common/components/Button/Button';
import { Input } from 'common/components/Input/Input';
import { Link } from 'react-router-dom';
import './index.css';

export const RegistrationPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {};

  return (
    <div className="wrapper__auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h1 className="txt-center">Регистрация</h1>
        <Input
          type="text"
          label="Логин"
          onChange={handleChange}
        />
        <Input
          type="text"
          label="Пароль"
          onChange={handleChange}
        />
        <div className="margin-bottom-16 txt-right">
          <Link to="/auth">Авторизоваться</Link>
        </div>
        <Button
          title="Зарегистрироваться"
          typeClass="primary"
        />
      </form>
    </div>
  )
}