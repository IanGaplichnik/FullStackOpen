const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises} </p>
  )
}

const PartsList = ({ course }) => {
  return course.parts.map(part => <Part key={part.id} part={part}> </Part>)
}

const Course = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <PartsList course={course}></PartsList>
    </div >
  )
}

export default Course