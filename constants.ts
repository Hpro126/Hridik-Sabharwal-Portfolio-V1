import { Project, Animation, BlogPost, Edit } from './types';
import heroData from './content/hero.json';
import aboutData from './content/about.json';
import footerData from './content/footer.json';
import projectsData from './content/projects.json';
import animationsData from './content/animations.json';
import editsData from './content/edits.json';
import blogsData from './content/blogs.json';

export const HERO_TEXT = heroData;

export const ABOUT_TEXT = aboutData.about;

export const FULL_ABOUT = aboutData.fullAbout;

export const FOOTER_TEXT = footerData.text;

/* 
  NOTE FOR LOCAL DEV:
  Place your images in: public/assets/images/projects/
*/
export const PROJECTS: Project[] = projectsData.projects as Project[];

/* 
  NOTE FOR LOCAL DEV:
  Place your animation videos in: public/assets/videos/animations/
  Place thumbnails in: public/assets/images/animations/
*/
export const ANIMATIONS: Animation[] = animationsData.animations as Animation[];

/* 
  NOTE FOR LOCAL DEV:
  Place your edit videos in: public/assets/videos/edits/
  Place thumbnails in: public/assets/images/edits/
*/
export const EDITS: Edit[] = editsData.edits as Edit[];

/* 
  NOTE FOR LOCAL DEV:
  Place blog cover images in: public/assets/images/blog/
*/
export const BLOGS: BlogPost[] = blogsData.blogs as BlogPost[];