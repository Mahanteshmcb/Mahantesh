import {
  type Project,
  type InsertProject,
  type BlogPost,
  type InsertBlogPost,
  type ContactMessage,
  type InsertContactMessage,
  type ChatMessage,
  type InsertChatMessage,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getProjects(): Promise<Project[]>;
  getBlogPosts(): Promise<BlogPost[]>;
}

export class MemStorage implements IStorage {
  private contactMessages: Map<string, ContactMessage>;
  private chatMessages: Map<string, ChatMessage>;
  private projects: Map<string, Project>;
  private blogPosts: Map<string, BlogPost>;

  constructor() {
    this.contactMessages = new Map();
    this.chatMessages = new Map();
    this.projects = new Map();
    this.blogPosts = new Map();
    
    this.seedData();
  }

  private seedData() {
    const projectsData: Project[] = [
      {
        id: '1',
        title: 'VrindaAI',
        description: 'An intelligent multi-agent AI assistant powered by advanced language models, capable of natural conversation, task automation, and seamless integration with various platforms.',
        technologies: ['Python', 'LLM', 'Natural Language Processing', 'Multi-Agent Systems', 'API Integration'],
        imageUrl: null,
        link: null,
        featured: 'true',
      },
      {
        id: '2',
        title: 'Blender Automation Pipeline',
        description: '3D rendering automation system using Python scripts to streamline complex Blender workflows, batch processing, and procedural generation.',
        technologies: ['Python', 'Blender', 'Automation', '3D Graphics', 'Procedural Generation'],
        imageUrl: null,
        link: null,
        featured: 'true',
      },
      {
        id: '3',
        title: 'Unreal Engine AI Integration',
        description: 'Custom plugins and blueprints for Unreal Engine, enabling seamless integration with external AI services and real-time intelligent behavior systems.',
        technologies: ['C++', 'Blueprints', 'Unreal Engine', 'AI Integration', 'Real-Time Systems'],
        imageUrl: null,
        link: null,
        featured: 'true',
      },
      {
        id: '4',
        title: 'AI Video Editing Agent',
        description: 'Automated video editing system using computer vision and AI to detect key moments, apply cinematic effects, and generate professional edits autonomously.',
        technologies: ['Python', 'OpenCV', 'Machine Learning', 'FFmpeg', 'Computer Vision'],
        imageUrl: null,
        link: null,
        featured: 'true',
      },
      {
        id: '5',
        title: 'AI Portfolio Generator',
        description: 'Intelligent portfolio generation system that creates personalized, professional portfolios using AI-driven design and content optimization.',
        technologies: ['TypeScript', 'React', 'AI/ML', 'Web Design', 'Automation'],
        imageUrl: null,
        link: null,
        featured: 'true',
      },
      {
        id: '6',
        title: 'Cybersecurity Toolkit',
        description: 'Student-level cybersecurity toolkit for vulnerability assessment, network scanning, and security automation with educational focus.',
        technologies: ['Python', 'Networking', 'Security', 'Penetration Testing', 'Automation'],
        imageUrl: null,
        link: null,
        featured: 'true',
      },
    ];

    const blogData: BlogPost[] = [
      {
        id: '1',
        title: 'The Future of AI Assistants',
        excerpt: 'Exploring how next-generation AI assistants will transform human-computer interaction through contextual understanding.',
        content: 'Full content here...',
        publishedAt: new Date('2025-01-15'),
      },
      {
        id: '2',
        title: 'IoT Security Best Practices',
        excerpt: 'Essential security measures for protecting IoT devices from emerging cyber threats in connected environments.',
        content: 'Full content here...',
        publishedAt: new Date('2025-01-10'),
      },
      {
        id: '3',
        title: 'Automating 3D Workflows',
        excerpt: 'How Python scripting can revolutionize your 3D modeling and rendering pipeline for maximum efficiency.',
        content: 'Full content here...',
        publishedAt: new Date('2025-01-05'),
      },
    ];

    projectsData.forEach(project => this.projects.set(project.id, project));
    blogData.forEach(post => this.blogPosts.set(post.id, post));
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }
}

export const storage = new MemStorage();
