import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Heart, Code, Globe, Instagram } from "lucide-react";
import { socialLinks } from "../config/socialLinks";

export default function Footer() {
  const whatsappNumber = "221774829292";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const contactInfo = {
    address: "Dakar, Sénégal",
    email: "etoffelegante.contact@gmail.com",
    phone: "+221 77 141 82 82",
    whatsapp: "+221 77 141 82 82"
  };

  const hours = [
    { days: "Lundi - Vendredi", hours: "9h00 - 18h00" },
    { days: "Samedi", hours: "10h00 - 16h00" },
    { days: "Dimanche", hours: "Fermé" }
  ];

  // Lien Instagram pour NETMO
  const netmoInstagram = "https://www.instagram.com/netmoconsult?igsh=am1tY3MwY2VpNm93";

  return (
    <footer className="bg-white border-t border-gray-100 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        {/* 3 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Horaires */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">Horaires</h4>
            <ul className="space-y-2">
              {hours.map((slot, idx) => (
                <li key={idx} className="flex justify-between text-sm">
                  <span className="text-neutral-500">{slot.days}</span>
                  <span className="text-neutral-700">{slot.hours}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <span className="text-sm text-neutral-500">Livraison <span className="text-black font-medium">24h-48h</span></span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-neutral-400" />
                <span className="text-neutral-600 text-sm">{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-neutral-400" />
                <a href={`mailto:${contactInfo.email}`} className="text-neutral-600 text-sm hover:text-black transition">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-neutral-400" />
                <a href={`tel:${contactInfo.phone}`} className="text-neutral-600 text-sm hover:text-black transition">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Heart size={16} className="text-green-500" />
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-green-600 text-sm hover:text-green-700 transition">
                  WhatsApp: {contactInfo.whatsapp}
                </a>
              </li>
            </ul>
          </div>

          {/* Suivez-nous + Crédits + Liens légaux */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">Suivez-nous</h4>
            <div className="space-y-2 mb-4">
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block text-neutral-600 text-sm hover:text-pink-600 transition"
              >
                Instagram
              </a>
              <a 
                href={socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block text-neutral-600 text-sm hover:text-blue-600 transition"
              >
                Facebook
              </a>
            </div>
            
            {/* Liens légaux */}
            <div className="flex flex-wrap gap-3 mb-4">
              <Link to="/legal" className="text-neutral-400 text-xs hover:text-black transition">Mentions légales</Link>
              <Link to="/privacy" className="text-neutral-400 text-xs hover:text-black transition">Confidentialité</Link>
              <Link to="/terms" className="text-neutral-400 text-xs hover:text-black transition">CGV</Link>
            </div>
            
            {/* Crédits */}
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Code size={14} className="text-neutral-400" />
                <span className="text-neutral-500 text-xs">Conçu par</span>
                <a 
                  href={netmoInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-black font-medium text-xs hover:text-pink-600 transition"
                >
                  <Instagram size={12} /> NETMO
                </a>
              </div>
              <p className="text-neutral-400 text-xs flex items-center gap-1">
                <Globe size={12} /> Solutions digitales sur mesure
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 mt-8 pt-6 text-center">
          <p className="text-neutral-400 text-xs">
            © 2026 ÉTOFFE ÉLÉGANTE - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
