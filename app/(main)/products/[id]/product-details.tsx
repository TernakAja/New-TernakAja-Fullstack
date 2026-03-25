import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import ProductImageGallery from "@/components/product-image-gallery";

// ------------------------------
// Dummy API
// ------------------------------
async function getProductById(id: string) {
  await new Promise((r) => setTimeout(r, 500));

  const products = [
    {
      id: "1",
      name: "PETSA",
      price: "Rp 250.000,00",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, fugit! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, fugit! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, fugit!",
      images: ["/cow-login.png", "/cow-register.png", "/cow.png"],
    },
    {
      id: "2",
      name: "Smart Feeder",
      price: "Rp 1.500.000,00",
      description:
        "Automated feeding system ensuring your livestock gets the right amount...",
      images: ["/cow-login.png", "/cow-register.png", "/cow.png"],
    },
  ];

  return products.find((p) => p.id === id) || null;
}

// ------------------------------
// Streaming Component
// ------------------------------
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) return notFound();

  return (
    <div className="container mx-auto px-6 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left */}
        <ProductImageGallery images={product.images} />

        {/* Right */}
        <div className="flex flex-col pt-2">
          <Link
            href="/products"
            className="flex items-center gap-2 text-border/90 hover:text-tblack mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Our Products
          </Link>

          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-2xl text-muted-foreground mb-8">{product.price}</p>

          <p className="text-tblack text-lg leading-relaxed mb-10">
            {product.description}
          </p>

          <button className="w-fit bg-primary text-white font-bold text-lg px-10 py-3 rounded-lg">
            Order product
          </button>
        </div>
      </div>
    </div>
  );
}
