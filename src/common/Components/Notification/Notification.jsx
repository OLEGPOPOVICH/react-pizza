import "./styles.css";

export const Notification = ({ status, title, message, icon }) => (
  <div className="notification txt-center">
    {icon && (
      <div className="notification__icon">
        <img src={`/images/${status}.svg`} alt={status} />
      </div>
    )}
    {title && <div className="notification_title">{title}</div>}
    {message && <div className="notification_message">{message}</div>}
  </div>
);
