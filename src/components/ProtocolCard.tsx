'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Protocol } from '@/data/types';

interface ProtocolCardProps {
  protocol: Protocol;
}

export function ProtocolCard({ protocol }: ProtocolCardProps) {
  const [copied, setCopied] = useState(false);
  const primaryRx = protocol.prescriptions.find(p => p.isPreferred) || protocol.prescriptions[0];

  const copyPrescription = async () => {
    const text = `${protocol.shortName}: ${primaryRx.dose} Gy / ${primaryRx.fractions} fx (${primaryRx.dosePerFraction} Gy/fx)`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const doseOracleUrl = `https://hnusrat1.github.io/dose-oracle?site=${protocol.category}&dose=${primaryRx.dose}&fractions=${primaryRx.fractions}&from=protocol-compass`;

  return (
    <div className="group relative bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">
      {/* Top gradient accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{protocol.icon}</span>
            <div>
              <h3 className="font-semibold text-white text-sm">{protocol.shortName}</h3>
              <span className="text-xs text-slate-400">{protocol.subcategory}</span>
            </div>
          </div>
          <span className="px-2 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-400 rounded-full">
            {protocol.techniques[0]}
          </span>
        </div>

        {/* Prescription */}
        <div className="bg-slate-900/50 rounded-xl p-3 mb-4 border border-slate-700/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-white">
                {primaryRx.dose} Gy / {primaryRx.fractions} fx
              </div>
              <div className="text-xs text-slate-400">
                {primaryRx.dosePerFraction} Gy per fraction
                {primaryRx.BED10 && (
                  <span className="ml-2 text-cyan-400">
                    BED₁₀ = {primaryRx.BED10.toFixed(1)} Gy
                  </span>
                )}
              </div>
            </div>
            {protocol.prescriptions.length > 1 && (
              <span className="text-xs text-slate-500">
                +{protocol.prescriptions.length - 1} more
              </span>
            )}
          </div>
        </div>

        {/* Key Constraints */}
        <div className="mb-4">
          <div className="text-xs font-medium text-slate-400 mb-2">Key Constraints</div>
          <div className="space-y-1.5">
            {protocol.keyConstraints.slice(0, 4).map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-xs"
              >
                <span className={`${
                  c.priority === 'critical' ? 'text-red-400' :
                  c.priority === 'major' ? 'text-amber-400' : 'text-slate-400'
                }`}>
                  {c.organ}
                </span>
                <span className="text-slate-300 font-mono text-[11px]">
                  {c.constraint}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {protocol.tags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-[10px] bg-slate-700/50 text-slate-400 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={copyPrescription}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg transition-all ${
              copied
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-slate-700/50 text-slate-300 border border-slate-600/50 hover:bg-slate-700 hover:border-slate-500'
            }`}
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Copy Rx
              </>
            )}
          </button>

          <a
            href={doseOracleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Dose Oracle
          </a>

          <Link
            href={`/protocol/${protocol.id}`}
            className="flex items-center justify-center px-3 py-2 text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600/50 rounded-lg hover:bg-slate-700 hover:border-slate-500 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
