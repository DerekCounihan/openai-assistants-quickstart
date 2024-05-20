const ORGANISATION_ID = process.env.NEXT_PUBLIC_ORGANISATION_ID;
const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL;
const COMMUNITY_ID = process.env.NEXT_PUBLIC_COMMUNITY_ID;

export const createChallenge = async ({ details, startDate }) => {
  console.log("Creating Challenge Baby!");

  const payload = {
    functionName: "create_challenge",
    organisationId: ORGANISATION_ID,
    communityId: details.communityId || COMMUNITY_ID,
    status: "live",
    details: {
      title: details.title,
      description: details.description,
      generateImages: details.generateImages,
      bannerUrl: details.bannerUrl,
    },
    startDate,
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log("Challenge Created");

    return { payload, response: responseData };
  } catch (error) {
    console.error("Error creating challenge:", error);
    throw error;
  }
};
