/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from 'next/link';
import React, {useRef, useState, useEffect} from 'react';
import * as motion from "motion/react-client";


const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if(ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    }
  }, [callback]);

  return ref;
}

export const LayoutCards = () => {
  const [current, setCurrent] = useState<Card | null>(null);
  const ref = useOutsideClick(() => setCurrent(null));

    return (
    <div className='py-10 bg-gray-100 min-h-screen relative'>
      {current && <motion.div 
        initial={{
          opacity:0
        }}
        animate={{
          opacity: 1
        }}
        className='fixed z-10 h-full w-full inset-0 bg-black/50 backdrop-blur-sm'></motion.div>}
      {current && <motion.div 
        layoutId={`card-${current.title}`}
        ref={ref} 
        className='h-[500px] fixed inset-0 z-20 m-auto w-72 bg-white rounded-2xl border-neutral-200 p-4 overflow-hidden'
      >
        <motion.img 
          layoutId={`card-image-${current.title}`}
          src={current.src} 
          alt={current.title} 
          className='w-full aspect-square rounded-xl' 
        />
        <div className="flex flex-col justify-between items-start">
          <div className="flex items-start justify-between py-4 w-full gap-2">
            <div className='flex flex-col items-start gap-2'>
              <motion.h2 layoutId={`card-title-${current.title}`} className='font-bold text-xs tracking-tight text-black'>{current.title}</motion.h2>
              <motion.p layoutId={`card-description-${current.title}`} className='text-[10px] text-neutral-500'>{current.description}</motion.p>
            </div>
            <motion.div layoutId={`card-cta-${current.title}`}>
              <Link href={current.ctaLink} className='px-2 py-1 bg-green-500 rounded-full text-white text-xs'>
                {current.ctaText}
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{
              filter: 'blur(10px)',
              opacity: 0,
            }}
            animate={{
              filter: 'blur(0px)',
              opacity: 1,
            }}
            transition={{
              delay: 0.3
            }}
            className="h-50 overflow-auto pb-20 mask-b-to-90%">
            {current.content()}
          </motion.div>
        </div>
      </motion.div>}
      <div className="max-w-lg mx-auto flex flex-col gap-10">
        {Cards.map((card, idx) => (
        <motion.button 
          layoutId={`card-${card.title}`}
          onClick={() => setCurrent(card)}
          key={card.title} 
          className='p-4 cursor-pointer rounded-lg flex justify-between items-center bg-white border border-neutral-200'
        >
          <div className='flex gap-4 items-center'>
            <motion.img 
              layoutId={`card-image-${card.title}`}
              src={card.src} 
              alt={card.title} 
              className='h-14 aspect-square rounded-lg' 
            />
            <div className='flex flex-col items-start gap-2'>
              <motion.h2 layoutId={`card-title-${card.title}`} className='font-bold text-xs tracking-tight text-black'>{card.title}</motion.h2>
              <motion.p layoutId={`card-description-${card.title}`} className='text-[10px] text-neutral-500'>{card.description}</motion.p>
            </div>
          </div>
          <motion.div layoutId={`card-cta-${card.title}`} className='px-2 py-1 bg-green-500 rounded-full text-white text-xs'>
            {card.ctaText}
          </motion.div>
        </motion.button>
      ))}
      </div>
    </div>
)}

type Card = {
    description: string;
    title: string;
    src: string;
    ctaText: string;
    ctaLink: string;
    content: () => React.ReactNode
}

const Cards: Card[] = [
  {
    description: "Lana Del Rey",
    title: "Summertime Sadness",
    src: "/summertime.jpeg",
    ctaText: "Play",
    ctaLink: "https://pro.aceternity.com/templates",
    content: () => {
      return (
        <p className="text-[10px] text-neutral-500">
          Lana Del Rey is a singer-songwriter from New York, known for her moody, vintage-inspired music and cinematic storytelling. She rose to fame in 2011 with &quot;Video Games,&quot; and soon after released her breakthrough album *Born to Die*, which became a defining record of the early 2010s alt-pop movement. <br /><br />
          &quot;Summertime Sadness&quot; became one of her most iconic tracks, blending melancholic lyrics with sweeping orchestration and haunting vocals. The song captures her signature style—a mix of glamour, heartbreak, and nostalgia for a world that feels both real and imagined. <br /><br />
          Over the years, Lana has evolved from an internet darling into a critically acclaimed artist with albums like *Ultraviolence*, *Honeymoon*, and the masterful *Norman Fucking Rockwell!*. Her music dives deep into themes of lost love, Americana, and self-reflection, wrapped in a dreamy, vintage filter. She&apos;s carved out her own lane, unapologetically poetic and profoundly influential.
        </p>
      );
    }
  },
  {
    description: "Charlie Puth",
    title: "Attention",
    src: "/attention.jpg",
    ctaText: "Play",
    ctaLink: "https://pro.aceternity.com/templates",
    content: () => {
      return (
        <p className="text-[10px] text-neutral-500">
          Charlie Puth took the pop world by storm with his sleek production and pitch-perfect vocals. With &quot;Attention,&quot; he traded ballads for basslines, dropping a sultry, groove-driven hit that marked a turning point in his career. <br /><br />
          Released in 2017, the song showcases Charlie&apos;s knack for minimalist funk-pop, with biting lyrics aimed at a manipulative ex. It&apos;s got attitude, swagger, and just enough vulnerability to keep it human. The subtle layering and catchy chorus made it a standout on his album *Voicenotes*, earning widespread radio play and fan love. <br /><br />
          Beyond his own work, Charlie is a gifted producer and songwriter, often blending classical training with pop sensibilities. &quot;Attention&quot; cemented his identity as more than a pretty voice—it revealed a pop architect with an ear for detail and a desire to experiment.
        </p>
      );
    }
  },
  {
    description: "Lady Gaga & Bruno Mars",
    title: "Die With a Smile",
    src: "/diewithasmile.jpg",
    ctaText: "Play",
    ctaLink: "https://pro.aceternity.com/templates",
    content: () => {
      return (
        <p className="text-[10px] text-neutral-500">
          &quot;Die With a Smile&quot; is a powerful fusion of two of pop&apos;s most electric performers—Lady Gaga and Bruno Mars. The song is bold, dramatic, and wildly infectious, with both artists pouring their signature flair into every note. <br /><br />
          Gaga brings her avant-garde theatricality while Bruno injects his retro-soul charm, resulting in a track that feels like a glittery throwback and a modern anthem all at once. From the gospel-inspired bridge to the roaring chorus, &quot;Die With a Smile&quot; is a celebration of passion, life, and embracing the moment without fear. <br /><br />
          The collaboration is more than a duet—it&apos;s a full-blown spectacle that highlights the versatility and vocal strength of two of music&apos;s most charismatic icons. It&apos;s the kind of song that leaves you breathless and empowered.
        </p>
      );
    }
  },
  {
    description: "Sabrina Carpenter",
    title: "Espresso",
    src: "/espresso.jpeg",
    ctaText: "Play",
    ctaLink: "https://pro.aceternity.com/templates",
    content: () => {
      return (
        <p className="text-[10px] text-neutral-500">
          With &quot;Espresso,&quot; Sabrina Carpenter steps fully into her own, offering a flirty, fast-paced banger that pulses with confidence. From its very first beat, the track is a rush—sweet, addictive, and unapologetically bold. <br /><br />
          The lyrics are witty and layered with double meanings, showing Sabrina&apos;s growing skill as a songwriter. The energy is pure summer fun, but with a smart edge that proves she&apos;s got more than just charisma—she&apos;s got real artistic vision. <br /><br />
          &quot;Espresso&quot; feels like a turning point in her career, showcasing her as not just a pop contender, but a defining voice of her generation. With each release, Sabrina pushes further into full-fledged pop stardom, balancing charm and ambition like a seasoned pro.
        </p>
      );
    }
  },
  {
    description: "Dua Lipa",
    title: "Levitating",
    src: "/levitating.jpg",
    ctaText: "Play",
    ctaLink: "https://pro.aceternity.com/templates",
    content: () => {
      return (
        <p className="text-[10px] text-neutral-500">
          &quot;Levitating&quot; is a glittering highlight from Dua Lipa&apos;s *Future Nostalgia* era—a track that blends disco, funk, and spacey pop into one magnetic package. With an infectious beat and galactic energy, the song invites you to let go and float with her through a world of retro-futuristic joy. <br /><br />
          Dua&apos;s performance is cool and commanding, bringing together polished production with playful lyrics. She sounds like a pop star in total control, bridging the past and future with ease. <br /><br />
          The track has seen massive success globally, thanks to remixes and collaborations, and it continues to be a mainstay in playlists, clubs, and TikToks alike. &quot;Levitating&quot; is proof that pop doesn&apos;t have to be basic to be big—it just has to make you move.
        </p>
      );
    }
  },
  {
    description: "Diljit Dosanjh & Sia",
    title: "Hass Hass",
    src: "/hasshass.jpg",
    ctaText: "Play",
    ctaLink: "https://pro.aceternity.com/templates",
    content: () => {
      return (
        <p className="text-[10px] text-neutral-500">
          &quot;Hass Hass&quot; is a cultural celebration wrapped in high-energy beats and infectious vocals. The unlikely but electrifying collaboration between Punjabi megastar Diljit Dosanjh and pop icon Sia delivers a song that&apos;s as bold as it is joyful. <br /><br />
          The track blends traditional Punjabi instrumentation with western pop stylings, fusing worlds in a way that feels both natural and exciting. Diljit&apos;s smooth delivery and Sia&apos;s powerhouse vocals take turns leading the charge, creating a back-and-forth that&apos;s both playful and powerful. <br /><br />
          More than just a party anthem, &quot;Hass Hass&quot; is a reminder of music&apos;s ability to transcend language and borders. It&apos;s full of life, rhythm, and spirit—and it&apos;s impossible not to smile while it plays.
        </p>
      );
    }
  },
  {
    description: "Benson Boone",
    title: "Beautiful Things",
    src: "/beautifulthings.jpeg",
    ctaText: "Play",
    ctaLink: "https://pro.aceternity.com/templates",
    content: () => {
      return (
        <p className="text-[10px] text-neutral-500">
          Benson Boone&apos;s &quot;Beautiful Things&quot; is a heart-wrenching ballad that captures the fragility of happiness. Known for his stunning vocal control and emotional depth, Benson lays it all bare in this haunting track. <br /><br />
          The lyrics reflect a fear of losing the people and moments that make life worth living, with a soft piano backdrop that builds into a cinematic swell. It&apos;s intimate and powerful, a song that resonates with anyone who&apos;s loved deeply and feared its loss. <br /><br />
          Boone&apos;s ability to turn vulnerability into strength is what sets him apart in today&apos;s music landscape. &quot;Beautiful Things&quot; isn&apos;t just a song—it&apos;s an emotional release, and it marks a milestone in his evolution as a raw, relatable voice in modern pop.
        </p>
      );
    }
  }
];
