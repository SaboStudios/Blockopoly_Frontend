// import React from 'react';

// type AngledButtonProps = {
//   children?: React.ReactNode;
//   onClick?: React.MouseEventHandler<HTMLButtonElement>;
//   className?: string;
//   href?: string;
//   variant?: keyof typeof shapes;
//   size?: keyof typeof sizes;
// };

// const shapes = {
//   "arrow-right": "polygon(2rem 0%, 100% 0%, calc(100% - 2rem) 100%, 0% 100%)",
//   "arrow-left": "polygon(0% 0%, calc(100% - 2rem) 0%, 100% 100%, 2rem 100%)",
//   "chevron-right": "polygon(0% 0%, calc(100% - 1.5rem) 0%, 100% 50%, calc(100% - 1.5rem) 100%, 0% 100%, 1.5rem 50%)",
//   "chevron-left": "polygon(1.5rem 0%, 100% 0%, calc(100% - 1.5rem) 50%, 100% 100%, 1.5rem 100%, 0% 50%)",
//   "diamond": "polygon(2rem 0%, calc(100% - 2rem) 0%, 100% 50%, calc(100% - 2rem) 100%, 2rem 100%, 0% 50%)",
//   "trapezoid": "polygon(1rem 0%, calc(100% - 1rem) 0%, 100% 100%, 0% 100%)",
//   "parallelogram": "polygon(1.5rem 0%, 100% 0%, calc(100% - 1.5rem) 100%, 0% 100%)",
//   "notched": "polygon(0% 0%, calc(100% - 1rem) 0%, 100% 1rem, 100% 100%, 1rem 100%, 0% calc(100% - 1rem))",
//   "tab": "polygon(0% 0%, calc(100% - 1rem) 0%, 100% 50%, calc(100% - 1rem) 100%, 0% 100%)"
// };

// const sizes = {
//   sm: "px-4 py-2 text-sm",
//   md: "px-8 py-4 text-lg",
//   lg: "px-12 py-6 text-xl",
//   xl: "px-16 py-8 text-2xl"
// };

// const AngledButton: React.FC<AngledButtonProps> = ({
//   children = "Get to know us",
//   onClick,
//   className = "",
//   href,
//   variant = "arrow-right",
//   size = "md"
// }) => {
//   // Different button shapes using clip-path
//   const shapes = {
//     "arrow-right": "polygon(2rem 0%, 100% 0%, calc(100% - 2rem) 100%, 0% 100%)",
//     "arrow-left": "polygon(0% 0%, calc(100% - 2rem) 0%, 100% 100%, 2rem 100%)",
//     "chevron-right": "polygon(0% 0%, calc(100% - 1.5rem) 0%, 100% 50%, calc(100% - 1.5rem) 100%, 0% 100%, 1.5rem 50%)",
//     "chevron-left": "polygon(1.5rem 0%, 100% 0%, calc(100% - 1.5rem) 50%, 100% 100%, 1.5rem 100%, 0% 50%)",
//     "diamond": "polygon(2rem 0%, calc(100% - 2rem) 0%, 100% 50%, calc(100% - 2rem) 100%, 2rem 100%, 0% 50%)",
//     "trapezoid": "polygon(1rem 0%, calc(100% - 1rem) 0%, 100% 100%, 0% 100%)",
//     "parallelogram": "polygon(1.5rem 0%, 100% 0%, calc(100% - 1.5rem) 100%, 0% 100%)",
//     "notched": "polygon(0% 0%, calc(100% - 1rem) 0%, 100% 1rem, 100% 100%, 1rem 100%, 0% calc(100% - 1rem))",
//     "tab": "polygon(0% 0%, calc(100% - 1rem) 0%, 100% 50%, calc(100% - 1rem) 100%, 0% 100%)"
//   };

//   // Size variations
//   const sizes = {
//     sm: "px-4 py-2 text-sm",
//     md: "px-8 py-4 text-lg",
//     lg: "px-12 py-6 text-xl",
//     xl: "px-16 py-8 text-2xl"
//   };

//   const buttonClasses = `
//     relative inline-block
//     bg-yellow-400 hover:bg-yellow-500
//     text-white font-bold
//     ${sizes[size]}
//     transition-all duration-300 ease-in-out
//     transform hover:scale-105 hover:shadow-lg
//     cursor-pointer
//     ${className}
//   `;

//   const buttonStyle = {
//     clipPath: shapes[variant],
//     WebkitClipPath: shapes[variant],
//   };

//   const ButtonContent = () => (
//     <span className="relative z-10 whitespace-nowrap">
//       {children}
//     </span>
//   );

//   if (href) {
//     return (
//       <a 
//         href={href}
//         className={buttonClasses}
//         style={buttonStyle}
//       >
//         <ButtonContent />
//       </a>
//     );
//   }

//   return (
//     <button 
//       onClick={onClick}
//       className={buttonClasses}
//       style={buttonStyle}
//     >
//       <ButtonContent />
//     </button>
//   );
// };
// export default AngledButton;