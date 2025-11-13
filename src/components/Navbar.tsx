import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

// Import logo
import Logo from "@/Images/ShePowerChain_logo_standby.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", description: "Main page" },
    { name: "Find Jobs", path: "/listings", description: "Browse opportunities" },
    { name: "My Skills", path: "/skills", description: "Verify what you know" },
    { name: "Get Mentorship", path: "/mentorship", description: "Learn from experts" },
    { name: "My Profile", path: "/profile", description: "Your information" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-300 border border-border">
              <img
                src={Logo}
                alt="ShePowerChain Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hidden sm:block">
              ShePowerChain
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="lg"
                  className={
                    isActive(item.path)
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground px-6"
                      : "hover:bg-muted px-6"
                  }
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              className="p-2 rounded-xl hover:bg-muted transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-7 h-7 text-foreground" />
              ) : (
                <Menu className="w-7 h-7 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-6 space-y-3 border-t border-border mt-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                <div
                  className={`p-4 rounded-2xl transition-all ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="text-lg font-semibold">{item.name}</div>
                  <div className={`text-sm ${isActive(item.path) ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;