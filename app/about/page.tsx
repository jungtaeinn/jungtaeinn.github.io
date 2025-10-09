import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Mail, Linkedin, Instagram, MapPin, Calendar, FileText, ExternalLink } from 'lucide-react';

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
                  <CardTitle className="text-2xl">JungTaeInn</CardTitle>
                  <p className="text-muted-foreground">Frontend Engineer</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Seoul, Korea</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>2016 - Present</span>
                  </div>
                  
                  {/* Career Section */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Career</h4>
                    <div className="space-y-3">
                      {/* AMOREPACIFIC - Current Job */}
                      <div className="flex items-center gap-3 border-l-2 border-primary pl-3">
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <Image
                            src="/images/amorepacific_logo.jpeg"
                            alt="AMOREPACIFIC"
                            fill
                            className="rounded-md object-cover"
                            sizes="40px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">Frontend Engineer</div>
                          <div className="text-xs text-muted-foreground">AMOREPACIFIC</div>
                          <div className="text-xs text-muted-foreground">2020.07 - Present</div>
                        </div>
                      </div>
                      
                      {/* GS ITM - Previous Job */}
                      <div className="flex items-center gap-3 border-l-2 border-muted pl-3">
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <Image
                            src="/images/gsitm_logo.jpeg"
                            alt="GS ITM"
                            fill
                            className="rounded-md object-cover"
                            sizes="40px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">FullStack Developer</div>
                          <div className="text-xs text-muted-foreground">GS ITM</div>
                          <div className="text-xs text-muted-foreground">2016.01 - 2020.06</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Education Section */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Education</h4>
                    <div className="space-y-3">
                      {/* Yonsei University - Master's */}
                      <div className="border-l-2 border-primary pl-3">
                        {/* Mobile/Tablet Layout */}
                        <div className="flex items-center gap-3 xl:hidden">
                          <div className="relative w-10 h-10 flex-shrink-0">
                            <Image
                              src="/images/yonsei_logo.jpeg"
                              alt="Yonsei University"
                              fill
                              className="rounded-md object-cover"
                              sizes="40px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">Computer Software Master&apos;s degree</div>
                            <div className="text-xs text-muted-foreground">Yonsei University</div>
                            <div className="text-xs text-muted-foreground">2022.03 - 2024.02</div>
                          </div>
                        </div>
                        
                        {/* Desktop Layout (1024px+) */}
                        <div className="hidden xl:block">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 flex-shrink-0">
                              <Image
                                src="/images/yonsei_logo.jpeg"
                                alt="Yonsei University"
                                fill
                                className="rounded-md object-cover"
                                sizes="40px"
                              />
                            </div>
                            <div className="font-medium text-sm">Computer Software Master&apos;s degree</div>
                          </div>
                          <div className="mt-1 ml-13 space-y-0.5">
                            <div className="text-xs text-muted-foreground">Yonsei University</div>
                            <div className="text-xs text-muted-foreground">2022.03 - 2024.02</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* H.U.F.S - Bachelor's */}
                      <div className="border-l-2 border-muted pl-3">
                        {/* Mobile/Tablet Layout */}
                        <div className="flex items-center gap-3 xl:hidden">
                          <div className="relative w-10 h-10 flex-shrink-0">
                            <Image
                              src="/images/hufs_logo.jpeg"
                              alt="Hankuk University of Foreign Studies"
                              fill
                              className="rounded-md object-cover"
                              sizes="40px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">Information Communication Engineering Bachelor&apos;s degree</div>
                            <div className="text-xs text-muted-foreground">Hankuk University of Foreign Studies</div>
                            <div className="text-xs text-muted-foreground">2010.03 - 2016.08</div>
                          </div>
                        </div>
                        
                        {/* Desktop Layout (1024px+) */}
                        <div className="hidden xl:block">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 flex-shrink-0">
                              <Image
                                src="/images/hufs_logo.jpeg"
                                alt="Hankuk University of Foreign Studies"
                                fill
                                className="rounded-md object-cover"
                                sizes="40px"
                              />
                            </div>
                            <div className="font-medium text-sm">Information Communication Engineering Bachelor&apos;s degree</div>
                          </div>
                          <div className="mt-1 ml-13 space-y-0.5">
                            <div className="text-xs text-muted-foreground">Hankuk University of Foreign Studies</div>
                            <div className="text-xs text-muted-foreground">2010.03 - 2016.08</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-4">
                    {/* Tech Stack */}
                    <div className="space-y-2">
                      <h4 className="font-semibold">Tech Stack</h4>
                      <div className="flex flex-wrap gap-1">
                        {['TypeScript', 'React', 'Next.js', 'JavaScript', 'Node.js', 'Python',
                          'TanStack', 'Zustand', 'Redux', 'Mobx', 'Tailwind', 'Pnpm',
                          'Docker', 'k8s', 'Webpack', 'Babel', 'Selenium', 'GAN', 'Java'].map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs text-center">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Tools & Services */}
                    <div className="space-y-2">
                      <h4 className="font-semibold">Tools & Services</h4>
                      <div className="flex flex-wrap gap-1">
                        {['Claude Code', 'Cursor AI', 'Github Copilot', 'Intellij', 'Github', 'Gitlab', 'Jenkins',
                          'Jira', 'Wiki', 'Docusaurus', 'Storybook', 'JSDoc', 'Eslint', 'Prettier',
                          'SEO', 'GEO', 'GA', 'Datadog', 'Turborepo', 'Monorepo'].map((tool) => (
                          <Badge key={tool} variant="outline" className="text-xs text-center">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Areas of Interest */}
                    <div className="space-y-2">
                      <h4 className="font-semibold">Areas of Interest</h4>
                      <div className="flex flex-wrap gap-1">
                        {['Frontend Architecture', 'Frontend Optimization', 'Monorepo', 'AI Automation', 'Recommendation System', 'Digital Transformation'].map((field) => (
                          <Badge key={field} variant="default" className="text-xs text-center">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Patent Section */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Patent</h4>
                    <div className="space-y-3">
                      {/* Patent Card */}
                      <div className="border-l-2 border-primary pl-3">
                        <div className="font-medium text-xs">
                          Service providing device, method, and program for providing product recommendation function to individuals through reinforcement learning using Thompson sampling algorithm
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Patent No. 10-2024-00221653
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Filed: 2024.02.15
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <h4 className="font-semibold">Contact</h4>
                    <div className="flex flex-col space-y-2">
                      <a 
                        href="mailto:asgard5493@gmail.com"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        asgard5493@gmail.com
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
                        href="https://www.linkedin.com/in/jungtaeinn5493"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                      <a 
                        href="https://instagram.com/_jungtaeinn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Projects Section */}
            <div className="space-y-8">
              <h1 className="text-2xl font-bold mb-8 text-center sm:text-left">🚀 Projects</h1>
              
              {/* Amorepacific Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src="/images/amorepacific_logo.jpeg"
                      alt="AMOREPACIFIC"
                      fill
                      className="rounded-lg object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary">AMOREPACIFIC</h2>
                    <p className="text-sm text-muted-foreground">2020.07 - Present | Frontend Engineer</p>
                  </div>
                </div>
                <div className="space-y-6">
                  
                {/* AI 기반 아모레몰 고객센터 페이지 개발 */}
                <Card className="border-l-4 border-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg flex-1 min-w-0 break-normal">Turborepo 기반 아모레몰 서비스 페이지 개발</CardTitle>
                      <Badge variant="secondary" className="text-xs text-center flex-shrink-0">AI Automation</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">May 2025 - Nov 2025</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Tech Stack</h4>
                      <div className="flex flex-wrap gap-1">
                        {['Turborepo', 'React 19', 'Next.js 15', 'TypeScript', 'Figma MCP', 'AI Automation', 'Tailwind', 'Storybook', 'Docusaurus'].map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs text-center">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Achievements</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Turborepo 기반 아모레몰 내 고객센터/공지사항/공지사항상세 페이지 개발 및 랜딩</li>
                        <li>• Figma MCP를 활용한 디자인 자동 생성으로 일관성 있는 UI/UX 구현</li>
                        <li>• AI 기반 커밋 메시지 자동 생성으로 개발 프로세스 효율성 향상</li>
                        <li>• AI 기반 Merge Request 자동 생성 및 코드 리뷰 프로세스 자동화</li>
                        <li>• FCP, LCP, CLS, INP 최적화 및 성능 최적화</li>
                        <li>• 다양한 캐싱(TanStack, Next.js 등)을 통한 페이지 간 원활한 전환 및 사용자 경험 최적화</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Turborepo Monorepo Architecture */}
                <Card className="border-l-4 border-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg flex-1 min-w-0 break-normal">Turborepo 기반 모노레포 아키텍처 구축</CardTitle>
                      <Badge variant="secondary" className="text-xs text-center flex-shrink-0">Team: 4 Members</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Dec 2024 - Apr 2025</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Tech Stack</h4>
                      <div className="flex flex-wrap gap-1">
                        {['Turborepo', 'React 19', 'Next.js 15', 'TypeScript', 'React-Query', 'Zustand', 'Tailwind', 'Storybook', 'Docker'].map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs text-center">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Achievements</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 아모레퍼시픽 통합 플랫폼을 위한 확장 가능한 모노레포 아키텍처 설계 및 구축</li>
                        <li>• 패키징화를 통한 코어 플랫폼 형태의 라이브러리 관리 체계 구축</li>
                        <li>• Docusaurus 기반 공식 문서화로 체계적인 코드 구성 및 개발 가이드 제공</li>
                        <li>• 빌드 속도 최적화 및 멀티 프로젝트 관리 효율성 향상</li>
                        <li>• 핵심 패키지와 서비스 코드 분리로 유지보수성 개선</li>
                        <li>• 디커플드 아키텍처를 통한 내부팀과 외주팀 간 협업 효율성 증대</li>
                        <li>• FCP, LCP, CLS, INP 성능 최적화 및 다양한 캐싱 전략을 통한 사용자 경험 향상</li>
                        <li>• Storybook 기반 컴포넌트 문서화로 코드-문서 자동화 구성 및 유지보수성 개선</li>
                      </ul>
                    </div>
                    <div className="pt-2">
                      <a 
                        href="/FE_NEXT_GEN_PRJ_2025_KR_1.3.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                      >
                        <FileText className="h-4 w-4" />
                        프로젝트 상세 문서 보기 (PDF)
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Datadog Conference Speaker */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg flex-1 min-w-0 break-normal">Datadog 컨퍼런스 발표</CardTitle>
                      <Badge variant="outline" className="text-xs text-center flex-shrink-0">Conference</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Nov 2024</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Achievements</h4>
                      <ul className="text-sm space-y-1">
                        <li>• DATADOG LIVE Seoul 2024 컨퍼런스에서 기술 발표 (그랜드 인터컨티넨탈 서울 파르나스)</li>
                        <li>• 아모레몰의 로그 분석 도구 도입 전략 및 상세 구현 사례 공유</li>
                      </ul>
                    </div>
                    <div className="pt-2">
                      <a 
                        href="https://www.linkedin.com/posts/jungtaeinn5493_datadogabrliveabrseoul2024-datadog-amorepacific-activity-7246069209447686144-T0E1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                      >
                        <ExternalLink className="h-4 w-4" />
                        LinkedIn DATADOG LIVE 포스트 보기
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Frontend Team Leadership */}
                <Card className="border-l-4 border-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg flex-1 min-w-0 break-normal">프론트엔드 파트 리드</CardTitle>
                      <Badge variant="secondary" className="text-xs text-center flex-shrink-0">Team: 9 Members</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Apr 2023 - Mar 2024</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Achievements</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 핵심 프론트엔드 인프라 관리 및 미래 전략 수립 (Datadog 통합 등)</li>
                        <li>• 운영 프로세스 표준화 및 기술 문서화 체계 구축</li>
                        <li>• Merge Request 템플릿 프로세스 도입으로 배포 관리 효율성 향상</li>
                        <li>• 백엔드, 기획, 비즈니스, AI 팀과의 크로스 펑셔널 커뮤니케이션 조율</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Commerce Community Platform */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg flex-1 min-w-0 break-normal">커머스 커뮤니티 플랫폼 개발</CardTitle>
                      <Badge variant="secondary" className="text-xs text-center flex-shrink-0">Team: 8 Members</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Feb 2023 - Jul 2023</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Tech Stack</h4>
                      <div className="flex flex-wrap gap-1">
                        {['React.js', 'Next.js', 'TypeScript', 'Redux'].map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs text-center">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Achievements</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Instagram/Pinterest 스타일의 커머스 커뮤니티 플랫폼 개발</li>
                        <li>• 무한 스크롤 및 뒤로가기 네비게이션 성능 최적화</li>
                        <li>• 프론트엔드/백엔드 개발 일정 관리 및 조율</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Log Analysis Tool Strategy */}
                <Card className="border-l-4 border-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg flex-1 min-w-0 break-normal">로그 분석 도구 전략 수립</CardTitle>
                      <Badge variant="secondary" className="text-xs text-center flex-shrink-0">Team: 7 Members</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Oct 2022 - Mar 2024</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Tools</h4>
                      <div className="flex flex-wrap gap-1">
                        {['Datadog', 'Splunk', 'Sentry'].map((tool) => (
                          <Badge key={tool} variant="outline" className="text-xs text-center">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Achievements</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 분산된 로깅 도구 분석 및 비용 중복 문제 식별</li>
                        <li>• Datadog 도입을 위한 단계별 전략 문서 개발</li>
                        <li>• 체계적인 로그 운영 프로세스에 대한 기술 블로그 포스팅</li>
                      </ul>
                    </div>
                    <div className="pt-2">
                      <a 
                        href="https://tech.apddev.com/2024/04/19/amoremall-logger/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                      >
                        <ExternalLink className="h-4 w-4" />
                        기술 블로그 보기
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Product Page Development */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg flex-1 min-w-0 break-normal">상품 페이지 개발 및 운영</CardTitle>
                      <Badge variant="outline" className="text-xs text-center flex-shrink-0">Performance Focus</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Apr 2021 - Dec 2024</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Tech Stack</h4>
                      <div className="flex flex-wrap gap-1">
                        {['React.js', 'Next.js', 'TypeScript', 'Redux'].map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs text-center">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Achievements</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 레거시 시스템에서 모던 React 스택으로 마이그레이션</li>
                        <li>• 단계별 성능 최적화 및 현대화 작업 수행</li>
                        <li>• 체계적인 로깅을 통한 CS 응답 시간 개선</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Optimization Phase 2 */}
                <Card className="border-l-4 border-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg flex-1 min-w-0 break-normal">상품상세 페이지 성능 최적화 2차</CardTitle>
                      <Badge variant="outline" className="text-xs text-center flex-shrink-0">Performance Focus</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">May 2022 - Sep 2022</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Achievements</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 페이지 로드 시간: 1.2초 → 0.567초 (53% 개선)</li>
                        <li>• API 응답 시간: 0.578초 → 0.224초 (61% 개선)</li>
                        <li>• React 메모이제이션을 활용한 전체 프론트엔드 리팩토링</li>
                        <li>• 백엔드팀과의 협업을 통한 API 인터페이스 최적화</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* PC/Mobile Integration Project */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg flex-1 min-w-0 break-normal">PC/모바일 통합 프로젝트</CardTitle>
                      <Badge variant="secondary" className="text-xs text-center flex-shrink-0">Team: 80 Members</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Mar 2022 - Jul 2022</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Achievements</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 분리된 PC/모바일 서비스를 단일 반응형 플랫폼으로 통합</li>
                        <li>• 배포 효율성 및 장애 대응 시간 개선</li>
                        <li>• 사용자 피드백 기반 디바이스별 UI/UX 최적화</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* O2O Reservation Service */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg flex-1 min-w-0 break-normal">O2O 예약 서비스 개발</CardTitle>
                      <Badge variant="secondary" className="text-xs text-center flex-shrink-0">Team: 16 Members</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Oct 2021 - Mar 2022</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Achievements</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 아모레몰 최초 O2O 서비스 구현</li>
                        <li>• 예약 상세/예약하기/완료 페이지 개발</li>
                        <li>• 백엔드팀과의 협업을 통한 방어 로직 및 트랜잭션 처리 구현</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Amoremall Grand Opening */}
                <Card className="border-l-4 border-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg flex-1 min-w-0 break-normal">아모레몰 그랜드 오픈</CardTitle>
                      <Badge variant="secondary" className="text-xs text-center flex-shrink-0">Team: 80 Members</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Jan 2021 - Sep 2021</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Achievements</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 전체 서비스 영역의 UI/UX 완전 리뉴얼</li>
                        <li>• 컴포넌트 모듈화 및 체계적인 아키텍처 구축</li>
                        <li>• 대규모 프로젝트 런칭 및 장애 대응 경험</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Tech Stack Migration */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg flex-1 min-w-0 break-normal">기술 스택 마이그레이션</CardTitle>
                      <Badge variant="secondary" className="text-xs text-center flex-shrink-0">Team: 4 Members</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">May 2021 - Jun 2021</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Achievements</h4>
                      <ul className="text-sm space-y-1">
                        <li>• MobX에서 Redux로 마이그레이션하여 스토어 초기화 문제 해결</li>
                        <li>• Styled-Components를 CSS로 교체하여 확장성 개선</li>
                        <li>• 상태 관리 라이브러리 트레이드오프에 대한 실무 경험 습득</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* React Frontend Infrastructure */}
                <Card className="border-l-4 border-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg flex-1 min-w-0 break-normal">React 프론트엔드 구축</CardTitle>
                      <Badge variant="secondary" className="text-xs text-center flex-shrink-0">Team: 2 Members</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Jul 2020 - Dec 2020</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Tech Stack</h4>
                      <div className="flex flex-wrap gap-1">
                        {['React.js', 'Next.js', 'TypeScript', 'MobX'].map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs text-center">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Achievements</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 창립 프론트엔드 엔지니어로서 초기 React/Next.js 환경 구축</li>
                        <li>• 아키텍처 설계 및 레거시 Java 시스템과의 통합</li>
                        <li>• 점진적 현대화 전략의 기반 마련</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                </div>
              </div>

              {/* GS ITM Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src="/images/gsitm_logo.jpeg"
                      alt="GS ITM"
                      fill
                      className="rounded-lg object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-blue-600">GS ITM</h2>
                    <p className="text-sm text-muted-foreground">2016.01 - 2020.06 | FullStack Developer</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {/* GS ITM Project 1 */}
                  <Card className="border-l-4 border-blue-600">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg flex-1 min-w-0 break-normal">GS홈쇼핑 상품페이지 Vue.js 이관개발</CardTitle>
                        <Badge variant="secondary" className="text-xs text-center flex-shrink-0">Frontend Lead</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">May 2019 - Jun 2020</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1">
                          {['Vue.js', 'JavaScript', 'jQuery', 'Dust.js', 'Eclipse', 'ES5'].map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs text-center">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Key Achievements</h4>
                        <ul className="text-sm space-y-1">
                          <li>• 페이지 진입속도 2.7초 → 1.5초로 44% 개선</li>
                          <li>• 기존 서버 렌더링 기반 Dust.js 제거 및 Vue.js 도입</li>
                          <li>• Vue CDN 방식 채택으로 Eclipse/ES5 환경에서 개발</li>
                          <li>• SPA(Single Page Application) 설계 및 하이브리드 방식 적용</li>
                          <li>• Agile 방식 수용으로 단계별 안정적 서비스 적용</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* GS ITM Project 2 */}
                  <Card className="border-l-4 border-blue-600">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg flex-1 min-w-0 break-normal">GS홈쇼핑 상품페이지 운영</CardTitle>
                        <Badge variant="secondary" className="text-xs text-center flex-shrink-0">FullStack Developer</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Jan 2019 - Jun 2020</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1">
                          {['Vue.js', 'JavaScript', 'jQuery', 'Java', 'Oracle DB', 'Apptimize'].map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs text-center">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Key Achievements</h4>
                        <ul className="text-sm space-y-1">
                          <li>• 2019년 기준 현업 요구사항 서비스 80개 개발/운영</li>
                          <li>• Apptimize Library를 통한 A/B 테스트 기능 개발</li>
                          <li>• Vue.js 도입으로 프론트엔드/백엔드 속도 개선</li>
                          <li>• 상품 페이지 동선 개선 및 고객서비스 트랜드 지표 관리</li>
                          <li>• 보안 취약점 개선 및 방어로직 개발/운영</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* GS ITM Project 3 */}
                  <Card className="border-l-4 border-blue-600">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg flex-1 min-w-0 break-normal">GS홈쇼핑 외부API 연동 프로젝트</CardTitle>
                        <Badge variant="secondary" className="text-xs text-center flex-shrink-0">API Integration</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Mar 2019 - Jun 2019</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1">
                          {['Ajax', 'JavaScript', 'jQuery', 'Java', 'Pixlee API', 'Brightcove API', 'PLYR API'].map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs text-center">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Key Achievements</h4>
                        <ul className="text-sm space-y-1">
                          <li>• 상품 페이지 내 동영상/라이브 최신 시스템 적용</li>
                          <li>• Pixlee API를 통한 Instagram 연동 서비스 개발</li>
                          <li>• Brightcove/PLYR API를 활용한 동영상 및 라이브 API 연동</li>
                          <li>• 추천 이미지 검색 API 및 Apptimize A/B 테스트 라이브러리 적용</li>
                          <li>• 다양한 고객 서비스 제공 및 트랜드 조사 지표 관리</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* GS ITM Project 4 */}
                  <Card className="border-l-4 border-blue-600">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg flex-1 min-w-0 break-normal">GS홈쇼핑 관리도구 운영</CardTitle>
                        <Badge variant="secondary" className="text-xs text-center flex-shrink-0">FullStack Developer</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Jan 2017 - Dec 2018</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1">
                          {['JavaScript', 'jQuery', 'Java', 'Oracle DB', 'MySQL'].map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs text-center">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Key Achievements</h4>
                        <ul className="text-sm space-y-1">
                          <li>• 상품/딜/기획전/이벤트/방송 관리도구 페이지 개발/운영</li>
                          <li>• 상품MD 및 협력사 고객 응대 및 장애 대응</li>
                          <li>• 서비스 지식자산화 정리 및 보안 취약점 개선</li>
                          <li>• Frontend/Backend 중간 허브 역할 수행</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* GS ITM Project 5 */}
                  <Card className="border-l-4 border-blue-600">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg flex-1 min-w-0 break-normal">GS홈쇼핑 여행딜 API 개발</CardTitle>
                        <Badge variant="secondary" className="text-xs text-center flex-shrink-0">API Developer</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">May 2018 - Nov 2018</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1">
                          {['JavaScript', 'jQuery', 'Java', 'API Development'].map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs text-center">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Key Achievements</h4>
                        <ul className="text-sm space-y-1">
                          <li>• 여행상품 생성 자동화로 월 5억원 매출 추가 달성</li>
                          <li>• MD 수동 생성 시스템을 자동화 시스템으로 개선</li>
                          <li>• 여행상품 생성 로직 기반 자동화 API 개발</li>
                          <li>• 서비스 운영 효율성 대폭 향상</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* GS ITM Project 6 */}
                  <Card className="border-l-4 border-blue-600">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg flex-1 min-w-0 break-normal">GS홈쇼핑 위드넷 개선 프로젝트</CardTitle>
                        <Badge variant="secondary" className="text-xs text-center flex-shrink-0">Backend Developer</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Jan 2016 - Dec 2016</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1">
                          {['JavaScript', 'jQuery', 'Java', 'Legacy System'].map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs text-center">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Key Achievements</h4>
                        <ul className="text-sm space-y-1">
                          <li>• 노후화된 협력사 시스템 개선 및 보안 취약점 개선</li>
                          <li>• Java 기반 Backend 페이지 소스 Refactoring 개발</li>
                          <li>• 신규 팝업 페이지 개발</li>
                          <li>• 첫 번째 풀스택 개발 프로젝트 경험</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
