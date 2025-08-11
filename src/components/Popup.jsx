import { Bell, TrendingUp, Users, DollarSign, Activity, AlertCircle, CheckCircle, Info } from 'lucide-react'

export default function Popup({setOnBoardingStatus}) {
  const stats = [
    { label: "Revenue", value: "$12.4k", change: "+12%", icon: DollarSign, trend: "up" },
    { label: "Users", value: "2.1k", change: "+5%", icon: Users, trend: "up" },
    { label: "Activity", value: "89%", change: "-2%", icon: Activity, trend: "down" }
  ]

  const notifications = [
    {
      id: 1,
      type: "success",
      icon: CheckCircle,
      title: "Payment processed successfully",
      time: "2 min ago"
    },
    {
      id: 2,
      type: "warning",
      icon: AlertCircle,
      title: "Server response time increased",
      time: "15 min ago"
    },
    {
      id: 3,
      type: "info",
      icon: Info,
      title: "New user registration",
      time: "1 hour ago"
    },
    {
      id: 4,
      type: "info",
      icon: Bell,
      title: "Weekly report is ready",
      time: "2 hours ago"
    }
  ]

  const handleDisconnect = () => {
    setOnBoardingStatus(null)
    console.log('Disconnecting...')
    chrome.storage.local.set({ onBoardingStatus: false }, () => {
        setOnBoardingStatus(false);
    });

    // chrome.permissions.remove(
    //     {
    //     origins: ['https://www.linkedin.com/*']
    //     },
    //     (removed) => {
    //     if (removed) {
    //         console.log('Permission removed successfully.');
    //     } else {
    //         console.log('Permission was not removed or was not granted.');
    //     }

    //     // Reset onboarding status after permission removal attempt
    //     chrome.storage.local.set({ onBoardingStatus: false }, () => {
    //         setOnBoardingStatus(false);
    //     });
    //     }
    // );

  }

  const getNotificationColor = (type) => {
    switch (type) {
      case "success": return "text-green-500"
      case "warning": return "text-yellow-500"
      case "error": return "text-red-500"
      default: return "text-blue-500"
    }
  }

  return (
    <div className=" bg-black/20 flex items-center justify-center p-4">
      {/* Main popup container */}
      <div className="w-80 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200/50">
        
        {/* Summary Stats Section */}
        <div className="p-4 pb-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h3>
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <stat.icon className="w-4 h-4 text-gray-600" />
                </div>
                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
                <div className={`text-xs flex items-center justify-center gap-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-500'
                }`}>
                  <TrendingUp className={`w-3 h-3 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="mx-4 h-px bg-gray-200"></div>

        {/* Notifications Section */}
        <div className="p-4 py-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Activity</h3>
          <div className="h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="space-y-3 pr-2">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3">
                  <notification.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${getNotificationColor(notification.type)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 leading-tight">{notification.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="mx-4 h-px bg-gray-200"></div>

        {/* CTA Button Section */}
        <div className="p-4 pt-3 space-y-2">
          <button onClick={() => console.log("open dashboard clicked")} className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            {/* <ExternalLink className="w-4 h-4" /> */}
            Open Full Dashboard
          </button>
          <button 
            onClick={handleDisconnect} 
            className="w-full !bg-transparent text-blue-700 hover:!border-blue-100 hover:!bg-blue-100"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  )
}
