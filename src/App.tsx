import { Navigate, Route, Routes, useLocation } from "react-router";
import { useMemo } from "react";
import { Feed } from "./pages/Feed";
import { Profile } from "./pages/Profile";
import ProfileModal from "./pages/Profile/components/profileModal";

export default function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location } | null;

  // When opening the modal from /feed we pass state.backgroundLocation.
  // If it exists, render the "underlay" using it; otherwise use current location.
  const underlayLocation = useMemo(
    () => state?.backgroundLocation || location,
    [state, location],
  );

  return (
    <>
      {/* Underlay (what stays behind the modal) */}
      <Routes location={underlayLocation}>
        <Route path="/" element={<Navigate to="/feed" replace />} />
        <Route path="/feed" element={<Feed />} />
        {/* Full-page fallback if user hits /profile directly */}
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {/* Modal layer (only when opened from a background route) */}
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/profile"
            element={
              <ProfileModal
                onClose={() =>
                  window.history.length
                    ? history.back()
                    : (window.location.href = "/feed")
                }
              />
            }
          />
        </Routes>
      )}
    </>
  );
}
