import FooterSection from "@/components/Home/FooterSection";
import Navbar from "@/components/Home/Navbar";
import Product from "@/components/Home/Product";

const products = [
  {
    id: 1, name: "Golden Retriever",
    imageUrl: "/goldenretriever.jpg",
    price: 29.99,
    description: "This is a great product.",
  },
  {
    id: 2, name: "Fish",
    imageUrl: "/Fish4.jpg",
    price: 39.99,
    description: "This product is even better!",
  },
  {
    id: 3, name: "PersianCat",
    imageUrl: "/PersianCat.jpg",
    price: 49.99,
    description: "The best product you will ever find.",
  },
  {
    id: 4, name: "Golden Retriever",
    imageUrl: "/goldenretriever.jpg",
    price: 29.99,
    description: "This is a great product.",
  },
  {
    id: 5, name: "Fish",
    imageUrl: "/Fish4.jpg",
    price: 39.99,
    description: "This product is even better!",
  },
  {
    id: 6, name: "PersianCat",
    imageUrl: "/PersianCat.jpg",
    price: 49.99,
    description: "The best product you will ever find.",
  },
];

export default function Products() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-500">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
      <FooterSection />
    </>
  );
}
