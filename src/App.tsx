import { Header } from './components/header';
import {Post} from './components/Post';
import {Sidebar} from './components/Sidebar'
import './components/global.css'
import styles from './App.module.css'

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/gui-cordeiro22.png',
      name: 'Guilherme Cordeiro',
      role: 'Web Developer',
    },

    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋',},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare',},
      {type: 'link', content:'👉 jane.design/doctorcare',},
    ],

    publishedAt: new Date ('2024-02-06 16:15:00'),
  },

  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Educator @Rocketseat',
    },

    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋',},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto',},
      {type: 'paragraph', content:'que fiz no NLW Return, evento da Rocketseat.O nome do projeto',},
      {type: 'link', content:'👉 jane.design/doctorcare',},
    ],

    publishedAt: new Date ('2024-02-04 13:20:00'),
  },
]

export function App() {
  return (
    <div>

    <Header />
      <div className={styles.wrapper}>

        <Sidebar />

        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                author= {post.author}
                content= {post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>

    </div>
  )
}
