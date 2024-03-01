import { createClient, PhotosWithTotalResults, Photo } from "pexels";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const client = createClient(API_KEY!);

async function fetch_photos(query = "Nature", per_page = 10): Promise<Photo[]> {
  const { photos } = (await client.photos.search({
    query,
    per_page,
  })) as PhotosWithTotalResults;
  return photos;
}

export default fetch_photos;
