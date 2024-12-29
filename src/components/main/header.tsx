

import React from 'react';

const Header = () => {
    return (
      <nav className="sticky top-0 bg-black z-20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="ml-8">
            <img onClick={() => window.location.href = "/"} src='assets/images/letter.png' alt='PicDB logo' width={100} height={40} />
          </div>
          <div className="mr-8 flex items-center space-x-4">
            <button onClick={() => window.location.href = "/upload"} className="border-2 text-white rounded-md py-1 px-4">Get started</button>
            <button className="ml-2 text-white">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="3" cy="3" r="2.5" fill="currentColor" />
                <circle cx="10" cy="3" r="2.5" fill="currentColor" />
                <circle cx="17" cy="3" r="2.5" fill="currentColor" />
                <circle cx="3" cy="10" r="2.5" fill="currentColor" />
                <circle cx="10" cy="10" r="2.5" fill="currentColor" />
                <circle cx="17" cy="10" r="2.5" fill="currentColor" />
                <circle cx="3" cy="17" r="2.5" fill="currentColor" />
                <circle cx="10" cy="17" r="2.5" fill="currentColor" />
                <circle cx="17" cy="17" r="2.5" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    );
};

export default Header;