const ORGANISATION_ID = process.env.NEXT_PUBLIC_ORGANISATION_ID;
const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL;
const COMMUNITY_ID = process.env.NEXT_PUBLIC_COMMUNITY_ID;

export const createCommunity = async (params) => {
  console.log("Creating Community...");
  console.log("Webhook URL:", WEBHOOK_URL);

  const payload = {
    functionName: "create_community",
    organisationId: ORGANISATION_ID,
    communityId: params.communityId || COMMUNITY_ID,
    details: {
      title: params.title,
      slug: params.slug,
      description: params.description,
    },
    links: {
      website: params.website,
      twitter: params.twitter,
      discord: params.discord,
      telegram: params.telegram,
      instagram: params.instagram,
    },
    style: {
      navbarLogo: params.navbarLogo,
      logo: params.logo,
      banner: params.banner,
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
    console.error("Error creating community:", error);
    throw error;
  }
};
