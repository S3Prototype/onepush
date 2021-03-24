export default (req, res) => {
    makePost(req.body.params)
    res.status(200).json({ name: 'John Doe' })
}
  

function makePost(query:any){
    fetch('https://api.hashnode.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': '1c2592d7-b24a-40d4-b86a-4c06edcc2187' },
      body: JSON.stringify({
        "query": "mutation createStory($input: CreateStoryInput!){ createStory(input: $input){ title } }",
        "variables": {
          "input": {
            "title": "What are the e2e testing libraries you use ?",
            "contentMarkdown": "I was wondering what e2e testing libaries do you use",
            "tags": [
              {
                "_id": "56744723958ef13879b9549b",
                "slug": "testing",
                "name": "Testing"
              }
            ],
            "coverImage": "https://cdn.hashnode.com/res/hashnode/image-dev/upload/v1562665620141/tc-h-erqF.jpeg",
          }
        }
      }),
    })
      .then(res => res.json())
      .then(res => console.log(JSON.stringify(res)))
  }