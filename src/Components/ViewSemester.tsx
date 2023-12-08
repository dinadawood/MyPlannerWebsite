/* eslint-disable no-extra-parens */

import React, { useState } from "react";
import { Button, Container, Col, Row, Table } from "react-bootstrap";
import { Course } from "../Interfaces/course";
import { Semester } from "../Interfaces/semester";
import { Plan } from "../Interfaces/plan";
import { AddingCourse } from "./addingCourse";
import { ClearSemester } from "./clearingSemester";
import { ViewCourses } from "./ViewCourses";
import { EditingSemester } from "./EditingSemester";

import "../App.css";

export function ViewSemester({
    semester,
    currentPlan,
    settingPlan,
    plans,
    settingPlans,
    clearSemesterCourses,
    editingSemester
}: {
    semester: Semester;
    currentPlan: Plan;
    settingPlan: (t: Plan) => void;
    plans: Plan[];
    settingPlans: (t: Plan[]) => void;
    clearSemesterCourses: (id: string) => void;
    editingSemester: (plan: Plan) => void;
}): JSX.Element {
    const [editing, settingEditing] = useState<boolean>(false);
    const [addingMod, setAddingMod] = useState(false);
    const [clearingMod, setClearingMod] = useState(false);
    const handleCloseAddMod = () => setAddingMod(false);
    const handleAddingMod = () => setAddingMod(true);
    const handleCloseClearMod = () => setClearingMod(false);
    const handleClearingMod = () => setClearingMod(true);

    function editingFunc() {
        settingEditing(!editing);
    }
    const checkingCredits = semester.courseList.filter(
        (c: Course): boolean => !isNaN(Number(c.credits))
    );

    return editing ? (
        <EditingSemester
            editingFunc={editingFunc}
            semester={semester}
            plan={currentPlan}
            settingPlan={settingPlan}
            plans={plans}
            settingPlans={settingPlans}
            clearSemesterCourses={clearSemesterCourses}
            editingSemester={editingSemester}
        ></EditingSemester>
    ) : (
        <Container>
            <Row>
                <Col>
                    <h4>
                        <b>{semester.title}</b>
                    </h4>
                </Col>
            </Row>
            <Row>
                <p>
                    <b>Notes: </b>
                    {semester.notes}
                </p>
            </Row>
            <Row>
                <p>
                    <b>Credits: </b>
                    {checkingCredits.reduce(
                        (total: number, c: Course) => total + Number(c.credits),
                        0
                    )}
                </p>
            </Row>
            <div className="CourSem">
                <Table bordered>
                    <thead>
                        <th>
                            <b>Courses</b>
                        </th>
                    </thead>
                    <tbody>
                        {semester.courseList.map((c: Course) => (
                            <Col key={c.title} sm="3">
                                <ViewCourses
                                    course={c}
                                    courseSemester={semester}
                                    currentPlan={currentPlan}
                                    settingPlan={settingPlan}
                                ></ViewCourses>
                            </Col>
                        ))}
                    </tbody>
                </Table>
            </div>
            <p></p>
            <Row>
                <Col>
                    <p></p>
                    <Button
                        onClick={handleAddingMod}
                        data-testid="addCourseMod"
                        variant="success"
                    >
                        Add Course
                    </Button>
                    <AddingCourse
                        show={addingMod}
                        handleClose={handleCloseAddMod}
                        currentSemester={semester}
                        plan={currentPlan}
                        settingPlan={settingPlan}
                    ></AddingCourse>
                    <p></p>

                    <Button
                        onClick={editingFunc}
                        data-testid="editingSemesterMod"
                        variant="warning"
                    >
                        Edit Semester
                    </Button>
                    <Button
                        onClick={handleClearingMod}
                        data-testid="clearCoursesMod"
                        variant="danger"
                    >
                        Clear All Courses
                    </Button>
                    <ClearSemester
                        show={clearingMod}
                        handleClose={handleCloseClearMod}
                        plan={currentPlan}
                        settingPlan={settingPlan}
                        currentSemester={semester}
                        editingSemester={editingSemester}
                    ></ClearSemester>
                </Col>
            </Row>
        </Container>
    );
}
