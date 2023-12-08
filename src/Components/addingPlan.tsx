import React, { useState } from "react";
import { Button, Modal, Col, Row, Form } from "react-bootstrap";
import { Semester } from "../Interfaces/semester";
import { Plan } from "../Interfaces/plan";
import "../App.css";

export function AddingPlan({
    show,
    handleClose,
    plans,
    settingPlan,
    settingPlans
}: {
    show: boolean;
    handleClose: () => void;
    plans: Plan[];
    settingPlan: (t: Plan) => void;
    settingPlans: (t: Plan[]) => void;
}) {
    const [planTitle, setTitle] = useState<string>("");

    function saveEdits() {
        const newPlan: Plan = {
            id: plans.length + 1,
            title: planTitle,
            concentration: "",
            semesters: [] as Semester[],
            credits: 0
        };
        plans.push(newPlan);
        settingPlan(newPlan);
        setTitle(" ");
        settingPlans(plans);
        handleClose;
    }

    return (
        <Modal show={show} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Plan Name:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group
                    controlId="courseID"
                    as={Row}
                    data-testid="TitleBoxAP"
                >
                    <Form.Label column sm={3}>
                        Plan Title:
                    </Form.Label>
                    <Col>
                        <Form.Control
                            value={planTitle}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setTitle(event.target.value)}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="link"
                    onClick={handleClose}
                    data-testid="closeButtonAP"
                >
                    Close
                </Button>
                <Button
                    variant="success"
                    onClick={saveEdits}
                    data-testid="saveButtonAP"
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
