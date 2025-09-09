"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Terminal, TrendingUp, DollarSign, Mic, MicOff } from "lucide-react";
// import { useConversation } from "@11labs/react";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const MatrixChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Yield Bots online. Ask me about DeFi strategies, yields, and protocols.",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ElevenLabs Conversation - temporarily disabled
  // const conversation = useConversation({
  //   onMessage: (message) => {
  //     if (message.message) {
  //       const newMessage: Message = {
  //         id: Date.now().toString(),
  //         type: message.source === 'user' ? 'user' : 'assistant',
  //         content: message.message,
  //         timestamp: new Date(),
  //       };
  //       setMessages(prev => [...prev, newMessage]);
  //     }
  //   },
  //   onError: (error) => {
  //     console.error('Voice conversation error:', error);
  //     setIsVoiceMode(false);
  //   },
  // });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "DeFi yields look strong. Try Aave for 8% stable.",
        "Uniswap V3 LP farming offers 15-25% but watch IL.",
        "Curve stablecoin pools safer at 4-6% APY.",
        "New yield farming opportunities in Arbitrum.",
        "Consider liquid staking + DeFi for 5-8% combo."
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoiceMode = async () => {
    if (!apiKey && !isVoiceMode) {
      setShowApiKeyInput(true);
      return;
    }

    if (!isVoiceMode) {
      try {
        // Request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // For now, show message that voice feature needs setup
        alert('Voice feature requires ElevenLabs agent setup. Please create an agent in ElevenLabs UI and configure the conversationToken.');
        
        setIsVoiceMode(true);
      } catch (error) {
        console.error('Failed to start voice conversation:', error);
        alert('Failed to start voice conversation. Please check your microphone permissions.');
      }
    } else {
      // await conversation.endSession();
      setIsVoiceMode(false);
    }
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setShowApiKeyInput(false);
      toggleVoiceMode();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Matrix Header */}
      <div className="bg-matrix-bg border border-matrix-green-dim rounded-t-lg p-4">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-matrix-green animate-pulse" />
          <h2 className="font-mono text-matrix-green text-lg font-bold">
            Yield Bots
          </h2>
          <div className="flex gap-2 ml-auto">
            <div className="w-3 h-3 rounded-full bg-matrix-green animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-matrix-green-dim"></div>
            <div className="w-3 h-3 rounded-full bg-matrix-green-bright animate-cyber-flicker"></div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-matrix-bg/95 border-l border-r border-matrix-green-dim h-64 overflow-y-auto p-4 space-y-3 backdrop-blur-sm">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-3 py-2 rounded font-mono text-sm ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground ml-auto'
                  : 'text-matrix-green bg-matrix-bg/50 border border-matrix-green-dim'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.type === 'assistant' && <TrendingUp className="w-3 h-3" />}
                <span className="text-xs opacity-70">
                  {isClient ? message.timestamp.toLocaleTimeString() : ''}
                </span>
              </div>
              <p className={message.type === 'assistant' ? 'animate-cyber-flicker' : ''}>
                {message.content}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-matrix-bg/50 border border-matrix-green-dim text-matrix-green px-3 py-2 rounded font-mono text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="w-3 h-3 animate-spin" />
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-matrix-bg border border-matrix-green-dim rounded-b-lg p-6">
        <div className="mb-3">
          <p className="font-mono text-matrix-green text-sm animate-pulse">
            How can I help you with DeFi yields and strategies?
          </p>
        </div>
        
        {/* API Key Input */}
        {showApiKeyInput && (
          <div className="mb-4 p-3 border border-matrix-green-dim rounded bg-matrix-bg/50">
            <p className="font-mono text-matrix-green text-xs mb-2">
              Enter your ElevenLabs API Key to enable voice chat:
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="font-mono bg-matrix-bg border-matrix-green-dim text-matrix-green text-sm"
              />
              <Button
                onClick={handleApiKeySubmit}
                size="sm"
                className="bg-matrix-green text-matrix-bg hover:bg-matrix-green-bright"
              >
                Save
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={isVoiceMode ? "Voice mode active - speak to chat" : "Type your question here..."}
            disabled={isVoiceMode}
            className="font-mono bg-matrix-bg/50 border-2 border-matrix-green-dim text-matrix-green placeholder:text-matrix-green-dim focus:ring-matrix-green focus:border-matrix-green h-12 text-base animate-pulse-glow"
          />
          <Button
            onClick={toggleVoiceMode}
            variant="outline"
            className={`border-2 h-12 px-4 transition-all duration-300 ${
              isVoiceMode 
                ? 'border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground animate-pulse' 
                : 'border-matrix-green-dim text-matrix-green hover:bg-matrix-green hover:text-matrix-bg'
            }`}
          >
            {isVoiceMode ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping || isVoiceMode}
            variant="outline"
            className="border-2 border-matrix-green-dim text-matrix-green hover:bg-matrix-green hover:text-matrix-bg transition-all duration-300 h-12 px-6 animate-pulse"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatrixChat;