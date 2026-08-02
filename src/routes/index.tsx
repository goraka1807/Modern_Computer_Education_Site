import { useEffect, useState } from "react";
import { createFileRoute, useLocation } from "@tanstack/react-router";
import { Intro } from "@/components/intro/Intro";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import {
  CareerTracks,
  FeaturedCourses,
  LearningJourney,
  Stats,
  WhyKlic,
} from "@/components/Sections";
import {
  Certification,
  Faq,
  FinalCta,
  Footer,
  Testimonials,
} from "@/components/Sections2";
import { useSmoothScroll } from "@/components/useSmoothScroll";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Modern Computer Education, Baramati | KLiC Courses & Computer Training",
      },
      {
        name: "description",
        content:
          "Modern Computer Education, Bhigwan Chowk, Baramati — KLiC certificate courses across 11 career tracks with practical training. Call 9823147011 or 9823815231.",
      },
      {
        property: "og:title",
        content: "Modern Computer Education, Baramati | KLiC Courses",
      },
      {
        property: "og:description",
        content:
          "KLiC certificate courses and computer training at Sharda Prangan, Bhigwan Chowk, Baramati. Call 9823147011 / 9823815231.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),

  component: Index,
});

function Index() {
  useSmoothScroll();
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false);
    setShowIntro(true);
    setReplayKey((value) => value + 1);
  }, [location.pathname]);

  return (
    <>
      {showIntro && (
        <Intro
          key={replayKey}
          replayKey={replayKey}
          onReveal={() => setRevealed(true)}
          onFinish={() => setShowIntro(false)}
        />
      )}
      <div
        style={{
          opacity: revealed ? 1 : 0,
          transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <AuroraBackground />
        <Navbar />
        <main>
          <Hero />
          <WhyKlic />
          <CareerTracks />
          <FeaturedCourses />
          <LearningJourney />
          <Stats />
          <Certification />
          <Testimonials />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </>
  );
}

