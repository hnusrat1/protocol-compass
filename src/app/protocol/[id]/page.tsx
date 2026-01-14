import { ALL_PROTOCOLS } from '@/data/protocols';
import ProtocolDetailClient from './ProtocolDetailClient';

// Generate static params for all protocols
export function generateStaticParams() {
  return ALL_PROTOCOLS.map((protocol) => ({
    id: protocol.id,
  }));
}

export default async function ProtocolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProtocolDetailClient id={id} />;
}
