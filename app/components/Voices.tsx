"use client";

import { useEffect, useRef, useState, memo } from "react";

interface TweetUser {
  id_str: string;
  name: string;
  screen_name: string;
  profile_image_url_https: string;
  is_blue_verified: boolean;
  verified: boolean;
  profile_image_shape: string;
}

interface MediaDetail {
  media_url_https: string;
  type: string;
  sizes: {
    large?: { w: number; h: number };
    medium?: { w: number; h: number };
    small?: { w: number; h: number };
  };
}

interface Tweet {
  __typename: string;
  id_str: string;
  text: string;
  created_at: string;
  favorite_count: number;
  retweet_count: number;
  reply_count: number;
  user: TweetUser;
  mediaDetails?: MediaDetail[];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function stripUrls(text: string): string {
  return text.replace(/https?:\/\/t\.co\/\w+/g, "").trim();
}

function formatCount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(n);
}

export default function VoicesSection() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    fetch("/api/tweets")
      .then((r) => r.json())
      .then((data) => {
        if (data.tweets?.length) {
          setTweets(data.tweets);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="voices" data-nav="white" className="reveal-section py-24 md:py-28 px-6 bg-blue-brand text-white overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/[0.03]" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="reveal reveal-signal text-center mb-14">
          <p className="font-heading text-yellow-brand font-semibold tracking-[0.2em] uppercase text-xs mb-4">
            Voces que se unen
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Una conversación que crece
          </h2>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : tweets.length > 0 ? (
          <InfiniteCarousel tweets={tweets} />
        ) : (
          <div className="flex justify-center py-8 text-white/40 text-sm">
            No se pudieron cargar los tweets
          </div>
        )}

        <div className="flex justify-center mt-10 reveal reveal-delay-2">
          <a
            href="https://x.com/MundoConVzla"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-heading text-white/30 hover:text-yellow-brand text-xs tracking-[0.2em] uppercase transition-colors"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            Ver en X
          </a>
        </div>
      </div>
    </section>
  );
}

function InfiniteCarousel({ tweets }: { tweets: Tweet[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const rafId = useRef(0);
  const paused = useRef(false);
  const [hovered, setHovered] = useState(false);

  const speed = 0.5;
  const gap = 20;
  const cards = [...tweets, ...tweets];

  useEffect(() => {
    paused.current = hovered;
  }, [hovered]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const oneSet = (track.scrollWidth - gap * (cards.length - 1)) / cards.length * tweets.length + gap * (tweets.length - 1);

    const tick = () => {
      if (!paused.current) pos.current += speed;
      if (pos.current >= oneSet) pos.current = 0;
      track.style.transform = `translateX(-${pos.current}px)`;
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [tweets.length, cards.length, gap]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden rounded-2xl">
        <div ref={trackRef} className="flex" style={{ gap: `${gap}px` }}>
          {cards.map((t, i) => (
            <div key={`${t.id_str}-${i}`} className="shrink-0 w-[85vw] sm:w-[380px] md:w-[420px]">
              <TweetCard tweet={t} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-blue-brand to-transparent pointer-events-none z-10" />
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-blue-brand to-transparent pointer-events-none z-10" />
    </div>
  );
}

const TweetCard = memo(function TweetCard({ tweet }: { tweet: Tweet }) {
  const hasImage = tweet.mediaDetails?.some((m) => m.type === "photo");
  const images = tweet.mediaDetails?.filter((m) => m.type === "photo") ?? [];

  return (
    <div className="h-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden group hover:bg-white/[0.07] transition-colors">
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-yellow-brand/40 group-hover:bg-yellow-brand/80 transition-colors" />
      <div className="pl-6 pr-5 pt-5 pb-4 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={tweet.user.profile_image_url_https}
            alt={tweet.user.name}
            className="w-9 h-9 rounded-full shrink-0 ring-1 ring-white/10"
          />
          <div className="min-w-0 flex items-center gap-1.5 flex-wrap">
            <span className="font-heading font-semibold text-xs text-white/90 truncate max-w-[120px]">
              {tweet.user.name}
            </span>
            {tweet.user.is_blue_verified && (
              <svg viewBox="0 0 22 22" width="14" height="14" className="shrink-0">
                <path fill="#F7C400" d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.97-1.438-1.242.102-.46.06-.94-.162-1.377-.22-.438-.61-.78-1.086-.99-.07-1.006-.56-1.934-1.33-2.532-.77-.6-1.75-.88-2.74-.72-.142-.44-.42-.82-.79-1.07-.372-.25-.81-.36-1.25-.33-.44.03-.86.19-1.22.46l.002.002c-.17-.1-.36-.17-.55-.22-.19-.05-.39-.08-.59-.08-.2 0-.4.03-.59.08-.19.05-.38.12-.55.22l.002-.002c-.36-.27-.78-.43-1.22-.46-.44-.03-.878.08-1.25.33-.37.25-.648.63-.79 1.07-.99-.16-1.97.12-2.74.72-.77.598-1.26 1.526-1.33 2.532-.476.21-.866.552-1.086.99-.222.437-.264.917-.162 1.377-.586.272-1.084.702-1.438 1.242-.355.54-.552 1.17-.57 1.816.018.646.215 1.275.57 1.816.354.54.852.97 1.438 1.242-.102.46-.06.94.162 1.377.22.438.61.78 1.086.99.07 1.006.56 1.934 1.33 2.532.77.6 1.75.88 2.74.72.142.44.42.82.79 1.07.372.25.81.36 1.25.33.44-.03.86-.19 1.22-.46l-.002-.002c.17.1.36.17.55.22.19.05.39.08.59.08.2 0 .4-.03.59-.08.19-.05.38-.12.55-.22l-.002.002c.36.27.78.43 1.22.46.44.03.878-.08 1.25-.33.37-.25.648-.63.79-1.07.99.16 1.97-.12 2.74-.72.77-.598 1.26-1.526 1.33-2.532.476-.21.866-.552 1.086-.99.222-.437.264-.917.162-1.377.586-.272 1.084-.702 1.438-1.242.355-.54.552-1.17.57-1.816z" />
                <path fill="#fff" d="M9.642 14.622a.97.97 0 0 1-.707-.3L6.65 12.05a.96.96 0 0 1 0-1.37 1.05 1.05 0 0 1 1.444 0l1.517 1.47 4.236-4.39a1.06 1.06 0 0 1 1.466-.02c.415.38.43 1.015.033 1.416l-4.98 5.157a.99.99 0 0 1-.707.31z" />
              </svg>
            )}
            <span className="font-heading text-[11px] text-white/40 truncate">
              @{tweet.user.screen_name}
            </span>
            <span className="text-white/15 text-[10px]">·</span>
            <span className="font-heading text-[11px] text-white/35 whitespace-nowrap">
              {formatDate(tweet.created_at)}
            </span>
          </div>
        </div>

        <p className="font-body text-xs sm:text-sm text-white/80 leading-relaxed mb-3 line-clamp-4">
          {stripUrls(tweet.text)}
        </p>

        {hasImage && (
          <div className="mb-3">
            <div
              className={`grid gap-1 rounded-xl overflow-hidden ${
                images.length === 1 ? "grid-cols-1" : "grid-cols-2"
              }`}
            >
              {images.slice(0, 4).map((img, i) => (
                <div key={i} className={`relative overflow-hidden ${images.length === 3 && i === 0 ? "row-span-2" : ""}`}>
                  <img
                    src={img.media_url_https}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ minHeight: images.length === 1 ? "140px" : "80px" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 text-white/20 text-[11px] mt-auto pt-1">
          <span className="flex items-center gap-1 group/stat hover:text-white/50 transition-colors cursor-default">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {formatCount(tweet.favorite_count)}
          </span>
          <span className="flex items-center gap-1 group/stat hover:text-white/50 transition-colors cursor-default">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {formatCount(tweet.reply_count)}
          </span>
          <span className="flex items-center gap-1 group/stat hover:text-white/50 transition-colors cursor-default">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <path d="M17 1l4 4-4 4" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <path d="M7 23l-4-4 4-4" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
            {formatCount(tweet.retweet_count)}
          </span>
        </div>
      </div>
    </div>
  );
});

function LoadingSkeleton() {
  const shimmer = "bg-white/5 animate-pulse rounded";
  return (
    <div className="flex justify-center gap-5 overflow-hidden">
      {[0, 1, 2].map((i) => (
        <div key={i} className="shrink-0 w-[85vw] sm:w-[380px] md:w-[420px]">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            <div className="pl-6 pr-5 pt-5 pb-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${shimmer}`} />
                <div className={`w-24 h-3 ${shimmer}`} />
              </div>
              <div className={`w-full h-3 ${shimmer}`} />
              <div className={`w-3/4 h-3 ${shimmer}`} />
              <div className={`w-1/3 h-3 ${shimmer}`} />
              <div className={`w-1/2 h-3 ${shimmer}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
