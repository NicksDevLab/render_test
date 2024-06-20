import { useState, useEffect } from "react"
import peopleServices from './services/people'
import Modal from './components/Modal'
import { People } from "./components/People"
import { Filter } from "./components/Filter"
import { Form } from "./components/Form"
import { Notification } from "./components/Notification"
import { Footer } from "./components/Footer"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState()
  const [messageTypeIsError, setMessageTypeIsError] = useState(false)

  const hook = () => {
    peopleServices
      .getAll()
      .then(initialList => {
        console.log(initialList)
        setPersons(initialList)
      })
  }

  useEffect(hook, [])

  const handleTermChange = (event) => {
    setSearchTerm(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    for (const person of persons) {
      if (person.name == newName) { 
        openModal()
        return
      }
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
   
    peopleServices.create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setMessage(`${newPerson.name} added to Phonebook`)
        setMessageTypeIsError(false)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })

  }

  const toggleImportanceOf = (id) => {
    const personCopy = persons.find(person => person.id === id);
    
    if (!personCopy) {
      console.error(`Person with id ${id} not found`);
      return;
    }
  
    const updatedPerson = { ...personCopy, important: !personCopy.important };
    
    peopleServices.update(id, updatedPerson)
     .then(update => {
      setPersons(persons.map(person => person.id !== id ? person : update));
    }).catch(() => {
      setMessage(`Person '${updatedPerson.name}' was already removed from server.`)
      setMessageTypeIsError(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  const deletePerson = (id) => {
    peopleServices.deletePerson(id)
    setPersons(persons.filter(person => person.id !== id))
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    console.log('Confirmed');
    const copy = persons
    copy.find(person => person.name == newName).number = newNumber
    setPersons(copy)
    setIsModalOpen(false)
    setMessageTypeIsError(false)
    setMessage('Number successfully updated!')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setNewName('')
    setNewNumber('')
  };

  const filteredList = searchTerm == '' ? 
  persons : 
  persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
  

  return (
    <div>
      <Modal name={newName} isOpen={isModalOpen} onClose={closeModal} onConfirm={handleConfirm} />
      <h2>Phonebook</h2>
      <Notification message={message} messageTypeIsError={messageTypeIsError} />
      <Filter term={searchTerm} handleChange={handleTermChange} />
      <Form 
        name={newName} 
        number={newNumber} 
        nameChange={handleNameChange} 
        numberChange={handleNumberChange} 
        addPerson={addPerson}
      />
      <People people={filteredList} toggleImportance={toggleImportanceOf} deletePerson={deletePerson} />
      <Footer />
    </div>
  )
}

export default App
