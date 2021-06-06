export const Form = ({ onSubmit, classNameForm, children }) => (
  <form className={classNameForm} onSubmit={onSubmit}>
    {children}
  </form>
);
