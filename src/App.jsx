import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout Components
import DashboardLayout from "./layout/DashboardLayout";

// Public Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";

// Teacher/Admin Pages
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Tests from "./pages/Tests";
import Test from "./pages/Test"; // Tək test detalı
import Classes from "./pages/Classes";
import CreateClass from "./pages/CreateClass";
import StudentList from "./pages/StudentList";
import StudentDetail from "./pages/StudentDetail";
import Reports from "./pages/Reports";
import CompanySetting from "./pages/CompanySetting";
import Notification from "./pages/Notification";
import Subs from "./pages/Subs";

// Student Pages
import Student from "./pages/Student";
import StudentResult from "./pages/StudentResult";
import StudentProfile from "./pages/StudentProfile";
import StudentSetting from "./pages/StudentSetting";
import StudentNotification from "./pages/StudentNotification";
import AnalyticsPage from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          {/* ===================== */}
          {/* PUBLIC ROUTES */}
          {/* ===================== */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ===================== */}
          {/* TEACHER/ADMIN ROUTES */}
          {/* ===================== */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Ana Panel */}
            <Route index element={<Dashboard />} />

            {/* Test İdarəetmə */}
            <Route path="upload" element={<Upload />} />
            <Route path="tests" element={<Tests />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="test/:testId" element={<Test />} />

            {/* Sinif İdarəetmə */}
            <Route path="classes" element={<Classes />} />
            <Route path="create-class" element={<CreateClass />} />
            <Route path="class/:classId" element={<Classes />} />

            {/* Tələbə İdarəetmə */}
            <Route path="students" element={<StudentList />} />
            <Route path="student/:studentId" element={<StudentDetail />} />

            {/* Hesabatlar */}
            <Route path="reports" element={<Reports />} />

            {/* Tənzimləmələr */}
            <Route path="settings" element={<CompanySetting />} />
            <Route path="notifications" element={<Notification />} />
          </Route>
          <Route path="/subscription" element={<Subs />} />

          {/* ===================== */}
          {/* STUDENT ROUTES */}
          {/* ===================== */}
          <Route
            path="/student"
            element={
                <DashboardLayout userType="student" />      
            }
          >
            {/* Tələbə Ana Panel */}
            <Route index element={<Student />} />

            {/* Test Nəticələri */}
            <Route path="results" element={<StudentResult />} />

            {/* Profil və Tənzimləmələr */}
            <Route path="profile" element={<StudentProfile />} />
            <Route path="settings" element={<StudentSetting />} />
            <Route path="notifications" element={<StudentNotification />} />
          </Route>

          {/* ===================== */}
          {/* ERROR ROUTES */}
          {/* ===================== */}
          <Route path="/error" element={<Error />} />
          <Route path="/unauthorized" element={<Error type="unauthorized" />} />
          <Route path="*" element={<Error type="404" />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
