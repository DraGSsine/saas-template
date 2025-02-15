import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";
import Pricing from "@/components/landing/pricing";
import Testimonials from "@/components/landing/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className=" bg-gradient-to-br from-pink-100/50  to-blue-100/50 h-screen ">
        <Navbar />
        <Hero />
      </section>

      {/* <Features /> */}
      {/* <Testimonials />  */}
      {/* <Pricing /> */}
    </main>
  );
}
