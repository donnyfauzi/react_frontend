import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddArticle = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('https://apisvi.dofazcode.id/api/addArticle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        category,
        status,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message)
        navigate('/')
      }
    })
    .catch((error) => {
      console.error('Error adding article:', error)
      alert('Failed to add article.')
    })
  }

  return (
    <div className='form-add-new'>
      <form onSubmit={handleSubmit}>
        <h2>Add New Article</h2>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='content'>Content</label>
          <textarea
            id='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor='category'>Category</label>
          <input
            type='text'
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='status'>Status</label>
          <input
            type='text'
            id='status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Add Article</button>
      </form>
    </div>
  )
}

export default AddArticle
