const Button = ({ name, id, onClick, clname }) => {
  return (
    <button
      id={id}
      className={clname != "" ? clname : 'btn'}
      onClick={onClick}
    >
      {name}
    </button>
  );
};
export default Button;
