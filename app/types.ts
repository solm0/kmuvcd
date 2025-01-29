export interface PostProps {
  id?: number;
  name?: string;
  content?: string;
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
  thumbnail?: MediaProps;
  Event?: EventProps[];
  website?: WebsiteProps[];
}

export interface EventProps {
  id?: number;
  name?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  tags?: {
    id?: number;
    tag?: string;
  }[];
  poster?: MediaProps[];
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