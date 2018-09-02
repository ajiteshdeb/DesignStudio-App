export interface BlogPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: Guid;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: Guid;
  content: Content;
  excerpt: Content;
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: any[];
  categories: number[];
  tags: number[];
  _links: Links;
  _embedded: Embedded;
}

interface Embedded {
  author: Author2[];
  'wp:featuredmedia': Wpfeaturedmedia[];
  'wp:term': (Wpterm2 | Wpterm2)[][];
}

interface Wpterm2 {
  id: number;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  _links: Links4;
}

interface Links4 {
  self: Self[];
  collection: Self[];
  about: Self[];
  'wp:post_type': Self[];
  curies: Cury[];
}

interface Wpfeaturedmedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: Guid;
  author: number;
  caption: Guid;
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: Mediadetails;
  source_url: string;
  _links: Links3;
}

interface Links3 {
  self: Self2[];
  collection: Self2[];
  about: Self2[];
  author: Author3[];
  replies: Author3[];
}

interface Author3 {
  attributes: Attributes;
  href: string;
}

interface Attributes {
  embeddable: boolean;
}

interface Self2 {
  attributes: any[];
  href: string;
}

interface Mediadetails {
  width: number;
  height: number;
  file: string;
  sizes: Sizes;
  image_meta: Imagemeta;
}

interface Imagemeta {
  aperture: string;
  credit: string;
  camera: string;
  caption: string;
  created_timestamp: string;
  copyright: string;
  focal_length: string;
  iso: string;
  shutter_speed: string;
  title: string;
  orientation: string;
  keywords: any[];
}

interface Sizes {
  thumbnail: Thumbnail;
  medium: Thumbnail;
  wpautomate_blog_list_col_4: Thumbnail;
  wpautomate_blog_list_col_3: Thumbnail;
  wpautomate_blog_list_col_2: Thumbnail;
  wpautomate_blog_list_col_1: Thumbnail;
  'flip-tile-img-size': Thumbnail;
  'carousel-img-size': Thumbnail;
  'ze-vc-author-post-image': Thumbnail;
  ze_custom_title_icon_size: Thumbnail;
  ze_html_linked_title_icon_size: Thumbnail;
  ze_portfolio_image_size_3: Thumbnail;
  ze_portfolio_image_size_4: Thumbnail;
  ze_vc_portfolio_demo_6: Thumbnail;
  ze_vc_videogridimage_thumb: Thumbnail;
  ze_vc_videogridimage_large: Thumbnail;
  ze_vc_pricing_blurb_image: Thumbnail;
  'ze-vc-team-member': Thumbnail;
  'ze-vc-team-member-plumbing': Thumbnail;
  'ze-vc-team-member-plumbing-team': Thumbnail;
  ze_vc_testimonial_author_image: Thumbnail;
  ze_vc_gallery_3_size: Thumbnail;
  ze_vc_gallery_4_size: Thumbnail;
  ze_vc_gallery_work_size: Thumbnail;
  full: Thumbnail;
}

interface Thumbnail {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

interface Author2 {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: Avatarurls;
  _links: Links2;
}

interface Links2 {
  self: Self[];
  collection: Self[];
}

interface Avatarurls {
  '24': string;
  '48': string;
  '96': string;
}

interface Links {
  self: Self[];
  collection: Self[];
  about: Self[];
  author: Author[];
  replies: Author[];
  'version-history': Versionhistory[];
  'predecessor-version': Predecessorversion[];
  'wp:featuredmedia': Author[];
  'wp:attachment': Self[];
  'wp:term': Wpterm[];
  curies: Cury[];
}

interface Cury {
  name: string;
  href: string;
  templated: boolean;
}

interface Wpterm {
  taxonomy: string;
  embeddable: boolean;
  href: string;
}

interface Predecessorversion {
  id: number;
  href: string;
}

interface Versionhistory {
  count: number;
  href: string;
}

interface Author {
  embeddable: boolean;
  href: string;
}

interface Self {
  href: string;
}

interface Content {
  rendered: string;
  protected: boolean;
}

interface Guid {
  rendered: string;
}
