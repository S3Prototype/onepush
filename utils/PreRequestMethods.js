module.exports =  {
    findErrorsInPost: ({blogTitle, blogText, activeBlogs, apiKeys})=>{
        const issues = []

        if(!blogTitle)
            issues.push(`The title of your blog post is empty.`)
        if(!blogText)
            issues.push(`The body of your blog post is empty.`)
        if(activeBlogs.length <= 0)
            issues.push(`You have not selected any blogs to post to.`)        
        if(!apiKeys.some(key=>apiKeys[key].current !== ''))
            issues.push(`Please enter the API Keys for the blogs you want to post to in the Connections tab.`)
            //if no api keys were entered

        if(issues.length > 0) return issues.map(issue=>({
            message: 'Error',
            data: issue
        }))

        return null
    }
}