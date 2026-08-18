import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { askAssistant } from "@/lib/chat.functions";
import { Button } from "@/components/ui/button";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! I'm StudyMate, your study buddy. Ask me any doubt from your live class or recorded lessons — maths, physics, coding, anything.",
};

const SUGGESTIONS = [
  "Explain integration by parts",
  "What is Ohm's law?",
  "Summarise photosynthesis",
];

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ask = useServerFn(askAssistant);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const res = await ask({ data: { messages: next.slice(1) } });
      setMessages([...next, { role: "assistant", content: res.reply }]);
    } catch (e) {
      console.error(e);
      setError("StudyMate couldn't answer right now. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-3">
      {open && (
        <div className="flex h-[30rem] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-float">
          <header className="flex items-center gap-3 bg-hero-gradient px-4 py-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-accent-gradient text-accent-foreground">
              <Sparkles className="size-4" />
            </span>
            <div className="flex-1">
              <p className="font-display text-sm font-semibold text-primary-foreground">StudyMate AI</p>
              <p className="text-xs text-primary-foreground/70">Doubt solving, 24/7</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="rounded-md p-1 text-primary-foreground/80 transition-smooth hover:bg-background/15"
            >
              <X className="size-4" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-secondary/40 px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-card text-foreground shadow-card"
                }`}
              >
                {m.content}
              </div>
            ))}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-smooth hover:border-primary hover:text-primary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {loading && (
              <div className="w-fit rounded-2xl rounded-bl-sm bg-card px-3.5 py-3 shadow-card">
                <span className="flex gap-1">
                  <i className="size-1.5 animate-pulse-live rounded-full bg-primary" />
                  <i className="size-1.5 animate-pulse-live rounded-full bg-primary [animation-delay:200ms]" />
                  <i className="size-1.5 animate-pulse-live rounded-full bg-primary [animation-delay:400ms]" />
                </span>
              </div>
            )}
            {error && <p className="text-xs text-destructive">{error}</p>}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border bg-card px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your doubt..."
              aria-label="Ask your doubt"
              className="h-10 flex-1 rounded-full border border-input bg-background px-4 text-sm outline-none transition-smooth focus:border-primary"
            />
            <Button type="submit" size="icon" className="size-10 shrink-0 rounded-full" disabled={loading}>
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        className="flex items-center gap-2 rounded-full bg-hero-gradient py-3.5 pl-4 pr-5 text-primary-foreground shadow-float transition-smooth hover:-translate-y-0.5"
      >
        <MessageCircle className="size-5" />
        <span className="text-sm font-semibold">Ask AI</span>
      </button>
    </div>
  );
}
