import type { APIRoute } from 'astro';
import { articleFeed } from '@/data/feed';

export const GET: APIRoute = ({ site }) => articleFeed('en', site);
