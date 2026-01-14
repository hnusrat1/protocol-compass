'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getProtocolById } from '@/data/protocols';

type Tab = 'overview' | 'targets' | 'constraints' | 'technique' | 'references';

export default function ProtocolDetailClient({ id }: { id: string }) {
  const protocol = getProtocolById(id);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [copied, setCopied] = useState(false);

  if (!protocol) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Protocol not found</h1>
          <Link href="/" className="text-cyan-400 hover:underline">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const primaryRx = protocol.prescriptions.find(p => p.isPreferred) || protocol.prescriptions[0];

  const copyPrescription = async () => {
    const text = `${protocol.shortName}: ${primaryRx.dose} Gy / ${primaryRx.fractions} fx (${primaryRx.dosePerFraction} Gy/fx)`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const doseOracleUrl = `https://hnusrat1.github.io/dose-oracle?site=${protocol.category}&dose=${primaryRx.dose}&fractions=${primaryRx.fractions}&from=protocol-compass`;

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'targets', label: 'Targets' },
    { id: 'constraints', label: 'Constraints' },
    { id: 'technique', label: 'Technique' },
    { id: 'references', label: 'References' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{protocol.icon}</span>
                  <h1 className="text-xl font-bold text-white">{protocol.shortName}</h1>
                  <span className="px-2 py-0.5 text-xs font-medium bg-cyan-500/20 text-cyan-400 rounded-full">
                    {protocol.techniques[0]}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{protocol.subcategory} - {protocol.name}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={copyPrescription}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  copied
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600'
                }`}
              >
                {copied ? 'Copied!' : 'Copy Rx'}
              </button>
              <a
                href={doseOracleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition-all"
              >
                Dose Oracle
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Prescription Summary Bar */}
      <div className="relative z-10 bg-slate-800/50 border-b border-slate-700/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-6">
            {protocol.prescriptions.map((rx, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 ${rx.isPreferred ? 'text-white' : 'text-slate-400'}`}
              >
                {rx.isPreferred && (
                  <span className="px-2 py-0.5 text-[10px] font-medium bg-cyan-500/20 text-cyan-400 rounded">
                    PREFERRED
                  </span>
                )}
                <span className="text-lg font-bold">
                  {rx.dose} Gy / {rx.fractions} fx
                </span>
                <span className="text-sm text-slate-500">
                  ({rx.dosePerFraction} Gy/fx)
                </span>
                {rx.BED10 && (
                  <span className="text-xs text-cyan-400">
                    BED₁₀ = {rx.BED10.toFixed(1)} Gy
                  </span>
                )}
                {rx.description && (
                  <span className="text-xs text-slate-500">• {rx.description}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="relative z-10 border-b border-slate-700/30 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Indication</h3>
              <p className="text-slate-300">{protocol.indication}</p>
            </div>

            <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Eligibility Criteria</h3>
              <ul className="space-y-2">
                {protocol.eligibility.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <svg className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {protocol.staging && (
              <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Staging</h3>
                <p className="text-slate-300">{protocol.staging}</p>
              </div>
            )}

            <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {protocol.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm bg-slate-700/50 text-slate-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Targets Tab */}
        {activeTab === 'targets' && (
          <div className="space-y-6">
            <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Target Volume Definitions</h3>
              <div className="space-y-4">
                {protocol.targetVolumes.map((tv, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-lg">
                    <div className="px-3 py-1 bg-cyan-500/20 text-cyan-400 font-mono text-sm font-bold rounded">
                      {tv.name}
                    </div>
                    <div>
                      <p className="text-slate-300">{tv.definition}</p>
                      {tv.margin && (
                        <p className="text-sm text-slate-500 mt-1">Margin: {tv.margin}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Margin Expansions</h3>
              <div className="space-y-3">
                {protocol.margins.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                    <span className="font-mono text-cyan-400">{m.from}</span>
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span className="font-mono text-cyan-400">{m.to}</span>
                    <span className="text-slate-300 ml-2">{m.margin}</span>
                    {m.notes && (
                      <span className="text-sm text-slate-500">({m.notes})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Constraints Tab */}
        {activeTab === 'constraints' && (
          <div className="space-y-6">
            <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 overflow-hidden">
              <div className="p-4 border-b border-slate-700/30 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">All Dose Constraints</h3>
                <a
                  href={doseOracleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-400 hover:underline"
                >
                  View in Dose Oracle →
                </a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Organ</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Metric</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Constraint</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Endpoint</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {protocol.allConstraints.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3 text-sm text-white font-medium">{c.organ}</td>
                        <td className="px-4 py-3 text-sm text-slate-400 font-mono">{c.metric}</td>
                        <td className="px-4 py-3 text-sm text-cyan-400 font-mono">{c.constraint}</td>
                        <td className="px-4 py-3 text-sm text-slate-400">{c.endpoint || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Technique Tab */}
        {activeTab === 'technique' && (
          <div className="space-y-6">
            {protocol.motionManagement && (
              <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Motion Management</h3>
                <p className="text-slate-300">{protocol.motionManagement}</p>
              </div>
            )}

            {protocol.imageGuidance && (
              <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Image Guidance</h3>
                <p className="text-slate-300">{protocol.imageGuidance}</p>
              </div>
            )}

            {protocol.treatmentDelivery && (
              <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Treatment Delivery</h3>
                <p className="text-slate-300">{protocol.treatmentDelivery}</p>
              </div>
            )}

            {protocol.concurrentTherapy && (
              <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Concurrent Therapy</h3>
                <p className="text-slate-300">{protocol.concurrentTherapy}</p>
              </div>
            )}

            <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Supported Techniques</h3>
              <div className="flex flex-wrap gap-2">
                {protocol.techniques.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 text-sm bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* References Tab */}
        {activeTab === 'references' && (
          <div className="space-y-6">
            <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Key Publications</h3>
              <div className="space-y-4">
                {protocol.publications.map((pub, i) => (
                  <div key={i} className="p-4 bg-slate-900/50 rounded-lg">
                    <h4 className="text-white font-medium mb-2">{pub.title}</h4>
                    <p className="text-sm text-slate-400 mb-3">
                      {pub.authors} • <span className="text-cyan-400">{pub.journal}</span> • {pub.year}
                    </p>
                    <div className="flex gap-2">
                      {pub.pmid && (
                        <a
                          href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded hover:bg-blue-500/30 transition-colors"
                        >
                          PubMed
                        </a>
                      )}
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded hover:bg-purple-500/30 transition-colors"
                        >
                          DOI
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {protocol.protocolPdf && (
              <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Protocol Document</h3>
                <a
                  href={protocol.protocolPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Protocol
                </a>
              </div>
            )}

            <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Protocol Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">Source:</span>
                  <span className="text-white ml-2">{protocol.source}</span>
                </div>
                <div>
                  <span className="text-slate-500">Published:</span>
                  <span className="text-white ml-2">{protocol.yearPublished}</span>
                </div>
                <div>
                  <span className="text-slate-500">Last Updated:</span>
                  <span className="text-white ml-2">{protocol.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
