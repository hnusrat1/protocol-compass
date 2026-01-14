import { CATEGORIES, DiseaseCategory } from '@/data/types';
import CategoryPageClient from './CategoryPageClient';

// Generate static params for all categories
export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    id: category.id,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CategoryPageClient id={id} />;
}
