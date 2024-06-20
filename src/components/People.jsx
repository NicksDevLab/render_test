import { Tag } from "./Tag"
import { DeleteButton } from "./DeleteButton"

export const People = ({ people, toggleImportance, deletePerson }) => {
  return (
    <ul>
      {people.map(person => <li className='list-people' key={person.id}>
        <div>{person.name} {person.number}</div>
        <Tag person={person} toggleImportance={toggleImportance} />
        <DeleteButton person={person} deletePerson={deletePerson} />
      </li>
      )}
    </ul>
  )
}
