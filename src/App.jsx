import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PrototypeLayout from './components/PrototypeLayout'
import OriginalHome from './pages/OriginalHome'
import PlaceholderPage from './pages/PlaceholderPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/original" replace />} />

        <Route element={<PrototypeLayout view="original" />}>
          <Route path="/original" element={<OriginalHome />} />
          <Route
            path="/original/services"
            element={
              <PlaceholderPage
                heading="Original services"
                summary="The services page, including the inline telehealth link, comes next."
              />
            }
          />
          <Route
            path="/original/telehealth"
            element={
              <PlaceholderPage
                heading="Original telehealth"
                summary="The sidebar, the three ways to schedule, the form, and the FAQ come next."
              />
            }
          />
        </Route>

        <Route element={<PrototypeLayout view="redesign" />}>
          <Route
            path="/redesign"
            element={
              <PlaceholderPage
                heading="Redesign home"
                summary="Find a clinic, Find a service, and Virtual visit come next. Virtual visit will be the primary action."
              />
            }
          />
          <Route
            path="/redesign/services"
            element={
              <PlaceholderPage
                heading="Services"
                summary="In the redesign, telehealth starts from Virtual visit on the home page. This services page is not part of that path."
              />
            }
          />
          <Route
            path="/redesign/telehealth"
            element={
              <PlaceholderPage
                heading="Redesign telehealth"
                summary="How it works, eligibility, and the request action come next."
              />
            }
          />
          <Route
            path="/redesign/request"
            element={
              <PlaceholderPage
                heading="Request a telehealth visit"
                summary="The request form comes next. It will not send or store anything."
              />
            }
          />
          <Route
            path="/redesign/confirmation"
            element={
              <PlaceholderPage
                heading="Request received"
                summary="The confirmation comes next. It will say the request was received."
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/original" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
