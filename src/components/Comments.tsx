import { Avatar } from './Avatar';
import styles from './Comments.module.css';
import { ThumbsUp } from '@phosphor-icons/react/dist/ssr';
import { Trash } from '@phosphor-icons/react'

interface CommentProps {
  content: string;
  onDeleteComment:(comment:string) => void;
}

export function Comment ({content, onDeleteComment}: CommentProps) {

  function handleDeleteComment() {
    onDeleteComment(content)
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/gui-cordeiro22.png" alt=''/>

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Guilherme Cordeiro</strong>
              <time title="01 de Fevereiro de 2024 às 09:32" dateTime="2024-02-01 09:32:00">Cerca de 1h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24}/>
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp/>
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
