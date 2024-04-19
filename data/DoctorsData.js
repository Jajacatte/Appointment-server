import bcrypt from "bcryptjs";

const doctorsData = [
  {
    aboutMe:
      "Dr. John is an experienced dentist with a passion for providing quality dental care to his patients.",
    education: [
      {
        degree: "DDS",
        year: 2008,
        college: "University of California, San Francisco",
      },
      {
        degree: "MDS - Orthodontics",
        year: 2012,
        college: "University of California, Los Angeles",
      },
    ],
    experience: [
      {
        organization: "Sunshine Dental Clinic",
        from: new Date("2012-01-01"),
        to: new Date("2022-01-01"),
        designation: "Orthodontist",
      },
      {
        organization: "Happy Teeth Clinic",
        from: new Date("2008-01-01"),
        to: new Date("2012-01-01"),
        designation: "Dentist",
      },
    ],
    awards: [
      {
        name: "Best Orthodontist",
        year: 2015,
        details: "Awarded for excellence in orthodontic care",
      },
    ],
    services: ["Teeth Cleaning", "Braces"],
    specializations: ["Orthodontics", "General Dentistry"],
    field: "Orthodontics",
    clinicInfo: {
      name: "Sunshine Dental Clinic",
      title: "Orthodontic & General Dentistry",
      ratings: 4.8,
      addressLine1: "123 Main Street",
      addressLine2: "Suite 101",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      zipCode: "90001",

      clinicImages: [
        "/images/feature-01.jpg",
        "/images/feature-02.jpg",
        "/images/feature-03.jpg",
        "/images/feature-04.jpg",
      ],
      timings: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 2:00 PM",
        saturday: "Closed",
        sunday: "Closed",
      },
      price: 200,
    },
    pricing: 189,
    reviews: [
      {
        rating: 5,
        comment: "Dr. John is the best orthodontist I've ever been to!",
      },
      {
        rating: 4.5,
        comment:
          "Great experience at Sunshine Dental Clinic. Friendly staff and excellent care.",
      },
    ],
    businessHours: [
      { day: "Monday", startTime: "9:00 AM", endTime: "5:00 PM" },
      { day: "Tuesday", startTime: "9:00 AM", endTime: "5:00 PM" },
      { day: "Wednesday", startTime: "9:00 AM", endTime: "5:00 PM" },
      { day: "Thursday", startTime: "9:00 AM", endTime: "5:00 PM" },
      { day: "Friday", startTime: "9:00 AM", endTime: "2:00 PM" },
    ],
    username: "drjohnortho",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 123-456-7890",
    gender: "Male",
    dateOfBirth: new Date("1980-05-15"),
    profileImage: "/images/doctor-thumb-01.jpg",
    location: "Florida, USA",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    aboutMe:
      "Dr. John Smith is an experienced general practitioner with over 15 years of experience in primary care. He is dedicated to providing comprehensive medical care to patients of all ages.",
    education: [
      { degree: "MD", year: 2005, college: "Harvard Medical School" },
      { degree: "MBBS", year: 2000, college: "University of Oxford" },
    ],
    experience: [
      {
        organization: "ABC Hospital",
        from: new Date("2005-01-01"),
        to: new Date("2021-12-31"),
        designation: "Senior Physician",
      },
      {
        organization: "XYZ Clinic",
        from: new Date("2020-01-01"),
        to: new Date("2023-01-01"),
        designation: "Chief Medical Officer",
      },
    ],
    awards: [
      {
        name: "Best General Practitioner",
        year: 2010,
        details: "Awarded by the American Medical Association",
      },
      {
        name: "Excellence in Primary Care",
        year: 2015,
        details: "Awarded by the National Health Service",
      },
    ],
    services: ["General Checkup", "Chronic Disease Management"],
    specializations: ["Internal Medicine", "Family Medicine"],
    field: "Internal Medicine",
    clinicInfo: {
      name: "Smith Medical Clinic",
      title: "Your Partner in Health",
      ratings: 4.8,

      addressLine1: "123 Main Street",
      city: "New York",
      state: "NY",
      country: "USA",
      zipCode: "10001",

      clinicImages: [
        "/images/feature-01.jpg",
        "/images/feature-02.jpg",
        "/images/feature-03.jpg",
        "/images/feature-04.jpg",
      ],
      timings: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: "10:00 AM - 2:00 PM",
        sunday: "Closed",
      },
      price: 89,
    },
    pricing: 78,
    reviews: [
      {
        rating: 4.5,
        comment:
          "Dr. Smith is very knowledgeable and caring. Highly recommended!",
      },
      {
        rating: 5,
        comment:
          "Excellent service and thorough examination. Thank you, Dr. Smith!",
      },
    ],
    businessHours: [
      { day: "Monday", startTime: "9:00 AM", endTime: "5:00 PM" },
      { day: "Tuesday", startTime: "9:00 AM", endTime: "5:00 PM" },
      { day: "Wednesday", startTime: "9:00 AM", endTime: "5:00 PM" },
      { day: "Thursday", startTime: "9:00 AM", endTime: "5:00 PM" },
      { day: "Friday", startTime: "9:00 AM", endTime: "5:00 PM" },
      { day: "Saturday", startTime: "10:00 AM", endTime: "2:00 PM" },
      { day: "Sunday", startTime: null, endTime: null },
    ],
    username: "drjohnsmith",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "123-456-7890",
    gender: "Male",
    dateOfBirth: new Date("1975-05-15"),
    profileImage: "/images/doctor-thumb-02.jpg",
    location: "Gorgea, USA",
    password: bcrypt.hashSync("12345", 10),
  },

  {
    aboutMe:
      "Dr. Emily Johnson is a dedicated obstetrician and gynecologist with a passion for women's health. With over 10 years of experience, she provides personalized care to women of all ages.",
    education: [
      {
        degree: "MD",
        year: 2010,
        college: "Stanford University School of Medicine",
      },
      {
        degree: "OBGYN Residency",
        year: 2014,
        college: "Johns Hopkins Hospital",
      },
    ],
    experience: [
      {
        organization: "Women's Health Clinic",
        from: new Date("2014-01-01"),
        to: new Date("2021-01-01"),
        designation: "Obstetrician & Gynecologist",
      },
    ],
    awards: [
      {
        name: "Outstanding Women's Health Specialist",
        year: 2018,
        details:
          "Awarded by the American College of Obstetricians and Gynecologists",
      },
    ],
    services: ["Prenatal Care", "Gynecological Exams"],
    specializations: ["Obstetrics", "Gynecology"],
    field: "Gynecology",
    clinicInfo: {
      name: "Johnson Women's Clinic",
      title: "Empowering Women's Health",
      ratings: 4.9,

      addressLine1: "456 Oak Street",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      zipCode: "90001",

      clinicImages: [
        "/images/feature-01.jpg",
        "/images/feature-02.jpg",
        "/images/feature-03.jpg",
        "/images/feature-04.jpg",
      ],
      timings: {
        monday: "8:00 AM - 6:00 PM",
        tuesday: "8:00 AM - 6:00 PM",
        wednesday: "8:00 AM - 6:00 PM",
        thursday: "8:00 AM - 6:00 PM",
        friday: "8:00 AM - 4:00 PM",
        saturday: "Closed",
        sunday: "Closed",
      },
      price: 175,
    },
    pricing: 234,
    reviews: [
      {
        rating: 4.8,
        comment:
          "Dr. Johnson is amazing! She listens attentively and provides thorough care.",
      },
      {
        rating: 5,
        comment:
          "Exceptional doctor! I highly recommend Dr. Johnson for women's health needs.",
      },
    ],
    businessHours: [
      { day: "Monday", startTime: "8:00 AM", endTime: "6:00 PM" },
      { day: "Tuesday", startTime: "8:00 AM", endTime: "6:00 PM" },
      { day: "Wednesday", startTime: "8:00 AM", endTime: "6:00 PM" },
      { day: "Thursday", startTime: "8:00 AM", endTime: "6:00 PM" },
      { day: "Friday", startTime: "8:00 AM", endTime: "4:00 PM" },
      { day: "Saturday", startTime: null, endTime: null },
      { day: "Sunday", startTime: null, endTime: null },
    ],
    username: "drejohson",
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@example.com",
    phone: "987-654-3210",
    gender: "Female",
    dateOfBirth: new Date("1985-08-20"),
    profileImage: "/images/doctor-thumb-03.jpg",
    location: "California, USA",
    password: bcrypt.hashSync("12345", 10),
  },

  {
    aboutMe:
      "Dr. Sarah Lee is a highly skilled dermatologist with expertise in both medical and cosmetic dermatology. She is committed to providing personalized skincare solutions to her patients.",
    education: [
      {
        degree: "MD",
        year: 2008,
        college: "University of California, San Francisco School of Medicine",
      },
      {
        degree: "Dermatology Residency",
        year: 2012,
        college: "Columbia University Medical Center",
      },
    ],
    experience: [
      {
        organization: "SkinCare Clinic",
        from: new Date("2012-01-01"),
        to: null,
        designation: "Dermatologist",
      },
    ],
    awards: [
      {
        name: "Top Dermatologist of the Year",
        year: 2016,
        details: "Awarded by the American Academy of Dermatology",
      },
    ],
    services: ["Acne Treatment", "Botox and Fillers"],
    specializations: ["Dermatology", "Cosmetic Dermatology"],
    field: "Dermatology",
    clinicInfo: {
      name: "Lee Dermatology Clinic",
      title: "Healthy Skin, Beautiful You",
      ratings: 4.7,

      addressLine1: "789 Elm Street",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      zipCode: "94101",

      clinicImages: [
        "/images/feature-01.jpg",
        "/images/feature-02.jpg",
        "/images/feature-03.jpg",
        "/images/feature-04.jpg",
      ],
      timings: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 4:00 PM",
        saturday: "Closed",
        sunday: "Closed",
      },
      price: 120,
    },
    pricing: 168,
    reviews: [
      {
        rating: 4.5,
        comment:
          "Dr. Lee is fantastic! She's helped me achieve clear and radiant skin.",
      },
      {
        rating: 4.8,
        comment:
          "Highly recommend Dr. Lee for all your dermatological needs. She's the best!",
      },
    ],
    businessHours: [
      { day: "Monday", startTime: "9:00 AM", endTime: "5:00 PM" },
      { day: "Tuesday", startTime: "9:00 AM", endTime: "5:00 PM" },
      { day: "Wednesday", startTime: "9:00 AM", endTime: "5:00 PM" },
      { day: "Thursday", startTime: "9:00 AM", endTime: "5:00 PM" },
      { day: "Friday", startTime: "9:00 AM", endTime: "4:00 PM" },
      { day: "Saturday", startTime: null, endTime: null },
      { day: "Sunday", startTime: null, endTime: null },
    ],
    username: "drsarahlee",
    firstName: "Sarah",
    lastName: "Lee",
    email: "sarah.lee@example.com",
    phone: "123-456-7890",
    gender: "Female",
    dateOfBirth: new Date("1980-03-12"),
    profileImage: "/images/doctor-thumb-04.jpg",
    location: "Florida, USA",
    password: bcrypt.hashSync("12345", 10),
  },

  {
    aboutMe:
      "Dr. Mia Vamos is a highly skilled dermatologist with expertise in both medical and cosmetic dermatology. She is committed to providing personalized skincare solutions to her patients.",
    education: [
      {
        degree: "MD",
        year: 2002,
        college: "University of California, San Francisco School of Medicine",
      },
      {
        degree: "Dermatology Residency",
        year: 2014,
        college: "Columbia University Medical Center",
      },
    ],
    experience: [
      {
        organization: "SkinCare Clinic",
        from: new Date("2013-01-01"),
        to: new Date("2023-01-01"),
        designation: "Dermatologist",
      },
    ],
    awards: [
      {
        name: "Top Dermatologist of the Year",
        year: 2016,
        details: "Awarded by the American Academy of Dermatology",
      },
    ],
    services: ["Acne Treatment", "Botox and Fillers"],
    specializations: ["Dermatology", "Cosmetic Dermatology"],
    field: "Dermatology",
    clinicInfo: {
      name: "Lee Dermatology Clinic",
      title: "Healthy Skin, Beautiful You",
      ratings: 4.7,

      addressLine1: "789 Elm Street",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      zipCode: "94101",

      clinicImages: [
        "/images/feature-01.jpg",
        "/images/feature-02.jpg",
        "/images/feature-03.jpg",
        "/images/feature-04.jpg",
      ],
      timings: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 4:00 PM",
        saturday: "Closed",
        sunday: "Closed",
      },
      price: 120,
    },
    pricing: 125,
    reviews: [
      {
        rating: 4.5,
        comment:
          "Dr. Lee is fantastic! She's helped me achieve clear and radiant skin.",
      },
      {
        rating: 4.8,
        comment:
          "Highly recommend Dr. Lee for all your dermatological needs. She's the best!",
      },
    ],
    businessHours: [
      { day: "Monday", startTime: "9:00 AM", endTime: "5:00 PM" },
      { day: "Tuesday", startTime: "9:00 AM", endTime: "5:00 PM" },
      { day: "Wednesday", startTime: "9:00 AM", endTime: "5:00 PM" },
      { day: "Thursday", startTime: "9:00 AM", endTime: "5:00 PM" },
      { day: "Friday", startTime: "9:00 AM", endTime: "4:00 PM" },
      { day: "Saturday", startTime: null, endTime: null },
      { day: "Sunday", startTime: null, endTime: null },
    ],
    username: "drmiavamos",
    firstName: "Mia",
    lastName: "Vamos",
    email: "mia.vam@example.com",
    phone: "123-456-7890",
    gender: "Female",
    dateOfBirth: new Date("1980-03-12"),
    profileImage: "/images/doctor-thumb-06.jpg",
    location: "Florida, USA",
    password: bcrypt.hashSync("12345", 10),
  },

  // Add details for more doctors here...
];

export default doctorsData;
