import React, { useEffect, useState } from 'react'
import PersonForm from "./PersonForm"
import Filter from "./Filter"
import Persons from "./Persons"
import PersonService from "./services/Persons"
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll] = useState(false)
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const hook = () => {
    PersonService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter))

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) === true) {
        PersonService
          .update((persons.find(person => person.name === newName).id),
          {
            name: newName,
            number : newNumber
          })
          .then(PersonService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
            }))
          notificationMessage(`Replaced ${newName} number`)
      }
    } else {

      const numberObject = {
        name: newName,
        number : newNumber
      }

      PersonService
        .create(numberObject)
        .then(response => {
          setPersons(persons.concat(response))
          notificationMessage(`Added ${newName}!`)
        })
        .catch(error => {
          console.log(error.response.data)
          notificationMessage(error.response.data.error)
        })
    }
    setNewName("")
    setNewNumber("")
  }

  const handleDeletePerson = (id) => {
    if (window.confirm("poistetaanko?") === true) {
      PersonService
      .remove(id)
      .then(() => {
        let deletedPerson = persons.find(person => person.id === id).name
        setPersons(persons.filter(person => person.id !== id))
        notificationMessage(`Deleted ${deletedPerson}`)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const notificationMessage = (message) => {
    setNotification(message)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
        <Notification message={notification}/>
      <h2>Filter</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add New</h2>
        <PersonForm 
          addPerson={addPerson} 
          newName={newName} 
          handleNameChange={handleNameChange} 
          newNumber={newNumber} 
          handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow} handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App