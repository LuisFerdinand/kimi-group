// Path: app/blog/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, MessageCircle, Heart } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Technology in Business",
      excerpt: "Exploring how emerging technologies are reshaping the business landscape and what companies need to do to stay competitive.",
      date: "May 15, 2023",
      author: "John Doe",
      likes: 42,
      comments: 8,
      category: "Technology",
    },
    {
      id: 2,
      title: "Sustainable Practices in Modern Logistics",
      excerpt: "How the logistics industry is adopting sustainable practices to reduce environmental impact while improving efficiency.",
      date: "April 28, 2023",
      author: "Jane Smith",
      likes: 36,
      comments: 5,
      category: "Logistics",
    },
    {
      id: 3,
      title: "Financial Planning for Small Businesses",
      excerpt: "Essential financial strategies that small businesses should implement to ensure long-term growth and stability.",
      date: "April 10, 2023",
      author: "Robert Johnson",
      likes: 28,
      comments: 12,
      category: "Finance",
    },
    {
      id: 4,
      title: "Innovations in Healthcare Technology",
      excerpt: "Recent advancements in healthcare technology that are improving patient outcomes and transforming medical practices.",
      date: "March 22, 2023",
      author: "Dr. Emily Chen",
      likes: 51,
      comments: 15,
      category: "Healthcare",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-linear-to-r from-(--color-gold-200) via-(--color-gold-400) to-(--color-gold-200) bg-clip-text text-transparent animate-linear">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, news, and updates from KIMI GROUP and our brands
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="border-gold-900/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-900/20 text-gold-400">
                        {post.category}
                      </span>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        {post.date}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription className="mt-2">{post.excerpt}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="mr-1 h-4 w-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Heart className="mr-1 h-4 w-4" />
                      {post.likes}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MessageCircle className="mr-1 h-4 w-4" />
                      {post.comments}
                    </div>
                  </div>
                </div>
                <Button asChild className="w-full mt-4 bg-gold-600 hover:bg-gold-700">
                  <Link href={`/blog/${post.id}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="bg-gold-900/10 hover:bg-gold-900/20">
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
}