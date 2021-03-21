export default (req, res) => {
    // writeToMedium(req.body)
    writeToDEV(req.body)
    res.status(200).json({ name: 'It worked' })
}

function writeToDEV(query){
    // console.log("DEV API", process.env.DEV_API_KEY)
    const myRequest = new Request(`https://dev.to/api/articles`, {
        method: 'POST',
        headers: { 
            'api-key': '',
            'Content-Type': 'application/json'
        },
        // mode: 'cors',
        // cache: 'default',
        body: JSON.stringify({
            article: {
                title: query.blogTitle,
                published: true,
                body_markdown: query.blogText,
                tags: [
                "discuss",
                "help"
                ],
                series: "Hello series"
            }
        })
      })

      fetch(myRequest)
      .then(res=>console.log("DEV Result", res))
      .then(res=>console.log(res))
}

function writeToMedium(query){
    // query.tags = convertToHashNodeTags(query.tags)

    const myRequest = new Request(`https://api.medium.com/v1/users/${process.env.MEDIUM_USER_ID}/posts`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Accept-Charset": "utf-8",
            "Host": "api.medium.com",
            'Authorization': `Bearer ${process.env.MEDIUM_API_KEY}`
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({
            title: query.blogTitle,
            contentFormat: "markdown",
            content: query.blogText,
            // canonicalUrl: `http://shaquilhansford.medium.com/posts/${query.blogTitle.replace(/\s/g, '-')}`,
            tags: ["webdev", "tech", "buildinpublic"],
            publishStatus: "public"
          })
      })

      fetch(myRequest)
      .then(res=>console.log(res))
      .then(res=>console.log(res))
      


    // fetch('https://api.medium.com/v1', {
    //     method: 'GET',
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         "Accept": "application/json",
    //         "Accept-Charset": "utf-8",
    //         "Host": "api.medium.com",
    //         'Authorization': "Bearer "
    //     }
    // })
        // body: JSON.stringify({
        //   "query": `mutation createPublicationStory($input: CreateStoryInput!){ createPublicationStory(input: $input, publicationId: "hello1329"){ code success message } }`,
        //   "variables": {
        //     "input": {
        //       "title": query.blogTitle,
        //       "slug": "Test me!",
        //       "contentMarkdown": query.blogText,
        //       "tags": [
        //         {
        //           "_id": "",
        //           "slug": "love",
        //           "name": "Love"
        //         }
        //       ],
        //       "coverImageURL": "https://cdn.hashnode.com/res/hashnode/image-dev/upload/v1562665620141/tc-h-erqF.jpeg",
        //     }
        //   }
        // }),
    //   })
      .then(res => console.log(JSON.stringify(res)))
      .catch(err=>console.log(err))
}