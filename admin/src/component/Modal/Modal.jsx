import "./styles.css";

export const Modal = ({
  showModal,
  title,
  isTitle = true,
  children,
  action,
  options,
  closeButtonLabel,
  onClose,
  afterClose
}) => {
  const listItemStyle = {
    'maxWidth': options && options.width ? options.width : '400px'
  };

  const handleCloseClick = () => {
    if (onClose) {
      onClose()
    }

    if (
      afterClose
      && typeof afterClose === "function"
    ) {
      afterClose();
    }
  }

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal modal-overlay">
      <div className="modal__container" style={listItemStyle}>
        {isTitle && (
          <div className="modal__header">
            {title || "Заголовок окна"}
          </div>
        )}
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
