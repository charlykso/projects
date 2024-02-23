import getData from './getData.js'

const students = await getData('./data/users.json')
const posts = await getData('./data/posts.json')
for(const post of posts) {
  console.log(post);
  for(const student of students) {
    if(post.author === student.id) {
      console.log(`${student.firstname} ${student.lastname}: ${post.title}`)
    }
  }
}
