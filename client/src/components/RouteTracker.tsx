import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

export default function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    // Solo registrar si se ha inicializado GA4 (si TRACKING_ID estaba presente)
    if (ReactGA.isInitialized) {
      ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
    }
  }, [location]);

  return null;
}
