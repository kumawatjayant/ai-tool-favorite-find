
import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { AITool } from '../types/types';

interface FavoritesListProps {
  favorites: AITool[];
  onRemoveFavorite: (toolId: number) => Promise<void>;
  isLoading: boolean;
  error: string;
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  onRemoveFavorite,
  isLoading,
  error
}) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <Heart className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No favorites yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          Start exploring AI tools and add your favorites to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Your Favorite Tools
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {favorites.length} {favorites.length === 1 ? 'favorite' : 'favorites'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map(tool => (
          <div
            key={tool.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  {tool.name}
                </h3>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {tool.category}
                </span>
              </div>
              
              <button
                onClick={() => onRemoveFavorite(tool.id)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                aria-label="Remove from favorites"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {tool.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {tool.description}
              </p>
            )}

            {tool.url && (
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Visit Tool →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
