import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../screen/Home/Home';
import Summary from '../screen/SummaryView/SummaryView';


const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route index path='/' element={<Home />} />
                <Route path='summary' element={<Summary />} />
            </Routes>
        </BrowserRouter>
    )
}


export default Router;