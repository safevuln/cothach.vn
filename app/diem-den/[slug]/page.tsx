import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideDetailPage from "../../components/GuideDetailPage";
import { destinations } from "../../../content/co-thach";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return destinations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);

  if (!destination) return {};

  return {
    title: `${destination.name} | Cẩm nang Cổ Thạch`,
    description: destination.description,
  };
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) notFound();

  const related = destinations.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <GuideDetailPage
      item={destination}
      kind="Điểm đến"
      backHref="/#diem-den"
      related={related}
      relatedBasePath="/diem-den"
    />
  );
}
