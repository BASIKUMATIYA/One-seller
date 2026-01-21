
export type ViewState = 
  | 'login' 
  | 'signup' 
  | 'forgot_password' 
  | 'otp' 
  | 'onboarding'
  | 'dashboard' 
  | 'catalog' 
  | 'orders'
  | 'content' 
  | 'collaboration' 
  | 'community' 
  | 'live' 
  | 'marketing'
  | 'legal'
  | 'analytics' 
  | 'profile';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  stock: number;
  image: string;
  status: 'active' | 'draft' | 'archived';
  sku: string;
  description?: string;
  variants?: string[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  response?: string;
  status: 'published' | 'pending' | 'flagged';
  productName: string;
}

export interface Creator {
  id: string;
  name: string;
  niche: string;
  followers: string;
  avatar: string;
  status: 'invited' | 'connected' | 'collaborating';
}

export interface Campaign {
  id: string;
  name: string;
  budget: number;
  spent: number;
  status: 'active' | 'paused' | 'ended';
  roas: number;
}
