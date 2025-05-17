
import "./globals.css"
import {SearchComponent} from "@/components/SearchComponent";

export default function Home() {
  return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Найди книгу</h1>
          <SearchComponent/>
        </div>
      </div>
  );
}
