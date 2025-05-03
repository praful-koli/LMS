import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0">
        
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold mb-2">EduMaster LMS</h2>
          <p className="text-gray-400 max-w-sm">
            Transforming online learning with intuitive features and seamless experience.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-16">
          {/* Navigation */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/courses" className="hover:text-white">Courses</a></li>
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/cookies" className="hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-gray-400">
            <a href="#" aria-label="Facebook"><Facebook className="hover:text-white" /></a>
            <a href="#" aria-label="Twitter"><Twitter className="hover:text-white" /></a>
            <a href="#" aria-label="Instagram"><Instagram className="hover:text-white" /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin className="hover:text-white" /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} E-Learning LMS. All rights reserved.
      </div>
    </footer>
  );
}
