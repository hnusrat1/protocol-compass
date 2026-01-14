'use client';

import Link from 'next/link';
import { CategoryInfo } from '@/data/types';

interface CategoryCardProps {
  category: CategoryInfo & { protocolCount: number };
}

export function CategoryCard({ category }: CategoryCardProps) {
  if (category.protocolCount === 0) {
    return (
      <div className="relative bg-slate-800/30 border border-slate-700/30 rounded-2xl p-5 opacity-50">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{category.icon}</span>
          <div>
            <h3 className="font-semibold text-white">{category.name}</h3>
            <p className="text-xs text-slate-500">{category.description}</p>
          </div>
        </div>
        <div className="text-xs text-slate-500 mt-3">Coming soon</div>
      </div>
    );
  }

  return (
    <Link
      href={`/category/${category.id}`}
      className="group relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl group-hover:scale-110 transition-transform">{category.icon}</span>
          <div>
            <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
              {category.name}
            </h3>
            <p className="text-xs text-slate-400">{category.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700/50">
          <span className="text-sm text-slate-400">
            <span className="text-cyan-400 font-semibold">{category.protocolCount}</span> protocols
          </span>
          <svg
            className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
