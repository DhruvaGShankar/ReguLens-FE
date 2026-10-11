import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, RetrievalMode, ErrorResponse } from './types/api';
import { sendRegulatoryQuery } from './api/client';
import { Header } from './components/Header';
import { EmptyState } from './components/EmptyState';
import { MessageItem } from './components/MessageItem';
import { InputArea } from './components/InputArea';

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [retrievalMode, setRetrievalMode] = useState<RetrievalMode>('hybrid_reranked');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleNewChat = () => {
    setMessages([]);
  };

  const handleRunQuery = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const assistantMessageId = `assistant-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: trimmed,
      timestamp,
    };

    const loadingAssistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp,
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingAssistantMessage]);
    setIsLoading(true);

    try {
      const response = await sendRegulatoryQuery({
        query: trimmed,
        mode: retrievalMode,
        top_k: 5,
        alpha: 0.5,
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                isLoading: false,
                response,
              }
            : msg
        )
      );
    } catch (err: unknown) {
      let errorDetail = {
        code: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred while querying the backend.',
        timestamp: new Date().toISOString(),
      };

      if (typeof err === 'object' && err !== null && 'error' in err) {
        errorDetail = (err as ErrorResponse).error;
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                isLoading: false,
                error: errorDetail,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = (queryText: string) => {
    handleRunQuery(queryText);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 flex flex-col font-sans antialiased selection:bg-[#0F254A]/10 selection:text-[#0F254A]">
      {/* 1. Header Navigation */}
      <Header
        retrievalMode={retrievalMode}
        onSelectMode={(mode) => setRetrievalMode(mode)}
        onNewChat={handleNewChat}
      />

      {/* 2. Main Conversation Stream Column (~800px max width) */}
      <main className="flex-1 max-w-[800px] w-full mx-auto px-4 sm:px-6 pt-6 pb-44">
        {messages.length === 0 ? (
          <EmptyState onSelectQuestion={handleRunQuery} />
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => {
              // Find associated user query if retrying
              const prevUserMsg =
                msg.role === 'assistant' && index > 0 && messages[index - 1].role === 'user'
                  ? messages[index - 1].content
                  : '';

              return (
                <MessageItem
                  key={msg.id}
                  message={msg}
                  onRetry={() => prevUserMsg && handleRetry(prevUserMsg)}
                />
              );
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </main>

      {/* 3. Sticky Input Area */}
      <InputArea onSubmit={handleRunQuery} isLoading={isLoading} />
    </div>
  );
}
