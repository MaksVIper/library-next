"use client"
import {useBookStore} from '@/store/BookStore';
import {XMarkIcon, ArrowPathIcon, TrashIcon, BookOpenIcon} from '@heroicons/react/24/outline';
import {useState} from 'react';

export const ReadListPopup = () => {
  const {readList, removeFromReadList, moveToSearch} = useBookStore();
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={togglePopup}
        className="fixed right-6 bottom-6 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
      >
        <BookOpenIcon className="h-6 w-6"/>
        <span className="font-medium text-lg">Мои книги ({readList.length})</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity animate-fadeIn"
          onClick={togglePopup}
        />
      )}

      {/* Popup */}
      <div className={`
        fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-2xl font-bold text-gray-800">
              Моя библиотека <span className="text-blue-600">({readList.length})</span>
            </h2>
            <button
              onClick={togglePopup}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-700"/>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {readList.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpenIcon className="h-12 w-12 text-blue-500"/>
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">Список пуст</h3>
                <p className="text-gray-500 max-w-xs">
                  Начните добавлять книги из поиска, чтобы они появились здесь
                </p>
              </div>
            ) : (
              <div className="p-4 grid gap-4">
                {readList.map((book) => (
                  <div
                    key={book.id}
                    className="relative p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {book.title.includes('War') && (
                      <div className="absolute top-2 right-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                        War
                      </div>
                    )}

                    <h3 className={`text-lg font-semibold mb-1 pr-6 ${book.title.includes('War') ? 'text-red-500' : 'text-gray-800'}`}>
                      {book.title}
                    </h3>

                    {Array.isArray(book.authors) && book.authors.length > 0 && (
                      <p className="text-sm text-gray-600 mb-2 flex items-center">
                        <span className="inline-block w-4 h-4 bg-blue-100 rounded-full mr-2 flex items-center justify-center">
                          <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                          </svg>
                        </span>
                        {book.authors.join(', ')}
                      </p>
                    )}

                    {book.publishedYear && (
                      <p className="text-sm text-gray-500 mb-3 flex items-center">
                        <span className="inline-block w-4 h-4 bg-blue-100 rounded-full mr-2 flex items-center justify-center">
                          <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                        </span>
                        Год: {book.publishedYear}
                      </p>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromReadList(book.id);
                        }}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <TrashIcon className="h-4 w-4"/>
                        Удалить
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveToSearch(book.id);
                        }}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <ArrowPathIcon className="h-4 w-4"/>
                        В поиск
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={togglePopup}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-md transition-all"
            >
              Закрыть библиотеку
            </button>
          </div>
        </div>
      </div>
    </>
  );
};