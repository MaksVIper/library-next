"use client"
import React from 'react';
import {ISearchResult} from "@/interfaces/BookInterface";
import {useBookStore} from "@/store/BookStore";
import {CheckIcon} from "@heroicons/react/20/solid";
interface ICardProps {
  book: ISearchResult;
}

const Card = ({book}: ICardProps) => {
  const addToReadList = useBookStore((state) => state.addToReadList);
  const readList = useBookStore((state) => state.readList);

  // Проверяем, есть ли книга в списке прочитанных
  const isBookInReadList = readList.some(item => item.id === book.key);

  const handleAddToReadList = () => {
    if (isBookInReadList) return;

    addToReadList({
      id: book.key,
      title: book.title,
      authors: book.author_name ?? [],
      publishedYear: book.first_publish_year?.toString() ?? '',
      isInReadList: true,
    });
  };

  const hasWarInTitle = book.title.includes('War');

  return (
    <div className="group relative flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      {/* Бейдж для прочитанных книг */}
      {isBookInReadList && (
        <div className="absolute -right-2 -top-2 z-10 flex items-center rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white shadow-lg">
          <CheckIcon className="mr-1 h-3 w-3"/>
          Прочитана
        </div>
      )}

      <h3 className={`mb-3 line-clamp-2 text-xl font-semibold ${hasWarInTitle ? 'bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent' : 'text-gray-900'}`}>
        {book.title}
      </h3>

      {book.author_name && (
        <div className="mb-3 flex items-center">
          <svg className="mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          <p className="line-clamp-1 text-gray-600">
            {book.author_name.join(', ')}
          </p>
        </div>
      )}

      {book.first_publish_year && (
        <div className="mb-4 flex items-center">
          <svg className="mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <p className="text-gray-500">
            {book.first_publish_year}
          </p>
        </div>
      )}

      <button
        onClick={handleAddToReadList}
        disabled={isBookInReadList}
        className={`mt-auto flex items-center justify-center space-x-2 rounded-lg px-4 py-2.5 text-white shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isBookInReadList
            ? 'cursor-not-allowed bg-gray-400'
            : 'bg-gradient-to-r from-green-500 to-teal-500 hover:shadow-lg hover:brightness-110 focus:ring-green-500'
        }`}
      >
        {isBookInReadList ? (
          <>
            <CheckIcon className="h-5 w-5"/>
            <span>Уже в списке</span>
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            <span>Добавить в прочитанное</span>
          </>
        )}
      </button>

      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-green-50/50 to-blue-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </div>
  );
};

export default Card;