import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ParticleBackground } from '@/components/ParticleBackground';
import { CursorFollow } from '@/components/CursorFollow';
import { MatrixRain } from '@/components/MatrixRain';
import { FeedbackModal } from '@/components/FeedbackModal';
import { RotatingWaveform } from '@/components/RotatingWaveform';
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
  FileText,
  Award,
  Mic,
  Moon,
  Sun,
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
    description: 'Leading development of an advanced multi-agent AI assistant with natural language understanding and task automation capabilities.',
  },
  {
    role: 'IoT Developer',
    company: 'Academic Projects',
    period: '2023 - 2024',
    description: 'Built IoT solutions for smart home automation and industrial monitoring systems with focus on security.',
  },
  {
    role: 'Cybersecurity Researcher',
    company: 'Independent Study',
    period: '2022 - 2023',
    description: 'Researching vulnerability assessment, penetration testing methodologies, and security automation tools.',
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
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
            staggerChildren: 0.1,
          },
        },
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
  const [heroSubtext, setHeroSubtext] = useState('');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [aiMode, setAiMode] = useState(false);
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
    const timer1 = setTimeout(() => {
      setHeroText("Hi, I'm Mahantesh Biradar");
    }, 2000);
    
    const timer2 = setTimeout(() => {
      setHeroSubtext("AI Engineer | IoT Innovator | Creator of VrindaAI");
    }, 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
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
    <div className={`relative min-h-screen transition-all duration-500 ${aiMode ? 'brightness-75' : ''}`}>
      <CursorFollow />
      <ParticleBackground />
      <MatrixRain />
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
      
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/60 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"
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
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setAiMode(!aiMode)}
                className="hover-elevate"
                data-testid="button-ai-mode"
                title="AI Mode"
              >
                {aiMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <a href="https://github.com/mahanteshbiradar" target="_blank" rel="noopener noreferrer" data-testid="link-github">
                <Button size="icon" variant="ghost" className="hover-elevate">
                  <Github className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://linkedin.com/in/mahanteshbiradar" target="_blank" rel="noopener noreferrer" data-testid="link-linkedin">
                <Button size="icon" variant="ghost" className="hover-elevate">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
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
              className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 relative"
              data-testid="text-hero-title"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent animate-pulse inline-block" style={{ animationDuration: '3s' }}>
                {heroText}
              </span>
              <motion.span
                className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-2xl -z-10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: heroSubtext ? 1 : 0, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
              data-testid="text-hero-tagline"
            >
              {heroSubtext}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: heroSubtext ? 1 : 0, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center items-center mb-8"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="rounded-full px-8 py-6 text-base bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 border-0 shadow-lg shadow-cyan-500/50"
                data-testid="button-meet-ai"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Meet My AI Assistant
              </Button>
              
              <a href="https://drive.google.com/file/d/your_resume_id/view" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-base bg-white/5 backdrop-blur-sm border-cyan-500/30 hover:border-cyan-500/50"
                  data-testid="button-resume"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  View Resume
                </Button>
              </a>
              
              <a href="https://drive.google.com/drive/folders/your_certificates_folder_id" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-base bg-white/5 backdrop-blur-sm border-violet-500/30 hover:border-violet-500/50"
                  data-testid="button-certificates"
                >
                  <Award className="w-5 h-5 mr-2" />
                  Certificates
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: heroSubtext ? 1 : 0, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-3 justify-center items-center"
            >
              <a href="https://linkedin.com/in/mahanteshbiradar" target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="ghost" className="hover-elevate">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </a>
              
              <a href="https://github.com/mahanteshbiradar" target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="ghost" className="hover-elevate">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </a>
              
              <a href="mailto:mahantesh@example.com">
                <Button size="sm" variant="ghost" className="hover-elevate">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Me
                </Button>
              </a>
              
              <Button 
                size="sm" 
                variant="ghost" 
                className="hover-elevate"
                onClick={() => setIsFeedbackOpen(true)}
                data-testid="button-feedback"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Leave Feedback
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
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"
            data-testid="text-about-title"
          >
            About Me
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="backdrop-blur-xl bg-black/40 border-cyan-500/20 p-8 lg:p-10 hover:bg-black/50 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl shadow-cyan-500/10">
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-foreground">
                    I'm an AI Engineer with a passion for building intelligent systems that push the boundaries of innovation.
                    My journey encompasses AI, IoT, and Cybersecurity, with a relentless focus on creating practical, impactful solutions.
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Currently leading VrindaAI—an advanced multi-agent AI assistant that combines natural language processing
                    with powerful automation capabilities. I thrive at the intersection of AI and creative tools, from 3D automation
                    pipelines to intelligent video editing systems.
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    My vision is to democratize AI technology, making sophisticated systems accessible and practical for everyday applications.
                    When I'm not coding, I'm deep-diving into AI safety research, IoT security architectures, and neural network optimization.
                  </p>
                </div>
              </Card>
            </motion.div>
            
            <div>
              <RotatingWaveform />
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                {[
                  { icon: Brain, label: 'AI Engineering', color: 'from-cyan-500 to-cyan-600' },
                  { icon: Cpu, label: 'IoT Systems', color: 'from-violet-500 to-violet-600' },
                  { icon: Shield, label: 'Cybersecurity', color: 'from-cyan-500 to-violet-500' },
                  { icon: Code, label: 'Automation', color: 'from-violet-500 to-cyan-500' },
                ].map((skill, idx) => (
                  <motion.div
                    key={skill.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="backdrop-blur-xl bg-black/40 border-cyan-500/20 p-6 hover:bg-black/50 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20">
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
        </div>
      </AnimatedSection>

      <AnimatedSection id="projects" className="py-20 lg:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent" data-testid="text-projects-title">
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
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  data-testid={`card-project-${project.id}`}
                >
                  <Card className="h-full backdrop-blur-xl bg-black/40 border-cyan-500/20 p-8 hover:bg-black/50 hover:border-violet-500/40 transition-all duration-300 shadow-2xl shadow-violet-500/10 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className="mb-4">
                        <Zap className="w-10 h-10 text-cyan-400 group-hover:text-violet-400 transition-colors" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
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
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent" data-testid="text-experience-title">
            Experience
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-violet-500" />
              
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative mb-12 ${idx % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto md:text-left'} md:w-1/2`}
                  data-testid={`experience-${idx}`}
                >
                  <motion.div
                    className="absolute left-0 md:left-auto md:right-[-0.625rem] top-0 w-5 h-5 rounded-full bg-cyan-500 border-4 border-background"
                    whileHover={{ scale: 1.3 }}
                  />
                  
                  <Card className="backdrop-blur-xl bg-black/40 border-cyan-500/20 p-6 hover:bg-black/50 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl shadow-violet-500/10 ml-8 md:ml-0">
                    <div className="text-cyan-400 text-sm mb-2">{exp.period}</div>
                    <h3 className="text-xl font-bold mb-1 text-foreground">{exp.role}</h3>
                    <div className="text-violet-400 mb-3">{exp.company}</div>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a href="https://drive.google.com/file/d/your_resume_id/view" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 bg-white/5 backdrop-blur-sm border-cyan-500/30 hover:border-cyan-500/50"
                  data-testid="button-download-resume"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </Button>
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="blog" className="py-20 lg:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent" data-testid="text-blog-title">
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
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  data-testid={`blog-post-${idx}`}
                >
                  <Card className="h-full backdrop-blur-xl bg-black/40 border-violet-500/20 p-8 hover:bg-black/50 hover:border-violet-500/40 transition-all duration-300 shadow-2xl shadow-violet-500/10">
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
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent" data-testid="text-contact-title">
            Get In Touch
          </h2>
          
          <Card className="backdrop-blur-xl bg-black/40 border-cyan-500/20 p-8 lg:p-10 shadow-2xl shadow-violet-500/10">
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
                  className="flex-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 border-0 shadow-lg shadow-cyan-500/50"
                  data-testid="button-submit-contact"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => scrollToSection('about')}
                  className="flex-1 rounded-full bg-white/5 backdrop-blur-sm border-violet-500/30 hover:border-violet-500/50"
                  data-testid="button-talk-to-ai"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Talk to My AI
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://github.com/mahanteshbiradar" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="ghost" className="hover-elevate">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </a>
                <a href="https://linkedin.com/in/mahanteshbiradar" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="ghost" className="hover-elevate">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </a>
                <a href="https://drive.google.com/file/d/your_resume_id/view" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="ghost" className="hover-elevate">
                    <FileText className="w-4 h-4 mr-2" />
                    Resume
                  </Button>
                </a>
                <a href="https://drive.google.com/drive/folders/your_certificates_folder_id" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="ghost" className="hover-elevate">
                    <Award className="w-4 h-4 mr-2" />
                    Certificates
                  </Button>
                </a>
                <a href="mailto:mahantesh@example.com">
                  <Button size="sm" variant="ghost" className="hover-elevate">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </AnimatedSection>

      <footer className="py-12 border-t border-cyan-500/20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground mb-4" data-testid="text-footer">
              © 2025 Mahantesh Biradar — Engineered by AI.
            </p>
            
            <div className="flex justify-center gap-6">
              <a href="https://github.com/mahanteshbiradar" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/mahanteshbiradar" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:mahantesh@example.com" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://mahanteshbiradar.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-cyan-400 transition-colors">
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
