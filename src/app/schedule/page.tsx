import { Button } from "react-bootstrap";
import { PeopleFill } from "react-bootstrap-icons";

/** The Schedule page. */
const Schedule = () => (
    <Button className="btn-success py-2 px-4 w-100" href="/editSchedule">
        <PeopleFill /> Edit Schedule
    </Button>
);

export default Schedule;