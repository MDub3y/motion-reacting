"use client";
import { IconBrandInstagram, IconMail, IconUser, IconWorld } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useEffect } from 'react';

type HighlightType = 'name' | 'website' | 'email' | 'instagram' | null;

export default function InteractiveAddress({ email = "manasvi@mxdub.com" }: { email?: string; }) {

    const icons: { type: HighlightType, label: string, Icon: React.ElementType; }[] = [
        { type: 'name' as HighlightType, label: 'Name', Icon: IconUser },
        { type: 'website' as HighlightType, label: 'Website', Icon: IconWorld },
        { type: 'email' as HighlightType, label: 'Email', Icon: IconMail },
        { type: 'instagram' as HighlightType, label: 'Instagram', Icon: IconBrandInstagram },
    ];

    const [highlight, setHighlight] = useState<HighlightType>(null);
    return (
        <div className="flex flex-col items-center justify-center gap-8 p-8">
            {/* Main address display */}
            <div className="relative flex min-h-28 flex-col items-center">
                {email}
            </div>

            {/* Icons container / row */}
            <div className='mt-4 flex items-center'>
                {icons.map(({ type, Icon }) => (
                    <motion.button key={type}
                        onMouseEnter={() => setHighlight(type)}
                        onMouseLeave={() => setHighlight(null)}
                        className='relative rounded-lg p-2 transition-colors'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Icon className="size-5 transition-colors duration-150" strokeWidth="1.5" />
                        <AnimatePresence>
                            {highlight === type && <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className='absolute inset-0 -z-10 rounded-lg bg-neutral-500/10'
                            >
                            </motion.div>}
                        </AnimatePresence>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
