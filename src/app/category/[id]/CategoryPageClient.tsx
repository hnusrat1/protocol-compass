'use client';

import Link from 'next/link';
import { ProtocolCard } from '@/components/ProtocolCard';
import { getProtocolsByCategory } from '@/data/protocols';
import { CATEGORIES, DiseaseCategory } from '@/data/types';

export default function CategoryPageClient({ id }: { id: string }) {
  const category = CATEGORIES.find(c => c.id === id);
  const protocols = getProtocolsByCategory(id as DiseaseCategory);

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Category not found</h1>
          <Link href="/" className="text-cyan-400 hover:underline">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{category.icon}</span>
              <div>
                <h1 className="text-xl font-bold text-white">{category.name}</h1>
                <p className="text-xs text-slate-400">{category.description}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {protocols.length > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-slate-400">
                {protocols.length} protocol{protocols.length !== 1 ? 's' : ''} available
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {protocols.map(protocol => (
                <ProtocolCard key={protocol.id} protocol={protocol} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg mb-4">
              No protocols available for this category yet.
            </p>
            <p className="text-slate-500">
              Check back soon - more protocols are being added!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
