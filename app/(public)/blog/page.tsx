// app/(public)/blog/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, User, MessageCircle, Heart, Search, Filter, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/pages/PageHeader";
import { useTheme } from "next-themes";

// Define TypeScript interfaces
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  likes: number;
  comments: number;
  category: string;
  readTime: string;
  featured: boolean;
  imageUrl: string;
}

export default function BlogPage() {
  const { theme } = useTheme();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [visiblePosts, setVisiblePosts] = useState<number>(6);

  // Simulate fetching blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockPosts: BlogPost[] = [
        {
          id: 1,
          title: "Masa Depan Teknologi dalam Bisnis",
          excerpt: "Menjelajahi bagaimana teknologi yang sedang berkembang membentuk lanskap bisnis dan apa yang perlu perusahaan lakukan untuk tetap kompetitif.",
          date: "15 Mei 2023",
          author: "John Doe",
          likes: 42,
          comments: 8,
          category: "Teknologi",
          readTime: "6 menit baca",
          featured: true,
          imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80"
        },
        {
          id: 2,
          title: "Praktik Berkelanjutan dalam Logistik Modern",
          excerpt: "Bagaimana industri logistik mengadopsi praktik berkelanjutan untuk mengurangi dampak lingkungan sambil meningkatkan efisiensi.",
          date: "28 April 2023",
          author: "Jane Smith",
          likes: 36,
          comments: 5,
          category: "Logistik",
          readTime: "8 menit baca",
          featured: false,
          imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
        },
        {
          id: 3,
          title: "Perencanaan Keuangan untuk Bisnis Kecil",
          excerpt: "Strategi keuangan esensial yang harus diimplementasikan oleh bisnis kecil untuk memastikan pertumbuhan dan stabilitas jangka panjang.",
          date: "10 April 2023",
          author: "Robert Johnson",
          likes: 28,
          comments: 12,
          category: "Keuangan",
          readTime: "5 menit baca",
          featured: false,
          imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
        },
        {
          id: 4,
          title: "Inovasi dalam Teknologi Kesehatan",
          excerpt: "Perkembangan terkini dalam teknologi kesehatan yang meningkatkan hasil pasien dan mengubah praktik medis.",
          date: "22 Maret 2023",
          author: "Dr. Emily Chen",
          likes: 51,
          comments: 15,
          category: "Kesehatan",
          readTime: "7 menit baca",
          featured: true,
          imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
        },
        {
          id: 5,
          title: "Tren Pemasaran Digital untuk 2023",
          excerpt: "Strategi pemasaran digital terbaru yang mendorong keterlibatan dan konversi dalam lanskap kompetitif saat ini.",
          date: "15 Maret 2023",
          author: "Sarah Williams",
          likes: 39,
          comments: 7,
          category: "Pemasaran",
          readTime: "5 menit baca",
          featured: false,
          imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
        },
        {
          id: 6,
          title: "Kerja Jarak Jauh: Membangun Tim yang Efektif",
          excerpt: "Strategi untuk mengelola tim jarak jauh dan mempertahankan produktivitas dalam lingkungan kerja terdistribusi.",
          date: "5 Maret 2023",
          author: "Michael Torres",
          likes: 45,
          comments: 11,
          category: "Manajemen",
          readTime: "6 menit baca",
          featured: false,
          imageUrl: "https://images.unsplash.com/photo-1616530940355-3517d6f1c0f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
        },
        {
          id: 7,
          title: "Praktik Terbaik Keamanan Siber untuk Bisnis",
          excerpt: "Langkah-langkah keamanan siber esensial yang harus diimplementasikan setiap bisnis untuk melindungi data dan sistem sensitif.",
          date: "28 Februari 2023",
          author: "Alex Rivera",
          likes: 33,
          comments: 9,
          category: "Teknologi",
          readTime: "7 menit baca",
          featured: false,
          imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
        },
        {
          id: 8,
          title: "Daya Tahan Rantai Pasokan dalam Waktu Tidak Pasti",
          excerpt: "Bagaimana perusahaan membangun rantai pasokan yang lebih tangguh untuk menavigasi gangguan dan ketidakpastian global.",
          date: "20 Februari 2023",
          author: "Lisa Chen",
          likes: 29,
          comments: 6,
          category: "Logistik",
          readTime: "8 menit baca",
          featured: false,
          imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
        }
      ];
      
      setBlogPosts(mockPosts);
      setFilteredPosts(mockPosts);
      
      // Extract unique categories
      const uniqueCategories: string[] = ["Semua", ...new Set(mockPosts.map(post => post.category))];
      setCategories(uniqueCategories);
      
      setLoading(false);
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
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredPosts(result);
    setVisiblePosts(6); // Reset visible posts when filters change
  }, [selectedCategory, searchQuery, blogPosts]);

  const loadMorePosts = () => {
    setVisiblePosts(prev => prev + 3);
  };

  const featuredPosts: BlogPost[] = blogPosts.filter(post => post.featured);
  const postsToShow: BlogPost[] = filteredPosts.slice(0, visiblePosts);

  return (
    <div className={`min-h-screen px-4 py-12 md:py-24 max-w-7xl mx-auto`}>
      {/* Theme Toggle Button */}
      {/* <div className="fixed top-4 right-4 z-50">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} border`}
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </Button>
      </div> */}

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
            <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>Artikel Unggulan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map(post => (
                <Card key={`featured-${post.id}`} className={`overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="relative h-64">
                    <Image 
                      src={post.imageUrl} 
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="mb-2 bg-yellow-600 hover:bg-yellow-700">Unggulan</Badge>
                      <h3 className="text-xl font-bold text-white">{post.title}</h3>
                    </div>
                  </div>
                  <CardContent className={`p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <div className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Calendar className="mr-1 h-4 w-4" />
                        {post.date}
                      </div>
                      <Button asChild className="bg-yellow-600 hover:bg-yellow-700">
                        <Link href={`/blog/${post.id}`}>Baca Artikel</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className={`rounded-xl shadow-md p-6 mb-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Cari artikel..."
                className={`pl-10 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Filter className="h-5 w-5 text-gray-500 mt-1" />
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-yellow-600 hover:bg-yellow-700" : ""}
                >
                  {category}
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
        ) : (
          <>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Tidak ada artikel ditemukan</h3>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Coba menyesuaikan pencarian atau kriteria filter Anda</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {postsToShow.map(post => (
                    <Card key={post.id} className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <div className="relative h-48">
                        <Image 
                          src={post.imageUrl} 
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-yellow-600 hover:bg-yellow-700">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <div className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                          <Calendar className="mr-1 h-4 w-4" />
                          {post.date}
                          <span className="mx-2">•</span>
                          <Clock className="mr-1 h-4 w-4" />
                          {post.readTime}
                        </div>
                        <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent className={`pt-0 grow flex flex-col ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                        <CardDescription className={`mb-4 grow line-clamp-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {post.excerpt}
                        </CardDescription>
                        <div className="flex justify-between items-center mt-auto">
                          <div className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            <User className="mr-1 h-4 w-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                              <Heart className="mr-1 h-4 w-4" />
                              {post.likes}
                            </div>
                            <div className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                              <MessageCircle className="mr-1 h-4 w-4" />
                              {post.comments}
                            </div>
                          </div>
                        </div>
                        <Button asChild className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700">
                          <Link href={`/blog/${post.id}`}>Baca Lebih Lanjut</Link>
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
                      className={`bg-yellow-900/10 hover:bg-yellow-900/20 border-yellow-800/30 ${theme === 'dark' ? 'border-gray-600' : ''}`}
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
        <div className={`mt-20 rounded-2xl p-8 md:p-12 text-white ${theme === 'dark' ? 'bg-linear-to-r from-gray-900 to-gray-800' : 'bg-linear-to-r from-gray-900 to-gray-800'}`}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Tetap Terupdate</h2>
            <p className="text-gray-300 mb-8">
              Berlangganan newsletter kami untuk wawasan dan pembaruan industri terbaru
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Alamat email Anda" 
                className={`bg-gray-800 border-gray-700 text-white ${theme === 'dark' ? '' : 'bg-gray-800 border-gray-700'}`}
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