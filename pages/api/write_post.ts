import { write } from "node:fs"

export default (req, res) => {
    // writeToMedium(req.body)
    // writeToDEV(req.body)
    // writeToHashnode(req.body)
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
      
}

function writeToHashnode(query){
    fetch('https://api.hashnode.com', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': "1c2592d7-b24a-40d4-b86a-4c06edcc2187"
        },
        body: JSON.stringify({
            query: "mutation createStory($input: CreateStoryInput!){ createStory(input: $input){ code success message } }",
            variables: {
                input: {
                    title: "What are the e2e testing libraries you use ?",
                    contentMarkdown: "I was wondering what e2e testing libaries do you use",
                    tags: [
                        {
                            _id: "56744723958ef13879b9549b",
                            slug: "testing",
                            name: "Testing"
                        }
                    ],
                    coverImageURL: "https://cdn.hashnode.com/res/hashnode/image-dev/upload/v1562665620141/tc-h-erqF.jpeg",
                }
            }
        })
      })
    .then(res =>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
}