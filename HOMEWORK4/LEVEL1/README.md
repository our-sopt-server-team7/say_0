#User Table
| Useridx | UserID | name | pw |
|---------|--------|------|----|
| 0 | say0 | 장세영 | 1234 |


#Article Table
| Articleidx | Author | Title | Content | Like |
|------------|--------|-------|---------|------|
| 0 | 뿅갹갹 | 제목1 | 랄랄루 | 0 |
| 1 | 김갹갹 | 제목2 | 뿅갹갹 | 1 |

#comment table
| Commentidx | Artricleidx | UserIdx | comment |
|------------|-------------|---------|---------|
| 0 | 0 | 0 | 잘 읽고 갑니다 |
| 1 | 1 | 0 | 랄랄루 좋네요~ |

#Like table
| LikeIdx | Articleidx | Useridx |
|---------|------------|---------|
| 0 | 1 | 0 |