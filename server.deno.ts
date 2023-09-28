import { serve } from 'https://deno.land/std@0.194.0/http/server.ts'
import { serveDir } from 'https://deno.land/std@0.194.0/http/file_server.ts'

serve((req) => {
  const pathname = new URL(req.url).pathname
  console.log(pathname)

  return serveDir(req, {
    fsRoot: 'public',
    urlRoot: '',
    showDirListing: true,
    enableCors: true,
  })
})