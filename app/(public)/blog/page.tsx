// app/(public)/blog/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, User, MessageCircle, Heart, Search, Filter, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/pages/PageHeader";
import { useTheme } from "next-themes";

// Define TypeScript interfaces
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  authorId?: string;
  authorImage?: string;
  likes: number;
  comments: number;
  category: string;
  readTime: string;
  featured: boolean;
  imageUrl: string;
  views?: number;
}

interface Category {
  name: string;
  slug: string;
  count: number;
}

export default function BlogPage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visiblePosts, setVisiblePosts] = useState<number>(6);

  // useEffect to handle component mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch blog posts from your API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add a timestamp to prevent caching
        const timestamp = Date.now();
        
        // Fetch all blog posts
        const postsResponse = await fetch(`/api/blog?t=${timestamp}`);
        
        if (!postsResponse.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        const postsData = await postsResponse.json();
        setBlogPosts(postsData);
        setFilteredPosts(postsData);
        
        // Fetch featured posts
        const featuredResponse = await fetch(`/api/blog/featured?t=${timestamp}`);
        
        if (featuredResponse.ok) {
          const featuredData = await featuredResponse.json();
          setFeaturedPosts(featuredData);
        }
        
        // Fetch categories
        const categoriesResponse = await fetch(`/api/blog/categories?t=${timestamp}`);
        
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData);
        }
        
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Gagal memuat artikel. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPosts();
  }, []);

  // Filter posts based on category and search query
  useEffect(() => {
    let result: BlogPost[] = [...blogPosts];
    
    if (selectedCategory !== "Semua") {
      result = result.filter(post => post.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        post => 
          post.title.toLowerCase().includes(query) || 
          post.excerpt.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredPosts(result);
    setVisiblePosts(6); // Reset visible posts when filters change
  }, [selectedCategory, searchQuery, blogPosts]);

  const loadMorePosts = () => {
    setVisiblePosts(prev => prev + 3);
  };

  const postsToShow: BlogPost[] = filteredPosts.slice(0, visiblePosts);

  // Determine the actual theme
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = mounted && currentTheme === 'dark';

  // Function to add cache-busting to image URLs
  const getCacheBustedUrl = (url: string) => {
    if (!url) return url;
    
    // If it's an external URL (Cloudinary), add a timestamp
    if (url.startsWith('http')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}t=${Date.now()}`;
    }
    
    return url;
  };

  return (
    <div className={`min-h-screen px-4 py-12 md:py-24 max-w-7xl mx-auto`}>
      {/* Hero Section */}
      <PageHeader 
        title="Berita & Artikel"
        description="Tetap terupdate dengan tren terbaru dan wawasan dalam industri"
        emphasizedWord="wawasan"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Featured Posts */}
        {!loading && featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>Artikel Unggulan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map(post => (
                <Card key={`featured-${post.id}`} className={`overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="relative h-64">
                    <Image 
                      src={getCacheBustedUrl(post.imageUrl)} 
                      alt={post.title}
                      fill
                      className="object-cover"
                      unoptimized // Add this to prevent Next.js optimization caching
                    />
                    <div className="absolute inset-0 bg-linear-to-t"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="mb-2 bg-yellow-600 hover:bg-yellow-700">Unggulan</Badge>
                      <h3 className="text-xl font-bold text-white">{post.title}</h3>
                    </div>
                  </div>
                  <CardContent className={`p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Calendar className="mr-1 h-4 w-4" />
                        {post.date}
                      </div>
                      <Button asChild className="bg-yellow-600 hover:bg-yellow-700">
                        <Link href={`/blog/${post.slug}`}>Baca Artikel</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className={`rounded-xl shadow-md p-6 mb-12 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Cari artikel..."
                className={`pl-10 ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Filter className="h-5 w-5 text-gray-500 mt-1" />
              {categories.map(category => (
                <Button
                  key={category.slug}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                  className={selectedCategory === category.name ? "bg-yellow-600 hover:bg-yellow-700" : ""}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Terjadi Kesalahan</h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center mb-4`}>{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-yellow-600 hover:bg-yellow-700">
              Coba Lagi
            </Button>
          </div>
        ) : (
          <>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Tidak ada artikel ditemukan</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Coba menyesuaikan pencarian atau kriteria filter Anda</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {postsToShow.map(post => (
                    <Card key={post.id} className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                      <div className="relative h-48">
                        <Image 
                          src={getCacheBustedUrl(post.imageUrl)} 
                          alt={post.title}
                          fill
                          className="object-cover"
                          unoptimized // Add this to prevent Next.js optimization caching
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-yellow-600 hover:bg-yellow-700">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                          <Calendar className="mr-1 h-4 w-4" />
                          {post.date}
                          <span className="mx-2">•</span>
                          <Clock className="mr-1 h-4 w-4" />
                          {post.readTime}
                        </div>
                        <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent className={`pt-0 grow flex flex-col ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                        <CardDescription className={`mb-4 grow line-clamp-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {post.excerpt}
                        </CardDescription>
                        <div className="flex justify-between items-center mt-auto">
                          <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <User className="mr-1 h-4 w-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              <Heart className="mr-1 h-4 w-4" />
                              {post.likes}
                            </div>
                            <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              <MessageCircle className="mr-1 h-4 w-4" />
                              {post.comments}
                            </div>
                          </div>
                        </div>
                        <Button asChild className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700">
                          <Link href={`/blog/${post.slug}`}>Baca Lebih Lanjut</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Load More Button */}
                {visiblePosts < filteredPosts.length && (
                  <div className="mt-12 flex justify-center">
                    <Button 
                      onClick={loadMorePosts} 
                      variant="outline" 
                      className={`bg-yellow-900/10 hover:bg-yellow-900/20 border-yellow-800/30 ${isDark ? 'border-gray-600' : ''}`}
                    >
                      Muat Lebih Banyak Artikel
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Newsletter Signup */}
        <div className={`mt-20 rounded-2xl p-8 md:p-12 text-white ${isDark ? 'bg-linear-to-r from-gray-900 to-gray-800' : 'bg-linear-to-r from-gray-900 to-gray-800'}`}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Tetap Terupdate</h2>
            <p className="text-gray-300 mb-8">
              Berlangganan newsletter kami untuk wawasan dan pembaruan industri terbaru
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Alamat email Anda" 
                className={`bg-gray-800 border-gray-700 text-white ${isDark ? '' : 'bg-gray-800 border-gray-700'}`}
              />
              <Button className="bg-yellow-600 hover:bg-yellow-700 whitespace-nowrap">
                Berlangganan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}