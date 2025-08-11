import {  Users, Eye } from 'lucide-react'

export default function OnBoarding({onBoardingStatus, setOnBoardingStatus}) {

const handlePermission = () => {
    setOnBoardingStatus(null)
    chrome.permissions.contains(
        // console.log('checking if permission already granted...')
        {
            origins: ['https://www.linkedin.com/*']
        },
        (result) => {
            if (result) {
            // Already have permission
            console.log('checking if permission already granted: YES')
            chrome.storage.local.set({ onBoardingStatus: true }, () => {
                setOnBoardingStatus(true);
            });
            } else {
                // Request permission
                // console.log('checking if permission already granted : NO')
                console.log('requesting for permission...')
                chrome.permissions.request(
                {
                    origins: ['https://www.linkedin.com/*']
                },
                (granted) => {
                    if (granted) {
                        // Permission granted — save onboarding status and update UI
                        console.log('permission granted.')
                        chrome.storage.local.set({ onBoardingStatus: true }, () => {
                        setOnBoardingStatus(true);
                        });
                    } else {
                        // Permission denied — optionally show an error or keep onboarding open
                        alert("Permission is required to track LinkedIn profiles.");
                    }
                }
                );
            }
        }
    ); 
}

    
  return (
    <div className="min-h-screen bg-black/20 flex items-center justify-center p-4">
      <div className="w-80 max-w-md bg-white rounded-2xl shadow-lg border border-gray-100">
        
        {/* Header */}
        <div className="text-center pt-8 pb-6 px-6">
          <div className="flex items-center justify-center mb-4">
            {/* LinkedIn-style logo */}
            <div className="w-12 h-12 bg-[#0A66C2] rounded-lg flex items-center justify-center mr-3">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div className="w-8 h-8 bg-[#0A66C2] rounded-full flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 leading-tight">
            <span>Welcome to</span>
            <br />
            <span className='text-[#0A66C2]'>LinkedIn</span>
            <br />
            <span className='text-2xl text-[#0A66C2]'>Profile Visit Tracker</span>
          </h1>
        </div>

        {/* Intro Text */}
        <div className="px-6 mb-6">
          <p className="text-gray-600 text-center leading-relaxed">
            Track the LinkedIn profiles you visit and see who visits you back. 
            <span className="font-medium text-gray-700"> Your data stays private on your device.</span>
          </p>
        </div>


        {/* Permission Info Box */}
        <div className="mx-6 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-[#0A66C2] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <p className="text-sm text-blue-800 leading-relaxed">
                We need permission to read LinkedIn pages you visit. This is required for tracking visits.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6">
            <button 
                onClick={handlePermission}
                className="w-full bg-[#0A66C2] hover:bg-[#004182] active:bg-[#003366] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:ring-offset-2 mb-3"
            >
                Grant Permission
            </button>
            {/* <div className='text-black'>
                debugger: {onBoardingStatus === false ? 'false' : 'true'}
            </div> */}
          
          {/* <div className="text-center">
            <button className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors duration-200 focus:outline-none focus:underline">
              Skip for now
            </button>
          </div> */}
        </div>

        {/* Footer */}
        {/* <div className="px-6 pb-6">
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              Your data is stored locally. We never share it.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );

};
