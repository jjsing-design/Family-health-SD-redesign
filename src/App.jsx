import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PrototypeLayout from './components/PrototypeLayout'
import OriginalHome from './pages/OriginalHome'
import OriginalServices from './pages/OriginalServices'
import OriginalTelehealth from './pages/OriginalTelehealth'
import RedesignHome from './pages/RedesignHome'
import RedesignTelehealth from './pages/RedesignTelehealth'
import RedesignRequest from './pages/RedesignRequest'
import RedesignConfirmation from './pages/RedesignConfirmation'
import PlaceholderPage from './pages/PlaceholderPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/original" replace />} />

        <Route element={<PrototypeLayout view="original" />}>
          <Route path="/original" element={<OriginalHome />} />
          <Route path="/original/services" element={<OriginalServices />} />
          <Route path="/original/telehealth" element={<OriginalTelehealth />} />
        </Route>

        <Route element={<PrototypeLayout view="redesign" />}>
          <Route path="/redesign" element={<RedesignHome />} />
          <Route
            path="/redesign/services"
            element={
              <PlaceholderPage
                heading="Services"
                summary="In the redesign, telehealth starts from Virtual visit on the home page. This services page is not part of that path."
              />
            }
          />
          <Route path="/redesign/telehealth" element={<RedesignTelehealth />} />
          <Route path="/redesign/request" element={<RedesignRequest />} />
          <Route path="/redesign/confirmation" element={<RedesignConfirmation />} />
        </Route>

        <Route path="*" element={<Navigate to="/original" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
