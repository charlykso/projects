import { v4 as uuidv4 } from 'uuid'
import getData from './getData.js'

class Post{
    constructor(title, body, author){
        this.id = uuidv4()
        this.title = title
        this.body = body
        this.author = author
        this.created_at = new Date()
        this.updated_at = new Date()
    }

    getPost(){
        return {
            id: this.id,
            title: this.title,
            body: this.body,
        }
    }

    getAuthor(){
        const users = getData('./data/users.json')
        const author = users.find(user => user.id === this.author)
        return author
    }
}

export default Post