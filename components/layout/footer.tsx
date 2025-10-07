import Link from 'next/link';
import {Github, Mail, Linkedin, Instagram} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 sm:mt-24 lg:mt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center space-y-6">
          {/* 소셜 링크 */}
          <div className="flex items-center justify-center space-x-6">
            <Link 
              href="https://github.com/jungtaeinn" 
              className="text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
                href="https://www.linkedin.com/in/jungtaeinn5493"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
                href="https://instagram.com/_jungtaeinn"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:jungtaeinn@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>

          {/* 저작권 */}
          <div className="text-sm text-muted-foreground">
            <p>&copy; 2025 - Jungtaeinn. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
