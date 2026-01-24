const technologies = [
  { name: "React", icon: "⚛️", color: "bg-blue-100 text-blue-600" },
  { name: "TypeScript", icon: "📘", color: "bg-blue-100 text-blue-700" },
  { name: "Tailwind CSS", icon: "🎨", color: "bg-teal-100 text-teal-600" },
  { name: "Framer Motion", icon: "🎬", color: "bg-purple-100 text-purple-600" },
  { name: "Vite", icon: "⚡", color: "bg-yellow-100 text-yellow-600" },
  { name: "React Router", icon: "🛤️", color: "bg-red-100 text-red-600" },
];

const browserSupport = [
  { name: "Chrome", version: "90+" },
  { name: "Firefox", version: "88+" },
  { name: "Safari", version: "14+" },
  { name: "Edge", version: "90+" },
];

const TemplateTechStack = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-foreground">
        Tech Stack & Compatibility
      </h2>

      {/* Technologies */}
      <div className="glass-card p-6 rounded-xl border border-border/50">
        <h3 className="font-semibold text-foreground mb-4">Built With</h3>
        <div className="flex flex-wrap gap-3">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-full flex items-center gap-2 ${tech.color} font-medium text-sm transition-transform hover:scale-105`}
            >
              <span>{tech.icon}</span>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Browser Support */}
      <div className="glass-card p-6 rounded-xl border border-border/50">
        <h3 className="font-semibold text-foreground mb-4">Browser Support</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {browserSupport.map((browser, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="text-2xl mb-1">🌐</div>
              <div className="font-medium text-foreground">{browser.name}</div>
              <div className="text-sm text-muted-foreground">{browser.version}</div>
            </div>
          ))}
        </div>
      </div>

      {/* File Structure Preview */}
      <div className="glass-card p-6 rounded-xl border border-border/50">
        <h3 className="font-semibold text-foreground mb-4">Clean File Structure</h3>
        <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm text-muted-foreground">
          <pre>{`📁 shopflow-pro/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 ui/
│   │   ├── 📁 layout/
│   │   └── 📁 features/
│   ├── 📁 pages/
│   ├── 📁 hooks/
│   ├── 📁 lib/
│   └── 📁 styles/
├── 📁 public/
├── 📄 package.json
└── 📄 README.md`}</pre>
        </div>
      </div>
    </div>
  );
};

export default TemplateTechStack;
