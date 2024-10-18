import React from 'react';
import { FiMenu } from 'react-icons/fi';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between sticky top-0">
      <button onClick={toggleSidebar}>
        <FiMenu className="text-2xl" />
      </button>
      <div className="text-lg font-bold">Dashboard</div>
    </header>
  );
};

export default Header;
