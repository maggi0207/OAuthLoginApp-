import { useAuth0 } from '@auth0/auth0-react';

const EmployeeBenefitsDashboard = () => {
  const { user } = useAuth0();
  return (
    <div style={{ padding: 20 }}>
      <h2>💼 Employee Benefits Dashboard</h2>
      <p>Welcome, {user.name}</p>
      <ul>
        <li>🏖️ Leave Balance: 12 days</li>
        <li>💰 Last Salary Credit: ₹75,000</li>
        <li>🏥 Health Coverage: ₹5,00,000/year</li>
      </ul>
    </div>
  );
};

export default EmployeeBenefitsDashboard;
