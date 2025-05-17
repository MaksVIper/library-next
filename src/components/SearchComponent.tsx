"use client"
import {useState, KeyboardEvent} from 'react';
import {ISearchResult} from "@/interfaces/BookInterface";
import Card from "@/components/Card";
import {Spinner} from "@/components/Spinner";
import {ReadListPopup} from "@/components/ReadListPopup";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid";

export const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ISearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchBooks = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`
      );
      const data = await response.json();
      setResults(data.docs || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchBooks();
    }
  };

  return (
    <div className="mb-8">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Найди книгу"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 placeholder-gray-400"
        />
        <ReadListPopup/>
      </div>
      {isLoading ? (<Spinner/>) :
        (
          <>
            {results.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Результаты поиска</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.map((book) => (
                    <Card book={book} key={book.key}/>
                  ))}
                </div>
              </div>
            ) : (<div className="text-center py-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full">
                <MagnifyingGlassIcon className="h-8 w-8 text-gray-400"/>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Ничего не найдено</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                К сожалению, по вашему запросу не найдено результатов. Попробуйте другие ключевые слова.
              </p>
            </div>)}
          </>
        )}
    </div>
  );
};