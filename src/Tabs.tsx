import React, { useState, ReactNode } from 'react';

interface TabProps {
  children: ReactNode;
  label: string;
}

export const Tab: React.FC<TabProps> = ({ children }) => <>{children}</>;

interface TabsProps {
  children: React.ReactElement<TabProps>[];
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-4">
      <div className="flex border-b">
        {children.map((child, index) => (
          <button
            key={child.props.label}
            className={`px-4 py-2 ${
              index === activeTab
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="p-4">{children[activeTab]}</div>
    </div>
  );
};
