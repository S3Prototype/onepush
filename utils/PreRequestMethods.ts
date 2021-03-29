import customError from '../utils/ErrorMessages'

export default {
    findErrorsInPost: (blogTitle, blogText, activeBlogs, apiKeys)=>{
        console.log("Test")
        
        if(!blogTitle)
            return customError.generateError(`Failed to submit. The title of your blog post is empty.`)        

        if(!blogText)
            return customError.generateError(`Failed to submit. The body of your blog post is empty.`)

        if(activeBlogs.length <= 0)
            return customError.generateError(`Please select the blogs you want to post to in the Connections tab.`)

        if(!Object.keys(apiKeys).some(key=>apiKeys[key].current !== ''))
            //if no api keys were entered
            return customError.generateError(`Please enter the API Keys for the blogs you want to post to in the Connections tab.`)


        console.log("returning null somehow")
        return null
    }
}