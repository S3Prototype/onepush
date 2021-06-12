
const pushToBackend = async (blogData) => {
    try{
        const result = await fetch('http://localhost:2100/api/write', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          mode: 'cors',
          body: JSON.stringify(blogData),
        }) //end of fetch

        return await result.json()
    } catch(err){
        return [{
            message: 'Error',
            data: `Failed to publish your post.  The server may be down for maintenance. ${err.message}.`
        }]
    }
}

module.exports = {
    pushToBackend
}