import { useEffect, useState } from 'react';

// Types out each command in sequence, revealing that command's output the
// moment it finishes typing, then pausing briefly before the next command
// starts — mirrors how a real shell session reads, not a generic fade-in.
export function useTerminalSequence(commands, { reducedMotion = false, charDelay = 28, stepPause = 220 } = {}) {
  const [stepIndex, setStepIndex] = useState(reducedMotion ? commands.length : 0);
  const [charCount, setCharCount] = useState(0);
  const [revealedCount, setRevealedCount] = useState(reducedMotion ? commands.length : 0);

  useEffect(() => {
    if (reducedMotion || stepIndex >= commands.length) return undefined;

    const command = commands[stepIndex];
    if (charCount < command.length) {
      const timer = setTimeout(() => setCharCount((c) => c + 1), charDelay + Math.random() * 24);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setRevealedCount((r) => Math.max(r, stepIndex + 1));
      setStepIndex((s) => s + 1);
      setCharCount(0);
    }, stepPause);
    return () => clearTimeout(timer);
  }, [stepIndex, charCount, reducedMotion, commands, charDelay, stepPause]);

  const typedCurrent = stepIndex < commands.length ? commands[stepIndex].slice(0, charCount) : commands[commands.length - 1] || '';
  const isTypingStep = (i) => !reducedMotion && i === stepIndex && stepIndex < commands.length;
  const isDone = reducedMotion || stepIndex >= commands.length;

  return { stepIndex, typedCurrent, revealedCount, isTypingStep, isDone };
}
