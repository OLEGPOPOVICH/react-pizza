/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import { Button } from '../../common/components/Button/index';
import { Input } from '../../common/components/Input/index';
import './index.css'

export const AuthPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {};

  return (
    <div className="wrapper__auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h1 className="txt-center">Авторизация</h1>
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
          <Link to="/registration">Зарегистрироваться</Link>
        </div>
        <Button
          title="Авторизоваться"
          typeClass="primary"
        />
      </form>
    </div>
  )
}