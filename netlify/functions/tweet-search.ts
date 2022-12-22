import { Handler } from '@netlify/functions';
import { Client } from "twitter-api-sdk";

async function search() {
  const client = new Client(process.env.TWITTER_BEARER_TOKEN as string);
  console.log('TWITTER_BEARER_TOKEN', process.env.TWITTER_BEARER_TOKEN)
  
  const response = await client.tweets.tweetsRecentSearch({
    "query": "from:StripeDev",
    "tweet.fields": [
        "author_id",
        "created_at",
        "text"
    ]
  });

  return response;
}

const handler: Handler = async (event, context) => {
  
    const results = await search();
    console.log(results)

    return {
    statusCode: 200,
    body: JSON.stringify(results)
  }
}

export { handler }