import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Mahantesh's AI assistant. Ask me anything about his work, projects like VrindaAI, or expertise in AI Engineering, IoT, and Cybersecurity!",
    },
  ]);
  const [input, setInput] = useState('');
  const [voiceMode, setVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Listen for a global event so other parts of the site can open the chat
  useEffect(() => {
    const onOpen = () => {
      setIsOpen(true);
      // focus input after a short delay to allow animation
      setTimeout(() => inputRef.current?.focus(), 250);
    };
    window.addEventListener('open-ai-chat', onOpen as EventListener);
    return () => window.removeEventListener('open-ai-chat', onOpen as EventListener);
  }, []);

  // Clean up recognition on unmount
  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.stop?.();
      } catch (e) {
        /* ignore */
      }
    };
  }, []);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest('POST', '/api/chat', { message });
      return response.json() as Promise<{ response: string }>;
    },
    onSuccess: (data) => {
      // Reveal assistant response with a typewriter effect for better interactivity
      const full = data.response || '';
      // Append a placeholder assistant message and then reveal text progressively
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
      // reveal into the last message
      let idx = 0;
      const interval = Math.max(8, Math.floor(1200 / Math.max(20, full.length)));
      const timer = setInterval(() => {
        idx += 1;
        setMessages((prev) => {
          const copy = [...prev];
          // find last assistant message index
          const last = copy.map((m) => m.role).lastIndexOf('assistant');
          if (last >= 0) {
            copy[last] = { ...copy[last], content: full.slice(0, idx) };
          }
          return copy;
        });
        if (idx >= full.length) clearInterval(timer);
      }, interval);
      // if voiceMode enabled, speak the response when finished
      setTimeout(() => {
        if (voiceMode && typeof window !== 'undefined' && 'speechSynthesis' in window) {
          const utter = new SpeechSynthesisUtterance(full);
          utter.lang = 'en-US';
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utter);
        }
      }, Math.max(600, full.length * interval));
    },
    onError: (err: any) => {
      const message = err?.message || 'Failed to get response';
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${message}` }]);
    },
  });

  // Helpers for Web Speech API (SpeechRecognition)
  const supportsSpeechRecognition = () => {
    return typeof window !== 'undefined' && (!!(window as any).SpeechRecognition || !!(window as any).webkitSpeechRecognition);
  };

  const startRecognition = async () => {
    if (!supportsSpeechRecognition()) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Speech recognition is not supported in this browser. Try Chrome or Edge.' }]);
      setVoiceMode(false);
      return;
    }

    // If Permissions API available, check the microphone permission first
    try {
      if ((navigator as any).permissions && (navigator as any).permissions.query) {
        const permStatus = await (navigator as any).permissions.query({ name: 'microphone' as any });
        if (permStatus.state === 'denied') {
          setMessages((prev) => [...prev, { role: 'assistant', content: 'Microphone access is blocked for this site. Please allow microphone permissions in your browser/site settings and reload the page.' }]);
          setVoiceMode(false);
          setIsListening(false);
          return;
        }
      }
    } catch (e) {
      // ignore and proceed to request getUserMedia which will prompt the user if needed
    }

    // Request microphone access (this will prompt the user if needed)
    try {
      await (navigator as any).mediaDevices.getUserMedia({ audio: true });
    } catch (err: any) {
      const name = err?.name || err?.message || 'PermissionDenied';
      if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Microphone permission was denied. Please enable microphone access for this site in your browser settings.' }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: `Unable to access microphone: ${name}` }]);
      }
      setVoiceMode(false);
      setIsListening(false);
      return;
    }

    // At this point, getUserMedia succeeded — start SpeechRecognition
    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onerror = (ev: any) => {
        setIsListening(false);
        const errCode = ev?.error || ev?.message || 'unknown';
        if (errCode === 'not-allowed' || errCode === 'PermissionDeniedError' || errCode === 'NotAllowedError') {
          setMessages((prev) => [...prev, { role: 'assistant', content: 'Microphone access was denied. Please allow microphone permissions in your browser settings.' }]);
          setVoiceMode(false);
        } else if (errCode === 'no-speech' || errCode === 'audio-capture') {
          setMessages((prev) => [...prev, { role: 'assistant', content: 'No audio was detected. Check your microphone connection and try again.' }]);
        } else {
          setMessages((prev) => [...prev, { role: 'assistant', content: `Speech recognition error: ${errCode}` }]);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const res = event.results[i];
          const t = res[0]?.transcript || '';
          if (res.isFinal) finalTranscript += t;
          else interim += t;
        }
        if (interim) setInput(interim);
        if (finalTranscript) {
          const text = finalTranscript.trim();
          if (text) {
            setMessages((prev) => [...prev, { role: 'user', content: text }]);
            chatMutation.mutate(text);
            setInput('');
          }
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
      // Only enable voice mode after recognition has started successfully
      setVoiceMode(true);
    } catch (err: any) {
      setMessages((prev) => [...prev, { role: 'assistant', content: `Failed to start speech recognition: ${err?.message || err}` }]);
      setIsListening(false);
      setVoiceMode(false);
    }
  };

  const stopRecognition = () => {
    try {
      recognitionRef.current?.stop?.();
    } catch (e) {
      // ignore
    }
    recognitionRef.current = null;
    setIsListening(false);
    setVoiceMode(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    // optimistic UI: keep input while mutation runs
    const toSend = input;
    setInput('');
    chatMutation.mutate(toSend);
  };

  // Quick prompts
  const quickPrompts = [
    'Tell me about VrindaAI',
    'Explain your Blender automation project',
    'What are your core skills?',
    'How can I contact you?'
  ];

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 md:right-8 w-[calc(100vw-2rem)] md:w-[400px] h-[500px] z-50"
          >
            <Card className="h-full backdrop-blur-xl bg-black/60 border-cyan-500/30 shadow-2xl shadow-cyan-500/20 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground" data-testid="text-chat-title">Talk to Mahantesh's AI</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      {voiceMode ? (
                        isListening ? (
                          <span className="mic-indicator">
                            <span className="mic-dot" aria-hidden />
                            <span className="text-[11px]">Listening...</span>
                          </span>
                        ) : (
                          <>
                            <Mic className="w-3 h-3" />
                            Voice Mode Active
                          </>
                        )
                      ) : (
                        'Ask me anything!'
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      // If voice is active, stop it. If not, attempt to start recognition.
                      if (voiceMode) {
                        stopRecognition();
                        setVoiceMode(false);
                      } else {
                        // open chat and attempt to start recognition; only enable voiceMode after success
                        setIsOpen(true);
                        setTimeout(() => inputRef.current?.focus(), 250);
                        startRecognition();
                      }
                    }}
                    className={`hover-elevate ${voiceMode ? 'text-cyan-400' : ''}`}
                    data-testid="button-voice-toggle"
                    title="Toggle Voice Mode (start/stop speech recognition)"
                  >
                    {voiceMode ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                    data-testid="button-close-chat"
                    className="hover-elevate"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    data-testid={`message-${msg.role}-${idx}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 text-foreground'
                          : 'bg-gradient-to-br from-violet-500/20 to-violet-600/20 border border-violet-500/30 text-foreground'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
                {chatMutation.isPending && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-violet-500/20 to-violet-600/20 border border-violet-500/30 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-2 px-4">
                <div className="flex gap-2 flex-wrap">
                  {quickPrompts.map((q) => (
                    <button key={q} className="text-xs px-3 py-1 rounded-md bg-white/6 hover:bg-white/10 text-foreground" onClick={() => { setInput(q); }}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    ref={(el: any) => (inputRef.current = el)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about my projects..."
                    className="flex-1 bg-white/5 border-white/10 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-full"
                    data-testid="input-chat-message"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || chatMutation.isPending}
                    size="icon"
                    className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 border-0"
                    data-testid="button-send-message"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                {voiceMode && (
                  <div className="mt-2 text-xs text-center text-cyan-400 flex items-center justify-center gap-2">
                    {isListening ? (
                      <>
                        <span className="mic-dot" aria-hidden />
                        <span>Listening — speak now</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-3 h-3" />
                        <span>Voice input enabled</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 shadow-lg shadow-cyan-500/50 border-0"
          data-testid="button-toggle-chat"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>
    </>
  );
}
