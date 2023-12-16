import React, { useState } from "react";
import { Course } from "../Interfaces/course";
import { Semester } from "../Interfaces/semester";
import { Plan } from "../Interfaces/plan";
import { Button, Modal } from "react-bootstrap";

export function CSV({
    semesters
}: {
    semesters: Semester[];
    plan: Plan;
}): JSX.Element {
    const info = semesters.map((semester: Semester) => semester.courseList);

    const [CSVMod, settingCSVMod] = useState(false);
    const handlecloseCSVMod = () => settingCSVMod(false);
    const handleCSVMod = () => settingCSVMod(true);

    function allData(data: Course[]) {
        return data
            .map((row) => `${row.name}, {row.title}, ${row.credits}`)
            .join("\r\n");
    }

    function download(info: Course[], file: string) {
        const Blobby = new Blob([allData(info.flat())]);
        const url = URL.createObjectURL(Blobby);
        const holdElements = document.createElement("a");

        holdElements.href = url;
        holdElements.setAttribute("download", file);
        console.log(url);

        holdElements.click();
    }

    return (
        <div>
            <Button onClick={handleCSVMod} variant="success">
                Export CSV
            </Button>
            <Modal show={CSVMod} onClose={handlecloseCSVMod}>
                <Modal.Header>
                    <h5>Exporting your Data</h5>
                </Modal.Header>
                <Modal.Footer>
                    <Button
                        onClick={() => download(info.flat(), "Export.CSV")}
                        variant="success"
                    >
                        Export
                    </Button>
                    <Button onClick={handlecloseCSVMod}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
