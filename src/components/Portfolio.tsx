import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

const projects = [
  {
    title: "One Power",
    category: "E-commerce",
    color: "from-cyan-500/20 to-cyan-900/20",
  },
  {
    title: "UnderPin",
    category: "Tráfego Pago",
    color: "from-amber-500/20 to-amber-900/20",
  },
  {
    title: "Tropical Açaí",
    category: "Social Media",
    color: "from-rose-500/20 to-rose-900/20",
  },
  {
    title: "Klawns Travel",
    category: "Chatbot",
    color: "from-blue-500/20 to-blue-900/20",
  },
  {
    title: "Primo Rico",
    category: "Vídeo IA",
    color: "from-purple-500/20 to-purple-900/20",
  },
];

const Portfolio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <section id="portfolio" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nosso <span className="text-gradient">Portfólio</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Projetos que transformaram negócios com soluções de IA
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Video Card - Comerciais IA */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group cursor-pointer">
            <video
              ref={videoRef}
              src="/videos/ai-comercial.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              onEnded={handleVideoEnded}
              playsInline
              muted
            />
            
            {/* Overlay gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
            
            {/* Play button */}
            <button
              onClick={toggleVideo}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
            >
              <div className="w-16 h-16 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-primary/30">
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-primary-foreground" />
                ) : (
                  <Play className="w-6 h-6 text-primary-foreground ml-1" />
                )}
              </div>
            </button>

            {/* Content overlay */}
            <div className={`absolute inset-0 flex items-end p-6 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
              <div>
                <h3 className="text-lg font-semibold mb-1">Comerciais com IA</h3>
                <p className="text-sm text-muted-foreground mb-2">Criativos de Alta Conversão</p>
                <p className="text-xs text-muted-foreground/80 leading-relaxed max-w-xs">
                  Criamos comerciais e criativos de alta conversão com IA. Inclusive seu próprio influencer IA para o seu negócio.
                </p>
              </div>
            </div>
          </div>

          {/* Regular project cards */}
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden group cursor-pointer"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
              
              {/* Glass overlay on hover */}
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-4">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <span className="text-sm text-muted-foreground glass-card px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Default content */}
              <div className="absolute inset-0 flex items-end p-6 group-hover:opacity-0 transition-opacity duration-300">
                <div>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
