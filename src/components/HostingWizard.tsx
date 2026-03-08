import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Globe,
  Rocket,
  ArrowRight,
  ArrowLeft,
  Check,
  ExternalLink,
  Copy,
  Terminal,
  Upload,
  FolderOpen,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HostingWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateTitle?: string;
}

type Platform = "lovable" | "vercel" | "netlify" | null;

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  command?: string;
  link?: { url: string; label: string };
}

const platformConfig: Record<"lovable" | "vercel" | "netlify", { name: string; color: string; steps: Step[] }> = {
  lovable: {
    name: "Lovable",
    color: "bg-primary text-primary-foreground",
    steps: [
      {
        title: "Extract Your Template",
        description: "Unzip the downloaded template files to a folder on your computer.",
        icon: <FolderOpen className="w-5 h-5" />,
        details: [
          "Locate the downloaded .zip file",
          "Extract it to a folder of your choice",
          "Open the folder to verify all files are present",
        ],
      },
      {
        title: "Create a Lovable Project",
        description: "Go to Lovable and create a new project, then upload or import your template code.",
        icon: <Upload className="w-5 h-5" />,
        details: [
          "Visit lovable.dev and sign in",
          "Click 'New Project' from the dashboard",
          "Describe your template or paste the code to get started",
        ],
        link: { url: "https://lovable.dev", label: "Open Lovable" },
      },
      {
        title: "Publish Your Site",
        description: "Click the Publish button in the top-right corner to make your site live.",
        icon: <Rocket className="w-5 h-5" />,
        details: [
          "Click the 'Publish' button in the editor",
          "Your site will be live on a .lovable.app domain",
          "Optionally connect a custom domain in Settings → Domains",
        ],
      },
    ],
  },
  vercel: {
    name: "Vercel",
    color: "bg-foreground text-background",
    steps: [
      {
        title: "Push to GitHub",
        description: "Upload your template code to a GitHub repository.",
        icon: <Upload className="w-5 h-5" />,
        details: [
          "Create a new repository on GitHub",
          "Initialize git in your template folder",
          "Push the code to your repository",
        ],
        command: "git init && git add . && git commit -m \"Initial commit\" && git push",
      },
      {
        title: "Import in Vercel",
        description: "Connect your GitHub repo to Vercel for automatic deployments.",
        icon: <Globe className="w-5 h-5" />,
        details: [
          "Go to vercel.com and sign in with GitHub",
          "Click 'Add New Project'",
          "Select your template repository",
          "Vercel will auto-detect the framework settings",
        ],
        link: { url: "https://vercel.com/new", label: "Open Vercel" },
      },
      {
        title: "Deploy & Go Live",
        description: "Click Deploy and your site will be live in seconds.",
        icon: <Rocket className="w-5 h-5" />,
        details: [
          "Review the build settings (usually no changes needed)",
          "Click 'Deploy'",
          "Your site will be live on a .vercel.app domain",
          "Add a custom domain in Project Settings → Domains",
        ],
      },
    ],
  },
  netlify: {
    name: "Netlify",
    color: "bg-[hsl(172,60%,40%)] text-white",
    steps: [
      {
        title: "Build Your Template",
        description: "Run the build command to generate production-ready files.",
        icon: <Terminal className="w-5 h-5" />,
        details: [
          "Open a terminal in your template folder",
          "Install dependencies first",
          "Run the build command to create the dist folder",
        ],
        command: "npm install && npm run build",
      },
      {
        title: "Deploy to Netlify",
        description: "Drag and drop your build folder or connect via Git.",
        icon: <Upload className="w-5 h-5" />,
        details: [
          "Go to app.netlify.com and sign in",
          "Drag the 'dist' folder onto the deploy area",
          "Or click 'Add new site' → 'Import from Git'",
        ],
        link: { url: "https://app.netlify.com", label: "Open Netlify" },
      },
      {
        title: "Configure & Go Live",
        description: "Set up your domain and deploy settings.",
        icon: <Rocket className="w-5 h-5" />,
        details: [
          "Your site is live on a .netlify.app domain",
          "Go to Site settings → Domain management",
          "Add your custom domain",
          "SSL is automatically configured",
        ],
      },
    ],
  },
};

const HostingWizard = ({ open, onOpenChange, templateTitle }: HostingWizardProps) => {
  const [platform, setPlatform] = useState<Platform>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setPlatform(null);
      setCurrentStep(0);
    }, 300);
  };

  const handleCopyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    toast({ title: "Copied!", description: "Command copied to clipboard." });
  };

  const steps = platform ? platformConfig[platform].steps : [];
  const progress = platform ? ((currentStep + 1) / steps.length) * 100 : 0;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {!platform ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-display flex items-center gap-2">
                <Rocket className="w-5 h-5 text-primary" />
                Start Hosting
              </DialogTitle>
              <DialogDescription>
                {templateTitle
                  ? `Choose a platform to host "${templateTitle}"`
                  : "Choose a hosting platform for your template"}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 mt-4">
              {(["lovable", "vercel", "netlify"] as const).map((p) => {
                const config = platformConfig[p];
                return (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all text-left group"
                  >
                    <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center shrink-0`}>
                      <Globe className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground">{config.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {p === "lovable" && "Easiest — no code setup needed"}
                        {p === "vercel" && "Great for React & Next.js projects"}
                        {p === "netlify" && "Simple drag-and-drop deployment"}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge className={platformConfig[platform].color}>
                  {platformConfig[platform].name}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
              <Progress value={progress} className="h-1.5 mb-2" />
              <DialogTitle className="text-lg font-display flex items-center gap-2">
                {steps[currentStep].icon}
                {steps[currentStep].title}
              </DialogTitle>
              <DialogDescription>{steps[currentStep].description}</DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-3">
              {steps[currentStep].details.map((detail, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                  <p className="text-sm text-foreground">{detail}</p>
                </div>
              ))}

              {steps[currentStep].command && (
                <div className="mt-4 bg-muted rounded-lg p-3 flex items-center gap-2">
                  <code className="text-xs text-foreground flex-1 font-mono break-all">
                    {steps[currentStep].command}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 h-8 w-8"
                    onClick={() => handleCopyCommand(steps[currentStep].command!)}
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )}

              {steps[currentStep].link && (
                <a
                  href={steps[currentStep].link!.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="gap-2 mt-2">
                    <ExternalLink className="w-3.5 h-3.5" />
                    {steps[currentStep].link!.label}
                  </Button>
                </a>
              )}
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (currentStep === 0) {
                    setPlatform(null);
                  } else {
                    setCurrentStep((s) => s - 1);
                  }
                }}
                className="gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                {currentStep === 0 ? "Back" : "Previous"}
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  size="sm"
                  onClick={() => setCurrentStep((s) => s + 1)}
                  className="gap-1"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button size="sm" onClick={handleClose} className="gap-1">
                  <Check className="w-4 h-4" /> Done
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HostingWizard;
