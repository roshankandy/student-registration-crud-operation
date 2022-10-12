
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Student from './pages/Student';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';

function App() {
  return (
    // <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Student/>}></Route>
            <Route path="/add-student" element={<AddStudent/>}/>
            <Route path="/edit-student/:id" element={<EditStudent/>}/>
          </Routes>
        </Router>
        
        
    // </div>
  );
}

export default App;
