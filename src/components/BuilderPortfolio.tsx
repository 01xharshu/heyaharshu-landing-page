"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText, Video, type LucideIcon } from "lucide-react";

const figmaPlugins = [
  {
    name: "Texometric",
    description:
      "A typography tool for getting more precision from text inside Figma.",
    image: "/cd26cd88-c1a2-4b69-86e8-258290b6d24a-icon.png",
    href: "https://www.figma.com/community/plugin/1644918796465469562/texometric",
  },
  {
    name: "Carousel Export",
    description:
      "Export carousel frames as one PDF or a set of separate PNGs.",
    image: "/a2fc4071-8e90-4df0-8e70-7bced5b2f57f-icon.png",
    href: "https://www.figma.com/community/plugin/1638502049583160269/carousel-export-plugin",
  },
];

interface MacApp {
  slug: string;
  name: string;
  description: string;
  detail: string;
  icon?: LucideIcon;
  image?: string;
  features: readonly string[];
  hasDownload?: boolean;
}

const macApps: MacApp[] = [
  {
    slug: "video-transcribe",
    name: "Video Transcribe",
    description: "Turn a video into a usable transcript on the Mac.",
    detail:
      "A small Mac utility made for creators who want the words from a video without carrying the rest of a complicated editing suite.",
    icon: Video,
    features: ["Works with video files", "Produces editable text", "Made for macOS"],
  },
  {
    slug: "video-transcripter-tool",
    name: "Video Transcripter Tool",
    description: "Collect transcripts from several videos in one document.",
    detail:
      "A batch transcription workflow for gathering source material from multiple videos and keeping it together for research or AI-assisted writing.",
    icon: FileText,
    features: ["Multiple video inputs", "One document output", "Built in Swift"],
  },
  {
    slug: "opener",
    name: "Opener",
    description: "Choose which browser opens a link on your Mac.",
    detail:
      "Opener sits between a link and the web, letting you choose the browser you want before the page opens.",
    image: "/Opener.png",
    features: [
      "Pick a browser for each link",
      "Made for macOS",
      "A lighter default-browser workflow",
    ],
    hasDownload: true,
  },
];

interface GithubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload?: {
    head?: string;
    ref?: string;
    commits?: Array<{ sha: string; message: string }>;
  };
}

interface CodeUpdate {
  id: string;
  sha: string;
  message: string;
  repo: string;
  repoFull: string;
  createdAt: string;
}

function GitHubActivity() {
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [activityState, setActivityState] = useState<
    "loading" | "ready" | "unavailable"
  >("loading");

  useEffect(() => {
    const controller = new AbortController();

    async function loadActivity() {
      try {
        const response = await fetch(
          "https://api.github.com/users/01xharshu/events/public?per_page=100",
          {
            headers: { Accept: "application/vnd.github+json" },
            signal: controller.signal,
          },
        );

        if (!response.ok) throw new Error("GitHub activity unavailable");

        setEvents((await response.json()) as GithubEvent[]);
        setActivityState("ready");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setActivityState("unavailable");
        }
      }
    }

    loadActivity();
    return () => controller.abort();
  }, []);

  const updates = useMemo<CodeUpdate[]>(() => {
    return events
      .filter((event) => event.type === "PushEvent")
      .flatMap((event) => {
        const commits = event.payload?.commits ?? [];

        if (commits.length) {
          return commits.map((commit) => ({
            id: `${event.id}-${commit.sha}`,
            sha: commit.sha,
            message: commit.message.split("\n")[0],
            repo: event.repo.name.replace("01xharshu/", ""),
            repoFull: event.repo.name,
            createdAt: event.created_at,
          }));
        }

        if (!event.payload?.head) return [];

        return [
          {
            id: event.id,
            sha: event.payload.head,
            message: `Pushed to ${event.payload.ref?.replace("refs/heads/", "") ?? "branch"}`,
            repo: event.repo.name.replace("01xharshu/", ""),
            repoFull: event.repo.name,
            createdAt: event.created_at,
          },
        ];
      })
      .filter(
        (update, index, all) =>
          all.findIndex((item) => item.sha === update.sha) === index,
      );
  }, [events]);

  const activityDays = useMemo(() => {
    const counts = updates.reduce<Record<string, number>>((days, update) => {
      const date = update.createdAt.slice(0, 10);
      days[date] = (days[date] ?? 0) + 1;
      return days;
    }, {});
    const today = new Date();

    return Array.from({ length: 42 }, (_, index) => {
      const day = new Date(today);
      day.setDate(today.getDate() - (41 - index));
      const date = day.toISOString().slice(0, 10);
      return { date, count: counts[date] ?? 0 };
    });
  }, [updates]);

  return (
    <section className="builder2Section builder2GitHub" aria-labelledby="builder-github">
      <header className="builder2SectionHeader">
        <h2 id="builder-github">GitHub activity</h2>
        <a href="https://github.com/01xharshu" target="_blank" rel="noreferrer">
          @01xharshu <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </header>

      <div className="builder2ActivityCells" aria-label="Recent public GitHub activity">
        {activityDays.map((day) => {
          const strength = day.count === 0 ? 0 : day.count === 1 ? 1 : day.count < 4 ? 2 : 3;
          return (
            <span
              key={day.date}
              className={`builder2ActivityCell builder2ActivityCell${strength}`}
              title={`${day.date}: ${day.count} public code updates`}
            />
          );
        })}
      </div>

      <p className="builder2ActivitySummary" aria-live="polite">
        {activityState === "loading"
          ? "Fetching recent public pushes…"
          : activityState === "unavailable"
            ? "Recent activity is available on GitHub."
            : `${updates.length} public ${updates.length === 1 ? "update" : "updates"} across the last visible pushes.`}
      </p>

      {updates.length > 0 && (
        <div className="builder2CommitList">
          {updates.slice(0, 4).map((update, index) => (
            <a
              key={update.id}
              href={`https://github.com/${update.repoFull}/commit/${update.sha}`}
              target="_blank"
              rel="noreferrer"
              className="builder2Commit"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{update.message}</strong>
              <small>{update.repo}</small>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

function AppMark({ app, large = false }: { app: MacApp; large?: boolean }) {
  if (app.image) {
    return (
      <span
        className={`builder2AppMark builder2AppMarkImage ${large ? "builder2AppMarkLarge" : ""}`}
      >
        <Image src={app.image} alt="" width={104} height={104} />
      </span>
    );
  }

  const Icon = app.icon;

  if (!Icon) return null;

  return (
    <span className={`builder2AppMark ${large ? "builder2AppMarkLarge" : ""}`}>
      <Icon size={large ? 48 : 31} strokeWidth={1.35} aria-hidden="true" />
    </span>
  );
}

function BuilderAppDetail({ app }: { app: MacApp }) {
  return (
    <main className="builder2AppPage">
      <section className="builder2AppHero">
        <AppMark app={app} large />
        <h1>{app.name}</h1>
        <p>{app.detail}</p>
        {app.hasDownload && (
          <button
            type="button"
            className="builder2DownloadButton"
            aria-label="Download Opener for Mac (download coming soon)"
          >
            Download for Mac
          </button>
        )}
      </section>

      <section className="builder2AppFacts" aria-label={`${app.name} details`}>
        {app.features.map((feature, index) => (
          <div key={feature}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{feature}</p>
          </div>
        ))}
      </section>

      <section className="builder2AppComingSoon">
        <h2>More soon.</h2>
        <p>
          Screenshots, download information, release notes, and the complete
          product story will live here.
        </p>
      </section>
    </main>
  );
}

export default function BuilderPortfolio({ appSlug }: { appSlug?: string }) {
  const selectedApp = macApps.find((app) => app.slug === appSlug);

  if (selectedApp) return <BuilderAppDetail app={selectedApp} />;

  return (
    <main className="builder2">
      <section className="builder2Intro">
        <h1>
          I make Figma plugins, Mac apps,
          <span> and websites.</span>
        </h1>
        <p>Mostly because I want them to exist.</p>
      </section>

      <section className="builder2Section" aria-labelledby="builder-plugins">
        <header className="builder2SectionHeader">
          <h2 id="builder-plugins">Figma plugins</h2>
        </header>

        <div className="builder2PluginList">
          {figmaPlugins.map((plugin, index) => (
            <a
              key={plugin.name}
              href={plugin.href}
              target="_blank"
              rel="noreferrer"
              className="builder2Plugin"
            >
              <span className="builder2Index">{String(index + 1).padStart(2, "0")}</span>
              <Image src={plugin.image} alt="" width={74} height={74} />
              <h3>{plugin.name}</h3>
              <p>{plugin.description}</p>
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <GitHubActivity />

      <section className="builder2Section" aria-labelledby="builder-concept">
        <header className="builder2SectionHeader builder2ConceptHeading">
          <h2 id="builder-concept">Hanumankind</h2>
          <p>A straightforward concept revamp for the Indian artist.</p>
        </header>

        <a
          href="https://github.com/01xharshu/hanumankind-india"
          target="_blank"
          rel="noreferrer"
          className="builder2Hanumankind"
        >
          <span>INDIA / 2026</span>
          <strong>HANUMAN<br />KIND</strong>
          <span className="builder2HanumankindLink">
            View the build <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </a>
      </section>

      <section className="builder2Section" aria-labelledby="builder-apps">
        <header className="builder2SectionHeader">
          <h2 id="builder-apps">Mac apps</h2>
        </header>

        <div className="builder2AppList">
          {macApps.map((app, index) => (
            <Link
              key={app.slug}
              href={`/portfolio/builder/apps/${app.slug}`}
              className="builder2App"
            >
              <span className="builder2Index">{String(index + 1).padStart(2, "0")}</span>
              <AppMark app={app} />
              <h3>{app.name}</h3>
              <p>{app.description}</p>
              <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
