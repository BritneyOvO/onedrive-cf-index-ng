import axios from 'redaxios'

import { getAccessToken } from '.'
import apiConfig from '../../../config/api.config'
import { NextResponse } from 'next/server'
import { getRequestUrl } from '../../utils/requestUrl'

export default async function handler(req: Request): Promise<Response> {
  // Get access token from storage
  const accessToken = await getAccessToken()

  // Get item details (specifically, its path) by its unique ID in OneDrive
  const requestUrl = getRequestUrl(req)
  const { id = '' } = Object.fromEntries(requestUrl.searchParams)

  // TODO: Set edge function caching for faster load times

  if (typeof id === 'string') {
    const idPattern = /^[a-zA-Z0-9]+$/
    if (!idPattern.test(id)) {
      // ID contains characters other than letters and numbers
      return new Response(JSON.stringify({ error: 'Invalid driveItem ID.' }), { status: 400 })
    }

    const itemApi = `${apiConfig.driveApi}/items/${id}`
    try {
      const { data } = await axios.get(itemApi, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          select: 'id,name,parentReference',
        },
      })
      return NextResponse.json(data, {
        headers: {
          'Cache-Control': apiConfig.cacheControlHeader,
        },
      })
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error?.response?.data ?? 'Internal server error.' }), { status: error?.response?.status ?? 500 })
    }
  } else {
    return new Response(JSON.stringify({ error: 'Invalid driveItem ID.' }), { status: 400 })
  }
}
