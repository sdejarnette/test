// PawPass Mock Data

export interface Pet {
  id: string
  name: string
  species: "dog" | "cat"
  breed: string
  dateOfBirth: string
  weight: number
  weightUnit: "lbs" | "kg"
  color: string
  microchipId?: string
  profileImage: string
  isServiceAnimal: boolean
  serviceAnimalType?: "psychiatric" | "guide" | "hearing" | "mobility" | "medical-alert"
  owner: Owner
  vaccinations: Vaccination[]
  medicalRecords: MedicalRecord[]
  travelDocuments: TravelDocument[]
  verifications: Verification[]
}

export interface Owner {
  id: string
  name: string
  email: string
  phone: string
  address: string
  profileImage: string
}

export interface Vaccination {
  id: string
  name: string
  dateAdministered: string
  expirationDate: string
  veterinarian: string
  clinic: string
  lotNumber: string
  status: "current" | "expiring-soon" | "expired"
}

export interface MedicalRecord {
  id: string
  type: "exam" | "surgery" | "lab" | "prescription" | "allergy" | "condition"
  title: string
  date: string
  provider: string
  clinic: string
  notes: string
  attachments?: string[]
}

export interface TravelDocument {
  id: string
  type: "health-certificate" | "import-permit" | "rabies-titer" | "microchip-registration" | "pet-passport"
  name: string
  issueDate: string
  expirationDate?: string
  issuingAuthority: string
  documentNumber: string
  status: "valid" | "pending" | "expired"
  destination?: string
}

export interface Verification {
  id: string
  type: "service-animal" | "vaccination" | "health-status" | "travel-ready"
  status: "verified" | "pending" | "rejected" | "expired"
  verifiedBy?: string
  verifiedAt?: string
  expiresAt?: string
  notes?: string
}

export interface FeedPost {
  id: string
  petId: string
  petName: string
  petImage: string
  ownerName: string
  type: "milestone" | "photo" | "health-update" | "travel" | "achievement"
  content: string
  image?: string
  timestamp: string
  likes: number
  comments: Comment[]
  isLiked: boolean
}

export interface Comment {
  id: string
  authorName: string
  authorImage: string
  content: string
  timestamp: string
}

export interface Notification {
  id: string
  type: "vaccination" | "appointment" | "verification" | "travel" | "social"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  actionUrl?: string
}

// Mock Owner
export const currentOwner: Owner = {
  id: "owner-1",
  name: "Sarah Mitchell",
  email: "sarah.mitchell@email.com",
  phone: "+1 (555) 123-4567",
  address: "742 Evergreen Terrace, Portland, OR 97201",
  profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
}

// Mock Pets
export const pets: Pet[] = [
  {
    id: "pet-1",
    name: "Luna",
    species: "dog",
    breed: "Golden Retriever",
    dateOfBirth: "2020-03-15",
    weight: 65,
    weightUnit: "lbs",
    color: "Golden",
    microchipId: "985141404567890",
    profileImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&crop=face",
    isServiceAnimal: true,
    serviceAnimalType: "psychiatric",
    owner: currentOwner,
    vaccinations: [
      {
        id: "vax-1",
        name: "Rabies",
        dateAdministered: "2024-01-15",
        expirationDate: "2027-01-15",
        veterinarian: "Dr. Emily Chen",
        clinic: "Paws & Claws Veterinary",
        lotNumber: "RAB-2024-1234",
        status: "current",
      },
      {
        id: "vax-2",
        name: "DHPP (Distemper, Hepatitis, Parainfluenza, Parvovirus)",
        dateAdministered: "2024-01-15",
        expirationDate: "2025-01-15",
        veterinarian: "Dr. Emily Chen",
        clinic: "Paws & Claws Veterinary",
        lotNumber: "DHPP-2024-5678",
        status: "current",
      },
      {
        id: "vax-3",
        name: "Bordetella",
        dateAdministered: "2024-06-01",
        expirationDate: "2025-06-01",
        veterinarian: "Dr. Emily Chen",
        clinic: "Paws & Claws Veterinary",
        lotNumber: "BOR-2024-9012",
        status: "current",
      },
      {
        id: "vax-4",
        name: "Leptospirosis",
        dateAdministered: "2023-08-20",
        expirationDate: "2024-08-20",
        veterinarian: "Dr. Emily Chen",
        clinic: "Paws & Claws Veterinary",
        lotNumber: "LEP-2023-3456",
        status: "expiring-soon",
      },
    ],
    medicalRecords: [
      {
        id: "med-1",
        type: "exam",
        title: "Annual Wellness Exam",
        date: "2024-01-15",
        provider: "Dr. Emily Chen",
        clinic: "Paws & Claws Veterinary",
        notes: "Luna is in excellent health. Weight stable, heart and lungs clear. Continue current diet and exercise routine.",
      },
      {
        id: "med-2",
        type: "prescription",
        title: "Apoquel - Allergy Management",
        date: "2024-03-10",
        provider: "Dr. Emily Chen",
        clinic: "Paws & Claws Veterinary",
        notes: "16mg daily for seasonal allergies. Refill as needed.",
      },
      {
        id: "med-3",
        type: "condition",
        title: "Mild Hip Dysplasia",
        date: "2023-06-15",
        provider: "Dr. Michael Torres",
        clinic: "Portland Veterinary Specialists",
        notes: "Mild bilateral hip dysplasia diagnosed via X-ray. Recommend joint supplements and moderate exercise.",
      },
    ],
    travelDocuments: [
      {
        id: "doc-1",
        type: "health-certificate",
        name: "USDA Health Certificate",
        issueDate: "2024-07-01",
        expirationDate: "2024-07-11",
        issuingAuthority: "USDA APHIS",
        documentNumber: "HC-2024-789012",
        status: "expired",
        destination: "United Kingdom",
      },
      {
        id: "doc-2",
        type: "rabies-titer",
        name: "Rabies Antibody Titer Test",
        issueDate: "2024-02-15",
        issuingAuthority: "Kansas State University Rabies Laboratory",
        documentNumber: "TITER-2024-456789",
        status: "valid",
      },
      {
        id: "doc-3",
        type: "microchip-registration",
        name: "ISO Microchip Registration",
        issueDate: "2020-06-01",
        issuingAuthority: "PetLink",
        documentNumber: "985141404567890",
        status: "valid",
      },
    ],
    verifications: [
      {
        id: "ver-1",
        type: "service-animal",
        status: "verified",
        verifiedBy: "American Kennel Club",
        verifiedAt: "2023-09-15",
        expiresAt: "2025-09-15",
        notes: "Psychiatric Service Dog - trained for anxiety and PTSD support",
      },
      {
        id: "ver-2",
        type: "vaccination",
        status: "verified",
        verifiedBy: "Paws & Claws Veterinary",
        verifiedAt: "2024-01-15",
        expiresAt: "2025-01-15",
      },
      {
        id: "ver-3",
        type: "health-status",
        status: "verified",
        verifiedBy: "Dr. Emily Chen",
        verifiedAt: "2024-01-15",
        expiresAt: "2024-07-15",
      },
    ],
  },
  {
    id: "pet-2",
    name: "Milo",
    species: "cat",
    breed: "Maine Coon",
    dateOfBirth: "2021-08-22",
    weight: 18,
    weightUnit: "lbs",
    color: "Brown Tabby",
    microchipId: "985141404567891",
    profileImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop&crop=face",
    isServiceAnimal: false,
    owner: currentOwner,
    vaccinations: [
      {
        id: "vax-5",
        name: "Rabies",
        dateAdministered: "2024-02-20",
        expirationDate: "2027-02-20",
        veterinarian: "Dr. Emily Chen",
        clinic: "Paws & Claws Veterinary",
        lotNumber: "RAB-2024-CAT-001",
        status: "current",
      },
      {
        id: "vax-6",
        name: "FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)",
        dateAdministered: "2024-02-20",
        expirationDate: "2025-02-20",
        veterinarian: "Dr. Emily Chen",
        clinic: "Paws & Claws Veterinary",
        lotNumber: "FVRCP-2024-002",
        status: "current",
      },
    ],
    medicalRecords: [
      {
        id: "med-4",
        type: "exam",
        title: "Annual Wellness Exam",
        date: "2024-02-20",
        provider: "Dr. Emily Chen",
        clinic: "Paws & Claws Veterinary",
        notes: "Milo is healthy. Dental cleaning recommended within next 6 months.",
      },
      {
        id: "med-5",
        type: "surgery",
        title: "Neutering",
        date: "2022-02-15",
        provider: "Dr. Emily Chen",
        clinic: "Paws & Claws Veterinary",
        notes: "Routine neutering procedure. No complications. Full recovery.",
      },
    ],
    travelDocuments: [],
    verifications: [
      {
        id: "ver-4",
        type: "vaccination",
        status: "verified",
        verifiedBy: "Paws & Claws Veterinary",
        verifiedAt: "2024-02-20",
        expiresAt: "2025-02-20",
      },
    ],
  },
]

// Social Feed Posts
export const feedPosts: FeedPost[] = [
  {
    id: "post-1",
    petId: "pet-1",
    petName: "Luna",
    petImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop&crop=face",
    ownerName: "Sarah M.",
    type: "achievement",
    content: "Luna just completed her annual wellness exam with flying colors! So proud of my healthy girl.",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop",
    timestamp: "2024-01-15T14:30:00Z",
    likes: 24,
    comments: [
      {
        id: "comment-1",
        authorName: "Mike R.",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        content: "What a good girl! Luna always looks so happy.",
        timestamp: "2024-01-15T15:00:00Z",
      },
      {
        id: "comment-2",
        authorName: "Jennifer L.",
        authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        content: "Congrats Luna! Keep up the healthy lifestyle!",
        timestamp: "2024-01-15T16:30:00Z",
      },
    ],
    isLiked: false,
  },
  {
    id: "post-2",
    petId: "pet-3",
    petName: "Max",
    petImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&h=100&fit=crop&crop=face",
    ownerName: "David K.",
    type: "travel",
    content: "Max and I are off to London! First international trip together. All documents verified and ready to go!",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop",
    timestamp: "2024-01-14T09:00:00Z",
    likes: 56,
    comments: [
      {
        id: "comment-3",
        authorName: "Sarah M.",
        authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
        content: "Safe travels! How exciting for Max!",
        timestamp: "2024-01-14T10:15:00Z",
      },
    ],
    isLiked: true,
  },
  {
    id: "post-3",
    petId: "pet-2",
    petName: "Milo",
    petImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=100&h=100&fit=crop&crop=face",
    ownerName: "Sarah M.",
    type: "milestone",
    content: "Happy 3rd Birthday to my fluffy prince Milo! 3 years of purrs and cuddles.",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&h=400&fit=crop",
    timestamp: "2024-08-22T12:00:00Z",
    likes: 89,
    comments: [],
    isLiked: false,
  },
  {
    id: "post-4",
    petId: "pet-1",
    petName: "Luna",
    petImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop&crop=face",
    ownerName: "Sarah M.",
    type: "health-update",
    content: "Luna completed her service dog recertification today! She passed all her public access tests with ease.",
    timestamp: "2024-01-10T16:45:00Z",
    likes: 112,
    comments: [
      {
        id: "comment-4",
        authorName: "Emily T.",
        authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
        content: "Luna is such an amazing service dog. You must be so proud!",
        timestamp: "2024-01-10T17:30:00Z",
      },
      {
        id: "comment-5",
        authorName: "Chris P.",
        authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
        content: "Congratulations! What a smart pup!",
        timestamp: "2024-01-10T18:00:00Z",
      },
      {
        id: "comment-6",
        authorName: "Amanda W.",
        authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
        content: "She deserves all the treats today!",
        timestamp: "2024-01-10T19:15:00Z",
      },
    ],
    isLiked: true,
  },
]

// Notifications
export const notifications: Notification[] = [
  {
    id: "notif-1",
    type: "vaccination",
    title: "Vaccination Expiring Soon",
    message: "Luna's Leptospirosis vaccination expires on August 20, 2024. Schedule an appointment soon.",
    timestamp: "2024-08-01T09:00:00Z",
    isRead: false,
    actionUrl: "/pets/pet-1/medical",
  },
  {
    id: "notif-2",
    type: "verification",
    title: "Health Verification Expiring",
    message: "Luna's health status verification expires on July 15, 2024. Request a new verification.",
    timestamp: "2024-07-01T09:00:00Z",
    isRead: false,
    actionUrl: "/pets/pet-1/verifications",
  },
  {
    id: "notif-3",
    type: "social",
    title: "New Comment",
    message: "Mike R. commented on your post about Luna's wellness exam.",
    timestamp: "2024-01-15T15:00:00Z",
    isRead: true,
    actionUrl: "/feed",
  },
  {
    id: "notif-4",
    type: "travel",
    title: "Health Certificate Expired",
    message: "Luna's USDA Health Certificate for UK travel has expired. Request a new certificate if traveling again.",
    timestamp: "2024-07-12T09:00:00Z",
    isRead: true,
    actionUrl: "/pets/pet-1/travel",
  },
]

// Airlines that partner with PawPass
export const partnerAirlines = [
  { id: "airline-1", name: "United Airlines", logo: "/airlines/united.svg" },
  { id: "airline-2", name: "Delta Air Lines", logo: "/airlines/delta.svg" },
  { id: "airline-3", name: "American Airlines", logo: "/airlines/american.svg" },
  { id: "airline-4", name: "Southwest Airlines", logo: "/airlines/southwest.svg" },
  { id: "airline-5", name: "JetBlue Airways", logo: "/airlines/jetblue.svg" },
]

// Country requirements for pet travel
export const countryRequirements = [
  {
    country: "United Kingdom",
    requirements: [
      "ISO 15-digit microchip",
      "Rabies vaccination (at least 21 days before travel)",
      "Rabies antibody titer test (for certain countries)",
      "Tapeworm treatment (1-5 days before entry)",
      "Pet passport or third-country official veterinary certificate",
    ],
    processingTime: "4-6 months",
    notes: "UK has strict requirements. Start process early.",
  },
  {
    country: "European Union",
    requirements: [
      "ISO 15-digit microchip",
      "Rabies vaccination",
      "EU Pet Passport (from EU vet) or EU health certificate",
      "Tapeworm treatment (for dogs entering UK, Ireland, Finland, Malta, Norway)",
    ],
    processingTime: "3-4 months",
    notes: "Requirements vary slightly by country. Check specific destination.",
  },
  {
    country: "Japan",
    requirements: [
      "ISO 15-digit microchip",
      "Two rabies vaccinations (more than 30 days apart)",
      "Rabies antibody titer test (180-day wait after test)",
      "Health certificate within 10 days of travel",
      "Import permit (advance notification)",
    ],
    processingTime: "7-8 months minimum",
    notes: "Japan has one of the longest waiting periods. Plan well in advance.",
  },
  {
    country: "Canada",
    requirements: [
      "Rabies vaccination certificate (if over 3 months old)",
      "Health certificate (recommended)",
    ],
    processingTime: "1-2 weeks",
    notes: "Relatively simple requirements for dogs and cats from the US.",
  },
]

// Quick stats for dashboard
export const dashboardStats = {
  totalPets: 2,
  upcomingAppointments: 1,
  pendingVerifications: 0,
  expiringDocuments: 2,
  travelReadyPets: 1,
}
