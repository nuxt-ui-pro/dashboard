import { sub } from 'date-fns'

const mails = [{
  id: 1,
  from: {
    name: 'Alex Smith',
    email: 'alex.smith@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=1'
    }
  },
  subject: 'Meeting Schedule',
  body: 'Hi there, just a quick reminder about our meeting scheduled for 10 AM tomorrow. We\'ll be discussing the new marketing strategies and I would really appreciate your input on the matter. Looking forward to a productive session.',
  date: new Date().toISOString()
}, {
  id: 2,
  unread: true,
  from: {
    name: 'Jordan Brown',
    email: 'jordan.brown@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=2'
    }
  },
  subject: 'Project Update',
  body: 'I wanted to provide you with the latest update on the project. We\'ve made significant progress on the development front and I\'ve attached a detailed report for your review. Please let me know your thoughts and any areas for improvement.',
  date: sub(new Date(), { minutes: 7 }).toISOString()
}, {
  id: 3,
  unread: true,
  from: {
    name: 'Taylor Green',
    email: 'taylor.green@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=3'
    }
  },
  subject: 'Lunch Plans',
  body: 'Hey! I was wondering if you would like to grab lunch this Friday. I know a great spot downtown that serves the best Mexican cuisine. It would be a great opportunity for us to catch up and discuss the upcoming team event.',
  date: sub(new Date(), { hours: 3 }).toISOString()
}, {
  id: 4,
  from: {
    name: 'Morgan White',
    email: 'morgan.white@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=4'
    }
  },
  subject: 'New Proposal',
  body: 'I\'ve attached the new proposal for our next project. It outlines all the objectives, timelines, and resource allocations. I\'m particularly excited about the innovative approach we\'re taking this time. Please have a look and let me know your thoughts.',
  date: sub(new Date(), { days: 1 }).toISOString()
}, {
  id: 5,
  from: {
    name: 'Casey Gray',
    email: 'casey.gray@example.com'
  },
  subject: 'Travel Itinerary',
  body: 'Your travel itinerary for the upcoming business trip is ready. I\'ve included all flight details, hotel reservations, and meeting schedules. Please review and let me know if there are any changes you would like to make or any additional arrangements needed.',
  date: sub(new Date(), { days: 1 }).toISOString()
}, {
  id: 6,
  from: {
    name: 'Jamie Johnson',
    email: 'jamie.johnson@example.com'
  },
  subject: 'Budget Report',
  body: 'I\'ve completed the budget report for this quarter. It includes a detailed analysis of our expenditures and revenue, along with projections for the next quarter. I believe there are some areas where we can optimize our spending. Let\'s discuss this in our next finance meeting.',
  date: sub(new Date(), { days: 2 }).toISOString()
}, {
  id: 7,
  from: {
    name: 'Riley Davis',
    email: 'riley.davis@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=7'
    }
  },
  subject: 'Training Session',
  body: 'Just a reminder about the training session scheduled for next week. We\'ll be covering new software tools that are crucial for our workflow. It\'s important that everyone attends as this will greatly enhance our team\'s efficiency. Please confirm your availability.',
  date: sub(new Date(), { days: 2 }).toISOString()
}, {
  id: 8,
  unread: true,
  from: {
    name: 'Kelly Wilson',
    email: 'kelly.wilson@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=8'
    }
  },
  subject: 'Happy Birthday!',
  body: 'Happy Birthday! Wishing you a fantastic day filled with joy and laughter. Your dedication and hard work throughout the year have been invaluable to our team. Enjoy your day to the fullest!',
  date: sub(new Date(), { days: 2 }).toISOString()
}, {
  id: 9,
  from: {
    name: 'Drew Moore',
    email: 'drew.moore@example.com'
  },
  subject: 'Website Feedback',
  body: 'We are in the process of revamping our company website and I would greatly appreciate your feedback on the new design. Your perspective is always insightful and could help us enhance the user experience significantly. Please let me know a convenient time for you to discuss this.',
  date: sub(new Date(), { days: 5 }).toISOString()
}, {
  id: 10,
  from: {
    name: 'Jordan Taylor',
    email: 'jordan.taylor@example.com'
  },
  subject: 'Gym Membership',
  body: 'This is a friendly reminder that your gym membership is due for renewal at the end of this month. We\'ve added several new classes and facilities that I think you\'ll really enjoy. Let me know if you would like a tour of the new facilities.',
  date: sub(new Date(), { days: 5 }).toISOString()
}, {
  id: 11,
  unread: true,
  from: {
    name: 'Morgan Anderson',
    email: 'morgan.anderson@example.com'
  },
  subject: 'Insurance Policy',
  body: 'I\'m writing to inform you that your insurance policy details have been updated. The new document outlines the changes in coverage and premium rates. It\'s important to review these changes to ensure they meet your needs. Please don\'t hesitate to contact me if you have any questions.',
  date: sub(new Date(), { days: 12 }).toISOString()
}, {
  id: 12,
  from: {
    name: 'Casey Thomas',
    email: 'casey.thomas@example.com'
  },
  subject: 'Book Club Meeting',
  body: 'I\'m excited to remind you about our next book club meeting scheduled for next Thursday. We\'ll be discussing \'The Great Gatsby,\' and I\'m looking forward to hearing everyone\'s perspectives. Also, we will be choosing our next book, so bring your suggestions!',
  date: sub(new Date(), { months: 1 }).toISOString()
}, {
  id: 13,
  from: {
    name: 'Jamie Jackson',
    email: 'jamie.jackson@example.com'
  },
  subject: 'Recipe Exchange',
  body: 'Don\'t forget to send in your favorite recipe for our upcoming recipe exchange. It\'s a great opportunity to share and discover new and delicious meals. I\'m particularly excited to try out new dishes and add some variety to my cooking.',
  date: sub(new Date(), { months: 1 }).toISOString()
}, {
  id: 14,
  from: {
    name: 'Riley White',
    email: 'riley.white@example.com'
  },
  subject: 'Yoga Class Schedule',
  body: 'The new schedule for yoga classes is now available. We\'ve added some new styles and adjusted the timings to accommodate more participants. I believe these classes are a great way to relieve stress and stay healthy. Hope to see you there!',
  date: sub(new Date(), { months: 1 }).toISOString()
}, {
  id: 15,
  from: {
    name: 'Kelly Harris',
    email: 'kelly.harris@example.com'
  },
  subject: 'Book Launch Event',
  body: 'I\'m thrilled to invite you to my book launch event next month. It\'s been a journey writing this book    and I\'m eager to share it with you. The event will include a reading session, Q&A, and a signing opportunity. Your support would mean a lot to me.',
  date: sub(new Date(), { months: 1 }).toISOString()
}, {
  id: 16,
  from: {
    name: 'Drew Martin',
    email: 'drew.martin@example.com'
  },
  subject: 'Tech Conference',
  body: 'Join us at the upcoming tech conference where we will be discussing the latest trends and innovations in technology. This is a great opportunity to network with industry leaders and learn about cutting-edge developments. Your participation would greatly contribute to our team\'s knowledge and growth.',
  date: sub(new Date(), { months: 1, days: 4 }).toISOString()
}, {
  id: 17,
  from: {
    name: 'Alex Thompson',
    email: 'alex.thompson@example.com'
  },
  subject: 'Art Exhibition',
  body: 'I wanted to invite you to check out the new art exhibition this weekend. It features some amazing contemporary artists and their latest works. It\'s a great opportunity to immerse yourself in the local art scene and get inspired. Let me know if you\'re interested in going together.',
  date: sub(new Date(), { months: 1, days: 15 }).toISOString()
}, {
  id: 18,
  from: {
    name: 'Jordan Garcia',
    email: 'jordan.garcia@example.com'
  },
  subject: 'Networking Event',
  body: 'I\'m looking forward to seeing you at the networking event next week. It\'s a great chance to connect with professionals from various industries and expand our professional network. There will also be guest speakers discussing key business trends. Your presence would add great value to the discussions.',
  date: sub(new Date(), { months: 1, days: 18 }).toISOString()
}, {
  id: 19,
  from: {
    name: 'Taylor Rodriguez',
    email: 'taylor.rodriguez@example.com'
  },
  subject: 'Volunteer Opportunity',
  body: 'We\'re looking for volunteers for the upcoming community event. It\'s a great opportunity to give back and make a positive impact. There are various roles available, so you can choose something that aligns with your interests and skills. Let me know if you\'re interested and I\'ll provide more details.',
  date: sub(new Date(), { months: 1, days: 25 }).toISOString()
}, {
  id: 20,
  from: {
    name: 'Morgan Lopez',
    email: 'morgan.lopez@example.com'
  },
  subject: 'Car Service Reminder',
  body: 'Just a reminder that your car is due for service next week. Regular maintenance is important to ensure your vehicle\'s longevity and performance. I\'ve included the details of the service center and the recommended services in this email. Feel free to contact them directly to schedule an appointment.',
  date: sub(new Date(), { months: 2 }).toISOString()
}]

export default eventHandler(async () => {
  return mails
})
