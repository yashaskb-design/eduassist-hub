import { Radio, PlayCircle, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const live = [
  {
    title: "Calculus: Definite Integrals Marathon",
    tutor: "Dr. Anaya Rao",
    subject: "Mathematics",
    time: "Started 12 min ago",
    watching: "1,284",
  },
  {
    title: "Organic Chemistry — Reaction Mechanisms",
    tutor: "Prof. Imran Sheikh",
    subject: "Chemistry",
    time: "Started 4 min ago",
    watching: "902",
  },
  {
    title: "Build Your First React App",
    tutor: "Meera Nair",
    subject: "Computer Science",
    time: "Starts in 20 min",
    watching: "3,510",
  },
];

const recorded = [
  { title: "Newtonian Mechanics: Full Crash Course", subject: "Physics", length: "6h 20m", lessons: 42, rating: "4.9" },
  { title: "Data Structures with Python", subject: "Computer Science", length: "9h 05m", lessons: 68, rating: "4.8" },
  { title: "Cell Biology & Genetics", subject: "Biology", length: "4h 48m", lessons: 31, rating: "4.7" },
  { title: "Modern World History 1900–1991", subject: "History", length: "5h 12m", lessons: 36, rating: "4.6" },
  { title: "Statistics & Probability Essentials", subject: "Mathematics", length: "7h 33m", lessons: 51, rating: "4.9" },
  { title: "English Literature: Poetry Analysis", subject: "Literature", length: "3h 40m", lessons: 24, rating: "4.5" },
];

export function LiveSection() {
  return (
    <section id="live" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-live/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-live">
            <i className="size-2 animate-pulse-live rounded-full bg-live" /> Live now
          </span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Live classes</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Join real-time lectures, raise your hand, and get answers on the spot.
          </p>
        </div>
        <Button variant="outline">View full schedule</Button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {live.map((c) => (
          <article
            key={c.title}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-smooth hover:-translate-y-1"
          >
            <div className="relative flex h-40 items-center justify-center bg-hero-gradient">
              <Radio className="size-10 text-primary-foreground/70 transition-smooth group-hover:scale-110" />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-live px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-live-foreground">
                <i className="size-1.5 animate-pulse-live rounded-full bg-live-foreground" /> Live
              </span>
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-foreground/40 px-2.5 py-1 text-xs text-primary-foreground">
                <Users className="size-3" /> {c.watching}
              </span>
            </div>
            <div className="space-y-2 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">{c.subject}</p>
              <h3 className="text-lg font-semibold leading-snug">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.tutor}</p>
              <p className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground">
                <Clock className="size-3.5" /> {c.time}
              </p>
              <Button className="mt-3 w-full">Join class</Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function RecordedSection() {
  return (
    <section id="recorded" className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <PlayCircle className="size-3.5" /> On demand
            </span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Recorded lessons</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Full course libraries you can pause, rewind and revise before exams.
            </p>
          </div>
          <Button variant="outline">Browse library</Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recorded.map((c) => (
            <article
              key={c.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-smooth hover:-translate-y-1"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent-gradient text-accent-foreground">
                <PlayCircle className="size-5" />
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">{c.subject}</p>
              <h3 className="mt-1 text-lg font-semibold leading-snug">{c.title}</h3>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" /> {c.length}
                </span>
                <span>{c.lessons} lessons</span>
                <span className="flex items-center gap-1">
                  <Star className="size-3.5 fill-accent text-accent" /> {c.rating}
                </span>
              </div>
              <Button variant="secondary" className="mt-5">
                Start watching
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
