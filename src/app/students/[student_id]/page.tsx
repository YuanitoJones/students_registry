"use client";
import StudentScreen from "./studentScreen.view";
import { useStudentScreenLogic } from "./studentScreen.logic";

const StudentInfoScreen = () => {
   const logic = useStudentScreenLogic();
   return <StudentScreen {...logic} />;
};

export default StudentInfoScreen;
