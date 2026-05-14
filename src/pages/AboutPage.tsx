import { Link } from "react-router-dom";
import { Heart, Award, Sparkles, Shield, Leaf, Users, Clock, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Heart,
      title: "Artisanat local",
      description: "Créations réalisées par des artisans sénégalais passionnés"
    },
    {
      icon: Award,
      title: "Qualité premium",
      description: "Tissus soigneusement sélectionnés pour leur excellence"
    },
    {
      icon: Sparkles,
      title: "Authenticité",
      description: "Designs uniques qui racontent une histoire"
    },
    {
      icon: Shield,
      title: "Mode responsable",
      description: "Production éthique et durable"
    }
  ];

  const stats = [
    { value: "2021", label: "Année de création", icon: Clock },
    { value: "100%", label: "Artisanal sénégalais", icon: Leaf },
    { value: "50+", label: "Créateurs partenaires", icon: Users },
    { value: "Dakar", label: "Made in Sénégal", icon: MapPin }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section sans photo */}
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-3">
            À propos
          </h1>
          <div className="w-12 h-px bg-black mx-auto"></div>
        </div>
      </div>

      {/* Histoire */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-wider text-neutral-400 border-b border-neutral-200 pb-2">
            Notre histoire
          </span>
          <h2 className="text-3xl font-light mt-6">🌿 Étoffe Élégante</h2>
        </div>
        
        <div className="space-y-5 text-neutral-600 leading-relaxed">
          <p>
            <strong>Fondée en décembre 2021</strong>, Étoffe Élégante est une maison de style et de raffinement 
            née au <strong>Sénégal</strong>. Depuis nos débuts, nous célébrons l'artisanat local en proposant 
            une sélection de <strong>tissus authentiques</strong> et de <strong>sacs uniques</strong>, conçus 
            par des créateurs sénégalais passionnés.
          </p>
          <p>
            Notre mission est de valoriser le <strong>savoir‑faire national</strong>, en offrant des pièces 
            qui allient <strong>tradition et modernité</strong>, tout en reflétant l'élégance intemporelle 
            de la culture sénégalaise.
          </p>
          <p className="bg-neutral-50 p-6 rounded-xl italic border-l-4 border-black">
            « Chaque produit raconte une histoire : celle des mains qui l'ont façonné, 
            de la richesse des matières, et de l'engagement pour une mode responsable 
            et enracinée dans son territoire. »
          </p>
          <p>
            Bienvenue dans l'univers d'<strong>Étoffe Élégante</strong>, où chaque détail est pensé pour sublimer 
            votre style avec <strong>authenticité et prestige</strong>.
          </p>
        </div>
      </div>

      {/* Valeurs */}
      <div className="bg-neutral-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-wider text-neutral-400">Notre philosophie</span>
            <h2 className="text-3xl font-light mt-2">Nos valeurs</h2>
            <div className="w-12 h-px bg-black mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-center">
                <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-black" />
                </div>
                <h3 className="font-medium text-lg mb-2">{value.title}</h3>
                <p className="text-neutral-500 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chiffres clés */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-wider text-neutral-400">En chiffres</span>
          <h2 className="text-3xl font-light mt-2">Étoffe Élégante en quelques chiffres</h2>
          <div className="w-12 h-px bg-black mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-black" />
              </div>
              <p className="text-4xl font-light">{stat.value}</p>
              <p className="text-neutral-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement */}
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Leaf className="w-10 h-10 mx-auto mb-4 opacity-70" />
          <h2 className="text-2xl font-light mb-3">Un engagement pour l'Afrique</h2>
          <p className="text-neutral-400 mb-6 leading-relaxed text-sm">
            Nous croyons en une mode qui valorise les talents locaux et respecte l'environnement. 
            Chaque pièce Étoffe Élégante est pensée pour durer et pour mettre en valeur 
            le riche patrimoine artisanal sénégalais.
          </p>
          <Link 
            to="/shop" 
            className="inline-block border border-white px-6 py-2 rounded-full text-xs uppercase tracking-wider hover:bg-white hover:text-black transition"
          >
            Découvrir nos collections
          </Link>
        </div>
      </div>
    </div>
  );
}