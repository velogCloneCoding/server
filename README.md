# server

- Velog의 서버 레포입니다.

## Database

- AWS의 RDS를 사용한다. (프리티어)

#### Table구조(2021.08.29 초기버전)

![image](https://user-images.githubusercontent.com/27190776/131244691-eca75cf7-6652-4bb7-ba0e-f54749bb4c3e.png)

- Users : 유저정보
  - 깃허브 OAuth와 로컬로그인을 동시에 사용하기 위해 github_id와 email column을 설정했다.
- Articles : 글
  - 조회수를 볼 수 있도록 HITS column을 설정했다.
- Comments : 댓글
  - Comments는 답글을 위해 관계 테이블을 추가로 설정했다.
- Users, Articles, Comments는 soft delete를 위하여 delete_at column을 설정했다.
