import React, { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import CreateTicketPage from '../pages/CreateTicketPage';
import ListTicketsPage from '../pages/ListTicketsPage';
import ConfigPage from '../pages/ConfigPage';

const Dashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState('create-ticket');

  const renderContent = () => {
    switch (activeItem) {
      case 'create-ticket':
        return <CreateTicketPage />;
      case 'list-tickets':
        return <ListTicketsPage />;
      case 'config':
        return <ConfigPage />;
      default:
        return <CreateTicketPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      
      {/* Main Content */}
      <div className="ml-80 flex flex-col min-h-screen">
        {/* Header */}


        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
