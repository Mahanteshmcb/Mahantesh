import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ParticleBackground } from '@/components/ParticleBackground';
import { AIChat } from '@/components/AIChat';
import {
  Brain,
  Code,
  Cpu,
  Shield,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Download,
  Sparkles,
  Zap,
  Globe,
  MessageSquare,
} from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { Project, BlogPost } from '@shared/schema';

const experiences = [
  {
    role: 'AI Engineer',
    company: 'VrindaAI Project',
    period: '2024 - Present',
    description: 'Leading development of an advanced AI assistant with natural language understanding capabilities.',
  },
  {
    role: 'IoT Developer',
    company: 'Academic Projects',
    period: '2023 - 2024',
    description: 'Built IoT solutions for smart home automation and industrial monitoring systems.',
  },
  {
    role: 'Cybersecurity Researcher',
    company: 'Independent Study',
    period: '2022 - 2023',
    description: 'Researching vulnerability assessment and penetration testing methodologies.',
  },
];

function AnimatedSection({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
      }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [heroText, setHeroText] = useState('Initializing Neural Interface...');
  const { toast } = useToast();

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const { data: blogPosts = [], isLoading: blogLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const contactMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      return await apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: 'Message sent!',
        description: "Thanks for reaching out. I'll get back to you soon!",
      });
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroText("Hi, I'm Mahantesh");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    contactMutation.mutate({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    });
    e.currentTarget.reset();
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              MB
            </motion.div>
            
            <div className="hidden md:flex items-center gap-8">
              {['about', 'projects', 'experience', 'blog', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors capitalize"
                  data-testid={`nav-${item}`}
                >
                  {item}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" data-testid="link-github">
                <Button size="icon" variant="ghost" className="hover-elevate">
                  <Github className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" data-testid="link-linkedin">
                <Button size="icon" variant="ghost" className="hover-elevate">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              key={heroText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse"
              style={{ animationDuration: '3s' }}
              data-testid="text-hero-title"
            >
              {heroText}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
              data-testid="text-hero-tagline"
            >
              AI Engineer | IoT & Cybersecurity | Creator of VrindaAI
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border-0 shadow-lg shadow-purple-500/50"
                data-testid="button-meet-ai"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Meet My AI
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('projects')}
                className="rounded-full px-8 py-6 text-lg bg-white/5 backdrop-blur-sm border-cyan-500/30 hover:border-cyan-500/50"
                data-testid="button-view-projects"
              >
                View Projects
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-cyan-400" />
          </motion.div>
        </div>
      </section>

      <AnimatedSection id="about" className="py-20 lg:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent" data-testid="text-about-title">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-8 lg:p-10 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 shadow-2xl shadow-purple-500/10">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-foreground">
                  I'm an AI Engineer passionate about building intelligent systems that push the boundaries of what's possible.
                  My journey spans across AI, IoT, and Cybersecurity, with a focus on creating practical solutions that make a real impact.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Currently working on VrindaAI, an advanced AI assistant project that combines natural language processing
                  with automation capabilities. I love exploring the intersection of AI and creative tools, from 3D automation
                  to intelligent video editing.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  When I'm not coding, I'm researching the latest developments in AI safety, IoT security, and neural networks.
                </p>
              </div>
            </Card>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Brain, label: 'AI Engineering', color: 'from-cyan-500 to-cyan-600' },
                { icon: Cpu, label: 'IoT Systems', color: 'from-purple-500 to-purple-600' },
                { icon: Shield, label: 'Cybersecurity', color: 'from-cyan-500 to-purple-500' },
                { icon: Code, label: 'Automation', color: 'from-purple-500 to-cyan-500' },
              ].map((skill, idx) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-6 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105 shadow-2xl shadow-purple-500/10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4`}>
                      <skill.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-foreground">{skill.label}</h3>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="projects" className="py-20 lg:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent" data-testid="text-projects-title">
            Featured Projects
          </h2>
          
          {projectsLoading ? (
            <div className="text-center text-muted-foreground">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                data-testid={`card-project-${project.id}`}
              >
                <Card className="h-full backdrop-blur-xl bg-white/5 border-white/10 p-8 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 shadow-2xl shadow-purple-500/10 group">
                  <div className="mb-4">
                    <Zap className="w-10 h-10 text-cyan-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full px-4 py-1.5 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </AnimatedSection>

      <AnimatedSection id="experience" className="py-20 lg:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent" data-testid="text-experience-title">
            Experience
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500" />
              
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative mb-12 ${idx % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto md:text-left'} md:w-1/2`}
                  data-testid={`experience-${idx}`}
                >
                  <div className="absolute left-0 md:left-auto md:right-[-1.125rem] top-0 w-5 h-5 rounded-full bg-cyan-500 border-4 border-background" />
                  
                  <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-6 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 shadow-2xl shadow-purple-500/10 ml-8 md:ml-0">
                    <div className="text-cyan-400 text-sm mb-2">{exp.period}</div>
                    <h3 className="text-xl font-bold mb-1 text-foreground">{exp.role}</h3>
                    <div className="text-purple-400 mb-3">{exp.company}</div>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 bg-white/5 backdrop-blur-sm border-cyan-500/30 hover:border-cyan-500/50"
                data-testid="button-download-resume"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="blog" className="py-20 lg:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent" data-testid="text-blog-title">
            Latest Thoughts
          </h2>
          
          {blogLoading ? (
            <div className="text-center text-muted-foreground">Loading blog posts...</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {blogPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                data-testid={`blog-post-${idx}`}
              >
                <Card className="h-full backdrop-blur-xl bg-white/5 border-white/10 p-8 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 shadow-2xl shadow-purple-500/10 hover:scale-105">
                  <div className="text-cyan-400 text-sm mb-3">{new Date(post.publishedAt).toLocaleDateString()}</div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{post.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </AnimatedSection>

      <AnimatedSection id="contact" className="py-20 lg:py-32 relative z-10">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent" data-testid="text-contact-title">
            Get In Touch
          </h2>
          
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-8 lg:p-10 shadow-2xl shadow-purple-500/10">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name"
                  required
                  className="bg-white/5 border-white/10 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-lg"
                  data-testid="input-contact-name"
                />
              </div>
              
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  className="bg-white/5 border-white/10 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-lg"
                  data-testid="input-contact-email"
                />
              </div>
              
              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="bg-white/5 border-white/10 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-lg resize-none"
                  data-testid="input-contact-message"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="flex-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border-0 shadow-lg shadow-purple-500/50"
                  data-testid="button-submit-contact"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => scrollToSection('about')}
                  className="flex-1 rounded-full bg-white/5 backdrop-blur-sm border-cyan-500/30 hover:border-cyan-500/50"
                  data-testid="button-talk-to-ai"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Talk to My AI
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </AnimatedSection>

      <footer className="py-12 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground mb-4" data-testid="text-footer">
              © 2025 Mahantesh Biradar — Engineered by AI.
            </p>
            
            <div className="flex justify-center gap-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:contact@example.com" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <AIChat />
    </div>
  );
}
