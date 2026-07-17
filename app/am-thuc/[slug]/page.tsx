import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideDetailPage from "../../components/GuideDetailPage";
import { foods } from "../../../content/co-thach";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return foods.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const food = foods.find((item) => item.slug === slug);

  if (!food) return {};

  return {
    title: `${food.name} | Ẩm thực Cổ Thạch`,
    description: food.description,
  };
}

export default async function FoodPage({ params }: PageProps) {
  const { slug } = await params;
  const food = foods.find((item) => item.slug === slug);
  if (!food) notFound();

  const related = foods.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <GuideDetailPage
      item={food}
      kind="Ẩm thực"
      backHref="/#am-thuc"
      related={related}
      relatedBasePath="/am-thuc"
    />
  );
}
