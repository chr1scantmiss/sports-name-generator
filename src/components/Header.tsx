import React from 'react';
import logo from '/logo.png';

const Header: React.FC = () => {
  return (
    <header className="flex items-center space-x-3 p-4 bg-transparent">
      <img src={logo} alt="USNG Logo" className="w-10 h-10" />
      <h1 className="text-3xl font-bold text-white">Ultimate Sports Name Generator</h1>
    </header>
  );
};

export default Header;
