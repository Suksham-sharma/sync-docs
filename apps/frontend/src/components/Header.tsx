import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import Button from "./ui/Button";

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );

  const borderOpacity = useTransform(scrollY, [0, 50], ["0", "0.1"]);

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full py-4 backdrop-blur-xl transition-shadow duration-200 ${
        isScrolled ? "shadow-sm" : ""
      }`}
      style={{
        backgroundColor,
        borderBottom: useTransform(
          borderOpacity,
          (opacity) => `1px solid rgba(0, 0, 0, ${opacity})`
        ),
      }}
    >
      <div className="container flex items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="/" className="mr-8 text-xl font-semibold">
            CollabDocs
          </a>
        </motion.div>
        <nav className="flex flex-1 items-center gap-6 text-sm">
          <motion.div
            className="flex items-center gap-1 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Features
            <BiChevronDown className="h-4 w-4" />
          </motion.div>
          {["Customers", "Enterprise", "Pricing", "Docs", "Contact sales"].map(
            (item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <a
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-foreground/80 hover:text-foreground"
                >
                  {item}
                </a>
              </motion.div>
            )
          )}
        </nav>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800">
            Sign in →
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}
