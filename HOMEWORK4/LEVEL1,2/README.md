#User Table
| UserIdx | UserID | name | pw |
|---------|--------|------|----|
| 0 | say0 | 장세영 | 1234 |


#Article Table
| ArticleIdx | Author | Title | Content | Like |
|------------|--------|-------|---------|------|
| 0 | 뿅갹갹 | 제목1 | 랄랄루 | 0 |
| 1 | 김갹갹 | 제목2 | 뿅갹갹 | 1 |

#comment table
| CommentIdx | ArtricleIdx | UserIdx | comment |
|------------|-------------|---------|---------|
| 0 | 0 | 0 | 랄랄루 좋네요~ |
| 1 | 1 | 0 | 좋은 글. 추천합니다. |

#Like table
| LikeIdx | ArticleIdx | UserIdx |
|---------|------------|---------|
| 0 | 1 | 0 |