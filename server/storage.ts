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
        title: 'VrindaAI Game Assistant',
        description: 'An intelligent multi-agent AI assistant designed specifically for game developers, offering automated asset generation, procedural content creation, and intelligent NPC dialogue systems.',
        technologies: ['Python', 'LLM', 'Game AI', 'Procedural Generation', 'Unity Integration'],
        imageUrl: null,
        link: null,
        featured: 'true',
      },
      {
        id: '2',
        title: 'Procedural World Generator',
        description: 'Advanced terrain and biome generation system using noise algorithms, erosion simulation, and vegetation placement for creating realistic open-world environments in Unity and Unreal Engine.',
        technologies: ['C#', 'Unity', 'Perlin Noise', 'Compute Shaders', 'Procedural Generation'],
        imageUrl: null,
        link: null,
        featured: 'true',
      },
      {
        id: '3',
        title: 'Physics-Based Combat Sim',
        description: 'Realistic combat simulation with advanced ragdoll physics, weapon dynamics, and impact calculations built in Unreal Engine 5 using C++ and Blueprints.',
        technologies: ['C++', 'Blueprints', 'Unreal Engine 5', 'Physics Simulation', 'Chaos Physics'],
        imageUrl: null,
        link: null,
        featured: 'true',
      },
      {
        id: '4',
        title: 'Multiplayer Racing Game',
        description: 'High-performance multiplayer racing game with vehicle physics, track generation, real-time networking, and dynamic weather systems built with Unity and Mirror networking.',
        technologies: ['C#', 'Unity', 'Mirror Networking', 'Vehicle Physics', 'Shaders'],
        imageUrl: null,
        link: null,
        featured: 'true',
      },
      {
        id: '5',
        title: 'AI Behavior Tree System',
        description: 'Flexible behavior tree framework for creating complex NPC AI with decision-making, pathfinding, combat tactics, and dynamic response to player actions.',
        technologies: ['C++', 'C#', 'AI Navigation', 'State Machines', 'Pathfinding'],
        imageUrl: null,
        link: null,
        featured: 'true',
      },
      {
        id: '6',
        title: 'VR Flight Simulator',
        description: 'Immersive virtual reality flight simulator with realistic aerodynamics, weather simulation, and cockpit interactions built for Oculus Quest using Unity XR.',
        technologies: ['C#', 'Unity XR', 'VR Development', 'Flight Physics', 'Quest 2'],
        imageUrl: null,
        link: null,
        featured: 'true',
      },
    ];

    const blogData: BlogPost[] = [
      {
        id: '1',
        title: 'AI-Driven NPCs: The Future of Gaming',
        excerpt: 'Exploring how large language models and behavior trees can create truly intelligent and responsive non-player characters.',
        content: 'Full content here...',
        publishedAt: new Date('2025-01-15'),
      },
      {
        id: '2',
        title: 'Optimizing Unreal Engine 5 Performance',
        excerpt: 'Essential techniques for achieving 60+ FPS in large-scale open worlds using Nanite, Lumen, and custom optimization strategies.',
        content: 'Full content here...',
        publishedAt: new Date('2025-01-10'),
      },
      {
        id: '3',
        title: 'Procedural Generation in Game Design',
        excerpt: 'How algorithmic content creation can deliver infinite replayability while maintaining quality and player engagement.',
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
