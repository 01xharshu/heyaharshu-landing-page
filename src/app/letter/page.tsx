"use client";

import RetroSubpageLayout from "@/components/RetroSubpageLayout";

export default function LetterPage() {
  return (
    <RetroSubpageLayout>
      <div className="retroLabel">ABOUT / LETTER / 2026</div>
      <h1 className="retroSectionTitle">Letter.</h1>
      <p className="retroParagraph" style={{ maxWidth: '800px' }}>
        A space for thoughts, reflections, and longer-form writing.
      </p>

      <section className="retroSection" style={{ marginTop: '48px' }}>
        <p className="retroParagraph" style={{ maxWidth: '800px', marginBottom: '24px' }}>
          &quot;Give me a lever long enough, and a place to stand. I&apos;ll show you how to move the earth around.&quot; This quote hit me hard the day I read it in the Almanack of Naval Ravikant. I love to build <a href="/#as-builder" style={{ textDecoration: 'underline', color: 'inherit' }}>solutions</a>, because I&apos;ve gone from admiring these kinds of websites and UIs to making my own. From using Figma for the very first time in 2022 and wondering how folks create plugins and publish them in the Figma community, to publishing my own plugins.
        </p>

        <p className="retroParagraph" style={{ maxWidth: '800px', marginBottom: '24px' }}>
          I used to be a very underconfident boy when I was in the 6th and 7th standard, but once I started making content, it somehow made me confident. I think from that stage I learned the concept of giving your brain <a href="#evidence" style={{ textDecoration: 'underline', color: 'inherit' }}>evidence</a>.
        </p>

        <p className="retroParagraph" style={{ maxWidth: '800px', marginBottom: '48px' }}>
          I remember I was in the 8th standard when I started making content. I never knew if we really needed a mic, if there was any need to have a setup, neither did I know if there was any better use for a camera. It was just me placing my phone (I had a Samsung Galaxy J1 Ace; my family gifted me this phone and it was my very first <a href="#assets" style={{ textDecoration: 'underline', color: 'inherit' }}>asset</a>).
        </p>

        <div id="assets" style={{ paddingTop: '48px' }}>
          <h2 className="retroSectionTitle" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Assets</h2>
          <p className="retroParagraph" style={{ maxWidth: '800px', marginBottom: '24px' }}>
            Apart from Economics and Finance, I believe all those items that you buy, inherit, or get as a gift, which help you move forward, are your assets. My very first asset was a phone, which I got from my parents. This phone opened a new world for me. 
          </p>
          <p className="retroParagraph" style={{ maxWidth: '800px' }}>
            I was deep in thought before writing this: if we consider 0 (zero) as the origin, then I will always consider my parents and friends as my 0th Asset, the real valuables I have. From childhood up to this age, the friends I&apos;ve had shaped who I am today.
          </p>
        </div>

        <div id="evidence" style={{ paddingTop: '48px' }}>
          <h2 className="retroSectionTitle" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Evidence</h2>
          <p className="retroParagraph" style={{ maxWidth: '800px', marginBottom: '24px' }}>
            Our brain is a fool; it always thinks negatively, it always makes you feel that you&apos;re somehow not enough. But once you start taking actions, like speaking in front of the class—the first time, you will feel scared, thinking: &quot;Oh my God, what will the students think about me? What if the students in the back make fun of me? Or what if the teacher jokes about me?&quot;
          </p>
          <p className="retroParagraph" style={{ maxWidth: '800px' }}>
            But once you start doing it more often, you&apos;ll feel that you can do it easily, because your brain has gathered enough evidence that you can do it, and that you are enough. This is what I did when I joined engineering college. I started taking a stand, I started speaking up and raising my hand—why? Just to speak English. At first, it was fun, and later I became a source of inspiration. Teachers used to point to me in class, telling others to be like me. Overall, it gave me enough evidence that I can do it.
          </p>
        </div>
      </section>
    </RetroSubpageLayout>
  );
}
