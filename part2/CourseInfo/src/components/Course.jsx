const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises} </p>
  )
}

const Content = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0)

  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part}> </Part>)}
      <p>total of {total} exercises</p>
    </div>
  )
}

const Course = ({ course }) => {

  return (
    <div>
      <h1>{course.name}</h1>
      <Content parts={course.parts}></Content>
    </div>
  )
}

export default Course