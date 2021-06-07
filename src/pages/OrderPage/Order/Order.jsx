import "./index.css";

export const Order = () => (
  <div className="order">
    <div className="header__order">
      <span>Заказ 2390</span>
      <span>21 октября 2020, 13:40</span>
      <span>В процессе</span>
    </div>
    <div className="content__order">
      <h2>Пицца на обед в пятницу</h2>
      <div>30 см на толстом тесте • Томатный соус • Моцарелла • Томаты • Бекон</div>
    </div>
    <div className="footer__order">
      <div className="payment__order">
        <span className="price">420 руб</span>
        <span className="payment_system">2345</span>
      </div>
      <div className="order__procces">
        <span>Доставляется</span>
      </div>
    </div>
  </div>
);
