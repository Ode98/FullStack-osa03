
const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return(
        <div className='Notification'>
            {message}
        </div>
    )
}

export default Notification