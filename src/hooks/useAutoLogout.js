import { useEffect } from "react";

export function useAutoLogout(timeout = 300000, onLogout) {
  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(onLogout, timeout); // 5 minutos = 300000 ms
    };

    const activityEvents = ["click", "mousemove", "keydown", "scroll", "touchstart"];

    activityEvents.forEach(event =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer(); // iniciar el timer

    return () => {
      clearTimeout(timeoutId);
      activityEvents.forEach(event =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [timeout, onLogout]);
}
