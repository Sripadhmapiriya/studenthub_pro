import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CredentialsHelper = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const demoCredentials = [
    {
      role: "Administrator",
      email: "admin",
      password: "admin123",
      description: "Full system access with all permissions"
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    // In a real app, you'd show a toast notification here
  };

  return (
    <div className="mt-6">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full justify-between text-sm text-muted-foreground hover:text-foreground"
        iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
        iconPosition="right"
      >
        Demo Credentials
      </Button>
      {isExpanded && (
        <div className="mt-4 space-y-3 p-4 bg-muted/20 rounded-lg border border-border/50">
          <p className="text-xs text-muted-foreground text-center mb-3">
            Use these credentials to explore different user roles
          </p>
          
          {demoCredentials?.map((cred, index) => (
            <div key={index} className="p-3 bg-card rounded-lg border border-border/30">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-foreground">{cred?.role}</h4>
                <div className="flex space-x-1">
                  <button
                    onClick={() => copyToClipboard(cred?.email)}
                    className="p-1 text-muted-foreground hover:text-foreground transition-micro"
                    title="Copy email"
                  >
                    <Icon name="Mail" size={12} />
                  </button>
                  <button
                    onClick={() => copyToClipboard(cred?.password)}
                    className="p-1 text-muted-foreground hover:text-foreground transition-micro"
                    title="Copy password"
                  >
                    <Icon name="Key" size={12} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={12} className="text-muted-foreground" />
                  <span className="text-xs font-mono text-foreground">{cred?.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Key" size={12} className="text-muted-foreground" />
                  <span className="text-xs font-mono text-foreground">{cred?.password}</span>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-2">{cred?.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CredentialsHelper;