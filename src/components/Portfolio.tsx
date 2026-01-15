const projects = [
  {
    title: "WOOPO Arquitetura",
    category: "Automação",
    color: "from-emerald-500/20 to-emerald-900/20",
  },
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
