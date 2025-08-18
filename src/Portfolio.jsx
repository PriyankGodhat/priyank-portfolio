import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function Portfolio() {
  const projects = [
    {
      title: "AI-Powered Project Management Tool",
      description: "A comprehensive project management application with AI-driven task prioritization and timeline optimization.",
      image: "https://via.placeholder.com/400x200/f3f4f6/6b7280?text=Project+1"
    },
    {
      title: "E-commerce Analytics Dashboard",
      description: "Real-time analytics dashboard for e-commerce platforms with advanced data visualization and reporting features.",
      image: "https://via.placeholder.com/400x200/f3f4f6/6b7280?text=Project+2"
    },
    {
      title: "Mobile Fitness Tracking App",
      description: "Cross-platform mobile application for fitness tracking with social features and personalized workout plans.",
      image: "https://via.placeholder.com/400x200/f3f4f6/6b7280?text=Project+3"
    },
    {
      title: "Smart Home Automation System",
      description: "IoT-based home automation system with voice control and machine learning for predictive automation.",
      image: "https://via.placeholder.com/400x200/f3f4f6/6b7280?text=Project+4"
    },
    {
      title: "Real-time Chat Application",
      description: "Scalable real-time messaging platform with end-to-end encryption and multimedia sharing capabilities.",
      image: "https://via.placeholder.com/400x200/f3f4f6/6b7280?text=Project+5"
    },
    {
      title: "Machine Learning API Service",
      description: "RESTful API service providing machine learning models for text analysis and image recognition.",
      image: "https://via.placeholder.com/400x200/f3f4f6/6b7280?text=Project+6"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold tracking-tight">John Doe</h1>
          <nav className="hidden md:flex space-x-6 text-sm">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Building Digital
            <span className="text-primary"> Experiences</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Full-stack developer passionate about creating innovative solutions
            and beautiful user experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="py-16 px-6 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm a passionate full-stack developer with over 5 years of experience
                creating digital solutions that make a difference. I specialize in
                modern web technologies and have a keen eye for design and user experience.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with the
                developer community through blogs and talks.
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "TypeScript", "Python", "AWS", "Docker"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-muted rounded-full flex items-center justify-center">
                <span className="text-muted-foreground">Profile Photo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-lg mb-3">{project.title}</CardTitle>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-6xl mx-auto" />

      {/* Contact */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            I'm always interested in new opportunities and exciting projects.
            Whether you have a project in mind or just want to chat, I'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" asChild>
              <a href="mailto:john.doe@example.com" className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://linkedin.com/in/johndoe" className="flex items-center">
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/johndoe" className="flex items-center">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6 text-center text-sm text-muted-foreground">
        <div className="max-w-6xl mx-auto">
          <p>© {new Date().getFullYear()} John Doe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}