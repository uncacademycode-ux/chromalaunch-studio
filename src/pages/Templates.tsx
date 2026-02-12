import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplateFilters from "@/components/templates/TemplateFilters";
import TemplateCard from "@/components/TemplateCard";
import { useTemplatesPaginated } from "@/hooks/useTemplates";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 9;

const Templates = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: paginatedData, isLoading } = useTemplatesPaginated({
    category: selectedCategory || undefined,
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    // Reset to page 1 when category changes
    if (categoryFromUrl !== selectedCategory) {
      setCurrentPage(1);
    }
  }, [categoryFromUrl]);

  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    const params: Record<string, string> = {};
    if (category) params.category = category;
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params: Record<string, string> = {};
    if (selectedCategory) params.category = selectedCategory;
    if (page > 1) params.page = page.toString();
    setSearchParams(params);
    // Scroll to top of templates section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredTemplates = useMemo(() => {
    if (!paginatedData?.data) return [];
    if (!searchQuery) return paginatedData.data;
    
    return paginatedData.data.filter((template) =>
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [paginatedData?.data, searchQuery]);

  const totalPages = paginatedData?.totalPages || 1;
  const totalCount = paginatedData?.count || 0;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push("ellipsis");
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2 flex items-center gap-3">
              <LayoutGrid className="w-8 h-8 text-primary" />
              Template Marketplace
            </h1>
            <p className="text-muted-foreground">
              Discover premium templates for your next project
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <TemplateFilters
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Main Content */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-4 text-sm text-muted-foreground">
                {isLoading ? (
                  <Skeleton className="h-5 w-32" />
                ) : (
                  <span>
                    {searchQuery ? filteredTemplates.length : totalCount} template{(searchQuery ? filteredTemplates.length : totalCount) !== 1 ? "s" : ""} found
                    {selectedCategory && (
                      <span className="ml-1">
                        in <span className="capitalize font-medium text-foreground">{selectedCategory}</span>
                      </span>
                    )}
                    {!searchQuery && totalPages > 1 && (
                      <span className="ml-2">
                        • Page {currentPage} of {totalPages}
                      </span>
                    )}
                  </span>
                )}
              </div>

              {/* Templates Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="aspect-video w-full rounded-xl" />
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : filteredTemplates.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        id={template.id}
                        title={template.title}
                        image={template.image_url}
                        price={template.price}
                        category={template.category}
                        rating={template.rating}
                        sales={template.sales}
                        youtubeId={template.youtube_id}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {!searchQuery && totalPages > 1 && (
                    <div className="mt-12">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                          
                          {getPageNumbers().map((page, index) => (
                            <PaginationItem key={index}>
                              {page === "ellipsis" ? (
                                <PaginationEllipsis />
                              ) : (
                                <PaginationLink
                                  onClick={() => handlePageChange(page)}
                                  isActive={currentPage === page}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              )}
                            </PaginationItem>
                          ))}
                          
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <LayoutGrid className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No templates found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default Templates;
