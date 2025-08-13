import { Bell, TrendingUp, Users, Sigma, Building2, AlertCircle, CheckCircle, Info, PackageOpen, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react';
// import { resetUserStats } from '../../public/content';



export default function Popup({setOnBoardingStatus}) {

  // let userStats = {};
  const [userStats, setUserStats] = useState({});
  const [dashboardBtnText, setDashboardBtnText] = useState('Open Full Dashboard')
  
  useEffect(()=>{
    chrome.storage.local.get(['userStats'], (result) => {
      setUserStats(result.userStats)
      console.log(userStats)
    })
    const intervalId = setInterval(()=> {
      chrome.storage.local.get(['userStats'], (result) => {
        setUserStats(result.userStats)
        console.log(userStats)
      })
    }, 30000)

    return () => {
    clearInterval(intervalId);
  };
  }, [])

  

  console.log('After', userStats)
  console.log(userStats?.visits?.length)

  const totalProfileVisits = (userStats?.visits || []).length;
  const personProfileVisits = (userStats?.visits || []).filter((visit) => visit.type === 'person').length
  const companyProfileVisits = (userStats?.visits || []).filter((visit) => visit.type === 'company').length

 
  

  const recentActivity = (userStats?.visits || []).slice(-20).reverse();
  console.log('recentActivity', recentActivity);
  const notifications = recentActivity?.map((each, index) => {
    const timeElapsedMs = Date.now() - (each.timeStamp);
    // console.log('time: ', timeElapsedMs)
    // if (isNaN(timeElapsedMs)) {
      // console.log('Invalid date:', each.timeStamp);
    // } else {
      // console.log('Time elapsed (ms):', timeElapsedMs);
    // }

    const seconds = Math.floor(timeElapsedMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let elapsedStr = '';

    if (days > 0) {
      elapsedStr = `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      elapsedStr = `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      elapsedStr = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      elapsedStr = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }

    return ({
      id: index,
      type: each.type.toUpperCase() || "type",
      image: each.imageUrl,
      title: each.name || "-",
      time: elapsedStr || "",
      headline: each.headline
    })
  })

  // constants
  const MS_IN_HOUR = 60 * 60 * 1000;
  const MS_12 = 12 * MS_IN_HOUR;
  const MS_24 = 24 * MS_IN_HOUR;

  const now = Date.now();
  const visits = (userStats?.visits || []).map(v => {
    // normalize timestamp to number (ms)
    const ts = typeof v.timeStamp === 'number'
      ? v.timeStamp
      : (new Date(v.timeStamp)).getTime();

    return { ...v, _ts: isNaN(ts) ? 0 : ts }; // fallback 0 for invalid
  });

  // helper to get percent change safely
  function percentChange(prev, curr) {
    if (prev === 0) {
      if (curr === 0) return 0;        // no change (both zero)
      return Infinity;                // or return null/'new' to indicate no baseline
    }
    return ((curr - prev) / prev) * 100;
  }

  // build windows
  const last12 = visits.filter(v => v._ts > now - MS_12);
  const prev12 = visits.filter(v => v._ts <= now - MS_12 && v._ts > now - MS_24);

  // counts
  const past12Count = last12.length;
  const past12PersonCount = last12.filter(v => v.type === 'person').length;
  const past12CompanyCount = last12.filter(v => v.type === 'company').length;

  const prev12Count = prev12.length;
  const prev12PersonCount = prev12.filter(v => v.type === 'person').length;
  const prev12CompanyCount = prev12.filter(v => v.type === 'company').length;

  // percent changes
  const pctTotal = percentChange(prev12Count, past12Count);
  const pctPerson = percentChange(prev12PersonCount, past12PersonCount);
  const pctCompany = percentChange(prev12CompanyCount, past12CompanyCount);

  // pretty print helper
  const prettyPct = (p) => {
    if (p === Infinity) return '∞ (no baseline)';
    if (Number.isNaN(p)) return 'N/A';
    return p.toFixed(1) + '%';
  };

  const formatChange = (pct) => {
    if (pct === Infinity) return '∞%';
    if (Number.isNaN(pct)) return 'N/A';
    const rounded = Math.round(pct);
    return `${rounded > 0 ? '+' : ''}${rounded}%`;
  };


   
  let stats = [
    { label: "Total visited", value: totalProfileVisits, change: formatChange(pctTotal), icon: Sigma, trend: pctTotal >= 0 ? "up" : "down" },
    { label: "Persons", value: personProfileVisits, change: formatChange(pctPerson), icon: Users, trend: pctPerson >= 0 ? "up" : "down" },
    { label: "Companies", value: companyProfileVisits, change: formatChange(pctCompany), icon: Building2, trend: pctCompany >= 0 ? "up" : "down" }
  ];

  // const notifications = [
  //   {
  //     id: 1,
  //     type: "success",
  //     icon: CheckCircle,
  //     title: "Payment processed successfully",
  //     time: "2 min ago"
  //   },
  //   {
  //     id: 2,
  //     type: "warning",
  //     icon: AlertCircle,
  //     title: "Server response time increased",
  //     time: "15 min ago"
  //   },
  //   {
  //     id: 3,
  //     type: "info",
  //     icon: Info,
  //     title: "New user registration",
  //     time: "1 hour ago"
  //   },
  //   {
  //     id: 4,
  //     type: "info",
  //     icon: Bell,
  //     title: "Weekly report is ready",
  //     time: "2 hours ago"
  //   }
  // ]

  const handleOpenDashboard = () => {
    setDashboardBtnText('Coming Soon...')
    setTimeout(() => setDashboardBtnText('Open Full Dashboard'), 10000)
  }

  // const handleDisconnect = () => {
  //   setOnBoardingStatus(null)
  //   console.log('Disconnecting...')
  //   chrome.storage.local.set({ onBoardingStatus: false }, () => {
  //       // setOnBoardingStatus(false);
  //       chrome.permissions.remove(
  //       {
  //       origins: ['https://www.linkedin.com/*']
  //       },
  //       (removed) => {
  //       if (removed) {
  //           console.log('Permission removed successfully.');
  //       } else {
  //           console.log('Permission was not removed or was not granted.');
  //       }

  //       // Reset onboarding status after permission removal attempt
  //       chrome.storage.local.set({ onBoardingStatus: false }, () => {
  //           setOnBoardingStatus(false);
  //       });
  //       }
  //   );
  //   });

  //   // chrome.permissions.remove(
  //   //     {
  //   //     origins: ['https://www.linkedin.com/*']
  //   //     },
  //   //     (removed) => {
  //   //     if (removed) {
  //   //         console.log('Permission removed successfully.');
  //   //     } else {
  //   //         console.log('Permission was not removed or was not granted.');
  //   //     }

  //   //     // Reset onboarding status after permission removal attempt
  //   //     chrome.storage.local.set({ onBoardingStatus: false }, () => {
  //   //         setOnBoardingStatus(false);
  //   //     });
  //   //     }
  //   // );

  // }

  // const handleReset = () => {
  //   setUserStats({visits: []});
  //   resetUserStats();
  // }

  // const handleRefresh = () => {
  //   chrome.storage.local.get(['userStats'], (result) => {
  //     setUserStats(result.userStats)
  //     console.log(userStats)
  //   })
  // }

  // const getNotificationColor = (type) => {
  //   switch (type) {
  //     case "success": return "text-green-500"
  //     case "warning": return "text-yellow-500"
  //     case "error": return "text-red-500"
  //     default: return "text-blue-500"
  //   }
  // }

  function ActivityPlaceholder() {
  return (
    <div className="flex flex-col grow gap-4 items-center justify-center py-20 text-gray-500 text-sm">
      <PackageOpen size={80}strokeWidth={1} />
      <span>No recent activity</span>
    </div>
  );
}

  return (
    <div className=" bg-slate-50 h-[600px] flex items-center justify-center p-3">
      {/* Main popup container */}
      <div className="w-80 flex flex-col h-full bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200/50">
        
        {/* Summary Stats Section */}
        <div className="p-4 pb-3">
          <div className='flex justify-between items-center mb-2'>
            <h3 className="text-sm font-semibold text-gray-900">Quick Stats</h3>
            {/* <button 
              className='text-sm !pt-2 !rounded-full !bg-transparent text-blue-700 hover:!border-blue-100 hover:!bg-blue-100'
              onClick={handleReset}
            >
              Reset
            </button> */}
          </div>
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
        {(notifications.length == 0) 
          ? <ActivityPlaceholder />
          : (
              <div className="p-4 py-3 grow overflow-auto">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Activity</h3>
                <div className=" overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  <div className="space-y-3 pr-2">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3">
                        <div title={!(notification.headline == '-') && notification.headline} className='h-[35px] w-[35px] flex items-center justify-center !border-[1px] border-gray-200 rounded-full overflow-hidden'>
                          {notification.image === "" ? <UserRound className='text-blue-300' strokeWidth={1}/> : <img src={notification.image} alt={notification.title} /> }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 leading-tight"> {notification.title} </p>
                          <div className='flex justify-between items-end'>
                            <p className="text-xs text-gray-500 mt-0.5">{notification.time}</p>
                            <p title={notification.type} className='text-xs text-gray-500 cursor-default'>{notification.type[0]}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
        }

        {/* Separator */}
        <div className="mx-4 h-px bg-gray-200"></div>

        {/* CTA Button Section */}
        <div className="p-4 pt-3 space-y-2">
          <button onClick={handleOpenDashboard} className="w-full !bg-blue-600 hover:!bg-blue-700 active:!bg-blue-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 focus:outline-non">
            {/* <ExternalLink className="w-4 h-4" /> */}
            {dashboardBtnText}
          </button>
          {/* <button 
            onClick={handleDisconnect} 
            className="w-full !bg-transparent text-blue-700 hover:!border-blue-100 hover:!bg-blue-100"
          >
            Disconnect
          </button> */}
        </div>
      </div>
    </div>
  )
}
