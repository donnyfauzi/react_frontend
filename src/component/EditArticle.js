import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditArticle = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
  fetch(`https://apisvi.dofazcode.id/api/getArticleById/${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.newArticleById) {
        setArticle(data.newArticleById)
        setTitle(data.newArticleById.title)
        setCategory(data.newArticleById.category)
        setContent(data.newArticleById.content)
        setStatus(data.newArticleById.status)
      }
    })
    .catch((error) => console.error("Error fetching article:", error))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedArticle = { title, category, content, status }

    fetch(`https://apisvi.dofazcode.id/api/updateArticle/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedArticle),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          navigate('/', {
            state: { alert: { type: 'success', message: data.message } },
          })
        }
      })
      .catch((error) => {
        console.error('Error updating article:', error);
        navigate('/', {
          state: {
            alert: { type: 'danger', message: 'Failed to update article.' },
          },
        })
      })
  }

  return (
    <div className='edit-form-container'>
      {article ? (
        <form onSubmit={handleSubmit} className='edit-form'>
          <h2>Edit Article</h2>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='category'>Category</label>
            <input
              type='text'
              id='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='content'>Content</label>
            <textarea
              id='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='status'>Status</label>
            <input
              type='text'
              id='status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='submit-btn'>
            Save Changes
          </button>
        </form>
      ) : (
        <p>Loading article...</p>
      )}
    </div>
  )
}

export default EditArticle
