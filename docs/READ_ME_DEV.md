# Soullink
**2023 06 ~** 
### Made by 0teklee


## KR 

### 개요
플레이리스트를 공유하는 소셜 웹앱을 개발했습니다. 이 서비스는 플레이리스트를 만들고, 공유하며, 재생할 수 있도록 설계되었습니다. 사용자가 편리하게 음악을 감상하고 새로운 음악을 발견하며 커뮤니티를 형성할 수 있도록, 사용자 경험(UX)과 성능 최적화에 주력했습니다.

### 공용 관련
- 현재 재생 중인 플레이리스트를 관리하는 공용 커스텀 훅 개발
- 플레이어 상태를 관리하는 공용 훅 개발
- 무한 스크롤 api 및 ui가 포함된 검색 및 댓글 컴포넌트 개발
- 에러 바운더리 개발
- 다양한 플레이리스트와 노래를 위한 공용 UI 컴포넌트 개발
- 플레이리스트 디테일 및 유저 페이지에 커스텀 색상 기능 구현
- 다크 모드 구현
- 모바일 반응형 대응

### 플레이리스트 관련 구현 사항
- 플레이리스트 생성/수정 페이지, 모달 및 API 개발
- 사용자의 라이크 데이터를 기반으로 하는 Discover 페이지 개발
    - 사용자 개인화 데이터를 이용한 추천 기능 개발
    - Editor 레벨 유저에게 특별한 추천을 제공하는 Featured 섹션 개발
- Trending 페이지를 통해 인기 플레이리스트 소개
    - 사용자 행동 데이터(라이크, 재생 횟수 등)를 기반으로 한 순위 필터링 기능 개발
- 사용자별 최근 재생 플레이리스트 히스토리 UI 및 API 구현
- 플레이리스트 상세 정보 및 댓글 기능이 포함된 디테일 페이지 구현

### 플레이어 관련 기능
- 재생, 중지, 노래 선택, 5초 전/후 이동, 볼륨 조절 등의 플레이어 컨트롤 기능 구현
- Optimistic 업데이트 방식을 적용한 플레이리스트 및 노래 라이크 기능 구현
- 다음 곡으로 자동 전환 기능 구현
- 재생 통계를 위한 데이터 업데이트 훅 개발

### 검색 관련 기능
- 공용 컴포넌트를 활용한 검색 기능 UI 및 API 구현
- 검색 쿼리 인스턴스 관리를 위한 공용 커스텀 훅 개발
- 플레이리스트, 유저, 카테고리 검색 가능
- 재생 횟수, 라이크, 생성일, 재생 빈도를 기준으로 한 필터링 기능 개발

### 유저 관련 기능
- 유저 프로필 페이지 구현
- Google OAuth를 이용한 사용자 가입 및 로그인 기능 구현
- 팔로우/언팔로우 기능 및 비공개 댓글 기능 구현

## EN

### Overview
I developed a social web app for sharing playlists. This service is designed to create, share, and play playlists. It focuses on user experience (UX) and performance optimization to allow users to conveniently enjoy music, discover new songs, and build a community.


### Common Features
- Developed shared custom hooks for managing currently playing playlists
- Developed shared hooks for managing player states
- Implemented infinite scroll API and UI for search and comment components
- Developed error boundaries for robust error handling
- Created shared UI components for multiple playlists and songs
- Implemented custom color features for playlist detail and user profile pages
- Implemented dark mode for user preference
- Responsive design for mobile compatibility

### Playlist Implementation Details
- Developed creation/modification pages, modals, and APIs for playlists
- Developed the Discover page for playlist recommendations based on users' like data
    - Developed recommendation APIs based on mood and genre for personalized user experience
    - Developed Featured section UI and API for highlighting editor-level users' playlists
- Developed the Trending page to showcase popular playlists
    - Developed ranking filters UI and API based on likes, play counts, recent activity, and creation date
- Implemented UI and API for user-specific history of recently played playlists
- Developed detailed playlist pages with play, like features, and comment functionality

### Player Related Features
- Implemented functions to play, stop, select songs, move 5 seconds forward/back, and adjust volume for playlists
- Implemented playlist/song like features with optimistic updates
- Developed functionality for auto-transition to the next track
- Developed hooks to update play counts and song statistics after a certain time

### Search Related Features
- Implemented search functionality UI and API using shared components
- Developed shared custom hooks for managing search query instances
- Search capabilities for playlists, users, and categories
- Implemented filtering based on play counts, likes, creation dates, and frequency of plays

### User Related Features
- Developed profile pages to display user information
- Implemented user signup and login features using Google OAuth
- Developed follow/unfollow functionality and private commenting capabilities

