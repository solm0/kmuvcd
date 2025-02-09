export interface PostProps {
  id?: number;
  documentId?: string;
  name?: string;
  text?: string;
  url?: string;
  education?: string;
  location?: string;
  phone?: string;
  email?: string;
  position?: string;
  semester?: number;
  room_number?: string;
  credits?: number;
  subject?: string;
  format?: string;
  mandatory?: boolean;
  grade?: number;
  author?: string;
  poster?: MediaProps;
  thumbnail?: MediaProps;
  media?: MediaProps[];
  photo?: MediaProps[];
  calendars?: CalendarProps[];
  website?: WebsiteProps[];
  content?: ContentItem[];
}

export interface ContentItem {
  __component?: string;
  id?: number;
  text?: string;
  media?: MediaProps;
}

export interface CalendarProps {
  id?: number;
  documentId?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  tags?: {
    id?: number;
    tag?: string;
  }[];
  url?: string;
  detail?: {
    documentId?: string;
  }
}

export interface MediaProps {
  id: number;
  formats: {
    large?: {
      url: string
      width?: number;
      height?: number;
    };
    small?: {
      url: string
      width?: number;
      height?: number;
    };
    medium?: {
      url: string
      width?: number;
      height?: number;
    };
    thumbnail?: {
      url: string
      width?: number;
      height?: number;
    };
  };
  alternativeText?: string;
}

export interface WebsiteProps {
  id: number;
  name?: string;
  url?: string;
}