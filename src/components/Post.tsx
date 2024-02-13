import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import { Avatar } from './Avatar';
import { Comment } from './Comments';
import styles from './post.module.css';
import { FormEvent, ChangeEvent ,useState, InvalidEvent } from 'react';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author,
  publishedAt: Date;
  content:Content[];
}

export function Post ({ author, publishedAt, content }:PostProps) {

/*Comentário inicial*/
  const [comments, setComments] = useState ([

  ])
/*Formatando a data de publicação para ptBR*/
  const publishedDateFormatted = format (publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBr,
  })
/*Formatando há quanto tempo o post foi feito*/
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true,
  })
/*Criando novo estado para armazenar em tempo real o valor da textarea*/
  const [newCommentText,setNewCommentText] = useState('')

/*Acrescenta o comentário*/
  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()/*Evitando redirecionamento padrão do HTML*/
    setComments([...comments,newCommentText]);
    setNewCommentText('')

  }
/*Armazena o valor da textarea*/
  function handleNewCommentChange (event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)

  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment =>{
      return comment !== commentToDelete
    })
    setComments(commentsWithoutDeletedOne)
  }

  function handleNewCommentInvalid(event:InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  const isNewCommentEmpty = newCommentText.length === 0 /*Variáveis auxiliares que facilitam na manutenção do code*/
  return (
    <article className= {styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === 'link') {
            return <p key={line.content}><a href="">{line.content}</a></p>;
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe o seu feedback</strong>
        <textarea name='comment'
        onChange={handleNewCommentChange}
        value={newCommentText}
        placeholder='Deixe um comentário'
        required={true}
        onInvalid={handleNewCommentInvalid}
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>

    </article>
  );
}
