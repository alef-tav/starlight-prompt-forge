const projects = [
  {
    title: "WOOPO Arquitetura",
    category: "Automação",
    color: "from-rose-900/40 to-rose-950/60",
    gridClass: "col-span-1 row-span-1",
  },
  {
    title: "One Power",
    category: "E-commerce",
    color: "from-teal-800/40 to-teal-950/60",
    gridClass: "col-span-1 row-span-2",
  },
  {
    title: "UnderPin",
    category: "Tráfego Pago",
    color: "from-amber-900/40 to-amber-950/60",
    gridClass: "col-span-1 row-span-1",
  },
  {
    title: "Tropical Açaí",
    category: "Social Media",
    color: "from-orange-800/40 to-orange-950/60",
    gridClass: "col-span-1 lg:col-span-2 row-span-1",
  },
  {
    title: "Klawns Travel",
    category: "Chatbot",
    color: "from-blue-900/40 to-blue-950/60",
    gridClass: "col-span-1 row-span-1",
  },
  {
    title: "Primo Rico",
    category: "Vídeo IA",
    color: "from-purple-800/40 to-purple-950/60",
    gridClass: "col-span-1 row-span-1",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Nosso <span className="text-gradient">Portfólio</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Projetos que transformaram negócios com soluções de IA
          </p>
        </div>

        {/* Bento Grid - Responsivo */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-[140px] sm:auto-rows-[160px] md:auto-rows-[180px]">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer border border-white/5 hover:border-white/10 transition-all duration-300 ${project.gridClass}`}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
              
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_50%)]" />
              
              {/* Glass overlay on hover */}
              <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center p-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">{project.title}</h3>
                  <span className="text-xs sm:text-sm text-muted-foreground glass-card px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Default content */}
              <div className="absolute inset-0 flex items-end p-4 sm:p-5 md:p-6 group-hover:opacity-0 transition-opacity duration-300">
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold">{project.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{project.category}</p>
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
