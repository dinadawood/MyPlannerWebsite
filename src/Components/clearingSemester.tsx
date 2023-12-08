import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Course } from "../Interfaces/course";
import { Semester } from "../Interfaces/semester";
import { Plan } from "../Interfaces/plan";

export function ClearSemester({
    show,
    handleClose,
    currentSemester,
    editingSemester,
    plan,
    settingPlan
}: {
    show: boolean;
    handleClose: () => void;
    currentSemester: Semester;
    editingSemester: (plan: Plan) => void;
    plan: Plan;
    settingPlan: (t: Plan) => void;
}) {
    function saveEdits() {
        const newSemester: Semester = {
            ...currentSemester,
            courseList: [] as Course[]
        };
        const newPlan: Plan = {
            ...plan,
            semesters: plan.semesters.map(
                (s: Semester): Semester =>
                    s.id === currentSemester.id ? newSemester : s
            )
        };
        settingPlan(newPlan);
        editingSemester(newPlan);
        handleClose();
    }
    return (
        <Modal show={show} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    <b>Warning!</b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You are deleting this entire semester, do you confirm?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={handleClose}
                    data-testid="clearSemesterCancelMod"
                    variant="link"
                >
                    Cancel
                </Button>
                <Button
                    onClick={saveEdits}
                    data-testid="clearSemesterDeleteMod"
                    variant="success"
                >
                    Clear
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
