
const filter = (props) => {

    return( 
        <div>
            
            <input 
                value={props.filter}
                onChange={props.handleFilterChange}
            />
        </div>
    )
}

export default filter