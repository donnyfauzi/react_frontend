import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TabPublished from './TabPublished'
import '../styles.css'

const Dashboard = () => {
  const [activeTab] = useState('Published')
   const navigate = useNavigate();


  const handleAddNew = () => {
    navigate('/add-article')
  }

  return (
    <div className='container'>
      <h1 className='title'>Dashboard</h1>
      <button className='button button-add-new' onClick={handleAddNew}> + Booking Ruang Rapat</button>

      {/* Konten Tab */}
      <div className='tab-content'>
        {activeTab === 'Published' && <TabPublished />}
      </div>
    </div>
  )
}
export default Dashboard
