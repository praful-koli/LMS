export const Button = ({
  children,
  variant = "default",
  size = "default",
  disabled = false,
  ...props
}) => {
  const baseStyle = {
    display: 'inline-flex',              // to support icons + text
    alignItems: 'center',               // center icon and text
    justifyContent: 'center',
    gap: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    border: 'none',
    borderRadius: '6px',
    transition: 'all 0.3s ease-in-out',
  };

  const variantStyles = {
    default: {
      backgroundColor: '#000',
      color: '#fff',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#000',
      border: '1px solid #000',
    },
  };

  const sizeStyles = {
    sm: {
      padding: '4px 10px',
      fontSize: '12px',
    },
    default: {
      padding: '7px 16px',
      fontSize: '14px',
    },
    lg: {
      padding: '10px 20px',
      fontSize: '16px',
    },
  };

  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        ...baseStyle,
        ...variantStyles[variant],
        ...sizeStyles[size],
      }}
    >
      {children}
    </button>
  );
};
