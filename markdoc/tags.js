import { Callout } from '@/components/Callout'
import { LinkGrid } from '@/components/LinkGrid'
import { Video } from '@/components/Video'
import { Event } from '@/components/Event'
import { Signup } from '@/components/Signup'

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning'],
        errorLevel: 'critical',
      },
    },
    render: Callout,
  },
  video: {
    attributes: {
      src: { type: String },
    },
    render: Video,
  },
  event: {
    attributes: {
      name: { type: String },
      image: { type: String },
      link: { type: String },
    },
    render: Event,
  },
  signup: {
    attributes: {
      id: { type: String },
    },
    render: Signup,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: ({ src, alt = '', caption }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
  },
  'link-grid': {
    render: LinkGrid,
  },
  'link-grid-link': {
    selfClosing: true,
    render: LinkGrid.Link,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },
}

export default tags
