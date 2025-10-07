import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Mail, Linkedin, MapPin, Calendar } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader className="text-center">
                  <div className="relative mx-auto w-32 h-32 mb-4">
                    <Image
                      src="/images/profile.png"
                      alt="정태인 프로필"
                      fill
                      className="rounded-full object-cover"
                      sizes="128px"
                      quality={90}
                    />
                  </div>
                  <CardTitle className="text-2xl">정태인</CardTitle>
                  <p className="text-muted-foreground">개발자</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>서울, 대한민국</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>2024년부터 블로그 운영</span>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <h4 className="font-semibold">기술 스택</h4>
                    <div className="flex flex-wrap gap-1">
                      {['TypeScript', 'React', 'Next.js', 'Node.js', 'Python'].map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <h4 className="font-semibold">연락처</h4>
                    <div className="flex flex-col space-y-2">
                      <a 
                        href="mailto:jungtaeinn@example.com"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        jungtaeinn@example.com
                      </a>
                      <a 
                        href="https://github.com/jungtaeinn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="h-4 w-4" />
                        @jungtaeinn
                      </a>
                      <a 
                        href="https://linkedin.com/in/jungtaeinn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-6">안녕하세요! 👋</h1>
              <div className="prose-custom max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  개발자로서의 여정을 기록하고 공유하는 공간에 오신 것을 환영합니다.
                </p>
                
                <h2>저에 대해</h2>
                <p>
                  저는 개발자로서 지속적인 학습과 성장을 추구합니다. 
                  새로운 기술을 배우고, 프로젝트를 통해 경험을 쌓아가며, 
                  그 과정에서 얻은 인사이트를 이 블로그를 통해 공유하고 있습니다.
                </p>

                <h2>관심 분야</h2>
                <ul>
                  <li><strong>프론트엔드 개발</strong>: React, Next.js, TypeScript를 활용한 사용자 경험 중심의 웹 개발</li>
                  <li><strong>백엔드 개발</strong>: Node.js, Python을 사용한 서버 사이드 개발</li>
                  <li><strong>클라우드 & DevOps</strong>: AWS, Docker, CI/CD 파이프라인 구축</li>
                  <li><strong>데이터 분석</strong>: Python을 활용한 데이터 분석 및 시각화</li>
                </ul>

                <h2>블로그 목표</h2>
                <p>
                  이 블로그는 단순히 기술적인 내용만 다루는 것이 아닙니다. 
                  개발자로서의 일상, 시행착오, 그리고 성장 과정을 솔직하게 기록하여 
                  같은 길을 걷는 분들과 함께 성장하고자 합니다.
                </p>

                <h2>함께 성장해요!</h2>
                <p>
                  블로그를 통해 만나게 된 모든 분들과 함께 지식을 공유하고, 
                  서로에게 영감을 주는 커뮤니티를 만들어가고 싶습니다. 
                  언제든지 댓글이나 연락을 통해 소통해주세요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
