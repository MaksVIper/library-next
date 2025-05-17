import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Book {
  id: string;
  title: string;
  authors?: string[];
  publishedYear?: string;
  isInReadList: boolean;
}

interface BookStore {
  readList: Book[];
  addToReadList: (book: Book) => void;
  removeFromReadList: (id: string) => void;
  moveToSearch: (id: string) => Book | null;
}

export const useBookStore = create<BookStore>()(
  persist(
    (set, get) => ({
      readList: [],
      addToReadList: (book) => {
        const existingBook = get().readList.find(b => b.id === book.id);
        if (!existingBook) {
          set({ readList: [...get().readList, { ...book, isInReadList: true }] });
        }
      },
      removeFromReadList: (id) => {
        set({ readList: get().readList.filter(book => book.id !== id) });
      },
      moveToSearch: (id) => {
        const book = get().readList.find(b => b.id === id);
        if (book) {
          get().removeFromReadList(id);
          return { ...book, isInReadList: false };
        }
        return null;
      },
    }),
    {
      name: 'read-list-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);