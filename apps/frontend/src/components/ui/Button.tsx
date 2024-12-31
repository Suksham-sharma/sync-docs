interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className }: ButtonProps) => {
  return (
    <>
      <button
        className={`${className} bg-white text-black py-2 px-3 rounded-2xl`}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
