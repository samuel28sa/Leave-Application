import React from "react";
export const Panel = ({
  children,
  Background = () => null,
  Header = () => null,
  className = "",
  ...props
}) => {
  return (
    <div className={`${className} bg-white rounded divide-y p-2 min-h-28`}>
      <Header />
      <div className="relative">
        <div>{children}</div>
        <Background className="absolute gz" />
      </div>
    </div> 
  );
};

export default Panel;
