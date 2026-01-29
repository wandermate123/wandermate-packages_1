import { Package } from '../types/package';

export const packages: Package[] = [
  // Varanasi Budget Packages
  {
    id: '1',
    name: 'Authentic Banaras 4D 4N',
    destination: 'Varanasi',
    description: 'Raw. Real. Unfiltered.',
    duration: '4 Days / 4 Nights',
    price: 13999,
    category: 'varanasi-budget',
    featured: true,
    highlights: ['Authentic Experience', 'Local Culture', 'Ganga Aarti', 'Temple Tours'],
    images: ['image1', 'image2', 'image3', 'image4'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Ghat Exploration',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop&q=80',
        activities: [
          'Arrival at Varanasi railway station/airport',
          'Transfer to hotel and check-in',
          'Evening Ganga Aarti at Dashashwamedh Ghat',
          'Dinner at local restaurant',
          'Overnight stay in Varanasi'
        ]
      },
      {
        day: 2,
        title: 'Temple Tours & Spiritual Sites',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&q=80',
        activities: [
          'Early morning boat ride on Ganges',
          'Visit Kashi Vishwanath Temple',
          'Explore Sarnath - Buddhist pilgrimage site',
          'Lunch at traditional Banarasi restaurant',
          'Evening walk through old city lanes',
          'Overnight stay in Varanasi'
        ]
      },
      {
        day: 3,
        title: 'Cultural Immersion',
        image: 'https://images.unsplash.com/photo-1582560475901-0c8e0a8b8b8b?w=800&h=400&fit=crop&q=80',
        activities: [
          'Morning visit to Manikarnika Ghat',
          'Explore local markets and silk weaving centers',
          'Traditional Banarasi thali lunch',
          'Attend classical music or dance performance',
          'Evening Ganga Aarti experience',
          'Overnight stay in Varanasi'
        ]
      },
      {
        day: 4,
        title: 'Departure',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&q=80',
        activities: [
          'Morning meditation session by the Ganges',
          'Last minute shopping for souvenirs',
          'Check-out from hotel',
          'Transfer to railway station/airport',
          'Departure with beautiful memories'
        ]
      }
    ],
    inclusions: [
      'Accommodation in budget hotel (2-3 star)',
      'Daily breakfast',
      'All transfers and sightseeing by private vehicle',
      'Boat ride on Ganges',
      'Ganga Aarti experience',
      'Temple entry tickets',
      'Local guide for sightseeing',
      'All applicable taxes'
    ],
    exclusions: [
      'Lunch and dinner (except where mentioned)',
      'Personal expenses and tips',
      'Travel insurance',
      'Any airfare/train fare',
      'Camera fees at monuments',
      'Any additional activities not mentioned',
      'GST (if applicable)'
    ],
    reviews: [
      {
        id: '1',
        name: 'Rajesh Kumar',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Amazing experience! The Ganga Aarti was breathtaking and the local guide was very knowledgeable. Highly recommend this authentic Banaras experience.',
        verified: true
      },
      {
        id: '2',
        name: 'Priya Sharma',
        rating: 4,
        date: '1 month ago',
        comment: 'Great value for money. The hotel was clean and comfortable. The boat ride at sunrise was the highlight of our trip. Would book again!',
        verified: true
      },
      {
        id: '3',
        name: 'Amit Patel',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Perfect package for first-time visitors to Varanasi. Everything was well organized and the itinerary covered all major attractions.',
        verified: true
      }
    ],
    faqs: [
      {
        question: 'What is the best time to visit Varanasi?',
        answer: 'The best time to visit Varanasi is from October to March when the weather is pleasant. However, Varanasi can be visited year-round. Monsoon season (July-September) offers a unique experience with fewer crowds.'
      },
      {
        question: 'Is the Ganga Aarti included in the package?',
        answer: 'Yes, the evening Ganga Aarti at Dashashwamedh Ghat is included in the package. You will have a prime viewing spot to witness this spiritual ceremony.'
      },
      {
        question: 'What type of accommodation is provided?',
        answer: 'The package includes accommodation in a budget-friendly 2-3 star hotel with clean rooms, basic amenities, and good location near the ghats. All rooms have attached bathrooms and are air-conditioned.'
      },
      {
        question: 'Are meals included in the package?',
        answer: 'Yes, daily breakfast is included. Lunch and dinner are not included unless specifically mentioned in the itinerary, giving you the freedom to explore local cuisine.'
      },
      {
        question: 'What should I carry for the trip?',
        answer: 'Carry comfortable walking shoes, light cotton clothes, a hat/cap, sunscreen, camera, and any personal medications. For temple visits, modest clothing is recommended.'
      }
    ],
    terms: {
      cancellation: 'Cancellation made 15 days before departure: 50% refund. Cancellation made 7-14 days before: 25% refund. Cancellation made less than 7 days before: No refund.',
      refund: 'Refunds will be processed within 7-10 business days to the original payment method. Processing fees may apply.',
      booking: 'Full payment required at the time of booking. Confirmation will be sent via email within 24 hours. Valid ID proof required at check-in.'
    },
    mapLocation: {
      lat: 25.3176,
      lng: 82.9739,
      address: 'Varanasi, Uttar Pradesh, India'
    }
  },
  {
    id: '2',
    name: 'Authentic Banaras 2D 2N',
    destination: 'Varanasi',
    description: 'Raw. Real. Unfiltered.',
    duration: '2 Days / 2 Nights',
    price: 6999,
    category: 'varanasi-budget',
    highlights: ['Authentic Experience', 'Local Culture', 'Ganga Aarti', 'Heritage Walk'],
    images: ['image1', 'image2'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Ghat Experience',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop&q=80',
        activities: [
          'Arrival and hotel check-in',
          'Evening Ganga Aarti at Dashashwamedh Ghat',
          'Dinner and overnight stay'
        ]
      },
      {
        day: 2,
        title: 'Temple Tour & Departure',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&q=80',
        activities: [
          'Morning boat ride on Ganges',
          'Visit Kashi Vishwanath Temple',
          'Explore local markets',
          'Check-out and departure'
        ]
      }
    ],
    inclusions: [
      'Accommodation in budget hotel (2-3 star)',
      'Daily breakfast',
      'All transfers and sightseeing by private vehicle',
      'Boat ride on Ganges',
      'Ganga Aarti experience',
      'Temple entry tickets',
      'Local guide for sightseeing',
      'All applicable taxes'
    ],
    exclusions: [
      'Lunch and dinner (except where mentioned)',
      'Personal expenses and tips',
      'Travel insurance',
      'Any airfare/train fare',
      'Camera fees at monuments',
      'Any additional activities not mentioned',
      'GST (if applicable)'
    ],
    reviews: [
      {
        id: '1',
        name: 'Suresh Mehta',
        rating: 5,
        date: '1 week ago',
        comment: 'Perfect short trip! The 2-day package was well organized and covered all the essential experiences. The Ganga Aarti was mesmerizing.',
        verified: true
      },
      {
        id: '2',
        name: 'Anita Desai',
        rating: 4,
        date: '2 weeks ago',
        comment: 'Great value for a quick spiritual getaway. The boat ride at sunrise was magical. Highly recommended for first-time visitors.',
        verified: true
      }
    ],
    faqs: [
      {
        question: 'Is this package suitable for a weekend trip?',
        answer: 'Yes, this 2-day package is perfect for a weekend getaway. It covers the essential Varanasi experiences including Ganga Aarti, temple visits, and boat ride.'
      },
      {
        question: 'What time does the tour start?',
        answer: 'The tour typically starts with hotel check-in around 12 PM on Day 1, followed by evening Ganga Aarti. Day 2 begins with an early morning boat ride around 6 AM.'
      },
      {
        question: 'Are meals included?',
        answer: 'Daily breakfast is included. Lunch and dinner are not included, giving you the freedom to explore local cuisine.'
      }
    ],
    terms: {
      cancellation: 'Cancellation made 7 days before departure: 50% refund. Cancellation made less than 7 days before: No refund.',
      refund: 'Refunds will be processed within 7-10 business days to the original payment method. Processing fees may apply.',
      booking: 'Full payment required at the time of booking. Confirmation will be sent via email within 24 hours. Valid ID proof required at check-in.'
    },
    mapLocation: {
      lat: 25.3176,
      lng: 82.9739,
      address: 'Varanasi, Uttar Pradesh, India'
    }
  },
  {
    id: '3',
    name: 'Authentic Banaras 3D 3N',
    destination: 'Varanasi',
    description: 'Raw. Real. Unfiltered.',
    duration: '3 Days / 3 Nights',
    price: 10999,
    category: 'varanasi-budget',
    highlights: ['Authentic Experience', 'Local Culture', 'Ganga Aarti', 'Spiritual Sites'],
    images: ['image1', 'image2', 'image3'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Evening Aarti',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop&q=80',
        activities: [
          'Arrival and hotel check-in',
          'Evening Ganga Aarti',
          'Dinner and overnight stay'
        ]
      },
      {
        day: 2,
        title: 'Temples & Sarnath',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&q=80',
        activities: [
          'Morning boat ride',
          'Kashi Vishwanath Temple visit',
          'Sarnath exploration',
          'Evening cultural experience',
          'Overnight stay'
        ]
      },
      {
        day: 3,
        title: 'Local Culture & Departure',
        image: 'https://images.unsplash.com/photo-1582560475901-0c8e0a8b8b8b?w=800&h=400&fit=crop&q=80',
        activities: [
          'Market exploration',
          'Traditional lunch',
          'Check-out and departure'
        ]
      }
    ],
    inclusions: [
      'Accommodation in budget hotel (2-3 star)',
      'Daily breakfast',
      'All transfers and sightseeing by private vehicle',
      'Boat ride on Ganges',
      'Ganga Aarti experience',
      'Temple entry tickets',
      'Local guide for sightseeing',
      'All applicable taxes'
    ],
    exclusions: [
      'Lunch and dinner (except where mentioned)',
      'Personal expenses and tips',
      'Travel insurance',
      'Any airfare/train fare',
      'Camera fees at monuments',
      'Any additional activities not mentioned',
      'GST (if applicable)'
    ],
    reviews: [
      {
        id: '1',
        name: 'Vikram Singh',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Excellent 3-day package! Perfect balance of spiritual experiences and cultural exploration. Sarnath visit was enlightening.',
        verified: true
      },
      {
        id: '2',
        name: 'Meera Joshi',
        rating: 4,
        date: '1 month ago',
        comment: 'Great itinerary covering all major attractions. The cultural experience in the evening was a highlight. Well worth the price.',
        verified: true
      }
    ],
    faqs: [
      {
        question: 'What is included in the Sarnath exploration?',
        answer: 'The Sarnath visit includes guided tour of the Buddhist stupa, museum, and ancient ruins. It provides deep insights into Buddhist history and culture.'
      },
      {
        question: 'Can we customize the itinerary?',
        answer: 'The itinerary is fixed, but you can discuss minor modifications with your guide based on availability and time constraints.'
      },
      {
        question: 'What type of cultural experience is included?',
        answer: 'The evening cultural experience may include classical music performance, traditional dance, or local storytelling sessions showcasing Varanasi\'s rich heritage.'
      }
    ],
    terms: {
      cancellation: 'Cancellation made 10 days before departure: 50% refund. Cancellation made 5-9 days before: 25% refund. Cancellation made less than 5 days before: No refund.',
      refund: 'Refunds will be processed within 7-10 business days to the original payment method. Processing fees may apply.',
      booking: 'Full payment required at the time of booking. Confirmation will be sent via email within 24 hours. Valid ID proof required at check-in.'
    },
    mapLocation: {
      lat: 25.3176,
      lng: 82.9739,
      address: 'Varanasi, Uttar Pradesh, India'
    }
  },
  
  // Varanasi Premium Packages
  {
    id: '4',
    name: 'WanderMate Premium Elite 2D 2N',
    destination: 'Varanasi',
    description: 'Premium luxury experience with elite accommodations and exclusive access to Varanasi\'s finest spiritual and cultural offerings.',
    duration: '2 Days / 2 Nights',
    price: 19999,
    category: 'varanasi-premium',
    featured: true,
    highlights: ['Premium Hotel', 'Private Tours', 'VIP Aarti', 'Personal Guide'],
    images: ['image1', 'image2'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & VIP Ganga Aarti',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop&q=80',
        activities: [
          'Luxury airport/railway station pickup',
          'Check-in at premium 5-star hotel',
          'Private VIP Ganga Aarti experience',
          'Fine dining dinner at rooftop restaurant',
          'Overnight stay in luxury accommodation'
        ]
      },
      {
        day: 2,
        title: 'Exclusive Tours & Departure',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&q=80',
        activities: [
          'Private sunrise boat ride with breakfast',
          'Exclusive temple access with personal guide',
          'Luxury spa session',
          'Premium lunch experience',
          'Check-out and departure transfer'
        ]
      }
    ],
    inclusions: [
      'Heritage Luxury Stays',
      'WanderMate Chauffeur-Driven SUV',
      'Senior Storyteller (Guide)',
      'Private Royal Boat',
      'Personal Photographer',
      'VIP Temple Access',
      'Local Breakfast & Lunch',
      '24/7 Concierge',
      'Custom Plans',
      'Early access to our AI-guide in premium packages'
    ],
    exclusions: [
      'Any airfare/train fare',
      'Travel insurance',
      'Personal expenses and tips',
      'Any additional activities not mentioned'
    ],
    reviews: [
      {
        id: '1',
        name: 'Rahul Kapoor',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Absolutely luxurious experience! The VIP Aarti access was incredible and the hotel was world-class. Worth every rupee for the premium treatment.',
        verified: true
      },
      {
        id: '2',
        name: 'Neha Agarwal',
        rating: 5,
        date: '1 month ago',
        comment: 'Premium package exceeded expectations. The private guide was knowledgeable, and the spa session was rejuvenating. Highly recommend for special occasions.',
        verified: true
      }
    ],
    faqs: [
      {
        question: 'What makes the VIP Aarti experience different?',
        answer: 'VIP Aarti includes reserved front-row seating, private boat access for better viewing, and exclusive interaction with the priests. It offers an intimate and premium spiritual experience.'
      },
      {
        question: 'What type of hotel accommodation is provided?',
        answer: 'You will stay in a premium 5-star hotel with river view rooms, modern amenities, spa facilities, and fine dining restaurants. All rooms are elegantly furnished with luxury amenities.'
      },
      {
        question: 'Is the spa session included?',
        answer: 'Yes, one luxury spa session is included in the package. Additional spa services can be availed at extra cost.'
      }
    ],
    terms: {
      cancellation: 'Cancellation made 15 days before departure: 75% refund. Cancellation made 7-14 days before: 50% refund. Cancellation made less than 7 days before: No refund.',
      refund: 'Refunds will be processed within 7-10 business days to the original payment method. Processing fees may apply.',
      booking: 'Full payment required at the time of booking. Confirmation will be sent via email within 24 hours. Valid ID proof required at check-in.'
    },
    mapLocation: {
      lat: 25.3176,
      lng: 82.9739,
      address: 'Varanasi, Uttar Pradesh, India'
    }
  },
  {
    id: '5',
    name: 'WanderMate Premium Elite 4D 4N',
    destination: 'Varanasi',
    description: 'Extended premium journey with luxury accommodations, curated experiences, and exclusive access to spiritual ceremonies.',
    duration: '4 Days / 4 Nights',
    price: 34999,
    category: 'varanasi-premium',
    highlights: ['5-Star Hotel', 'River View Room', 'Private Boat', 'Fine Dining'],
    images: ['image1', 'image2', 'image3', 'image4'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Luxury Welcome',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop&q=80',
        activities: [
          'Luxury airport/railway station pickup',
          'Check-in at premium 5-star hotel with river view',
          'Welcome spa session',
          'VIP Ganga Aarti experience',
          'Fine dining dinner with cultural performance',
          'Overnight stay in luxury suite'
        ]
      },
      {
        day: 2,
        title: 'Exclusive Temple Tours',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&q=80',
        activities: [
          'Private sunrise boat ride with breakfast on board',
          'Exclusive access to Kashi Vishwanath Temple',
          'Private tour of Sarnath with expert guide',
          'Premium lunch at heritage restaurant',
          'Evening cultural show',
          'Overnight stay'
        ]
      },
      {
        day: 3,
        title: 'Cultural Immersion & Wellness',
        image: 'https://images.unsplash.com/photo-1582560475901-0c8e0a8b8b8b?w=800&h=400&fit=crop&q=80',
        activities: [
          'Morning yoga session by the Ganges',
          'Private tour of silk weaving centers',
          'Luxury spa and wellness session',
          'Fine dining experience',
          'Private Ganga Aarti boat',
          'Overnight stay'
        ]
      },
      {
        day: 4,
        title: 'Premium Departure',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&q=80',
        activities: [
          'Morning meditation session',
          'Premium shopping experience',
          'Farewell lunch',
          'Check-out and luxury departure transfer'
        ]
      }
    ],
    inclusions: [
      'Heritage Luxury Stays',
      'WanderMate Chauffeur-Driven SUV',
      'Senior Storyteller (Guide)',
      'Private Royal Boat',
      'Personal Photographer',
      'VIP Temple Access',
      'Local Breakfast & Lunch',
      '24/7 Concierge',
      'Custom Plans',
      'Early access to our AI-guide in premium packages'
    ],
    exclusions: [
      'Any airfare/train fare',
      'Travel insurance',
      'Personal expenses and tips',
      'Any additional activities not mentioned'
    ],
    reviews: [
      {
        id: '1',
        name: 'Arjun Malhotra',
        rating: 5,
        date: '1 week ago',
        comment: 'The most luxurious Varanasi experience! The river view room was breathtaking, and every detail was perfectly curated. The spa sessions were rejuvenating.',
        verified: true
      },
      {
        id: '2',
        name: 'Kavita Reddy',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Worth every penny! The exclusive temple access and private boat experiences made this trip unforgettable. The fine dining was exceptional.',
        verified: true
      }
    ],
    faqs: [
      {
        question: 'What is included in the river view room?',
        answer: 'River view rooms offer panoramic views of the Ganges, premium furnishings, luxury amenities, and exclusive access to hotel facilities including spa and fine dining.'
      },
      {
        question: 'How many spa sessions are included?',
        answer: 'Multiple luxury spa sessions are included - one on arrival and additional sessions throughout your stay. Additional services can be availed at extra cost.'
      },
      {
        question: 'What makes the temple access exclusive?',
        answer: 'Exclusive access includes skip-the-line entry, private darshan, interaction with temple priests, and detailed spiritual guidance from your personal guide.'
      }
    ],
    terms: {
      cancellation: 'Cancellation made 20 days before departure: 75% refund. Cancellation made 10-19 days before: 50% refund. Cancellation made less than 10 days before: No refund.',
      refund: 'Refunds will be processed within 7-10 business days to the original payment method. Processing fees may apply.',
      booking: 'Full payment required at the time of booking. Confirmation will be sent via email within 24 hours. Valid ID proof required at check-in.'
    },
    mapLocation: {
      lat: 25.3176,
      lng: 82.9739,
      address: 'Varanasi, Uttar Pradesh, India'
    }
  },
  {
    id: '6',
    name: 'WanderMate Premium Elite 3D 3N',
    destination: 'Varanasi',
    description: 'Elite premium experience with world-class hospitality, exclusive temple access, and personalized spiritual journey.',
    duration: '3 Days / 3 Nights',
    price: 27999,
    category: 'varanasi-premium',
    highlights: ['Luxury Transport', 'Private Ceremonies', 'Spa & Wellness', 'Gourmet Meals'],
    images: ['image1', 'image2', 'image3'],
    itinerary: [
      {
        day: 1,
        title: 'Sunrise Boat Ride & Temple Tours',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop&q=80',
        activities: [
          '05:30 AM: Sunrise Boat Ride on the Ganges',
          '08:00 AM: Kaal Bhairav Temple visit',
          '10:00 AM: Kashi Vishwanath Temple & Corridor',
          '12:30 PM: Lunch at Apex The Ganges View (Mir Ghat)',
          '02:30 PM: Banarasi Silk Tour (Thateri Bazaar)',
          '06:30 PM: Grand Ganga Aarti at Dashashwamedh Ghat'
        ]
      },
      {
        day: 2,
        title: 'Sarnath & Historical Sites',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&q=80',
        activities: [
          '07:30 AM: Early departure for Sarnath',
          '08:30 AM: Sarnath Archaeological Park (Dhamek Stupa)',
          '10:30 AM: Sarnath Museum (Closed Fridays)',
          '11:45 AM: Famous Sarnath Lassi break',
          '02:00 PM: Ramnagar Fort & Museum',
          '04:00 PM: Famous Ramnagar Lassi (Shiv Prasad Sahu)',
          '05:30 PM: Swarved Mahamandir (Umaraha)'
        ]
      },
      {
        day: 3,
        title: 'Heritage Walk & Cultural Exploration',
        image: 'https://images.unsplash.com/photo-1582560475901-0c8e0a8b8b8b?w=800&h=400&fit=crop&q=80',
        activities: [
          '08:00 AM: Heritage Breakfast Food Walk (Kachori, Jalebi, Malaiyo)',
          '10:30 AM: Private Boating & Photography Session',
          '12:30 PM: Sankat Mochan Hanuman Temple',
          '01:30 PM: Durga Kund Mandir (Monkey Temple)',
          '02:30 PM: BHU Campus & New Vishwanath Temple (VT)',
          '04:00 PM: Bharat Kala Bhavan Museum',
          '06:00 PM: Reflection walk at Jain Ghat or Tulsi Ghat with Kullad Chai',
          '08:00 PM: Farewell Dinner at Tasty Buds'
        ]
      }
    ],
    inclusions: [
      'Heritage Luxury Stays',
      'WanderMate Chauffeur-Driven SUV',
      'Senior Storyteller (Guide)',
      'Private Royal Boat',
      'Personal Photographer',
      'VIP Temple Access',
      'Local Breakfast & Lunch',
      '24/7 Concierge',
      'Custom Plans',
      'Early access to our AI-guide in premium packages'
    ],
    exclusions: [
      'Any airfare/train fare',
      'Travel insurance',
      'Personal expenses and tips',
      'Any additional activities not mentioned'
    ],
    reviews: [
      {
        id: '1',
        name: 'Sanjay Verma',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Elite experience from start to finish! The private ceremonies and gourmet meals were exceptional. The spa sessions were perfect for relaxation.',
        verified: true
      },
      {
        id: '2',
        name: 'Divya Nair',
        rating: 5,
        date: '1 month ago',
        comment: 'Perfect blend of luxury and spirituality. The exclusive temple access and private ceremonies made this a truly special journey. Highly recommended!',
        verified: true
      }
    ],
    faqs: [
      {
        question: 'What is included in the private ceremonies?',
        answer: 'Private ceremonies include exclusive Ganga Aarti experiences with reserved seating, private boat access, and personalized spiritual guidance from expert priests.'
      },
      {
        question: 'What type of gourmet meals are included?',
        answer: 'Gourmet meals include fine dining experiences at premium restaurants, traditional Banarasi thali, and curated meals showcasing local and international cuisine.'
      },
      {
        question: 'Are wellness sessions included?',
        answer: 'Yes, multiple wellness sessions including spa treatments, yoga sessions, and meditation are included in the package.'
      }
    ],
    terms: {
      cancellation: 'Cancellation made 15 days before departure: 75% refund. Cancellation made 7-14 days before: 50% refund. Cancellation made less than 7 days before: No refund.',
      refund: 'Refunds will be processed within 7-10 business days to the original payment method. Processing fees may apply.',
      booking: 'Full payment required at the time of booking. Confirmation will be sent via email within 24 hours. Valid ID proof required at check-in.'
    },
    mapLocation: {
      lat: 25.3176,
      lng: 82.9739,
      address: 'Varanasi, Uttar Pradesh, India'
    }
  },
  
  // Spiritual Triangle Packages
  {
    id: '7',
    name: 'Spiritual Triangle Tour',
    destination: 'Varanasi, Ayodhya, Prayagraj',
    description: 'Complete spiritual journey through the holy triangle: Varanasi, Ayodhya, and Prayagraj with guided tours and comfortable stays.',
    duration: '7 Days / 6 Nights',
    price: 8999,
    category: 'spiritual-triangle',
    featured: true,
    highlights: ['Three Cities', 'Temple Tours', 'Ganga Aarti', 'Kumbh Mela Sites'],
    images: ['image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Varanasi',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop&q=80',
        activities: [
          'Arrival at Varanasi',
          'Hotel check-in',
          'Evening Ganga Aarti at Dashashwamedh Ghat',
          'Dinner and overnight stay in Varanasi'
        ]
      },
      {
        day: 2,
        title: 'Varanasi Exploration',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&q=80',
        activities: [
          'Morning boat ride on Ganges',
          'Visit Kashi Vishwanath Temple',
          'Explore Sarnath',
          'Evening cultural experience',
          'Overnight stay in Varanasi'
        ]
      },
      {
        day: 3,
        title: 'Travel to Ayodhya',
        image: 'https://images.unsplash.com/photo-1582560475901-0c8e0a8b8b8b?w=800&h=400&fit=crop&q=80',
        activities: [
          'Check-out from Varanasi',
          'Travel to Ayodhya',
          'Hotel check-in',
          'Visit Ram Janmabhoomi',
          'Evening aarti',
          'Overnight stay in Ayodhya'
        ]
      },
      {
        day: 4,
        title: 'Ayodhya Temples',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&q=80',
        activities: [
          'Morning prayers',
          'Visit Hanuman Garhi',
          'Explore Kanak Bhawan',
          'Visit Nageshwarnath Temple',
          'Evening darshan',
          'Overnight stay in Ayodhya'
        ]
      },
      {
        day: 5,
        title: 'Travel to Prayagraj',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop&q=80',
        activities: [
          'Check-out from Ayodhya',
          'Travel to Prayagraj',
          'Hotel check-in',
          'Visit Triveni Sangam',
          'Evening aarti',
          'Overnight stay in Prayagraj'
        ]
      },
      {
        day: 6,
        title: 'Prayagraj Exploration',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&q=80',
        activities: [
          'Morning boat ride at Sangam',
          'Visit Allahabad Fort',
          'Explore Anand Bhavan',
          'Visit Kumbh Mela sites',
          'Evening cultural program',
          'Overnight stay in Prayagraj'
        ]
      },
      {
        day: 7,
        title: 'Departure',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&q=80',
        activities: [
          'Final prayers at Sangam',
          'Check-out',
          'Transfer to airport/railway station',
          'Departure'
        ]
      }
    ],
    inclusions: [
      'Accommodation in comfortable hotels (all three cities)',
      'Daily breakfast',
      'All transfers and inter-city travel',
      'Boat rides at Ganges and Sangam',
      'Ganga Aarti experiences',
      'Temple entry tickets',
      'Local guide for sightseeing',
      'All applicable taxes'
    ],
    exclusions: [
      'Lunch and dinner (except where mentioned)',
      'Personal expenses and tips',
      'Travel insurance',
      'Any airfare/train fare',
      'Camera fees at monuments',
      'Any additional activities not mentioned',
      'GST (if applicable)'
    ],
    reviews: [
      {
        id: '1',
        name: 'Mohan Das',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Incredible spiritual journey through three holy cities! Each city offered unique experiences. The guides were knowledgeable and the itinerary was well-planned.',
        verified: true
      },
      {
        id: '2',
        name: 'Sunita Devi',
        rating: 4,
        date: '1 month ago',
        comment: 'Beautiful tour covering all three sacred cities. The Sangam experience in Prayagraj was divine. Highly recommend for spiritual seekers.',
        verified: true
      }
    ],
    faqs: [
      {
        question: 'How is the travel between cities arranged?',
        answer: 'All inter-city travel is arranged in comfortable private vehicles with experienced drivers. The journey times are optimized for your comfort.'
      },
      {
        question: 'What type of accommodation is provided?',
        answer: 'Comfortable 3-star hotels are provided in each city with clean rooms, basic amenities, and good locations near the main attractions.'
      },
      {
        question: 'Is the Sangam visit included?',
        answer: 'Yes, the Triveni Sangam visit in Prayagraj is included with boat ride. This is one of the most sacred confluences in India.'
      }
    ],
    terms: {
      cancellation: 'Cancellation made 20 days before departure: 50% refund. Cancellation made 10-19 days before: 25% refund. Cancellation made less than 10 days before: No refund.',
      refund: 'Refunds will be processed within 7-10 business days to the original payment method. Processing fees may apply.',
      booking: 'Full payment required at the time of booking. Confirmation will be sent via email within 24 hours. Valid ID proof required at check-in.'
    },
    mapLocation: {
      lat: 25.3176,
      lng: 82.9739,
      address: 'Varanasi, Ayodhya, Prayagraj - Spiritual Triangle'
    }
  },
  {
    id: '8',
    name: 'Sacred Triangle Expedition',
    destination: 'Varanasi, Ayodhya, Prayagraj',
    description: 'Explore the three most sacred cities of India with comprehensive tours, cultural experiences, and spiritual activities.',
    duration: '8 Days / 7 Nights',
    price: 10999,
    category: 'spiritual-triangle',
    highlights: ['All Three Cities', 'Cultural Shows', 'River Confluence', 'Historical Sites'],
    images: ['image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7', 'image8'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Varanasi',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop&q=80',
        activities: [
          'Arrival at Varanasi',
          'Hotel check-in',
          'Evening Ganga Aarti',
          'Welcome dinner',
          'Overnight stay in Varanasi'
        ]
      },
      {
        day: 2,
        title: 'Varanasi Temples & Culture',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&q=80',
        activities: [
          'Morning boat ride on Ganges',
          'Visit Kashi Vishwanath Temple',
          'Explore Sarnath',
          'Cultural show in evening',
          'Overnight stay in Varanasi'
        ]
      },
      {
        day: 3,
        title: 'Varanasi Heritage',
        image: 'https://images.unsplash.com/photo-1582560475901-0c8e0a8b8b8b?w=800&h=400&fit=crop&q=80',
        activities: [
          'Heritage walk through old city',
          'Visit local markets',
          'Traditional lunch',
          'Evening Ganga Aarti',
          'Overnight stay in Varanasi'
        ]
      },
      {
        day: 4,
        title: 'Travel to Ayodhya',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&q=80',
        activities: [
          'Check-out from Varanasi',
          'Travel to Ayodhya',
          'Hotel check-in',
          'Visit Ram Janmabhoomi',
          'Evening aarti',
          'Overnight stay in Ayodhya'
        ]
      },
      {
        day: 5,
        title: 'Ayodhya Temples',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop&q=80',
        activities: [
          'Morning prayers',
          'Visit Hanuman Garhi',
          'Explore Kanak Bhawan',
          'Visit Nageshwarnath Temple',
          'Cultural show',
          'Overnight stay in Ayodhya'
        ]
      },
      {
        day: 6,
        title: 'Travel to Prayagraj',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&q=80',
        activities: [
          'Check-out from Ayodhya',
          'Travel to Prayagraj',
          'Hotel check-in',
          'Visit Triveni Sangam',
          'Evening aarti',
          'Overnight stay in Prayagraj'
        ]
      },
      {
        day: 7,
        title: 'Prayagraj Exploration',
        image: 'https://images.unsplash.com/photo-1582560475901-0c8e0a8b8b8b?w=800&h=400&fit=crop&q=80',
        activities: [
          'Morning boat ride at Sangam',
          'Visit Allahabad Fort',
          'Explore Anand Bhavan',
          'Visit Kumbh Mela sites',
          'Evening cultural program',
          'Overnight stay in Prayagraj'
        ]
      },
      {
        day: 8,
        title: 'Departure',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&q=80',
        activities: [
          'Final prayers at Sangam',
          'Check-out',
          'Transfer to airport/railway station',
          'Departure'
        ]
      }
    ],
    inclusions: [
      'Accommodation in comfortable hotels (all three cities)',
      'Daily breakfast',
      'All transfers and inter-city travel',
      'Boat rides at Ganges and Sangam',
      'Ganga Aarti experiences',
      'Temple entry tickets',
      'Cultural shows',
      'Local guide for sightseeing',
      'All applicable taxes'
    ],
    exclusions: [
      'Lunch and dinner (except where mentioned)',
      'Personal expenses and tips',
      'Travel insurance',
      'Any airfare/train fare',
      'Camera fees at monuments',
      'Any additional activities not mentioned',
      'GST (if applicable)'
    ],
    reviews: [
      {
        id: '1',
        name: 'Rajendra Prasad',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Comprehensive expedition covering all three cities in detail. The cultural shows were amazing and the guides were excellent. Perfect spiritual journey!',
        verified: true
      },
      {
        id: '2',
        name: 'Lakshmi Iyer',
        rating: 4,
        date: '1 month ago',
        comment: 'Wonderful experience visiting all three sacred cities. The extended duration allowed us to explore each city thoroughly. Highly recommended!',
        verified: true
      }
    ],
    faqs: [
      {
        question: 'What cultural shows are included?',
        answer: 'Cultural shows include traditional music performances, classical dance, and local storytelling sessions showcasing the rich heritage of each city.'
      },
      {
        question: 'How many days are spent in each city?',
        answer: 'The itinerary includes 3 days in Varanasi, 2 days in Ayodhya, and 2 days in Prayagraj, allowing comprehensive exploration of each city.'
      },
      {
        question: 'Are meals included?',
        answer: 'Daily breakfast is included. Some traditional lunches are included as mentioned in the itinerary. Dinner is generally not included to allow flexibility.'
      }
    ],
    terms: {
      cancellation: 'Cancellation made 20 days before departure: 50% refund. Cancellation made 10-19 days before: 25% refund. Cancellation made less than 10 days before: No refund.',
      refund: 'Refunds will be processed within 7-10 business days to the original payment method. Processing fees may apply.',
      booking: 'Full payment required at the time of booking. Confirmation will be sent via email within 24 hours. Valid ID proof required at check-in.'
    },
    mapLocation: {
      lat: 25.3176,
      lng: 82.9739,
      address: 'Varanasi, Ayodhya, Prayagraj - Spiritual Triangle'
    }
  },
  {
    id: '9',
    name: 'Complete Spiritual Circuit',
    destination: 'Varanasi, Ayodhya, Prayagraj',
    description: 'An immersive journey through the spiritual triangle with extended stays, detailed tours, and authentic experiences.',
    duration: '10 Days / 9 Nights',
    price: 14999,
    category: 'spiritual-triangle',
    highlights: ['Extended Tour', 'Multiple Aartis', 'Yoga Sessions', 'Local Interactions'],
    images: ['image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7', 'image8', 'image9', 'image10'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Varanasi',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop&q=80',
        activities: [
          'Arrival at Varanasi',
          'Hotel check-in',
          'Evening Ganga Aarti',
          'Welcome dinner',
          'Overnight stay in Varanasi'
        ]
      },
      {
        day: 2,
        title: 'Varanasi Temples',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&q=80',
        activities: [
          'Morning boat ride on Ganges',
          'Visit Kashi Vishwanath Temple',
          'Explore Sarnath',
          'Yoga session',
          'Evening Ganga Aarti',
          'Overnight stay in Varanasi'
        ]
      },
      {
        day: 3,
        title: 'Varanasi Culture',
        image: 'https://images.unsplash.com/photo-1582560475901-0c8e0a8b8b8b?w=800&h=400&fit=crop&q=80',
        activities: [
          'Heritage walk through old city',
          'Visit silk weaving centers',
          'Traditional lunch',
          'Local market exploration',
          'Evening cultural show',
          'Overnight stay in Varanasi'
        ]
      },
      {
        day: 4,
        title: 'Varanasi Spiritual',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&q=80',
        activities: [
          'Morning meditation by Ganges',
          'Visit Manikarnika Ghat',
          'Temple tours',
          'Evening Ganga Aarti',
          'Overnight stay in Varanasi'
        ]
      },
      {
        day: 5,
        title: 'Travel to Ayodhya',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop&q=80',
        activities: [
          'Check-out from Varanasi',
          'Travel to Ayodhya',
          'Hotel check-in',
          'Visit Ram Janmabhoomi',
          'Evening aarti',
          'Overnight stay in Ayodhya'
        ]
      },
      {
        day: 6,
        title: 'Ayodhya Temples',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&q=80',
        activities: [
          'Morning prayers',
          'Visit Hanuman Garhi',
          'Explore Kanak Bhawan',
          'Visit Nageshwarnath Temple',
          'Yoga session',
          'Evening darshan',
          'Overnight stay in Ayodhya'
        ]
      },
      {
        day: 7,
        title: 'Ayodhya Heritage',
        image: 'https://images.unsplash.com/photo-1582560475901-0c8e0a8b8b8b?w=800&h=400&fit=crop&q=80',
        activities: [
          'Heritage walk',
          'Local interactions',
          'Traditional lunch',
          'Cultural activities',
          'Evening aarti',
          'Overnight stay in Ayodhya'
        ]
      },
      {
        day: 8,
        title: 'Travel to Prayagraj',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&q=80',
        activities: [
          'Check-out from Ayodhya',
          'Travel to Prayagraj',
          'Hotel check-in',
          'Visit Triveni Sangam',
          'Evening aarti',
          'Overnight stay in Prayagraj'
        ]
      },
      {
        day: 9,
        title: 'Prayagraj Exploration',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop&q=80',
        activities: [
          'Morning boat ride at Sangam',
          'Visit Allahabad Fort',
          'Explore Anand Bhavan',
          'Visit Kumbh Mela sites',
          'Yoga session',
          'Evening cultural program',
          'Overnight stay in Prayagraj'
        ]
      },
      {
        day: 10,
        title: 'Departure',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&q=80',
        activities: [
          'Final prayers at Sangam',
          'Meditation session',
          'Check-out',
          'Transfer to airport/railway station',
          'Departure'
        ]
      }
    ],
    inclusions: [
      'Accommodation in comfortable hotels (all three cities)',
      'Daily breakfast',
      'All transfers and inter-city travel',
      'Boat rides at Ganges and Sangam',
      'Multiple Ganga Aarti experiences',
      'Temple entry tickets',
      'Yoga and meditation sessions',
      'Cultural shows',
      'Local interactions',
      'Local guide for sightseeing',
      'All applicable taxes'
    ],
    exclusions: [
      'Lunch and dinner (except where mentioned)',
      'Personal expenses and tips',
      'Travel insurance',
      'Any airfare/train fare',
      'Camera fees at monuments',
      'Any additional activities not mentioned',
      'GST (if applicable)'
    ],
    reviews: [
      {
        id: '1',
        name: 'Gopal Sharma',
        rating: 5,
        date: '2 weeks ago',
        comment: 'The most comprehensive spiritual circuit! Extended duration allowed deep immersion in each city. The yoga sessions and local interactions were enriching.',
        verified: true
      },
      {
        id: '2',
        name: 'Kamala Devi',
        rating: 5,
        date: '1 month ago',
        comment: 'Perfect for spiritual seekers! Multiple aartis, yoga sessions, and authentic local experiences made this journey truly transformative. Highly recommended!',
        verified: true
      }
    ],
    faqs: [
      {
        question: 'How many yoga sessions are included?',
        answer: 'Multiple yoga and meditation sessions are included throughout the tour - in Varanasi by the Ganges, in Ayodhya, and in Prayagraj at the Sangam.'
      },
      {
        question: 'What are the local interactions?',
        answer: 'Local interactions include visits to silk weaving centers, traditional workshops, local markets, and opportunities to meet local artisans and spiritual guides.'
      },
      {
        question: 'How many aartis are included?',
        answer: 'Multiple aarti experiences are included - evening Ganga Aartis in Varanasi, temple aartis in Ayodhya, and Sangam aarti in Prayagraj.'
      }
    ],
    terms: {
      cancellation: 'Cancellation made 25 days before departure: 50% refund. Cancellation made 15-24 days before: 25% refund. Cancellation made less than 15 days before: No refund.',
      refund: 'Refunds will be processed within 7-10 business days to the original payment method. Processing fees may apply.',
      booking: 'Full payment required at the time of booking. Confirmation will be sent via email within 24 hours. Valid ID proof required at check-in.'
    },
    mapLocation: {
      lat: 25.3176,
      lng: 82.9739,
      address: 'Varanasi, Ayodhya, Prayagraj - Spiritual Triangle'
    }
  },
];
