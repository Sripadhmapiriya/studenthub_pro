import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, route, buttonText, gradient }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover-lift transition-standard">
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${gradient || 'bg-primary'}`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <Button
            variant="outline"
            onClick={handleAction}
            iconName="ArrowRight"
            iconPosition="right"
            className="w-full sm:w-auto"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;