import "./styles.css";

export const Modal = ({
  showModal,
  title,
  children,
  action,
  options,
  closeButtonLabel,
  onClose
}) => {
  const listItemStyle = {
    'maxWidth': options && options.width ? options.width : '400px'
  };

  const handleCloseClick = () => {
    if (onClose) {
      onClose()
    }
  }

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal modal-overlay">
      <div className="modal__container" style={listItemStyle}>
        <div className="modal__header">
          {title || "Заголовок окна"}
        </div>
        <div className="modal__body">
          {children}
        </div>
        <div className="modal__footer">
          {action
            ? <button
                key={action.name}
                form={action.formID}
              >
                {action.name || "Действие"}
              </button>
            : null
          }
          <button
            type="button"
            onClick={handleCloseClick}
          >{closeButtonLabel || "Закрыть"}</button>
        </div>
      </div>
    </div>
  )
};
