'use client';

import { useState, useMemo } from 'react';
import { CategoryCard } from '@/components/CategoryCard';
import { ProtocolCard } from '@/components/ProtocolCard';
import { getCategoriesWithCounts, searchProtocols, ALL_PROTOCOLS, PROTOCOL_STATS } from '@/data/protocols';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const categories = getCategoriesWithCounts();

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return searchProtocols(searchQuery);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50" />
                <div className="relative bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl p-2.5 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Protocol Compass</h1>
                <p className="text-xs text-slate-400">Navigate to the right protocol</p>
              </div>
            </div>

            <a
              href="https://hnusrat1.github.io/dose-oracle"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Dose Oracle
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Find the Right Treatment Protocol
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Comprehensive SBRT & SRS protocols from RTOG, NRG, and consensus guidelines.
            Quick reference and detailed views with Dose Oracle integration.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search protocols, disease sites, techniques..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-10">
          <div className="text-center px-6 py-3 rounded-xl bg-slate-800/30 border border-slate-700/30">
            <div className="text-2xl font-bold text-cyan-400">{PROTOCOL_STATS.totalProtocols}</div>
            <div className="text-xs text-slate-500">Protocols</div>
          </div>
          <div className="text-center px-6 py-3 rounded-xl bg-slate-800/30 border border-slate-700/30">
            <div className="text-2xl font-bold text-blue-400">{categories.filter(c => c.protocolCount > 0).length}</div>
            <div className="text-xs text-slate-500">Disease Sites</div>
          </div>
          <div className="text-center px-6 py-3 rounded-xl bg-slate-800/30 border border-slate-700/30">
            <div className="text-2xl font-bold text-purple-400">{PROTOCOL_STATS.techniques}</div>
            <div className="text-xs text-slate-500">Techniques</div>
          </div>
        </div>

        {/* Search Results or Categories */}
        {searchResults !== null ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
              </h3>
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
              >
                Clear search
              </button>
            </div>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map(protocol => (
                  <ProtocolCard key={protocol.id} protocol={protocol} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400">No protocols found matching your search.</p>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Categories Grid */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-white mb-4">Browse by Site</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map(category => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>

            {/* All Protocols */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">All Protocols</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ALL_PROTOCOLS.map(protocol => (
                  <ProtocolCard key={protocol.id} protocol={protocol} />
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 bg-slate-900/50 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-slate-500">
              <strong className="text-slate-400">Disclaimer:</strong> This tool is for educational and
              reference purposes only. Always verify protocols against primary sources and institutional guidelines.
            </p>
            <p className="text-xs text-slate-600 mt-4">
              Data sources: RTOG/NRG Protocols, ASTRO Guidelines, Consensus Papers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
