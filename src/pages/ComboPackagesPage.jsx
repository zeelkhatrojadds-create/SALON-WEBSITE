import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ComboPackagesPage has been retired.
 * All combo packages have been integrated into the Treatments page (/treatments#treatment-combos).
 */
export default function ComboPackagesPage() {
  return <Navigate to="/treatments" replace />;
}
