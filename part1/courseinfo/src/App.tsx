import Content from "./components/Content";
import Header from "./components/Header"
import Total from "./components/Total";

export interface IPart {
  name: string;
  exercises: number;
}

interface ICourse {
  name: string;
  parts: IPart[];
}

const App = () => {
  const course: ICourse = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App