import { useMemo, useEffect } from 'react'

export function useBlobUrl(blob: Blob | undefined | null) {
  const blobUrl = useMemo(() => blob && URL.createObjectURL(blob), [blob])

  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl)
    }
  }, [blobUrl])

  return blobUrl
}
