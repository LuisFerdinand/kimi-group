// scripts/seed.ts
import dotenv from 'dotenv';
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { 
  users, 
  userRoles, 
  blogPosts, 
  blogCategories, 
  blogPostCategories,
  blogComments,
  blogPostLikes,
  blogPostViews
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  console.log("Seeding database...");

  try {
    // Create or get admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    await db.insert(users).values({
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      role: userRoles.ADMIN,
    }).onConflictDoNothing();
    
    const [adminUser] = await db.select().from(users).where(eq(users.email, "admin@example.com"));

    // Create or get editor user
    const editorPassword = await bcrypt.hash("editor123", 10);
    await db.insert(users).values({
      name: "Editor User",
      email: "editor@example.com",
      password: editorPassword,
      role: userRoles.EDITOR,
    }).onConflictDoNothing();
    
    const [editorUser] = await db.select().from(users).where(eq(users.email, "editor@example.com"));

    // Create or get contributor user
    const contributorPassword = await bcrypt.hash("contributor123", 10);
    await db.insert(users).values({
      name: "Contributor User",
      email: "contributor@example.com",
      password: contributorPassword,
      role: userRoles.CONTRIBUTOR,
    }).onConflictDoNothing();
    
    const [contributorUser] = await db.select().from(users).where(eq(users.email, "contributor@example.com"));

    // Create or get regular user
    const readerPassword = await bcrypt.hash("reader123", 10);
    await db.insert(users).values({
      name: "Reader User",
      email: "reader@example.com",
      password: readerPassword,
      role: userRoles.READER,
    }).onConflictDoNothing();
    
    const [readerUser] = await db.select().from(users).where(eq(users.email, "reader@example.com"));

    // Create or get blog categories
    await db.insert(blogCategories).values({
      name: "Technology",
      slug: "technology",
      description: "Posts about technology trends, innovations, and news",
    }).onConflictDoNothing();
    
    const [techCategory] = await db.select().from(blogCategories).where(eq(blogCategories.slug, "technology"));

    await db.insert(blogCategories).values({
      name: "Design",
      slug: "design",
      description: "Design principles, UI/UX, and visual arts",
    }).onConflictDoNothing();
    
    const [designCategory] = await db.select().from(blogCategories).where(eq(blogCategories.slug, "design"));

    await db.insert(blogCategories).values({
      name: "Business",
      slug: "business",
      description: "Business strategies, entrepreneurship, and market insights",
    }).onConflictDoNothing();
    
    const [businessCategory] = await db.select().from(blogCategories).where(eq(blogCategories.slug, "business"));

    // Create blog posts
    const posts = [
      {
        title: "The Future of Web Development",
        slug: "future-of-web-development",
        excerpt: "Exploring emerging trends and technologies shaping the future of web development.",
        content: `
          <h2>The Evolving Landscape of Web Development</h2>
          <p>Web development has come a long way since the early days of static HTML pages. Today's web applications are complex, interactive, and capable of delivering experiences that rival native applications.</p>
          
          <h3>Key Trends to Watch</h3>
          <ul>
            <li><strong>JAMstack Architecture:</strong> JavaScript, APIs, and Markup are redefining how we build web applications.</li>
            <li><strong>WebAssembly:</strong> Bringing near-native performance to web applications.</li>
            <li><strong>AI Integration:</strong> Leveraging machine learning directly in the browser.</li>
            <li><strong>Edge Computing:</strong> Moving computation closer to the user for faster experiences.</li>
          </ul>
          
          <h3>The Rise of Frameworks</h3>
          <p>Modern frameworks like React, Vue, and Angular continue to evolve, offering developers powerful tools to build complex applications. The ecosystem around these frameworks, including state management solutions and component libraries, has matured significantly.</p>
          
          <h3>Looking Ahead</h3>
          <p>As we look to the future, we can expect web development to become even more specialized, with clear distinctions between frontend, backend, and full-stack roles. The tools will continue to improve, making development more efficient while enabling increasingly sophisticated applications.</p>
        `,
        featuredImage: "https://picsum.photos/seed/webdev/1200/800.jpg",
        featured: true,
        authorId: adminUser.id,
        readTime: 5,
        publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      },
      {
        title: "Design Systems: Building Consistent User Experiences",
        slug: "design-systems-consistency",
        excerpt: "How design systems help teams create consistent and scalable user interfaces.",
        content: `
          <h2>What is a Design System?</h2>
          <p>A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications. It's not just a UI kit or a style guide—it's a complete ecosystem that includes design principles, development guidelines, and documentation.</p>
          
          <h3>Benefits of Design Systems</h3>
          <ul>
            <li><strong>Consistency:</strong> Ensures a cohesive experience across all products and platforms</li>
            <li><strong>Efficiency:</strong> Speeds up both design and development processes</li>
            <li><strong>Scalability:</strong> Makes it easier to maintain and expand products</li>
            <li><strong>Collaboration:</strong> Improves communication between designers and developers</li>
          </ul>
          
          <h3>Key Components</h3>
          <p>A comprehensive design system typically includes:</p>
          <ul>
            <li>Visual design language (colors, typography, spacing)</li>
            <li>Component library (buttons, forms, navigation, etc.)</li>
            <li>Pattern library (common solutions to design problems)</li>
            <li>Documentation and guidelines</li>
            <li>Design and development tools</li>
          </ul>
          
          <h3>Getting Started</h3>
          <p>Building a design system is a significant investment, but the long-term benefits are substantial. Start small, focus on your most common use cases, and gradually expand the system based on your team's needs.</p>
        `,
        featuredImage: "https://picsum.photos/seed/design/1200/800.jpg",
        featured: false,
        authorId: editorUser.id,
        readTime: 7,
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      },
      {
        title: "Remote Work: The New Normal",
        slug: "remote-work-new-normal",
        excerpt: "How remote work is reshaping company culture and productivity.",
        content: `
          <h2>The Shift to Remote Work</h2>
          <p>The global pandemic accelerated the adoption of remote work, transforming it from a perk to a necessity. Now, as we move forward, remote work has become the new normal for many companies and industries.</p>
          
          <h3>Benefits of Remote Work</h3>
          <ul>
            <li><strong>Flexibility:</strong> Employees enjoy better work-life balance</li>
            <li><strong>Talent Pool:</strong> Companies can hire from anywhere in the world</li>
            <li><strong>Cost Savings:</strong> Reduced overhead for office space and utilities</li>
            <li><strong>Productivity:</strong> Many employees report higher productivity when working remotely</li>
          </ul>
          
          <h3>Challenges to Overcome</h3>
          <p>While remote work offers many benefits, it's not without challenges:</p>
          <ul>
            <li>Maintaining company culture and team cohesion</li>
            <li>Ensuring effective communication and collaboration</li>
            <li>Providing adequate technical support and resources</li>
            <li>Managing performance and accountability</li>
          </ul>
          
          <h3>Best Practices for Remote Teams</h3>
          <p>To succeed with remote work, companies should:</p>
          <ul>
            <li>Invest in reliable collaboration tools</li>
            <li>Establish clear communication guidelines</li>
            <li>Regularly check in with team members</li>
            <li>Create opportunities for social interaction</li>
            <li>Trust employees and focus on results</li>
          </ul>
        `,
        featuredImage: "https://picsum.photos/seed/remote/1200/800.jpg",
        featured: true,
        authorId: contributorUser.id,
        readTime: 6,
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      },
      {
        title: "AI in Business: Opportunities and Challenges",
        slug: "ai-business-opportunities-challenges",
        excerpt: "Exploring how artificial intelligence is transforming business operations and strategy.",
        content: `
          <h2>The AI Revolution in Business</h2>
          <p>Artificial intelligence is no longer just a buzzword—it's a transformative technology that's reshaping how businesses operate, make decisions, and serve customers.</p>
          
          <h3>Key Applications</h3>
          <ul>
            <li><strong>Customer Service:</strong> AI-powered chatbots and virtual assistants</li>
            <li><strong>Predictive Analytics:</strong> Forecasting trends and customer behavior</li>
            <li><strong>Process Automation:</strong> Streamlining repetitive tasks</li>
            <li><strong>Personalization:</strong> Customizing products and services</li>
          </ul>
          
          <h3>Implementation Challenges</h3>
          <p>Despite the potential benefits, businesses face several challenges when implementing AI:</p>
          <ul>
            <li>Data quality and availability</li>
            <li>Talent shortage and skills gap</li>
            <li>Ethical considerations and bias</li>
            <li>Integration with existing systems</li>
          </ul>
          
          <h3>Success Factors</h3>
          <p>Successful AI implementation requires:</p>
          <ul>
            <li>Clear business objectives</li>
            <li>Executive support and investment</li>
            <li>Phased approach with quick wins</li>
            <li>Continuous monitoring and improvement</li>
          </ul>
        `,
        featuredImage: "https://picsum.photos/seed/aibusiness/1200/800.jpg",
        featured: false,
        authorId: adminUser.id,
        readTime: 8,
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
      {
        title: "Cybersecurity Best Practices for 2023",
        slug: "cybersecurity-best-practices-2023",
        excerpt: "Essential security measures every business should implement to protect against cyber threats.",
        content: `
          <h2>The Growing Importance of Cybersecurity</h2>
          <p>As businesses increasingly rely on digital infrastructure, cybersecurity has become a critical concern. Cyber attacks are becoming more sophisticated, and the consequences of a breach can be devastating.</p>
          
          <h3>Essential Security Measures</h3>
          <ul>
            <li><strong>Multi-Factor Authentication:</strong> Add an extra layer of security to all accounts</li>
            <li><strong>Regular Updates:</strong> Keep all software and systems up to date</li>
            <li><strong>Employee Training:</strong> Educate staff about security best practices</li>
            <li><strong>Data Encryption:</strong> Protect sensitive information both in transit and at rest</li>
          </ul>
          
          <h3>Incident Response Planning</h3>
          <p>Every business should have an incident response plan that includes:</p>
          <ul>
            <li>Clear roles and responsibilities</li>
            <li>Communication protocols</li>
            <li>Recovery procedures</li>
            <li>Post-incident analysis</li>
          </ul>
          
          <h3>Staying Ahead of Threats</h3>
          <p>Cybersecurity is an ongoing process. Stay informed about:</p>
          <ul>
            <li>Emerging threats and vulnerabilities</li>
            <li>New security technologies and solutions</li>
            <li>Regulatory requirements and compliance</li>
            <li>Industry best practices</li>
          </ul>
        `,
        featuredImage: "https://picsum.photos/seed/security/1200/800.jpg",
        featured: true,
        authorId: editorUser.id,
        readTime: 6,
        publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      }
    ];

    // Insert posts and assign categories
    for (const postData of posts) {
      // Check if post already exists
      const existingPost = await db.select().from(blogPosts).where(eq(blogPosts.slug, postData.slug));
      
      if (existingPost.length === 0) {
        const [newPost] = await db.insert(blogPosts).values(postData).returning();
        
        // Assign categories to posts
        if (postData.slug === "future-of-web-development") {
          await db.insert(blogPostCategories).values([
            { postId: newPost.id, categoryId: techCategory.id },
            { postId: newPost.id, categoryId: designCategory.id }
          ]);
        } else if (postData.slug === "design-systems-consistency") {
          await db.insert(blogPostCategories).values([
            { postId: newPost.id, categoryId: designCategory.id },
            { postId: newPost.id, categoryId: techCategory.id }
          ]);
        } else if (postData.slug === "remote-work-new-normal") {
          await db.insert(blogPostCategories).values([
            { postId: newPost.id, categoryId: businessCategory.id }
          ]);
        } else if (postData.slug === "ai-business-opportunities-challenges") {
          await db.insert(blogPostCategories).values([
            { postId: newPost.id, categoryId: businessCategory.id },
            { postId: newPost.id, categoryId: techCategory.id }
          ]);
        } else if (postData.slug === "cybersecurity-best-practices-2023") {
          await db.insert(blogPostCategories).values([
            { postId: newPost.id, categoryId: techCategory.id },
            { postId: newPost.id, categoryId: businessCategory.id }
          ]);
        }
      }
    }

    // Get all posts
    const createdPosts = await db.select().from(blogPosts);
    
    // Add some sample comments
    for (const post of createdPosts.slice(0, 3)) {
      // Check if comments already exist
      const existingComments = await db.select().from(blogComments).where(eq(blogComments.postId, post.id));
      
      if (existingComments.length === 0) {
        await db.insert(blogComments).values([
          {
            postId: post.id,
            authorId: readerUser.id,
            content: "Great article! This was really helpful and informative."
          },
          {
            postId: post.id,
            authorId: contributorUser.id,
            content: "Thanks for sharing. I learned something new today."
          }
        ]);
      }
    }

    // Add some likes and views
    for (const post of createdPosts) {
      // Check if likes already exist
      const existingLikes = await db.select().from(blogPostLikes).where(eq(blogPostLikes.postId, post.id));
      
      if (existingLikes.length === 0) {
        // Add likes from different users
        await db.insert(blogPostLikes).values([
          { postId: post.id, userId: readerUser.id },
          { postId: post.id, userId: contributorUser.id }
        ]);
      }
      
      // Check if views already exist
      const existingViews = await db.select().from(blogPostViews).where(eq(blogPostViews.postId, post.id));
      
      if (existingViews.length === 0) {
        // Add views
        await db.insert(blogPostViews).values([
          { postId: post.id, userId: readerUser.id },
          { postId: post.id, userId: contributorUser.id },
          { postId: post.id, ipAddress: "192.168.1.1" },
          { postId: post.id, ipAddress: "192.168.1.2" }
        ]);
      }
    }

    console.log("Database seeded successfully!");
    console.log("\nLogin credentials:");
    console.log("Admin: admin@example.com / admin123");
    console.log("Editor: editor@example.com / editor123");
    console.log("Contributor: contributor@example.com / contributor123");
    console.log("Reader: reader@example.com / reader123");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();