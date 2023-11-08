const Part = ({ part }) => <p>{part.name} {part.exercises} </p>

const Content = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0)

  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part}> </Part>)}
      <b>total of {total} exercises</b>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <Content parts={course.parts}></Content>
    </div>
  )
}

export default Course