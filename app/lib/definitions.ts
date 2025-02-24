export interface PostProps {
  id?: number;
  documentId?: string;
  name?: string;
  text?: string;
  url?: string;
  education?: string;
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
  category?: string;
  dynamic?: {
    __component: string;
    image_block?: MediaProps[];
    text_block?: string;
  }[];
  tags?: {
    name: string;
    documentId: string;
  }
  startDate: string;
  endDate: string;
  location?: string;
  publishedAt: string | null;
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
  subPath?: string;
  notices?: {
    documentId?: string;
    category?: string;
  };
  events?: {
    documentId?: string;
    category?: string;
  };
  exhibitions?: {
    documentId?: string;
    category?: string;
  };
  clubs?: {
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
  clubs?: PostProps[];
  events?: PostProps[];
  exhibitions?: PostProps[];
  notices?: PostProps[];
  kookmins?: PostProps[];
}