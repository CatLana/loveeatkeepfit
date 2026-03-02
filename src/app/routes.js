// Simple route mapping for /app section
// In a real Next.js app, these would be handled by the filesystem, but this helps for future migration
export const routes = {
  '/app': 'index.jsx',
  '/app/lessons': 'lessons.jsx',
  '/app/lesson/:id': 'lesson/[id].jsx',
  '/app/chat': 'chat.jsx',
  '/app/faq': 'faq.jsx',
};
