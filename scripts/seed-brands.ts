// scripts/seed-brands.ts
import dotenv from 'dotenv';
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { 
  users, 
  brandDivisions,
  brandDivisionImages
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seedBrands() {
  console.log("Seeding brand divisions...");

  try {
    // Get admin user to use as author for all brands
    const [adminUser] = await db.select().from(users).where(eq(users.email, "admin@example.com"));
    
    if (!adminUser) {
      console.error("Admin user not found. Please run the main seeder first.");
      return;
    }

    // Create brand divisions based on the provided information
    const brandDivisionsData = [
      {
        name: "Kiny Tours & Travel",
        slug: "kiny-tours",
        tagline: "Your Gateway to Global Experiences",
        description: "The tourism industry nowadays has become a primary need for society, thus it brings a great opportunity in the future.",
        fullDescription: "Kiny Tours & Travel specializes in providing exceptional travel experiences through our Inbound Division MICE (Meeting, Incentive, Convention, Exhibition), tailormade trips, private tours, reward tickets, and hotel bookings. Our extensive network ensures that every journey is memorable and enriching.",
        coverage: "167 Countries",
        delivery: "In-person Tours & Virtual Consultations",
        backgroundImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=2070&q=80",
        logo: "/brandLogo/kinyTours.png",
        color: "#3B82F6",
        stats: { 
          label1: 'Countries', 
          value1: '167', 
          label2: 'English Speaking Drivers', 
          value2: '150+', 
          label3: 'Licensed Guides', 
          value3: '80+', 
          label4: 'Partners', 
          value4: '30+' 
        },
        services: [
          { name: "MICE Services", description: "Meeting, Incentive, Convention, Exhibition planning and execution" },
          { name: "Tailormade Trips", description: "Personalized itineraries designed to match your interests" },
          { name: "Private Tours", description: "Exclusive travel experiences with dedicated guides" },
          { name: "Hotel & Flight Bookings", description: "Premium accommodation and transportation arrangements" },
        ],
        achievements: [
          "150+ English speaking drivers spread throughout 167 countries",
          "80+ English speaking guides spread throughout 149 countries",
          "A chain network of restaurants, hotels, tourist attractions and event venues on 7 continents",
          "Partnership program for more than 30 schools and other establishments in Jakarta area",
        ],
        team: [
          { name: "Andi Pratama", position: "CEO & Founder" },
          { name: "Diana Kusuma", position: "Head of International Operations" },
          { name: "Raj Patel", position: "Director of Custom Tours" },
          { name: "Maria Santos", position: "Client Relations Manager" },
        ],
        theme: {
          primary: "from-blue-600 to-blue-500",
          bg: "bg-blue-600/10",
          bgSolid: "bg-blue-600/20",
          border: "border-blue-600/30",
          text: "text-blue-600",
          accent: "bg-blue-600",
          hover: "hover:bg-blue-600/10",
          gradient: "bg-gradient-to-br from-blue-600/20 to-blue-500/20"
        },
        featured: true,
        authorId: adminUser.id,
      },
      {
        name: "Kiny Cultura",
        slug: "kiny-cultura",
        tagline: "Building Character Through Cultural Exchange",
        description: "The Education and Culture industry is currently the most important industry due to its elements that serve as the spearheads for children's progress in character building and interaction in society.",
        fullDescription: "Kiny Cultura is dedicated to fostering global citizenship through cultural exchange and education. Our programs provide children with unique opportunities to experience diverse cultures, develop leadership skills, and gain international perspectives that will shape their future.",
        coverage: "150+ Countries",
        delivery: "In-person Programs & Virtual Exchanges",
        backgroundImage: "https://images.unsplash.com/photo-1515184689810-b8b7187c6975?w=2070&q=80",
        logo: "/brandLogo/kinyCultura.png",
        color: "#8B5CF6",
        stats: { 
          label1: 'Countries', 
          value1: '150+', 
          label2: 'Schools', 
          value2: '50+', 
          label3: 'Students', 
          value3: '1500+', 
          label4: 'Festivals', 
          value4: '100+' 
        },
        services: [
          { name: "School Immersion Program", description: "Cultural exchange programs for students to experience different education systems" },
          { name: "Cross Culture Program", description: "Interactive workshops celebrating diversity and global citizenship" },
          { name: "International Dance Competition", description: "Showcasing traditional and contemporary dance forms from around the world" },
          { name: "Leadership Program", description: "Developing young leaders with global perspectives and cultural awareness" },
        ],
        achievements: [
          "Certificates valid in 150 countries",
          "Cooperation with foreign and domestic governments",
          "Certificate recognized in Indonesia",
          "Collaboration with more than 50 schools in Indonesia",
        ],
        team: [
          { name: "Dr. Anisa Rahman", position: "Director of Cultural Programs" },
          { name: "Budi Santoso", position: "Head of Educational Partnerships" },
          { name: "Sarah Wijaya", position: "International Relations Coordinator" },
          { name: "Ahmad Fadli", position: "Program Development Manager" },
        ],
        theme: {
          primary: "from-purple-600 to-purple-500",
          bg: "bg-purple-600/10",
          bgSolid: "bg-purple-600/20",
          border: "border-purple-600/30",
          text: "text-purple-600",
          accent: "bg-purple-600",
          hover: "hover:bg-purple-600/10",
          gradient: "bg-gradient-to-br from-purple-600/20 to-purple-500/20"
        },
        featured: true,
        authorId: adminUser.id,
      },
      {
        name: "Kiny Xplore",
        slug: "kiny-xplore",
        tagline: "Empowering Athletes Through Global Sports",
        description: "Facilitating competitions abroad, providing skill enhancement training, creating networking opportunities, and promoting international collaboration in sports development.",
        fullDescription: "Kiny Xplore is dedicated to advancing athletic development through international exposure and training. We connect athletes with world-class coaches, competitions, and training facilities around the globe, creating opportunities for growth and excellence in sports.",
        coverage: "International",
        delivery: "Training Camps & Competitions",
        backgroundImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=2070&q=80",
        logo: "/brandLogo/kinyXplore.png",
        color: "#10B981",
        stats: { 
          label1: 'Countries', 
          value1: '50+', 
          label2: 'Sports Clubs', 
          value2: '50+', 
          label3: 'Coaches', 
          value3: '30+', 
          label4: 'Athletes', 
          value4: '1000+' 
        },
        services: [
          { name: "International Competitions", description: "Organizing participation in global sporting events" },
          { name: "Skill Enhancement Training", description: "Specialized training programs with expert coaches" },
          { name: "Sports Clinics", description: "Workshops focused on specific skills and techniques" },
          { name: "Cross-Cultural Exchange", description: "Programs that combine sports with cultural experiences" },
        ],
        achievements: [
          "Collaboration with more than 50 sports clubs worldwide",
          "World-Class Coaches from various sporting disciplines",
          "Tailored Training Programs for individual athletes and teams",
          "Successful hosting of international sports events",
        ],
        team: [
          { name: "Rizki Ahmad", position: "Director of Sports Development" },
          { name: "Lena Chen", position: "Head of International Relations" },
          { name: "Michael Johnson", position: "Elite Training Coordinator" },
          { name: "Sofia Rodriguez", position: "Events Manager" },
        ],
        theme: {
          primary: "from-emerald-600 to-emerald-500",
          bg: "bg-emerald-600/10",
          bgSolid: "bg-emerald-600/20",
          border: "border-emerald-600/30",
          text: "text-emerald-600",
          accent: "bg-emerald-600",
          hover: "hover:bg-emerald-600/10",
          gradient: "bg-gradient-to-br from-emerald-600/20 to-emerald-500/20"
        },
        featured: true,
        authorId: adminUser.id,
      },
      {
        name: "Kinergy Project",
        slug: "kinergy-project",
        tagline: "Dream Beyond Limit",
        description: "A visionary initiative that specializes in delivering high-impact experiences through MICE, International Events & Cultural Programs, Global Branding & Activation Campaigns, and Creative Collaborations.",
        fullDescription: "Kinergy Project is the creative powerhouse of Kiny Group, turning imagination into action. Our reach spans nationwide and international coverage, connecting communities, brands, and ideas with bold execution and cultural resonance.",
        coverage: "Global",
        delivery: "Events & Brand Activations",
        backgroundImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=2070&q=80",
        logo: "/brandLogo/kinergyProject.png",
        color: "#F59E0B",
        stats: { 
          label1: 'Events', 
          value1: '200+', 
          label2: 'Countries', 
          value2: '50+', 
          label3: 'Brands', 
          value3: '100+', 
          label4: 'Attendees', 
          value4: '50000+' 
        },
        services: [
          { name: "MICE Services", description: "Meetings, Incentives, Conferences, and Exhibitions" },
          { name: "International Events", description: "Large-scale cultural and entertainment programs" },
          { name: "Global Branding", description: "Brand activation campaigns with international reach" },
          { name: "Creative Collaborations", description: "Partnerships across Indonesia and the world" },
        ],
        achievements: [
          "Successfully executed events across 7 continents",
          "Innovative brand activations for Fortune 500 companies",
          "Award-winning cultural exchange programs",
          "Pioneering virtual and hybrid event experiences",
        ],
        team: [
          { name: "Kevin Wijaya", position: "Creative Director" },
          { name: "Natasha Lee", position: "Head of Global Partnerships" },
          { name: "Carlos Mendez", position: "Events Production Lead" },
          { name: "Priya Sharma", position: "Brand Strategy Director" },
        ],
        theme: {
          primary: "from-amber-600 to-amber-500",
          bg: "bg-amber-600/10",
          bgSolid: "bg-amber-600/20",
          border: "border-amber-600/30",
          text: "text-amber-600",
          accent: "bg-amber-600",
          hover: "hover:bg-amber-600/10",
          gradient: "bg-gradient-to-br from-amber-600/20 to-amber-500/20"
        },
        featured: true,
        authorId: adminUser.id,
      },
      {
        name: "Kiny & Soul",
        slug: "kiny-soul",
        tagline: "JADWALNYA ALLAH, BUKAN TRAVEL AGENT",
        description: "A private spiritual travel service focusing on individually tailored Umrah trips with flexible departure dates based on your readiness, not rigid tour schedules.",
        fullDescription: "Kiny and Soul is a private spiritual travel service that honors your personal journey. Unlike conventional travel services, we don't operate on fixed departure dates. We believe your true journey begins when your heart is called.",
        coverage: "Saudi Arabia & Holy Sites",
        delivery: "Spiritual Journeys",
        backgroundImage: "https://images.unsplash.com/photo-1599096567412-5273a024a6c3?w=2070&q=80",
        logo: "/brandLogo/kinySoul.png",
        color: "#0EA5E9",
        stats: { 
          label1: 'Pilgrims', 
          value1: '500+', 
          label2: 'Tours', 
          value2: '100+', 
          label3: 'Guides', 
          value3: '20+', 
          label4: 'Satisfaction', 
          value4: '99%' 
        },
        services: [
          { name: "Private Umrah Trips", description: "Individually tailored spiritual journeys" },
          { name: "Flexible Departure Dates", description: "Travel when your heart is ready" },
          { name: "Personalized Itineraries", description: "Custom spiritual experiences" },
          { name: "Premium Assistance", description: "End-to-end support from pre-departure to return" },
        ],
        achievements: [
          "Personalized spiritual journeys for over 500 pilgrims",
          "Flexible scheduling that respects individual readiness",
          "Expert guides with deep knowledge of holy sites",
          "Premium services that enhance the spiritual experience",
        ],
        team: [
          { name: "Ahmad Yani", position: "Spiritual Journey Director" },
          { name: "Fatima Al-Rashid", position: "Head of Pilgrim Services" },
          { name: "Omar Hassan", position: "Spiritual Guide Coordinator" },
          { name: "Aisha Binti", position: "Customer Experience Lead" },
        ],
        theme: {
          primary: "from-sky-600 to-sky-500",
          bg: "bg-sky-600/10",
          bgSolid: "bg-sky-600/20",
          border: "border-sky-600/30",
          text: "text-sky-600",
          accent: "bg-sky-600",
          hover: "hover:bg-sky-600/10",
          gradient: "bg-gradient-to-br from-sky-600/20 to-sky-500/20"
        },
        featured: true,
        authorId: adminUser.id,
      },
      {
        name: "Kiny Education & Training",
        slug: "kiny-education",
        tagline: "Empowering Through Knowledge",
        description: "Professional development courses, specialized workshops, seminars, and accredited certification programs tailored to your needs.",
        fullDescription: "Kiny Education & Training offers comprehensive learning solutions designed to enhance professional skills and knowledge. Our programs are tailored to meet the specific needs of organizations and individuals across various sectors.",
        coverage: "Indonesia & International",
        delivery: "In-person, Online & Blended Learning",
        backgroundImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=2070&q=80",
        logo: "/brandLogo/kinyEducation.png",
        color: "#EF4444",
        stats: { 
          label1: 'Courses', 
          value1: '100+', 
          label2: 'Instructors', 
          value2: '50+', 
          label3: 'Students', 
          value3: '5000+', 
          label4: 'Certifications', 
          value4: '30+' 
        },
        services: [
          { name: "Professional Development Courses", description: "Comprehensive courses for career advancement" },
          { name: "Specialized Training", description: "Custom programs for administrations, finances, policy, and more" },
          { name: "Workshops and Seminars", description: "Interactive sessions on current governance and regulatory issues" },
          { name: "Certifications and Diplomas", description: "Accredited programs providing recognized credentials" },
        ],
        achievements: [
          "Accredited programs recognized across multiple industries",
          "Expert instructors with real-world experience",
          "Flexible learning options to suit diverse needs",
          "Successful placement of certified professionals",
        ],
        team: [
          { name: "Dr. Siti Nurhaliza", position: "Director of Education" },
          { name: "Prof. Bambang Sutrisno", position: "Head of Academic Programs" },
          { name: "Dr. Rahmat Wijaya", position: "Certification Coordinator" },
          { name: "Dewi Lestari", position: "Learning Experience Designer" },
        ],
        theme: {
          primary: "from-red-600 to-red-500",
          bg: "bg-red-600/10",
          bgSolid: "bg-red-600/20",
          border: "border-red-600/30",
          text: "text-red-600",
          accent: "bg-red-600",
          hover: "hover:bg-red-600/10",
          gradient: "bg-gradient-to-br from-red-600/20 to-red-500/20"
        },
        featured: true,
        authorId: adminUser.id,
      }
    ];

    // Insert brand divisions
    for (const brandData of brandDivisionsData) {
      // Check if brand already exists
      const existingBrand = await db.select().from(brandDivisions).where(eq(brandDivisions.slug, brandData.slug));
      
      if (existingBrand.length === 0) {
        const [newBrand] = await db.insert(brandDivisions).values(brandData).returning();
        
        // Add sample images for each brand
        const sampleImages = [
          {
            brandDivisionId: newBrand.id,
            imageUrl: `https://picsum.photos/seed/${brandData.slug}-1/800/600.jpg`,
            caption: `${brandData.name} - Image 1`,
            altText: `Image for ${brandData.name}`,
            order: 0
          },
          {
            brandDivisionId: newBrand.id,
            imageUrl: `https://picsum.photos/seed/${brandData.slug}-2/800/600.jpg`,
            caption: `${brandData.name} - Image 2`,
            altText: `Image for ${brandData.name}`,
            order: 1
          },
          {
            brandDivisionId: newBrand.id,
            imageUrl: `https://picsum.photos/seed/${brandData.slug}-3/800/600.jpg`,
            caption: `${brandData.name} - Image 3`,
            altText: `Image for ${brandData.name}`,
            order: 2
          }
        ];
        
        await db.insert(brandDivisionImages).values(sampleImages);
        console.log(`Created brand: ${brandData.name}`);
      } else {
        console.log(`Brand already exists: ${brandData.name}`);
      }
    }

    console.log("Brand divisions seeded successfully!");
  } catch (error) {
    console.error("Error seeding brand divisions:", error);
  }
}

seedBrands();