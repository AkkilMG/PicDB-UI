import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
      <footer className="bg-black text-white py-12 relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between mb-10">
            {/* Footer Links */}
              <div className="flex space-x-14">
                    <div className=''>
                        <h4 className="font-bold mb-3 text-gray-100">Services</h4>
                            <ul>
                                <li className="mb-1 text-gray-300 text-sm">Image Storage</li>
                            </ul>
                    </div>
                    <div className=''>
                        <h4 className="font-bold mb-3 text-gray-100">Insights</h4>
                        <ul>
                            <li className="mb-1 text-gray-300 text-sm">Product Insights</li>
                            <li className="mb-1 text-gray-300 text-sm">About Us</li>
                        </ul>
                    </div>
                    <div className=''>
                        <h4 className="font-bold mb-3 text-gray-100">Resources</h4>
                        <ul>
                            <li className="mb-1 text-gray-300 text-sm">Documentation</li>
                            <li className="mb-1 text-gray-300 text-sm">API Service</li>
                        </ul>
                     </div>
                     <div className=''>
                        <h4 className="font-bold mb-3 text-gray-100">Legal</h4>
                        <ul>
                            <li className="mb-1 text-gray-300 text-sm">Terms of Service</li>
                            <li className="mb-1 text-gray-300 text-sm">Privacy Policy</li>
                            <li className="mb-1 text-gray-300 text-sm">Cookies Policy</li>
                        </ul>
                     </div>
            </div>

            {/* Tweet Box */}
            <div className="bg-gray-800 rounded-xl p-4 shadow-lg w-[300px]">
                <div className="flex space-x-3 mb-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-white my-2">
                        <img src="assets/logo/company.png" alt="MaxWell profile" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="font-medium">AvianInTek</p>
                        <p className="text-gray-300 text-xs">@avianintek</p>
                    </div>
                    {/* twitter/some other platform
                    <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M15.9667 1.73802C15.4334 2.01045 14.855 2.1963 14.2467 2.25535C14.86 1.88381 15.3434 1.27064 15.605 0.532198C15.02 0.859176 14.3834 1.05441 13.72 1.11135C13.1467 0.502784 12.3984 0.152423 11.58 0.152423C9.93335 0.152423 8.62669 1.43362 8.62669 3.02123C8.62669 3.2453 8.67335 3.4551 8.75669 3.64743C5.76835 3.49313 3.05335 2.07349 1.23169 0.468863C0.87835 1.07252 1.10169 1.85867 1.64835 2.1963C1.16335 2.17867 0.71669 2.04099 0.35335 1.82899C0.35335 3.03249 1.29335 3.96009 2.33669 4.14593C1.96835 4.24361 1.56169 4.28781 1.14502 4.23875C1.54835 5.15574 2.43335 5.81228 3.46835 5.82991C2.51835 6.56837 1.37835 6.93999 0.19835 6.91046C0.115016 6.91046 0.0316933 6.8949 0 6.88363C1.05 7.55195 2.26669 7.94031 3.62669 7.94031C11.57 7.94031 14.33 1.85867 14.2667 1.73802" fill="currentColor"/>
                    </svg> */}
                 </div>
                  <p className="text-gray-300 text-sm">
                  We're just announced this new update that would help you increase the upload limit, also increase your user
                  experience of using PicDB!
                  </p>
            </div>
          </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-700 pt-8 flex justify-between items-center">
              <div className="text-gray-400 flex items-center">
                <img src="/assets/logo/PicDB.png" width={20} height={20} alt='logo' className='rounded-full overflow-hidden bg-white my-2'/>
                  <span className='ml-1 text-sm'>PicDB, A product of AvianInTek - 2024.</span>
              </div>

              <div className="flex space-x-2">
                  <div className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
                         <img src="/assets/images/instagram.svg" width={15} height={15} alt='instagram' />
                   </div>
                  <div className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
                      <img src="/assets/images/facebook.svg" width={15} height={15} alt='facebook' />
                  </div>
                    <div className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
                    <img src="/assets/images/twitter.svg" width={15} height={15} alt='twitter' />
                   </div>
              </div>
         </div>
        </div>
      </footer>
    );
};

export default Footer;