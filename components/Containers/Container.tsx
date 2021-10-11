const Container = ({ children, className = '' }) => {
  return (
    <div
      className={`container max-w-screen-2xl px-32 mx-auto my-40 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
