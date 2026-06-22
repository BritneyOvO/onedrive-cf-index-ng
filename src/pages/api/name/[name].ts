import { default as rawFileHandler } from '../raw'

export default async function handler(req: Request): Promise<Response> {
  return rawFileHandler(req)
}
