import banner from '../assets/images/banner-infographics-2.png'
import profileImage from '../assets/images/profile-image-2.png'

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
                console.log('checking if permission already granted : NO')
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
    <div className="min-h-screen h-[600px] bg-slate-50 flex items-center justify-center p-3">
      <div className="w-80 h-full flex flex-col max-w-md bg-white rounded-2xl shadow-lg border border-gray-100">
        
        {/* Header */}
        <div className="text-center pt-6 pb-6 px-6">
          <div style={{backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundPosition: "center",}} className="flex items-center justify-center mb-12 bg-blue-300 rounded-md h-18">
            {/* LinkedIn-style logo */}
            <div className='p-0.5 border-[1px] border-slate-200 bg-white shadow-2xl shadow-black/70 relative translate-y-8'>
              <div className="w-12 h-12 bg-[#0A66C2] border-1 border-white flex items-center justify-center">
                {/* <Linkedin strokeWidth={1} className="w-7 h-7 text-whitw" /> */}
                <img src={profileImage} alt="" />
              </div>
            </div>
            {/* <div className="w-8 h-8 bg-[#0A66C2] rounded-full flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div> */}
          </div>
          <h1 className="text-xl font-semibold text-gray-900 leading-tight">
            {/* <span>Welcome to</span>
            <br /> */}
            <span className='text-2xl tex-[#0A66C2] text-blue-950'>LinkedIn</span>
            <br />
            <span className=' text-blue-950 tex-[#0A66C2]'>Analytics</span>
          </h1>
        </div>

        {/* Intro Text */}
        <div className="px-6 mb-6">
          <p className="text-blue-900 text-center leading-relaxed">
            Track the LinkedIn profiles you visit and get a better idea of your activity. 
            <span className="font-medium text-blue-950"> Your data stays private on your device.</span>
          </p>
        </div>


        {/* Permission Info Box */}
        <div className="mx-6 mb-6">
          <div className="w-5 h-5 bg-[#0A66C2] relative left-[46%] top-2.5 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              
              <p className="text-sm text-blue-800 leading-relaxed">
                We need permission to read LinkedIn pages you visit. This is required for tracking visits.
              </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 mb-6 flex items-end grow">
            <button 
                onClick={handlePermission}
                className="w-full !bg-blue-600 hover:!bg-blue-700 active:!bg-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:ring-offset-2 mb-3"
            >
                Start Tracking
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
