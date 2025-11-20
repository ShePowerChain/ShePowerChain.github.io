import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.profile': 'My Profile',
    'nav.jobs': 'Find Jobs',
    'nav.skills': 'My Skills',
    'nav.mentorship': 'Find Mentor',
    
    // Home
    'home.title': 'Your Career Journey Starts Here',
    'home.subtitle': 'Find jobs, learn skills, and connect with mentors who understand your journey',
    'home.cta': 'Get Started',
    'home.feature1.title': 'Find Jobs That Fit',
    'home.feature1.desc': 'Tailoring, cooking, beauty services, and more',
    'home.feature2.title': 'Learn New Skills',
    'home.feature2.desc': 'Get verified in what you do best',
    'home.feature3.title': 'Connect with Mentors',
    'home.feature3.desc': 'Learn from women who have walked your path',
    
    // Listings
    'listings.title': 'Find Your Next Job',
    'listings.subtitle': 'Browse opportunities that match your skills and interests',
    'listings.search': 'Search for jobs',
    'listings.searchPlaceholder': 'What kind of job are you looking for?',
    'listings.jobType': 'Job Type',
    'listings.location': 'Location',
    'listings.anyType': 'Any type',
    'listings.allTypes': 'All Types',
    'listings.fulltime': 'Full-time',
    'listings.parttime': 'Part-time',
    'listings.contract': 'Contract',
    'listings.anywhere': 'Anywhere',
    'listings.allLocations': 'All Locations',
    'listings.remote': 'Work from Home',
    'listings.apply': 'Apply Now',
    
    // Skills
    'skills.title': 'Show What You Know',
    'skills.subtitle': 'Get verified credentials that prove your skills to employers',
    'skills.verified': 'Verified & Trusted',
    'skills.verifiedDesc': 'Your skills are officially verified and secure',
    'skills.betterJobs': 'Get Better Jobs',
    'skills.betterJobsDesc': 'Stand out to employers with verified credentials',
    'skills.quickProcess': 'Quick Process',
    'skills.quickProcessDesc': 'Get verified in just a few simple steps',
    'skills.verifiedBadge': 'Verified',
    'skills.notVerified': 'Not Verified',
    'skills.proficiency': 'Proficiency',
    'skills.startVerification': 'Start Verification',
    'skills.ctaTitle': 'Ready to Get Verified?',
    'skills.ctaDesc': 'Show employers what you can do with official skill verification',
    'skills.ctaButton': 'Start Verification',
    
    // Mentorship
    'mentorship.title': 'Find a Mentor',
    'mentorship.subtitle': 'Connect with experienced professionals who want to help you grow',
    'mentorship.realExperts': 'Learn from Real Experts',
    'mentorship.realExpertsDesc': 'Women who built their skills through hard work',
    'mentorship.yourTime': 'Your Time, Your Schedule',
    'mentorship.yourTimeDesc': 'Morning, afternoon, or evening — you choose',
    'mentorship.oneOnOne': 'One-on-One Guidance',
    'mentorship.oneOnOneDesc': 'Personal help for your unique journey',
    'mentorship.growFaster': 'Grow Faster',
    'mentorship.growFasterDesc': 'Reach your goals with expert support',
    'mentorship.browseMentors': 'Browse Mentors',
    'mentorship.mySessions': 'My Sessions',
    'mentorship.students': 'students',
    'mentorship.sessions': 'sessions',
    'mentorship.bookSession': 'Book Session',
    'mentorship.noSessions': 'No Upcoming Sessions',
    'mentorship.noSessionsDesc': 'Book your first mentorship session to get started',
    'mentorship.ctaTitle': 'Want to Help Others?',
    'mentorship.ctaDesc': 'Share your knowledge and earn money as a mentor on your own schedule',
    'mentorship.ctaButton': 'Become a Mentor',
    
    // Profile
    'profile.title': 'My Profile',
    'profile.subtitle': 'Manage your information and settings',
  },
  hi: {
    // Navbar
    'nav.home': 'होम',
    'nav.profile': 'मेरी प्रोफ़ाइल',
    'nav.jobs': 'नौकरी खोजें',
    'nav.skills': 'मेरे कौशल',
    'nav.mentorship': 'मार्गदर्शक खोजें',
    
    // Home
    'home.title': 'आपकी करियर यात्रा यहाँ शुरू होती है',
    'home.subtitle': 'नौकरी खोजें, कौशल सीखें, और उन मार्गदर्शकों से जुड़ें जो आपकी यात्रा को समझते हैं',
    'home.cta': 'शुरू करें',
    'home.feature1.title': 'आपके लिए सही नौकरी',
    'home.feature1.desc': 'सिलाई, खाना बनाना, ब्यूटी सर्विस, और भी बहुत कुछ',
    'home.feature2.title': 'नए कौशल सीखें',
    'home.feature2.desc': 'अपने काम में सत्यापित हों',
    'home.feature3.title': 'मार्गदर्शकों से जुड़ें',
    'home.feature3.desc': 'उन महिलाओं से सीखें जिन्होंने आपका रास्ता पार किया है',
    
    // Listings
    'listings.title': 'अपनी अगली नौकरी खोजें',
    'listings.subtitle': 'अपने कौशल और रुचियों से मेल खाने वाले अवसर देखें',
    'listings.search': 'नौकरी खोजें',
    'listings.searchPlaceholder': 'आप किस तरह की नौकरी ढूंढ रहे हैं?',
    'listings.jobType': 'नौकरी का प्रकार',
    'listings.location': 'स्थान',
    'listings.anyType': 'कोई भी प्रकार',
    'listings.allTypes': 'सभी प्रकार',
    'listings.fulltime': 'पूर्णकालिक',
    'listings.parttime': 'अंशकालिक',
    'listings.contract': 'ठेका',
    'listings.anywhere': 'कहीं भी',
    'listings.allLocations': 'सभी स्थान',
    'listings.remote': 'घर से काम',
    'listings.apply': 'अभी आवेदन करें',
    
    // Skills
    'skills.title': 'अपना कौशल दिखाएं',
    'skills.subtitle': 'सत्यापित प्रमाण पत्र प्राप्त करें जो नियोक्ताओं को आपके कौशल साबित करते हैं',
    'skills.verified': 'सत्यापित और विश्वसनीय',
    'skills.verifiedDesc': 'आपके कौशल आधिकारिक रूप से सत्यापित और सुरक्षित हैं',
    'skills.betterJobs': 'बेहतर नौकरियां पाएं',
    'skills.betterJobsDesc': 'सत्यापित प्रमाणपत्रों के साथ नियोक्ताओं के सामने अलग दिखें',
    'skills.quickProcess': 'त्वरित प्रक्रिया',
    'skills.quickProcessDesc': 'कुछ आसान चरणों में सत्यापित हो जाएं',
    'skills.verifiedBadge': 'सत्यापित',
    'skills.notVerified': 'सत्यापित नहीं',
    'skills.proficiency': 'दक्षता',
    'skills.startVerification': 'सत्यापन शुरू करें',
    'skills.ctaTitle': 'सत्यापित होने के लिए तैयार हैं?',
    'skills.ctaDesc': 'आधिकारिक कौशल सत्यापन के साथ नियोक्ताओं को दिखाएं कि आप क्या कर सकते हैं',
    'skills.ctaButton': 'सत्यापन शुरू करें',
    
    // Mentorship
    'mentorship.title': 'एक मार्गदर्शक खोजें',
    'mentorship.subtitle': 'अनुभवी पेशेवरों से जुड़ें जो आपकी मदद करना चाहते हैं',
    'mentorship.realExperts': 'असली विशेषज्ञों से सीखें',
    'mentorship.realExpertsDesc': 'महिलाएं जिन्होंने मेहनत से अपने कौशल बनाए',
    'mentorship.yourTime': 'आपका समय, आपका शेड्यूल',
    'mentorship.yourTimeDesc': 'सुबह, दोपहर या शाम — आप चुनें',
    'mentorship.oneOnOne': 'व्यक्तिगत मार्गदर्शन',
    'mentorship.oneOnOneDesc': 'आपकी अनोखी यात्रा के लिए व्यक्तिगत मदद',
    'mentorship.growFaster': 'तेजी से बढ़ें',
    'mentorship.growFasterDesc': 'विशेषज्ञ सहायता के साथ अपने लक्ष्य तक पहुंचें',
    'mentorship.browseMentors': 'मार्गदर्शक देखें',
    'mentorship.mySessions': 'मेरे सत्र',
    'mentorship.students': 'छात्र',
    'mentorship.sessions': 'सत्र',
    'mentorship.bookSession': 'सत्र बुक करें',
    'mentorship.noSessions': 'कोई आगामी सत्र नहीं',
    'mentorship.noSessionsDesc': 'शुरू करने के लिए अपना पहला मार्गदर्शन सत्र बुक करें',
    'mentorship.ctaTitle': 'दूसरों की मदद करना चाहते हैं?',
    'mentorship.ctaDesc': 'अपने शेड्यूल पर मार्गदर्शक बनकर अपना ज्ञान साझा करें और पैसे कमाएं',
    'mentorship.ctaButton': 'मार्गदर्शक बनें',
    
    // Profile
    'profile.title': 'मेरी प्रोफ़ाइल',
    'profile.subtitle': 'अपनी जानकारी और सेटिंग्स प्रबंधित करें',
  },
  ta: {
    // Navbar
    'nav.home': 'முகப்பு',
    'nav.profile': 'என் சுயவிவரம்',
    'nav.jobs': 'வேலை தேடு',
    'nav.skills': 'என் திறன்கள்',
    'nav.mentorship': 'வழிகாட்டி தேடு',
    
    // Home
    'home.title': 'உங்கள் தொழில் பயணம் இங்கே தொடங்குகிறது',
    'home.subtitle': 'வேலைகளைக் கண்டறியுங்கள், திறன்களைக் கற்றுக்கொள்ளுங்கள், உங்கள் பயணத்தைப் புரிந்துகொள்ளும் வழிகாட்டிகளுடன் இணையுங்கள்',
    'home.cta': 'தொடங்கு',
    'home.feature1.title': 'உங்களுக்கு ஏற்ற வேலைகள்',
    'home.feature1.desc': 'தையல், சமையல், அழகு சேவைகள், மேலும் பல',
    'home.feature2.title': 'புதிய திறன்களைக் கற்றுக்கொள்',
    'home.feature2.desc': 'நீங்கள் சிறப்பாகச் செய்வதில் சரிபார்க்கப்படுங்கள்',
    'home.feature3.title': 'வழிகாட்டிகளுடன் இணையுங்கள்',
    'home.feature3.desc': 'உங்கள் பாதையில் நடந்த பெண்களிடமிருந்து கற்றுக்கொள்ளுங்கள்',
    
    // Listings
    'listings.title': 'உங்கள் அடுத்த வேலையைக் கண்டறியுங்கள்',
    'listings.subtitle': 'உங்கள் திறன்கள் மற்றும் ஆர்வங்களுடன் பொருந்தும் வாய்ப்புகளைப் பார்வையிடுங்கள்',
    'listings.search': 'வேலை தேடு',
    'listings.searchPlaceholder': 'நீங்கள் என்ன வகையான வேலை தேடுகிறீர்கள்?',
    'listings.jobType': 'வேலை வகை',
    'listings.location': 'இடம்',
    'listings.anyType': 'எந்த வகையும்',
    'listings.allTypes': 'அனைத்து வகைகள்',
    'listings.fulltime': 'முழு நேரம்',
    'listings.parttime': 'பகுதி நேரம்',
    'listings.contract': 'ஒப்பந்தம்',
    'listings.anywhere': 'எங்கும்',
    'listings.allLocations': 'அனைத்து இடங்கள்',
    'listings.remote': 'வீட்டிலிருந்து வேலை',
    'listings.apply': 'இப்போது விண்ணப்பிக்கவும்',
    
    // Skills
    'skills.title': 'நீங்கள் அறிந்ததைக் காட்டுங்கள்',
    'skills.subtitle': 'முதலாளிகளுக்கு உங்கள் திறன்களை நிரூபிக்கும் சரிபார்க்கப்பட்ட சான்றுகளைப் பெறுங்கள்',
    'skills.verified': 'சரிபார்க்கப்பட்டது மற்றும் நம்பகமானது',
    'skills.verifiedDesc': 'உங்கள் திறன்கள் அதிகாரப்பூர்வமாக சரிபார்க்கப்பட்டு பாதுகாப்பானவை',
    'skills.betterJobs': 'சிறந்த வேலைகளைப் பெறுங்கள்',
    'skills.betterJobsDesc': 'சரிபார்க்கப்பட்ட சான்றுகளுடன் முதலாளிகளிடம் தனித்து நிற்கவும்',
    'skills.quickProcess': 'விரைவான செயல்முறை',
    'skills.quickProcessDesc': 'சில எளிய படிகளில் சரிபார்க்கப்படுங்கள்',
    'skills.verifiedBadge': 'சரிபார்க்கப்பட்டது',
    'skills.notVerified': 'சரிபார்க்கப்படவில்லை',
    'skills.proficiency': 'திறமை',
    'skills.startVerification': 'சரிபார்ப்பைத் தொடங்கு',
    'skills.ctaTitle': 'சரிபார்க்கப்பட தயாரா?',
    'skills.ctaDesc': 'அதிகாரப்பூர்வ திறன் சரிபார்ப்புடன் முதலாளிகளுக்கு நீங்கள் என்ன செய்ய முடியும் என்பதைக் காட்டுங்கள்',
    'skills.ctaButton': 'சரிபார்ப்பைத் தொடங்கு',
    
    // Mentorship
    'mentorship.title': 'ஒரு வழிகாட்டியைக் கண்டறியுங்கள்',
    'mentorship.subtitle': 'உங்களுக்கு உதவ விரும்பும் அனுபவமிக்க நிபுணர்களுடன் இணையுங்கள்',
    'mentorship.realExperts': 'உண்மையான நிபுணர்களிடமிருந்து கற்றுக்கொள்ளுங்கள்',
    'mentorship.realExpertsDesc': 'கடின உழைப்பின் மூலம் தங்கள் திறன்களை உருவாக்கிய பெண்கள்',
    'mentorship.yourTime': 'உங்கள் நேரம், உங்கள் அட்டவணை',
    'mentorship.yourTimeDesc': 'காலை, மதியம் அல்லது மாலை — நீங்கள் தேர்வு செய்யுங்கள்',
    'mentorship.oneOnOne': 'தனிப்பட்ட வழிகாட்டுதல்',
    'mentorship.oneOnOneDesc': 'உங்கள் தனித்துவமான பயணத்திற்கான தனிப்பட்ட உதவி',
    'mentorship.growFaster': 'வேகமாக வளருங்கள்',
    'mentorship.growFasterDesc': 'நிபுணர் ஆதரவுடன் உங்கள் இலக்குகளை அடையுங்கள்',
    'mentorship.browseMentors': 'வழிகாட்டிகளைப் பார்க்கவும்',
    'mentorship.mySessions': 'என் அமர்வுகள்',
    'mentorship.students': 'மாணவர்கள்',
    'mentorship.sessions': 'அமர்வுகள்',
    'mentorship.bookSession': 'அமர்வு பதிவு செய்',
    'mentorship.noSessions': 'வரவிருக்கும் அமர்வுகள் இல்லை',
    'mentorship.noSessionsDesc': 'தொடங்க உங்கள் முதல் வழிகாட்டுதல் அமர்வை பதிவு செய்யுங்கள்',
    'mentorship.ctaTitle': 'மற்றவர்களுக்கு உதவ விரும்புகிறீர்களா?',
    'mentorship.ctaDesc': 'உங்கள் அட்டவணையில் வழிகாட்டியாக உங்கள் அறிவைப் பகிர்ந்து பணம் சம்பாதிக்கவும்',
    'mentorship.ctaButton': 'வழிகாட்டியாக மாறுங்கள்',
    
    // Profile
    'profile.title': 'என் சுயவிவரம்',
    'profile.subtitle': 'உங்கள் தகவல் மற்றும் அமைப்புகளை நிர்வகிக்கவும்',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
