import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Background from "./components/Background";
import TopBar from "./components/TopBar";
import NavControls from "./components/NavControls";
import IntroGate from "./components/IntroGate";
import { useMusic } from "./hooks/useMusic";
import Page1Greeting from "./pages/Page1Greeting";
import Page2Friendship from "./pages/Page2Friendship";
import Page3Letter from "./pages/Page3Letter";
import Page4Finale from "./pages/Page4Finale";

const TOTAL_PAGES = 4;

export default function App() {
  const [gateOpen, setGateOpen] = useState(true);
  const [page, setPage] = useState(1);
  // Page 1 and Page 3 gate the Next button behind an animation finishing.
  const [page1Ready, setPage1Ready] = useState(false);
  const [page3Ready, setPage3Ready] = useState(false);
  const { playing, toggle } = useMusic();

  const canAdvance =
    (page === 1 && page1Ready) || (page === 3 && page3Ready) || page === 2 || page === 4;

  const goTo = (index: number) => {
    const target = index + 1;
    if (target < 1 || target > TOTAL_PAGES) return;
    setPage(target);
  };
  const handleNext = () => goTo(page);
  const handleBack = () => goTo(page - 2);

  const handleBegin = () => {
    setGateOpen(false);
    if (!playing) toggle();
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Background />
      <IntroGate visible={gateOpen} onBegin={handleBegin} />

      {!gateOpen && (
        <>
          <TopBar page={page} total={TOTAL_PAGES} playing={playing} onToggleMusic={toggle} />
          <NavControls
            page={page}
            total={TOTAL_PAGES}
            canAdvance={canAdvance}
            onNext={handleNext}
            onBack={handleBack}
            onDotClick={goTo}
          />
        </>
      )}

      <AnimatePresence mode="wait">
        {!gateOpen && (
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0 no-scrollbar overflow-y-auto"
          >
            {page === 1 && <Page1Greeting onReady={() => setPage1Ready(true)} onNext={handleNext} />}
            {page === 2 && <Page2Friendship />}
            {page === 3 && <Page3Letter onReady={() => setPage3Ready(true)} />}
            {page === 4 && <Page4Finale />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
