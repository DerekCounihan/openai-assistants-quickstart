"use client";

import React from "react";
import styles from "./page.module.css";
import Chat from "../../components/chat";
import { createChallenge } from "../../utils/challenge";
import { createCommunity } from "../../utils/community";
import { createYoutubeVideoInteraction } from "../../utils/youtube";
import FileViewer from "../../components/file-viewer";

const FunctionCalling = () => {
  const functionCallHandler = async (call) => {
    console.log("functionCallHandler invoked");
    console.log("Function call details:", call);

    const args = call?.function?.arguments
      ? JSON.parse(call.function.arguments)
      : {};

    switch (call?.function?.name) {
      case "create_challenge":
        const challengeData = await createChallenge(args);
        return JSON.stringify(challengeData);

      case "create_community":
        const communityData = await createCommunity(args);
        return JSON.stringify(communityData);

      case "create_youtube_video_interaction":
        const youtubeData = await createYoutubeVideoInteraction(args);
        return JSON.stringify(youtubeData);

      // Add other cases here for additional functions
      default:
        console.error(`Unknown function: ${call?.function?.name}`);
        return "";
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          <FileViewer />
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;
