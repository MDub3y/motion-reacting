"use client";

import * as motion from "motion/react-client";
import { cn } from "@/utils/cn";
import {
  IconMessage,
  IconPlus,
  IconUserBolt,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

export const Card = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.98,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              filter: "blur(10px)",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className={cn(
              "h-[26rem] min-h-[26rem] w-72 rounded-xl bg-white",
              "shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]",
              "flex flex-col p-6",
            )}
          >
            <h1 className="text-[10px] font-bold">
              Organization UI Components
            </h1>
            <p className="mt-2 text-[10px] text-neutral-600">
              Clerk&apos;s UI components add turn-key simplicity to complex
              Organization management tasks.
            </p>
            <div className="flex items-center justify-center">
              <button
                onClick={() => setOpen(false)}
                className="mt-4 flex items-center gap-1 rounded-md px-2 py-1 text-[10px] shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]"
              >
                <Image
                  className="h-4 w-4"
                  src={"/clerk.png"}
                  width={50}
                  height={50}
                  alt="logo"
                />{" "}
                Clerk
                <IconX className="h-3 w-3 text-neutral-400" />
              </button>
            </div>
            <div className="relative mt-4 flex-1 rounded-lg border border-dashed border-neutral-200 bg-gray-100">
              {/* Motion div starts here */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.98,
                  filter: "blur(10px)",
                }}
                whileHover={{
                  opacity: 1,
                  scale: 1.05,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 h-full w-full divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white"
              >
                <div className="flex gap-2 p-4">
                  <div className="rounded-nd flex h-7 w-7 flex-shrink-0 items-center justify-center bg-white bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
                    <IconMessage className="h-4 w-4 text-neutral-600" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[8px] font-bold text-neutral-600">
                      Bluth Company
                    </p>
                    <p className="text-[8px] text-neutral-400">Mr. Manager</p>
                  </div>
                </div>
                <div className="flex gap-2 p-4">
                  <div className="rounded-nd flex h-7 w-7 flex-shrink-0 items-center justify-center bg-white bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
                    <IconUsers className="h-4 w-4 text-neutral-600" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[8px] font-bold text-neutral-600">
                      Dunder Miffin
                    </p>
                    <p className="text-[8px] text-neutral-400">
                      Asst (to the) Regional Manager
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 p-4">
                  <div className="rounded-nd flex h-7 w-7 flex-shrink-0 items-center justify-center bg-white bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
                    <IconUserBolt className="h-4 w-4 text-neutral-600" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[8px] font-bold text-neutral-600">
                      Personal Account
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 p-4">
                  <div className="rounded-nd flex h-7 w-7 flex-shrink-0 items-center justify-center bg-white bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
                    <IconPlus className="h-4 w-4 rounded-full bg-gray-200 text-neutral-600" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[8px] font-bold text-neutral-600">
                      Create Account
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* Motion div ends here */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
