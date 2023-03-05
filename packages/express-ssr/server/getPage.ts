import React from 'react'
import { newErrorApiResponse, newSuccessfulApiResponse } from '@ssr/core'
import type { ApiResponse } from '@ssr/core'
import type { DataLoader, MetaLoader } from './types'

type GetPageResult = {
  dataLoader?: DataLoader
  metaLoader?: MetaLoader
  Component: React.ComponentType<unknown>
}

export const getPage = async (
  filepath: string
): Promise<ApiResponse<GetPageResult>> => {
  try {
    const {
      default: Component,
      dataLoader,
      metaLoader,
    } = await import(filepath)
    return newSuccessfulApiResponse({
      Component,
      dataLoader,
      metaLoader,
    })
  } catch (e) {
    return newErrorApiResponse(e)
  }
}
