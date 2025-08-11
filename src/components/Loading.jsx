import { Eye } from "lucide-react";

const Loading = ({headingText, subHeadingText}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">{headingText}</h2>
        <div className="flex justify-center">
        <div className="relative w-20 h-20">
            {/* Pulsing rings */}
            <div className="absolute inset-0 rounded-full border-2 border-[#0A66C2] animate-ping opacity-20"></div>
            <div className="absolute inset-2 rounded-full border-2 border-[#0A66C2] animate-ping opacity-40" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute inset-4 rounded-full border-2 border-[#0A66C2] animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
            
            {/* Center eye icon */}
            <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-[#0A66C2] rounded-full flex items-center justify-center">
                <Eye className="w-4 h-4 text-white" />
            </div>
            </div>
        </div>
        </div>
        <p className="text-center text-gray-600 mt-4">{subHeadingText}...</p>
    </div>
  )
}

export default Loading;