import { Callout } from '@/components/Callout'
import { LinkGrid } from '@/components/LinkGrid'
import { Video } from '@/components/Video'
import { Event } from '@/components/Event'
import { Post } from '@/components/Post'
import { Signup } from '@/components/Signup'
import { Tweet } from '@/components/Tweet'
import { Wide } from '@/components/Wide'
import { MyHighlight } from '@/components/Highlight'
import { Box } from '@/components/Box'
import { SideBySide } from '@/components/SideBySide'
import { Grid } from '@/components/Grid'

const tags = {
  highlight: {
    render: MyHighlight,
  },
  box : {
    attributes: {
      css: { type: String },
    },
    render: Box,
  },
  sidebyside : {
    attributes: {
      css: { type: String },
    },
    render: SideBySide,
  },
  grid : {
    render: Grid,
  },
  wide: {
    attributes: {
      css: { type: String },
      width: { type: Number },
    },
    render: Wide,
  },
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
      date: { type: String },
    },
    render: Event,
  },
  post: {
    attributes: {
      name: { type: String },
      image: { type: String },
      link: { type: String },
      date: { type: String },
    },
    render: Post,
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
  tweet: {
    attributes: {
      link: {type: String},
    },
    render: Tweet,
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
