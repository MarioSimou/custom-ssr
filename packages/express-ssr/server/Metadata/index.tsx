import type { Metadata as Meta } from '../types'

export type MetadataProps = {
  metadata?: Meta
}

export const processMetadata = (metadata: Meta) =>
  metadata.map(tag => {
    if (tag.type === 'title') {
      return <title key={tag.type}>{tag.content}</title>
    }
    if (tag.type === 'charSet') {
      return <meta key={tag.type} charSet={tag.content} />
    }
    if (tag.type === 'httpEquiv') {
      return (
        <meta
          key={tag.httpEquiv}
          httpEquiv={tag.httpEquiv}
          content={tag.content}
        />
      )
    }
    if (tag.type === 'name') {
      return <meta key={tag.name} name={tag.name} content={tag.content} />
    }
    if (tag.type === 'opengraph') {
      return (
        <meta
          key={tag.property}
          property={tag.property}
          content={tag.content}
        />
      )
    }

    return null
  })

export const Metadata = ({ metadata = [] }: MetadataProps) => {
  return <>{processMetadata(metadata)}</>
}
