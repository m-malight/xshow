import { Videos, createClient } from "pexels";
import { videoType } from "@/types";
const VIDEO_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const client = createClient(VIDEO_API_KEY!);

async function fetch_videos(
  query = "Group of people working",
  per_page = 1
): Promise<videoType> {
  const { videos } = (await client.videos.search({
    query,
    per_page,
  })) as Videos;
  const video: videoType = {
    id: videos[0].id,
    src: videos[0].video_files[0].link,
    cast: videos[0].user.name,
    name: "",
  };
  return video;
}

export default fetch_videos;
