const ORGANISATION_ID = process.env.NUDJ_PUBLIC_ORGANISATION_ID;
const WEBHOOK_URL =
  "https://hook.eu2.make.com/urqkndm13w1gnyym52delxl0x1cg13ut";
const COMMUNITY_ID = process.env.NUDJ_PUBLIC_COMMUNITY_ID;

export const createYoutubeVideoInteraction = async (params) => {
  console.log("Youtube Video Interaction Action Invoked");
  console.log("Webhook URL:", WEBHOOK_URL);

  const payload = {
    functionName: "create_youtube_video_interaction",
    organisationId: ORGANISATION_ID,
    communityId: params.communityId || COMMUNITY_ID,
    allocationId: params.allocationId,
    details: {
      title: params.details.title,
      description: params.details.description,
    },
    attributes: {
      title: params.attributes.title,
      videoId: params.attributes.videoId,
    },
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log("Response Text:", responseText);

    if (!response.ok) {
      console.error("Error response from server:", responseText);
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return { payload, response: JSON.parse(responseText) };
  } catch (error) {
    console.error("Error creating Youtube video interaction action:", error);
    throw error;
  }
};
