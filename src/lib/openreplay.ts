import Tracker from "@openreplay/tracker";
import trackerAssist from "@openreplay/tracker-assist";

// Initialize OpenReplay tracker
const tracker = new Tracker({
  projectKey:
    process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY || "nywLUMo5pPOy3xjNEBIo",
  __DISABLE_SECURE_MODE: process.env.NODE_ENV === "development", // Disable secure mode in development
});

// Enable Assist plugin for live session support
tracker.use(
  trackerAssist({
    callConfirm: {
      text: "Would you like to start a call?",
      confirmBtn: "Start Call",
      declineBtn: "Decline",
    },
  })
);

export default tracker;
