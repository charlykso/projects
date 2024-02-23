import Admin from './admin.js'
import Students from './students.js'
import Post from './post.js'
import FileSystem from './fileSystem.js'

const admin1 = new Admin('Jane', 'Doe', 'jane@gmail.com', '123456')
const student1 = new Students(
  'Miracle',
  'Okafor',
  'miracle@gmail.com',
  '123456',
  'LST001022024'
)
const student2 = new Students(
  'Chinwuba',
  'Obi',
  'chinwuba@gmail.com',
  '123456',
  'LST002022024'
)
const student3 = new Students(
  'Chidinma',
  'Okafor',
  'chidinma@gmail.com',
  '123456',
  'LST003022024'
)
const students = [admin1, student1, student2, student3]
const jsonData1 = JSON.stringify(students)

const post1 = new Post(
  'My first post',
  'This is the body of my first post',
  student1.id
)
const post2 = new Post(
  'My second post',
  'This is the body of my second post',
  student2.id
)
const post3 = new Post(
  'My third post',
  'This is the body of my third post',
  student3.id
)
const posts = [post1, post2, post3]
const jsonData2 = JSON.stringify(posts)

const filepath1 = './data/posts.json'

const filepath = './data/users.json'
FileSystem(filepath, jsonData1)
FileSystem(filepath1, jsonData2)
