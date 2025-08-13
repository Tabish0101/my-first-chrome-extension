
// import userStats from "./stats";

// Content script for LinkedIn Profile Visit Tracker
console.log('🚀 LinkedIn Profile Visit Tracker: Content script loaded on:', window.location.href)

const url = new URL(window.location.href)

let catagory;
url.pathname.startsWith("/in/") ? catagory = 'person' : 
url.pathname.startsWith("/company/") ? catagory = 'company' : 
url.pathname.startsWith("/jobs/") ? catagory = 'job' :
url.pathname.startsWith("/school/") ? catagory = 'school' : catagory = "other";


// CLASSES
// profile-info-subheader
// top-card-layout__headline
// top-card-layout__entity-image
// top-card__profile-image

// data-ghost-url="https://static.licdn.com/aero-v1/sc/h/9c8pery4andzj6ohjkjp54ma2"

let userStats = {
    visits: []
}

const resetUserStats = () => {
    chrome.storage.local.remove('userStats', () => {
        console.log("userStats removed from local storage.");
    });
    chrome.storage.local.set()
    console.log('local storage cleared')
}

const scrapProfileData = () => {
    const profileHeadline = document.getElementsByClassName('top-card-layout__headline');
    const profileImage = document.getElementsByClassName('top-card-layout__entity-image');

    const collectedData__Profile = {
        imageUrl: profileImage[0]?.src || "", // get src immediately if available
        name: profileImage[0]?.alt || "-",
        headline: profileHeadline[0]?.innerText || "-",
        type: catagory,
        timeStamp: Date.now()
    };
    console.log(collectedData__Profile.timeStamp)

    // if image is not loaded
    if (!collectedData__Profile.imageUrl && profileImage[0]) {
        profileImage[0].addEventListener('load', () => {
            collectedData__Profile.imageUrl = profileImage[0].src;
            saveProfileData(collectedData__Profile);
        });
    } else {
        saveProfileData(collectedData__Profile);
    }
};

const saveProfileData = (profile) => {
    // console.log('updated data: ', profile)
    chrome.storage.local.get('userStats', (result) => {
        const prevStats = result.userStats || userStats;
        const updatedStats = {
            visits: [... prevStats.visits, profile]
        };

        chrome.storage.local.set({ userStats: updatedStats }, () => {
            console.log("Local storage updated:", updatedStats);
        });
    });
};


// resetUserStats()

setTimeout(()=> {
    scrapProfileData();
}, 2000)






// (function() {
//     console.log("LinkedIn Tracker Content Script loaded");

//     // const topCard = document.getElementsByClassName('top-card-layout__entity-info');
//     // // console.log(topCard[0].children[0].children[0].innerText);

//     // const profileName = document.getElementsByClassName('top-card-layout__title');
//     // console.log(profileName);

    

//     // // Function to handle logging when a profile page is detected
//     // function logProfileVisit() {
//     //     const url = window.location.href;
//     //     if (url.match(/^https:\/\/.*linkedin\.com\/in\/.+/)) {
//     //         console.log("[Profile Visit Detected]:", url);

//     //         // Example: Save to storage
//     //         chrome.storage.local.get({ visits: [] }, (data) => {
//     //             const updatedVisits = [...data.visits, { url, date: new Date().toISOString() }];
//     //             chrome.storage.local.set({ visits: updatedVisits });
//     //         });
//     //     }
//     // }

//     // // Detect SPA navigation changes
//     // let lastUrl = location.href;
//     // new MutationObserver(() => {
//     //     const currentUrl = location.href;
//     //     if (currentUrl !== lastUrl) {
//     //         lastUrl = currentUrl;
//     //         logProfileVisit();
//     //     }
//     // }).observe(document, { subtree: true, childList: true });

//     // // Log first page load
//     // logProfileVisit();
// })();
