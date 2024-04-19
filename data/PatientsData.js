import  bcrypt  from 'bcryptjs';


const patientsData = [
  {
    firstName: "Alice",
    lastName: "Smith",
    profileImage: "/images/patient.jpg",
    email: "david@email.com",
    password: bcrypt.hashSync("12345", 10),
    dob: "1985-07-10",
    bloodGroup: "O+",
    phone: "123-456-7890",
    city: "New York",
    state: "NY",
    country: "USA",
    zipCode: "10001",
    address: "123 Main St",
    location: "Newyork, USA", // Latitude, Longitude format
    bookmarks: [],
    healthData: [
      {
        date: "2023-10-15",
        bmi: 24.5,
        heartRate: 72,
        weight: 150,
        fbcStatus: "Normal",
        bodyTemp: 98.6,
        bloodPressure: "120/80",
        glucoseLevel: 90,
      },
      {
        date: "2023-11-15",
        bmi: 24,
        heartRate: 70,
        weight: 148,
        fbcStatus: "Normal",
        bodyTemp: 98.5,
        bloodPressure: "118/78",
        glucoseLevel: 85,
      },
    ],
 
  },

  // Add details for more patients here...
];
export default patientsData;
