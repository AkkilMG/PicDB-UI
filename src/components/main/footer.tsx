import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between mb-10 gap-8 lg:gap-0">
          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-3 text-gray-100">Services</h4>
              <ul>
                <li className="mb-1 text-gray-300 text-sm">Image Storage</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-gray-100">Insights</h4>
              <ul>
                <li className="mb-1 text-gray-300 text-sm">Product Insights</li>
                <li className="mb-1 text-gray-300 text-sm">About Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-gray-100">Resources</h4>
              <ul>
                <li className="mb-1 text-gray-300 text-sm">Documentation</li>
                <li className="mb-1 text-gray-300 text-sm">API Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-gray-100">Legal</h4>
              <ul>
                <li className="mb-1 text-gray-300 text-sm">Terms of Service</li>
                <li className="mb-1 text-gray-300 text-sm">Privacy Policy</li>
                <li className="mb-1 text-gray-300 text-sm">Cookies Policy</li>
              </ul>
            </div>
          </div>

          {/* Tweet Box */}
          <div className="bg-gray-800 rounded-xl p-4 shadow-lg max-w-full lg:w-[300px]">
            <div className="flex space-x-3 mb-2">
              <div className="h-8 w-8 rounded-full overflow-hidden bg-white my-2">
                <img
                  src="assets/logo/company.png"
                  alt="AvianInTek profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">AvianInTek</p>
                <p className="text-gray-300 text-xs">@avianintek</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              We're excited to announce a new update that increases upload limits and improves the user experience of PicDB!
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 flex items-center">
            <img
              src="/assets/logo/PicDB.png"
              width={20}
              height={20}
              alt="logo"
              className="rounded-full overflow-hidden bg-white"
            />
            <span className="ml-2 text-sm">PicDB, A product of AvianInTek - 2024.</span>
          </div>

          <div className="flex space-x-4">
            <div className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
              <img
                src="/assets/images/instagram.svg"
                width={15}
                height={15}
                alt="instagram"
              />
            </div>
            <div className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
              <img
                src="/assets/images/facebook.svg"
                width={15}
                height={15}
                alt="facebook"
              />
            </div>
            <div className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
              <img
                src="/assets/images/twitter.svg"
                width={15}
                height={15}
                alt="twitter"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
