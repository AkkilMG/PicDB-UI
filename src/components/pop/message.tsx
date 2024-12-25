



export default function Message(message: any, color: any) {
    const type = {
        1: "bg-green-500", // success
        2: "bg-red-500", // error
        3: "bg-teal-400", // message
    }
    return (
        <div className="fixed bottom-4 left-4 z-50 w-1/2">
            <div className="bg-gray-800 text-white rounded-full flex items-center justify-between p-4 py-1">
                <div className="flex items-center px-4 py-3 w-6/6">
                    <img src="assets/icons/notify.png" alt="Cookie Icon" className="h-8 w-8 mr-4 text-teal-400" />
                    <div>
                        <p className="text-lg font-medium">
                            {message}
                        </p>
                    </div>
                </div>
                <button className={`${color} text-lg text-white font-semibold py-2 px-6 rounded-full flex items-center justify-center w-1/6`}>
                    <img src="assets/icons/tick.svg" alt="Checkmark" className="h-4 w-4 mr-1" />
                    Got it
                </button>        
            </div>
        </div>
    );
}