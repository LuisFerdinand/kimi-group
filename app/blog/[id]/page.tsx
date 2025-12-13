// Path: app/blog/[id]/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, MessageCircle, Heart, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the blog post based on the ID
  const blogPost = {
    id: params.id,
    title: "The Future of Technology in Business",
    content: `
      <p>Technology is rapidly transforming the business landscape, creating new opportunities and challenges for companies of all sizes. In this article, we'll explore how emerging technologies are reshaping industries and what businesses need to do to stay competitive in this rapidly evolving environment.</p>
      
      <h3>Artificial Intelligence and Machine Learning</h3>
      <p>AI and machine learning are no longer futuristic concepts but practical tools that businesses can leverage to improve efficiency, enhance customer experiences, and gain valuable insights from data. From predictive analytics to automated customer service, AI is becoming an integral part of business operations.</p>
      
      <h3>Cloud Computing</h3>
      <p>Cloud technology has revolutionized how businesses store, manage, and process data. The scalability, flexibility, and cost-effectiveness of cloud solutions make them essential for modern businesses looking to innovate and grow.</p>
      
      <h3>Internet of Things (IoT)</h3>
      <p>IoT devices are creating interconnected ecosystems that enable businesses to collect real-time data, monitor operations, and automate processes. This technology is particularly transformative in manufacturing, logistics, and healthcare industries.</p>
      
      <h3>Preparing for the Future</h3>
      <p>To stay competitive, businesses must embrace these technologies and invest in digital transformation. This includes upskilling employees, adopting agile methodologies, and fostering a culture of innovation.</p>
    `,
    date: "May 15, 2023",
    author: "John Doe",
    likes: 42,
    comments: 8,
    category: "Technology",
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>

        <Card className="border-gold-900/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-900/20 text-gold-400">
                    {blogPost.category}
                  </span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {blogPost.date}
                  </div>
                </div>
                <CardTitle className="text-2xl md:text-3xl">{blogPost.title}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="mr-1 h-4 w-4" />
                {blogPost.author}
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Heart className="mr-1 h-4 w-4" />
                  {blogPost.likes}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MessageCircle className="mr-1 h-4 w-4" />
                  {blogPost.comments}
                </div>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
            
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
            
            <div className="mt-8 pt-6 border-t border-gold-900/20">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="bg-gold-900/10 hover:bg-gold-900/20">
                  Technology
                </Button>
                <Button variant="outline" size="sm" className="bg-gold-900/10 hover:bg-gold-900/20">
                  Innovation
                </Button>
                <Button variant="outline" size="sm" className="bg-gold-900/10 hover:bg-gold-900/20">
                  Business Strategy
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6">Comments ({blogPost.comments})</h3>
          
          <div className="space-y-6">
            {[1, 2].map((comment) => (
              <Card key={comment} className="border-gold-900/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gold-900/20 flex items-center justify-center">
                      <span className="text-gold-400 font-bold">U{comment}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">User {comment}</h4>
                        <span className="text-sm text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="mt-2 text-muted-foreground">
                        This is a great article! I especially found the section on AI and machine learning very insightful. Looking forward to more content like this.
                      </p>
                      <div className="mt-4 flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                          Like
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8">
            <h4 className="font-medium mb-4">Leave a comment</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="px-4 py-2 rounded-md border border-gold-900/20 bg-background focus:outline-none focus:ring-1 focus:ring-gold-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2 rounded-md border border-gold-900/20 bg-background focus:outline-none focus:ring-1 focus:ring-gold-500"
                />
              </div>
              <textarea
                placeholder="Your comment"
                rows={4}
                className="w-full px-4 py-2 rounded-md border border-gold-900/20 bg-background focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
              <Button className="bg-gold-600 hover:bg-gold-700">Post Comment</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}