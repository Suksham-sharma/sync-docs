import { motion } from "framer-motion";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";

function LandingPage() {
  return (
    <div className="min-h-screen relative w-[90%] mx-auto">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#e9fff1,_#ffe4e4,_#e4f5ff)] opacity-50"
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, #e9fff1, #ffe4e4, #e4f5ff)",
              "radial-gradient(circle at 60% 40%, #e4f5ff, #e9fff1, #ffe4e4)",
              "radial-gradient(circle at 40% 60%, #ffe4e4, #e4f5ff, #e9fff1)",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default LandingPage;
