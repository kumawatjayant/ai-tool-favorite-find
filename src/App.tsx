
import React, { useState, useEffect } from 'react';
import { Moon, Sun, BarChart3 } from 'lucide-react';
import ToolsList from './components/ToolsList';
import FavoritesList from './components/FavoritesList';
import CategoryChart from './components/CategoryChart';
import Confetti from './components/Confetti';
import { mockApiService } from './services/mockApi';
import { AITool } from './types/types';

const App = () => {
  const [tools, setTools] = useState<AITool[]>([]);
  const [favorites, setFavorites] = useState<AITool[]>([]);
  const [currentView, setCurrentView] = useState<'allTools' | 'myFavorites' | 'analytics'>('allTools');
  const [isLoadingTools, setIsLoadingTools] = useState(false);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);
  const [isSavingFavorite, setIsSavingFavorite] = useState(false);
  const [toolsError, setToolsError] = useState<string>('');
  const [favoritesError, setFavoritesError] = useState<string>('');
  const [saveError, setSaveError] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Fetch tools on component mount and when category changes
  useEffect(() => {
    fetchTools();
  }, [selectedCategory]);

  // Fetch favorites on component mount
  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchTools = async () => {
    setIsLoadingTools(true);
    setToolsError('');
    try {
      const data = await mockApiService.getTools(selectedCategory);
      setTools(data);
    } catch (error) {
      setToolsError('Failed to fetch tools. Please try again.');
    } finally {
      setIsLoadingTools(false);
    }
  };

  const fetchFavorites = async () => {
    setIsLoadingFavorites(true);
    setFavoritesError('');
    try {
      const data = await mockApiService.getFavorites();
      setFavorites(data);
    } catch (error) {
      setFavoritesError('Failed to fetch favorites. Please try again.');
    } finally {
      setIsLoadingFavorites(false);
    }
  };

  const addFavorite = async (toolId: number) => {
    setIsSavingFavorite(true);
    setSaveError('');
    try {
      await mockApiService.addFavorite(toolId);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      fetchFavorites();
    } catch (error: any) {
      if (error.message.includes('already favorited')) {
        setSaveError('This tool is already in your favorites!');
      } else {
        setSaveError('Failed to add to favorites. Please try again.');
      }
    } finally {
      setIsSavingFavorite(false);
    }
  };

  const removeFavorite = async (toolId: number) => {
    try {
      await mockApiService.removeFavorite(toolId);
      fetchFavorites();
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const getCategoryData = () => {
    const categoryCount: { [key: string]: number } = {};
    tools.forEach(tool => {
      categoryCount[tool.category] = (categoryCount[tool.category] || 0) + 1;
    });
    return Object.entries(categoryCount).map(([name, value]) => ({ name, value }));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      {showConfetti && <Confetti />}
      
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI Tools Directory
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setCurrentView('allTools')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                currentView === 'allTools'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              All Tools
            </button>
            <button
              onClick={() => setCurrentView('myFavorites')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                currentView === 'myFavorites'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              My Favorites ({favorites.length})
            </button>
            <button
              onClick={() => setCurrentView('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                currentView === 'analytics'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {saveError && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{saveError}</p>
          </div>
        )}

        {currentView === 'allTools' && (
          <ToolsList
            tools={tools}
            onFavoriteClick={addFavorite}
            isLoading={isLoadingTools}
            error={toolsError}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            isSavingFavorite={isSavingFavorite}
            favorites={favorites}
          />
        )}

        {currentView === 'myFavorites' && (
          <FavoritesList
            favorites={favorites}
            onRemoveFavorite={removeFavorite}
            isLoading={isLoadingFavorites}
            error={favoritesError}
          />
        )}

        {currentView === 'analytics' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                AI Tools Analytics
              </h2>
              <CategoryChart data={getCategoryData()} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
