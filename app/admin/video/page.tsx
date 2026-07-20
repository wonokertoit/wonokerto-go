import { getVideos } from '@/app/actions/videos';
import VideoClient from './VideoClient';

export default async function VideoPage() {
  const videos = await getVideos();

  return <VideoClient videos={videos} />;
}
