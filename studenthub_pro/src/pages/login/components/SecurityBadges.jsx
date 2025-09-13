import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: "Shield",
      title: "SSL Secured",
      description: "256-bit encryption"
    },
    {
      icon: "Lock",
      title: "FERPA Compliant",
      description: "Educational privacy"
    },
    {
      icon: "CheckCircle",
      title: "SOC 2 Certified",
      description: "Security standards"
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border/50">
      <div className="text-center mb-4">
        <p className="text-xs text-muted-foreground font-medium">
          Trusted by Educational Institutions
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-2">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <Icon name={feature?.icon} size={14} className="text-success" />
              </div>
            </div>
            <h4 className="text-xs font-medium text-foreground mb-1">
              {feature?.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadges;