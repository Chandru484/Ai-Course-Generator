import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory cache to avoid redundant YouTube lookups
const searchCache = new Map<string, string[]>()

async function fetchFromYouTubeDataApi(query: string, maxResults: number): Promise<string[]> {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  if (!apiKey) return []

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${apiKey}`,
      { signal: AbortSignal.timeout(3000) }
    )
    if (!response.ok) return []

    const data = await response.json()
    const ids = (data.items || [])
      .map((item: any) => item?.id?.videoId)
      .filter((id: unknown): id is string => typeof id === 'string' && id.length === 11)
    return ids
  } catch {
    return []
  }
}

async function fetchFromYouTubeSearchHtml(query: string, maxResults: number): Promise<string[]> {
  try {
    const response = await fetch(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        signal: AbortSignal.timeout(5000),
      }
    )
    if (!response.ok) return []

    const html = await response.text()
    const matches = Array.from(html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g))
    const uniqueIds: string[] = []
    for (const match of matches) {
      const id = match[1]
      if (!uniqueIds.includes(id)) {
        uniqueIds.push(id)
        if (uniqueIds.length >= maxResults) break
      }
    }
    return uniqueIds
  } catch {
    return []
  }
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim()
  const maxResults = Math.min(Math.max(Number(request.nextUrl.searchParams.get('maxResults') || '5'), 1), 10)

  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter q' }, { status: 400 })
  }

  const cacheKey = `${query.toLowerCase()}::${maxResults}`
  const cached = searchCache.get(cacheKey)
  if (cached && cached.length > 0) {
    return NextResponse.json({
      videoIds: cached,
      videoUrl: `https://www.youtube.com/watch?v=${cached[0]}`,
    })
  }

  let videoIds = await fetchFromYouTubeDataApi(query, maxResults)
  if (videoIds.length === 0) {
    videoIds = await fetchFromYouTubeSearchHtml(query, maxResults)
  }

  if (videoIds.length > 0) {
    searchCache.set(cacheKey, videoIds)
    return NextResponse.json({
      videoIds,
      videoUrl: `https://www.youtube.com/watch?v=${videoIds[0]}`,
    })
  }

  return NextResponse.json({ videoIds: [], videoUrl: null })
}
