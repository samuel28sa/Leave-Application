import React from "react";
export const Panel = ({
  children,
  Background = () => null,
  Header = () => null,
  className = "",
  ...props
}) => {
  return (
    <section className={`${className} bg-white rounded divide-y p-4  `}>
      <Header />
      <div className="relative">
        <div>{children}</div>
        <Background className="absolute" />
      </div>
    </section>
  );
};

export default Panel;
