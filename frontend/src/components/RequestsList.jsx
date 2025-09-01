import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { listRequests } from '../redux/slices/friendsSlice'
import UserCard from './UserCard'

export const RequestsList = () => {
    const dispatch = useDispatch()
    const { incomingRequests, loading, error } = useSelector((state) => state.friends)

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(listRequests())
        }
        fetchData()
    }, [dispatch])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className='requests-list'>
            {loading ? <div className='loading'>Loading...</div> : null}
            {error && <div className='error'>{error}</div>}
            {incomingRequests.length === 0 && <div className='no-items'>No incoming requests found.</div>}
            {incomingRequests.map((request) => (
                <UserCard key={request._id} user={{ ...request.from, status: request.status, requestId: request._id  }} style={{ width: '100%' }} />
            ))}
        </div>
    )
}
