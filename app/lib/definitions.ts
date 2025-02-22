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
  id: number;
  documentId: string;
  name: string;
  startDate: string;
  endDate: string;
  location?: string;
  tags?: {
    id?: number;
    tag?: string;
    documentId?: string;
  }[];
  url?: string;
  events?: {
    documentId?: string;
    category?: string;
  }
  publishedAt: string | null;
  category?: string;
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

export interface UserDataProps {
  id: number;
  documentId: string;
  realname: string;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  role: {
    id: number;
    name: string;
  };
  calendars?: CalendarProps[];
}