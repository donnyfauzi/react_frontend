import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TabDrafts = () => {
  const [articles, setArticles] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://apisvi.dofazcode.id/api/getArticle?status=published')
    .then((response) => response.json())
    .then((data) => {
      console.log(data.newArticle)
      setArticles(data.newArticle[0])
    })
    .catch((error) =>
      console.error('Error fetching published articles:', error)
    )
  }, [])

  const handleEdit = (id) => {
    
    navigate(`/edit-article/${id}`)
  }

  const handleTrash = (id) => {
     
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this article?'
    );

    if (confirmDelete) {
      
      fetch(`https://apisvi.dovazcode.id/api/deleteArticle/${id}`, {
        method: 'DELETE',
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete article.')
        }
        return response.json()
      })
      .then((data) => {
        console.log('Delete Response Data:', data)
        if (data.message) {
          alert(data.message)
        
          setArticles((prevArticles) =>
            prevArticles.filter((article) => article.id !== id)
          );
        } else {
          console.error('No message in response:', data)
        }
      })
      .catch((error) => {
        console.error('Error deleting article:', error)
        alert('Failed to delete article.')
      })
    }
  }

  return (
    <div>
      <h2>Draft Articles</h2>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>content</th>
            <th>category</th>
            <th>status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={article.id}>
              <td>{index + 1}</td>
              <td>{article.title}</td>
              <td>{article.content}</td>
              <td>{article.category}</td>
              <td>{article.status}</td>
              <td>
                <button className='button button-edit' onClick={() => handleEdit(article.id)}><i className='fas fa-edit'></i> Edit</button>
                <button className='button button-trash' onClick={() => handleTrash(article.id)}><i className='fas fa-trash-alt'></i>Trash</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TabDrafts
