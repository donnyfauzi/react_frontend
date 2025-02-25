import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TabPublished from './TabPublished'
import TabDrafts from './TabDrafts'
import TabTrashed from './TabTrashed'
import '../styles.css'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Published')
   const navigate = useNavigate();


  const handleAddNew = () => {
    navigate('/add-article')
  }

  return (
    <div className='container'>
      <h1 className='title'>Dashboard</h1>
      <button className='button button-add-new' onClick={handleAddNew}>
        Add New Article
      </button>

      <div className='tabs'>
        {['Published', 'Drafts', 'Trashed'].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Konten Tab */}
      <div className='tab-content'>
        {activeTab === 'Published' && <TabPublished />}
        {activeTab === 'Drafts' && <TabDrafts />}
        {activeTab === 'Trashed' && <TabTrashed />}
      </div>
    </div>
  )
}
export default Dashboard
