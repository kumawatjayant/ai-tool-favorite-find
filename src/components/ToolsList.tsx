
import React, { useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import ToolCard from './ToolCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { AITool } from '../types/types';
import { mockApiService } from '../services/mockApi';

interface ToolsListProps {
  tools: AITool[];
  onFavoriteClick: (toolId: number) => Promise<void>;
  isLoading: boolean;
  error: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isSavingFavorite: boolean;
  favorites: AITool[];
}

const ToolsList: React.FC<ToolsListProps> = ({
  tools,
  onFavoriteClick,
  isLoading,
  error,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  isSavingFavorite,
  favorites
}) => {
  const categories = mockApiService.getCategories();
  const favoriteIds = favorites.map(fav => fav.id);

  const filteredTools = useMemo(() => {
    return tools.filter(tool =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tool.description && tool.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [tools, searchTerm]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search AI tools..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none cursor-pointer min-w-[200px]"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {searchTerm || selectedCategory ? 'Search Results' : 'All AI Tools'}
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
        </span>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No tools found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            Try adjusting your search terms or category filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onFavoriteClick={onFavoriteClick}
              isLoading={isSavingFavorite}
              isFavorited={favoriteIds.includes(tool.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolsList;
