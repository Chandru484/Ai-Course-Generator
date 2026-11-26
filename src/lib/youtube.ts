export async function searchYouTubeVideos(query: string, maxResults: number = 5): Promise<any[]> {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  
  if (!apiKey) {
    throw new Error('YouTube API key not configured')
  }

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${apiKey}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch YouTube videos')
  }

  const data = await response.json()
  return data.items || []
}

export async function getYouTubeVideoDetails(videoId: string): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  
  if (!apiKey) {
    throw new Error('YouTube API key not configured')
  }

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch video details')
  }

  const data = await response.json()
  return data.items?.[0] || null
}

export function generateVideoQuery(courseTitle: string, chapterTitle: string): string {
  return `${courseTitle} ${chapterTitle} tutorial`
}
