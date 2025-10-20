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
        description: 'An intelligent AI assistant powered by advanced language models, capable of natural conversation and task automation.',
        technologies: ['Python', 'LLM', 'Natural Language Processing', 'API Integration'],
        imageUrl: null,
        link: null,
        featured: 'true',
      },
      {
        id: '2',
        title: 'Blender Automation',
        description: '3D rendering automation system using Python scripts to streamline complex Blender workflows and batch processing.',
        technologies: ['Python', 'Blender', 'Automation', '3D Graphics'],
        imageUrl: null,
        link: null,
        featured: 'true',
      },
      {
        id: '3',
        title: 'Unreal Engine Integration',
        description: 'Custom plugins and blueprints for Unreal Engine, enabling seamless integration with external AI services.',
        technologies: ['C++', 'Blueprints', 'Unreal Engine', 'AI Integration'],
        imageUrl: null,
        link: null,
        featured: 'true',
      },
      {
        id: '4',
        title: 'AI Video Editing Agent',
        description: 'Automated video editing system using AI to detect key moments, apply effects, and generate professional edits.',
        technologies: ['Python', 'OpenCV', 'Machine Learning', 'FFmpeg'],
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
