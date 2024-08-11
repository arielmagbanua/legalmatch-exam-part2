import {useParams} from "react-router";

function Employee() {
  const { id } = useParams();
  return (
    <div>Employee: {id}</div>
  );
}

export default Employee;

