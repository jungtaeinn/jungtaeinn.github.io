---
title: "Do what you can, with what you have, where you are"
date: "2024-01-20"
excerpt: "Sin tantum modo ad indicia veteris memoriae cognoscenda, curiosorum. Haec et tu ita posuisti, et verba vestra sunt. Idemne potest esse dies saepius, qui seme..."
tags: ["Work", "Life", "Philosophy"]
category: "Work"
featured: true
coverImage: "/images/nextjs-blog.jpg"
---

# Do what you can, with what you have, where you are

Sin tantum modo ad indicia veteris memoriae cognoscenda, curiosorum. Haec et tu ita posuisti, et verba vestra sunt. Idemne potest esse dies saepius, qui seme...

## Technology Stack

- **Next.js 14**: Latest React framework with App Router
- **TypeScript**: Language for type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Gray Matter**: Markdown file metadata parsing
- **Remark**: Markdown to HTML conversion

## Key Features

### 1. Markdown-based Post Writing
```typescript
// lib/posts.ts
export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      
      return {
        slug,
        content: matterResult.content,
        ...matterResult.data,
      } as PostData;
    });
    
  return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1);
}
```

### 2. Responsive Design
Implemented responsive design using Tailwind CSS that perfectly adapts from mobile to desktop.

### 3. Dark Mode Support
Enhanced user experience with dark mode support using CSS variables.

## Implementation Process

1. **Project Initialization**: `npx create-next-app@latest`
2. **Dependency Installation**: Install necessary packages
3. **Directory Structure Setup**: Design markdown files and component structure
4. **Styling**: Implement modern design with Tailwind CSS
5. **Feature Implementation**: Post list, detail pages, tag/category filtering

## Deployment

Deployed as a static site using GitHub Pages. Generated static files using `next export` and set up automatic deployment through GitHub Actions.

## Conclusion

I was able to create a sophisticated blog relatively easily using Next.js's powerful features and Tailwind CSS's convenience. I will continue to improve it going forward.

---

*If this post was helpful, please leave your thoughts in the comments!*
