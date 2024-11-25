// app/page.js

import { fetchPlans } from '@/app/lib/plans';

export default async function Home({ }) {
  const plans = await fetchPlans();
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      {/* Company Title Card */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold">Chimpphone</h1>
        <p className="mt-4 text-xl">
          Connecting you to the world with exceptional services.
        </p>
      </header>

      {/* Company Information */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">About Us</h2>
        <p className="text-lg leading-relaxed">
          At Chimpphone, we are dedicated to providing top-notch telecommunication services that keep you connected wherever you are. Our plans are tailored to meet the diverse needs of our customers.
        </p>
      </section>

      {/* List of Services */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">Our Services</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>Prepaid and Postpaid Mobile Plans</li>
          <li>Unlimited Data Packages</li>
          <li>International Roaming</li>
          <li>Travel SIM Cards</li>
          {/* Add more services as needed */}
        </ul>
      </section>

      {/* Plans */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">Our Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div key={plan.plan_id} className="border p-6 rounded-lg shadow">
              <h3 className="text-2xl font-bold mb-2">{plan.plan_name}</h3>
              <p className="text-lg mb-4">
                Type: {plan.plan_type.charAt(0).toUpperCase() + plan.plan_type.slice(1)}
              </p>
              <p className="text-lg mb-4">
                Monthly Charge: ${plan.monthly_charge || 'N/A'}
              </p>
              {/* Add more plan details as needed */}
              <a href={`/plans/${plan.plan_id}`} className="text-blue-600 hover:underline">
                View Details →
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

