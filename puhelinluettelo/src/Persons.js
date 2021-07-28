import Button from "./Button"

const Numbers = (props) => {
    return (
        <>
            {props.personsToShow.map(person =>
                <li key={person.id}>{person.name} {person.number} <Button handleClick= {() => props.handleDeletePerson(person.id)} text="delete"/> </li> 
            )}
        </>
    )
}
export default Numbers