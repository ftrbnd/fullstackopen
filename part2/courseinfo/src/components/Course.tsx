import { ICourse } from "../App";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

interface IProps {
    course: ICourse
}

const Course = ({ course }: IProps) => {
    return <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
};

export default Course;