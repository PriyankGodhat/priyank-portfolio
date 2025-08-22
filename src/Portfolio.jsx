import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Modal, ModalContent, InterestForm } from "./components/ui/modal";
import { Github, Linkedin, Mail, Info } from "lucide-react";
import { useState } from "react";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInterestFormOpen, setIsInterestFormOpen] = useState(false);
  const [interestProjectTitle, setInterestProjectTitle] = useState("");

  const projects = [
    {
      title: "ETABS Sync CLI Tool",
      description: "A professional-grade command-line tool for synchronizing changes between different versions of ETABS structural models using Git-like three-way merge algorithms, enabling collaborative structural engineering workflows.",
      image: "./CLI_Sync_demo.mp4",
      detailedDescription: {
        overview: "The ETABS Sync CLI Tool revolutionizes structural engineering collaboration by providing Git-like version control capabilities for ETABS models. This professional-grade tool enables multiple engineers to work on the same structural model simultaneously and safely merge their changes, eliminating the manual, error-prone process that currently exists in structural engineering workflows.",
        howToUse: [
          "Install Python 3.8+ and ensure ETABS is properly licensed and installed",
          "Use simple CLI commands: 'etabs-sync merge root.edb version_a.edb version_b.edb --output merged.edb'",
          "Configure workflow settings using YAML/JSON configuration files for team standards",
          "Run interactive mode for manual conflict resolution: '--interactive' flag",
          "Use batch operations to process multiple models: 'batch-sync --directory Models/'",
          "Generate comprehensive reports with '--backup' and '--validate' options",
          "Integrate into existing workflows through Python API or command-line scripting"
        ],
        howItWorks: [
          "Extracts structural data from three ETABS models: original (root) and two modified versions",
          "Performs Git-like three-way merge comparing changes from both versions against the original",
          "Uses sophisticated element matching algorithms with tolerance-based floating-point comparisons",
          "Detects conflicts when both versions modify the same structural elements",
          "Applies engineering-aware automatic resolution or prompts for interactive conflict resolution",
          "Validates all changes for structural integrity before applying to the original model",
          "Creates comprehensive backup and audit trails with rollback capabilities",
          "Generates detailed reports including executive summaries and technical analysis"
        ],
        benefits: [
          "Eliminates 2-3 hours of manual model comparison and merging per project phase",
          "Enables collaborative structural engineering workflows previously impossible",
          "Reduces risk of data loss with comprehensive backup and validation systems",
          "Processes large models (1000+ elements) in under 60 seconds with 95%+ success rates",
          "Provides complete audit trails for regulatory compliance and quality assurance",
          "Integrates seamlessly into existing engineering workflows via CLI or Python API",
          "Maintains structural integrity with safety-first engineering principles",
          "Foundation for future native ETABS plugin development for even better integration"
        ],
        technologies: ["Python 3.8+", "ETABS COM API", "Windows COM", "dataclasses", "psutil", "Click CLI", "PyTest", "YAML/JSON Configuration"]
      }
    },
    {
      title: "ETABS AI Copilot",
      description: "A production-ready Model Context Protocol (MCP) server that integrates Claude Desktop with ETABS software, enabling complete structural analysis workflows through natural language commands.",
      image: "./images/etabs-copilot-demo.png",
      detailedDescription: {
        overview: "The ETABS AI Copilot is a revolutionary MCP server that bridges Claude Desktop with ETABS structural analysis software, allowing engineers to perform complete structural analysis workflows through conversational AI. This tool transforms how structural engineers interact with complex analysis software by enabling natural language commands for modeling, analysis, and result interpretation.",
        features: [
          "Natural language interface for complete ETABS workflows",
          "Automated model creation with materials, sections, and elements",
          "Intelligent load pattern creation and application",
          "Real-time analysis execution and progress monitoring",
          "Automated result extraction and interpretation",
          "Context-aware state management with validation logic",
          "Comprehensive error handling with user-friendly messages",
          "Support for multi-story frame and complex structural systems"
        ],
        technologies: ["Python", "ETABS COM API", "Model Context Protocol (MCP)", "Claude Desktop", "Windows COM", "Pytest"],
        challenges: "The primary challenge was creating a robust bridge between AI language models and the complex ETABS COM API while maintaining reliability for production structural analysis work. This required developing comprehensive error handling, state validation, and ensuring the AI could understand and execute complex structural engineering workflows accurately.",
        outcome: "Successfully deployed as a production-ready tool with 100% test coverage and 18 complete MCP tools. Enables structural engineers to reduce modeling time by 60% and perform complex analysis workflows through simple conversational commands, making structural analysis more accessible and efficient."
      }
    },
    {
      title: "ETABS API Script Writing AI Agent",
      description: "An intelligent MCP server that enables AI models to perform semantic searches on ETABS documentation, helping engineers write API scripts through natural language queries and contextual documentation lookup.",
      image: "./images/etabs-docs-mcp-demo.mp4",
      detailedDescription: {
        overview: "The ETABS Documentation Assistant is a sophisticated Model Context Protocol (MCP) server that revolutionizes how structural engineers access and utilize ETABS API documentation. By leveraging local sentence transformer models and ChromaDB vector storage, this tool enables AI models like Claude to perform intelligent semantic searches on ETABS documentation, making API script writing more accessible and efficient.",
        features: [
          "Semantic search through ETABS documentation using natural language queries",
          "Local embedding generation with sentence transformer models for privacy",
          "ChromaDB vector storage for fast and accurate document retrieval",
          "Integration with Claude Desktop through Model Context Protocol",
          "Contextual documentation snippets with source file references",
          "No internet dependency after initial setup - fully local operation",
          "Support for .chm documentation file processing and indexing",
          "Real-time query processing with sub-second response times"
        ],
        technologies: ["Node.js", "Python", "ChromaDB", "Sentence Transformers", "Model Context Protocol (MCP)", "Docker", "Xenova/transformers.js"],
        challenges: "The main challenge was creating an efficient local embedding system that could process large technical documentation while maintaining fast query response times. This required optimizing the chunking strategy for technical content, implementing robust error handling for various documentation formats, and ensuring seamless integration between the Python indexing pipeline and Node.js MCP server.",
        outcome: "Successfully deployed as a production-ready tool that reduces documentation lookup time from 5+ minutes to under 30 seconds. Engineers can now write ETABS API scripts more efficiently by getting instant access to relevant documentation sections through natural language queries, significantly improving productivity in structural analysis automation projects."
      }
    },
    {
      title: "Structural Code Chatbot",
      description: "A Retrieval-Augmented Generation (RAG) chatbot that allows structural engineers to quickly look up information from AISC, ASCE, and ACI codes with detailed accuracy and precise references.",
      image: "./images/structural-code-chatbot.png",
      detailedDescription: {
        overview: "The Structural Code Chatbot is a specialized RAG-based AI assistant designed specifically for structural engineers who need quick, accurate access to building code information. This tool transforms how engineers interact with complex structural codes by providing instant, contextual answers with precise references to AISC 360, ASCE 7, and ACI 318 standards.",
        features: [
          "Natural language queries for structural code information",
          "Comprehensive coverage of AISC 360 (Steel Construction Manual)",
          "Complete ASCE 7 wind and seismic load provisions access",
          "Detailed ACI 318 concrete design code references",
          "Precise section and equation citations for every answer",
          "Contextual understanding of engineering terminology and concepts",
          "Quick response times for time-sensitive design decisions",
          "Copy-to-clipboard functionality for easy reference integration"
        ],
        technologies: ["Python", "Retrieval-Augmented Generation (RAG)", "Vector Embeddings", "Natural Language Processing", "Streamlit", "FAISS", "OpenAI API"],
        challenges: "The primary challenge was ensuring high accuracy and reliability when dealing with complex structural engineering codes that have intricate relationships between sections, equations, and provisions. This required sophisticated document chunking strategies, precise embedding techniques, and careful prompt engineering to maintain engineering accuracy while providing user-friendly responses.",
        outcome: "Successfully reduced code lookup time from 5+ minutes to under 30 seconds for typical engineering queries. Engineers can now quickly verify design requirements, load combinations, and code provisions without interrupting their design workflow, significantly improving productivity during the design process and reducing the risk of code compliance errors."
      }
    },
  ];

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const openInterestForm = (projectTitle) => {
    setInterestProjectTitle(projectTitle);
    setIsInterestFormOpen(true);
  };

  const closeInterestForm = () => {
    setIsInterestFormOpen(false);
    setInterestProjectTitle("");
  };

  const handleInterestSubmit = (formData) => {
    // Here you can handle the form submission
    // For now, we'll just log it to console
    console.log("Interest form submitted:", {
      project: interestProjectTitle,
      ...formData
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold tracking-tight">Priyank Godhat</h1>
          <nav className="hidden md:flex space-x-6 text-sm">
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-primary">Automation</span> in<br />
            Structural Engineering
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
          Empowering structural design through automation and computational tools.
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

      {/* Projects */}
      <section id="projects" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    {project.title === "ETABS Sync CLI Tool" ? (
                      <video 
                        src="./CLI_Sync_demo.mp4"
                        className="w-full h-full object-cover"
                        controls
                        muted
                        loop
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : project.title === "ETABS AI Copilot" ? (
                      <video 
                        src="./images/etabs-copilot-demo.mp4"
                        className="w-full h-full object-cover"
                        controls
                        muted
                        loop
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : project.title === "ETABS API Script Writing AI Agent" ? (
                      <video 
                        src="./images/etabs-docs-mcp-demo.mp4"
                        className="w-full h-full object-cover"
                        controls
                        muted
                        loop
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-lg mb-3">{project.title}</CardTitle>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => openModal(project)}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      Learn More
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

      {/* About Me */}
      <section id="about" className="py-16 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2">
              <p className="text-muted-foreground leading-relaxed mb-6">
              Hi, I’m Priyank! I’m a structural engineer who loves finding creative ways to make engineering faster and smarter through automation. After finishing my master’s in Structural Engineering at Georgia Tech (go Jackets!) I started blending my technical background with my interest in coding to build tools like AI copilots, design code chatbots, and parametric workflows. These projects cut down repetitive tasks and let engineers focus more on design, the fun part of the job!
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
              When I’m not tinkering with new ideas for engineering tools, you’ll probably find me out on the soccer field or trying to learn a new language (I’m always curious about how people communicate beyond just numbers and drawings). I like keeping a mix of problem-solving, creativity, and play in my life and that same mindset shapes the tools I create!
              </p>
              <div className="flex flex-wrap gap-2">
                {["ETABS", "SAP 2000", "ADAPT Builder", "Python", "AI/ML", "Grasshopper", "REVIT", "Post-Tensioned Design", "Steel Design"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 rounded-full overflow-hidden">
                <img 
                  src="./images/profile-photo.jpeg" 
                  alt="Priyank Godhat"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
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
              <a href="mailto:priyankgodhat121@gmail.com" className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://www.linkedin.com/in/priyank-godhat-a43535151/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/PriyankGodhat" target="_blank" rel="noopener noreferrer" className="flex items-center">
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
          <p>© {new Date().getFullYear()} Priyank Godhat. All rights reserved.</p>
        </div>
      </footer>

      {/* Project Details Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedProject && (
          <ModalContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
                {selectedProject.title === "ETABS Sync CLI Tool" ? (
                  <video 
                    src="./CLI_Sync_demo.mp4"
                    className="w-full h-auto rounded-lg mb-4"
                    controls
                    muted
                    loop
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : selectedProject.title === "ETABS AI Copilot" ? (
                  <video 
                    src="./images/etabs-copilot-demo.mp4"
                    className="w-full h-auto rounded-lg mb-4"
                    controls
                    muted
                    loop
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : selectedProject.title === "ETABS API Script Writing AI Agent" ? (
                  <video 
                    src="./images/etabs-docs-mcp-demo.mp4"
                    className="w-full h-auto rounded-lg mb-4"
                    controls
                    muted
                    loop
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2">Overview</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProject.detailedDescription.overview}
                </p>
              </div>

              {selectedProject.detailedDescription.howToUse ? (
                <>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">How to Use It</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {selectedProject.detailedDescription.howToUse.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">How It Works</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {selectedProject.detailedDescription.howItWorks.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">Benefits</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {selectedProject.detailedDescription.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Key Features</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {selectedProject.detailedDescription.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">Challenges & Solutions</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.detailedDescription.challenges}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">Results & Impact</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.detailedDescription.outcome}
                    </p>
                  </div>
                </>
              )}

              <div>
                <h4 className="text-lg font-semibold mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.detailedDescription.technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                {selectedProject.title === "ETABS AI Copilot" || selectedProject.title === "ETABS Sync CLI Tool" || selectedProject.title === "Structural Code Chatbot" ? (
                  <Button 
                    className="w-full"
                    onClick={() => {
                      closeModal();
                      openInterestForm(selectedProject.title);
                    }}
                  >
                    Interested in trying
                  </Button>
                ) : selectedProject.title === "ETABS API Script Writing AI Agent" ? (
                  <Button 
                    className="w-full"
                    asChild
                  >
                    <a href="https://github.com/PriyankGodhat/etabs-mcp-server-local-embeddings" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      <Github className="w-4 h-4 mr-2" />
                      View Source Code
                    </a>
                  </Button>
                ) : (
                  <>
                    <Button className="flex-1">
                      <Github className="w-4 h-4 mr-2" />
                      View Source Code
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Live Demo
                    </Button>
                  </>
                )}
              </div>
            </div>
          </ModalContent>
        )}
      </Modal>

      {/* Interest Form Modal */}
      {isInterestFormOpen && (
        <InterestForm
          projectTitle={interestProjectTitle}
          onClose={closeInterestForm}
          onSubmit={handleInterestSubmit}
        />
      )}
    </div>
  );
}