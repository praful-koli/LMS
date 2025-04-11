// import React from "react";

// // Forward the ref to the actual <button> element
// export const Button = React.forwardRef(
//   (
//     {
//       children,
//       variant = "default",
//       size = "default",
//       disabled = false,
//       ...props
//     },
//     ref
//   ) => {
//     const baseStyle = {
//       display: "inline-flex",
//       alignItems: "center",
//       justifyContent: "center",
//       gap: "6px",
//       cursor: disabled ? "not-allowed" : "pointer",
//       opacity: disabled ? 0.6 : 1,
//       border: "none",
//       borderRadius: "6px",
//       transition: "all 0.3s ease-in-out",
//     };

//     const variantStyles = {
//       default: {
//         backgroundColor: "#000",
//         color: "#fff",
//       },
//       outline: {
//         backgroundColor: "transparent",
//         color: "#000",
//         border: "1px solid #000",
//       },
//       destructive: {
//         backgroundColor: "#dc2626", // Tailwind red-600
//         color: "#fff",
//       },
//     };
    

//     const sizeStyles = {
//       sm: {
//         padding: "4px 10px",
//         fontSize: "12px",
//       },
//       default: {
//         padding: "7px 16px",
//         fontSize: "14px",
//       },
//       lg: {
//         padding: "10px 20px",
//         fontSize: "16px",
//       },
//     };

//     return (
//       <button
//         {...props}
//         ref={ref} // Pass ref here!
//         disabled={disabled}
//         style={{
//           ...baseStyle,
//           ...variantStyles[variant],
//           ...sizeStyles[size],
//         }}
//       >
//         {children}
//       </button>
//     );
//   }
// );

// // Optional but recommended: helps with debugging
// Button.displayName = "Button";
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
