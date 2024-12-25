



export default function Cookies() {
    return (
        <div className="fixed bottom-4 left-4 z-50 w-1/2">
            <div className="bg-gray-800 text-white rounded-full flex items-center justify-between p-4 py-1">
                <div className="flex items-center px-4 py-3 w-6/6">
                    <img src="assets/icons/cookies.svg" alt="Cookie Icon" className="h-8 w-8 mr-4 text-teal-400" />
                    <div>
                        <p className="text-lg font-medium">This website uses cookies to ensure you get the best experience on our website.
                            <a href="#" className="text-teal-400 font-medium hover:underline"> Learn more</a>
                        </p>
                    </div>
                </div>
                <button className="bg-teal-400 text-lg text-white font-semibold py-2 px-6 rounded-full flex items-center justify-center w-1/6">
                    <img src="assets/icons/tick.svg" alt="Checkmark" className="h-4 w-4 mr-1" />
                    Got it
                </button>        
            </div>
        </div>
    );
}