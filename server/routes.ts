import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertChatMessageSchema } from "@shared/schema";

function getIntelligentChatResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('vrindaai') || lowerMessage.includes('vrinda')) {
    return "VrindaAI is my flagship project - an advanced AI assistant powered by large language models. It's designed to understand natural language, automate tasks, and provide intelligent responses. The project combines cutting-edge NLP with practical automation capabilities, making it a versatile tool for various applications.";
  }

  if (lowerMessage.includes('blender') || lowerMessage.includes('3d') || lowerMessage.includes('automation')) {
    return "I've developed a comprehensive Blender automation system using Python scripts. It streamlines complex 3D workflows, enables batch processing of renders, and automates repetitive tasks. This project demonstrates how scripting can dramatically improve creative workflows and productivity in 3D modeling and rendering.";
  }

  if (lowerMessage.includes('unreal') || lowerMessage.includes('game') || lowerMessage.includes('engine')) {
    return "My Unreal Engine integration work focuses on creating custom plugins and blueprints that connect game engines with external AI services. I've built systems that enable real-time AI interactions within game environments, opening up new possibilities for dynamic, intelligent game mechanics.";
  }

  if (lowerMessage.includes('video') || lowerMessage.includes('editing') || lowerMessage.includes('agent')) {
    return "The AI Video Editing Agent is an automated system that analyzes video content, detects key moments, and applies professional editing techniques autonomously. Using computer vision and machine learning, it can identify scene changes, apply effects, and generate polished edits - significantly reducing the time needed for video post-production.";
  }

  if (lowerMessage.includes('ai') && (lowerMessage.includes('experience') || lowerMessage.includes('background'))) {
    return "I'm an AI Engineer with a strong focus on building practical, intelligent systems. My experience spans natural language processing, computer vision, and automation. I love working at the intersection of AI and creative tools, finding ways to make complex technology accessible and useful.";
  }

  if (lowerMessage.includes('iot') || lowerMessage.includes('internet of things')) {
    return "My IoT work includes developing smart home automation systems and industrial monitoring solutions. I focus on creating secure, efficient IoT architectures that can scale while maintaining data integrity. Security is always a top priority in my IoT implementations.";
  }

  if (lowerMessage.includes('cybersecurity') || lowerMessage.includes('security')) {
    return "I'm passionate about cybersecurity research, particularly in vulnerability assessment and penetration testing. I believe that understanding security from an attacker's perspective is crucial for building robust systems. My work involves studying emerging threats and developing defensive strategies.";
  }

  if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
    return "I've worked on several exciting projects including VrindaAI (an advanced AI assistant), Blender automation tools, Unreal Engine integrations, and AI-powered video editing systems. Each project combines my interests in AI, automation, and creative technology. Would you like to know more about any specific project?";
  }

  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
    return "My core skills include Python, C++, machine learning, natural language processing, computer vision, IoT architecture, and cybersecurity. I work extensively with AI frameworks, game engines like Unreal, 3D tools like Blender, and various automation technologies. I'm always learning and exploring new technologies in the AI space.";
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('collaborate')) {
    return "I'm always interested in exciting projects and collaborations! You can reach out to me through the contact form on this website, or connect with me on LinkedIn and GitHub. I'm particularly interested in projects involving AI, automation, and innovative applications of machine learning.";
  }

  if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('student')) {
    return "I'm currently a student specializing in IoT and Cybersecurity, while actively working on AI engineering projects. I believe in hands-on learning and apply theoretical knowledge to real-world projects like VrindaAI and my automation tools.";
  }

  if (lowerMessage.includes('future') || lowerMessage.includes('goal') || lowerMessage.includes('plan')) {
    return "My goal is to push the boundaries of what's possible with AI and automation. I'm particularly interested in making AI more accessible and practical for everyday applications. Future projects will focus on integrating AI more deeply into creative workflows and exploring new frontiers in autonomous systems.";
  }

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm Mahantesh's AI assistant. I can answer questions about his projects (VrindaAI, Blender automation, Unreal integration, video editing), his expertise in AI Engineering, IoT, and Cybersecurity, or anything else you'd like to know. What would you like to learn about?";
  }

  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return "You're welcome! Feel free to ask me anything else about Mahantesh's work or projects. I'm here to help!";
  }

  return "That's an interesting question! I can tell you about Mahantesh's projects like VrindaAI (AI assistant), Blender automation, Unreal Engine integration, and AI video editing. I can also share information about his expertise in AI Engineering, IoT, and Cybersecurity. What specific aspect would you like to know more about?";
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/blog", async (_req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ success: true, message });
    } catch (error) {
      res.status(400).json({ error: "Invalid contact form data" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = getIntelligentChatResponse(message);
      
      const chatMessage = await storage.createChatMessage({
        message,
        response,
      });

      res.json({ response: chatMessage.response });
    } catch (error) {
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
