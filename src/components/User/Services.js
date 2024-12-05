import React from 'react';
import { Truck, RotateCcw, Shield, HeadphonesIcon } from 'lucide-react';

function Services() {
  const services = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Shipping",
      description: "Order above $200"
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Money-back",
      description: "30 days guarantee"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Payments",
      description: "Secured by Stripe"
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Phone and Email support"
    }
  ];

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="text-center bg-gray-100 p-8">
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;

