import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ChatInput = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    }),
  ),
});

const SYSTEM_PROMPT =
  "You are StudyMate, a friendly tutor inside an online learning platform. " +
  "Answer student doubts across school and college subjects clearly and briefly. " +
  "Use simple language, short markdown-free paragraphs, and worked steps for problems. " +
  "If a question is outside academics, gently steer back to studying.";

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const { streamText } = await import("ai");
    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(key);

    const result = streamText({
      model: gateway("google/gemini-3.6-flash"),
      system: SYSTEM_PROMPT,
      messages: data.messages,
    });

    return { reply: await result.text };
  });
