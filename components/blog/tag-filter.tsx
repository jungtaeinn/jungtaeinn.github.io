'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

export default function TagFilter({ 
  tags, 
  selectedTags, 
  onTagToggle, 
  onClearAll 
}: TagFilterProps) {
  if (tags.length === 0) return null;

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-semibold">Tag Filter</h3>
        {selectedTags.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground text-xs sm:text-sm"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            모두 지우기
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <Badge
              key={tag}
              variant={isSelected ? "default" : "outline"}
              className="cursor-pointer transition-colors hover:bg-primary/80 text-xs"
              onClick={() => onTagToggle(tag)}
            >
              {tag}
              {isSelected && (
                <X className="h-3 w-3 ml-1" />
              )}
            </Badge>
          );
        })}
      </div>
      
      {selectedTags.length > 0 && (
        <div className="text-xs sm:text-sm text-muted-foreground">
          {selectedTags.length}개 태그가 선택됨
        </div>
      )}
    </div>
  );
}
