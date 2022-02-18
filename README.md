
| Route                                         | Render                                              | Permissions     |
| --------------------------------------------- | --------------------------------------------------- | --------------  |
**GET**
| /                                             | homepage/                                           | All             |
| /search?:keyword                              | /search-results                                     | All             |
| /signup                                       | /auth/signup                                        | All             |
| /login                                        | /auth/login                                         | All             |
| /logout                                       | homepage/                                           | Only logged user|
| users/profile/:id                             | /user/profile                                       | Only logged user|
| users/profile/edit/:id                        | /user/edit-profile                                  | Only logged user|
| users/memes/:id                               | /user/memes     (2 partials)                        | All/User        |
| users/memes/create/:id                        | /user/create-meme                                   | Only logged user|
| /memers                                       | /memers-list                                        | All             |
| /battles                                      | /battles/all-battles                                | All             |
| /battle/:id                                   | /battles/battle-details                             | All             |
| /battle/create                                | /battles/create-battle                              | Only logged user|
| /battle/attack/:id                            | /battles/battle/create-attack                       | Only logged user|

| Route                                         | Render                                              | Permissions     |
| --------------------------------------------- | --------------------------------------------------- | --------------  |
**POST**
| /search?:keyword                              | /search-results                                     | All             |
| /signup                                       | /auth/signup                                        | All             |
| /login                                        | /auth/login                                         | All             |
| /my-profile/edit/:id                          | /user/edit-profile                                  | Only logged user|
| /users/memes/create/:id                       | /user/create-meme                                   | Only logged user|
| /battle/create                                | /battles/create-battle                              | Only logged user|
| /battle/attack/:id                            | /battles/battle/create-attack                       | Only logged user|



## Models

User model
 
```
username: String
email: String
password: String
profile pic: String
description: String
memes:[]
{timeStamp = true}
```

Meme model

```
owner: ObjectId<User>
name: String
battles: []
imageUrl: String
{timestamp: true}
``` 

Battles model

```
owner: ObjectId<User>
title: String
imageUrl: String
atacksArray: [{type: Schema.Types.ObjectId, ref:"Attack"}]
```

Attack model

```
owner: ObjectId<User>
imageUrl: String
points: Number