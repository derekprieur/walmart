import fetchProduct from "@/lib/fetchProduct";
import { notFound } from "next/navigation";

interface Props {
  searchParams: {
    url: string;
  };
}

const ProductPage = async ({ searchParams: { url } }: Props) => {
  const product = await fetchProduct(url);

  if (!product) return notFound();

  return (
    <div>
      <div></div>
    </div>
  );
};

export default ProductPage;
