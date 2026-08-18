import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Sparkles, Radio, PlayCircle } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { LiveSection, RecordedSection } from "@/components/CourseSections";
import { AiAssistant } from "@/components/AiAssistant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LearnSphere — Live Classes & Recorded Lessons for Students" },
      {
        name: "description",
        content:
          "Join live classes, revise with recorded lessons, and clear every doubt instantly with the built-in AI study assistant.",
      },
      { property: "og:title", content: "LearnSphere — Live & Recorded Learning" },
      {
        property: "og:description",
        content:
          "Live lectures, on-demand course libraries, and a 24/7 AI tutor that answers student doubts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  { label: "Live classes", href: "#live" },
  { label: "Recorded", href: "#recorded" },
  { label: "AI tutor", href: "#ai" },
];

function Index() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="flex size-9 items-center justify-center rounded-xl bg-hero-gradient text-primary-foreground">
              <GraduationCap className="size-5" />
            </span>
            LearnSphere
          </a>
          <div className="ml-auto hidden items-center gap-6 md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-muted-foreground transition-smooth hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </div>
          <Button size="sm">Start learning</Button>
        </nav>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" /> AI doubt solving built in
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] md:text-6xl">
              Learn live. Revise anytime. Never stay stuck.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              LearnSphere brings interactive live classes and a deep library of recorded lessons
              together — with an AI tutor waiting in the corner for every doubt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#live">
                  <Radio className="size-4" /> Join a live class
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#recorded">
                  <PlayCircle className="size-4" /> Browse recordings
                </a>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
              {[
                ["120+", "Live classes weekly"],
                ["3,400", "Recorded lessons"],
                ["24/7", "AI doubt support"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl font-bold text-primary">{v}</dt>
                  <dd className="text-xs text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent-gradient opacity-20 blur-2xl" />
            <img
              src={heroImage}
              alt="Student attending an online live class on a laptop"
              width={1600}
              height={1100}
              className="rounded-3xl shadow-float"
            />
          </div>
        </section>

        <LiveSection />
        <RecordedSection />

        <section id="ai" className="mx-auto max-w-6xl px-6 py-20">
          <div className="overflow-hidden rounded-3xl bg-hero-gradient px-8 py-14 text-center md:px-16">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-accent-gradient text-accent-foreground">
              <Sparkles className="size-6" />
            </span>
            <h2 className="mt-6 text-3xl font-bold text-primary-foreground md:text-4xl">
              Stuck on a question at midnight?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
              StudyMate, our AI assistant, sits in the bottom-left corner of every page. Ask a doubt
              from any live class or recorded lesson and get a clear, step-by-step explanation in
              seconds.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <p className="mx-auto max-w-6xl px-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} LearnSphere. Learning that answers back.
        </p>
      </footer>

      <AiAssistant />
    </div>
  );
}
