import Navbar from "@/components/Home/Navbar";
import ProductList from "@/components/Home/ProductList";

export default function Product() {
  return (
    <main className="min-h-screen bg-gray-100 ">
      <Navbar />
      <ProductList />
    </main>
  );
}
