import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import IssuesSidebar from './IssuesSidebar';
import { MapPin, AlertTriangle, Clock, User, Phone, MapPinIcon } from 'lucide-react';

const MapView = ({ issues = [], onIssueSelect, language, translations }) => {
  const [viewState, setViewState] = useState({
    longitude: 75.8577, // Indore coordinates
    latitude: 22.7196,
    zoom: 12
  });
  
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [hoveredIssue, setHoveredIssue] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Filter issues to show only those with valid coordinates
  const validIssues = issues.filter(issue => 
    issue.location && 
    issue.location.lat && 
    issue.location.lng &&
    issue.location.lat >= 22.6 && issue.location.lat <= 22.8 && // Indore bounds
    issue.location.lng >= 75.7 && issue.location.lng <= 75.9
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444'; // red
      case 'medium': return '#f59e0b'; // yellow
      case 'low': return '#10b981'; // green
      default: return '#6b7280'; // gray
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const handleMarkerClick = (issue) => {
    setSelectedIssue(issue);
    setShowPopup(true);
    if (onIssueSelect) {
      onIssueSelect(issue);
    }
  };

  const handleMarkerHover = (issue) => {
    setHoveredIssue(issue);
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: translations.pending,
      assigned: translations.assigned,
      'in-progress': translations.inProgress,
      completed: translations.completed
    };
    return labels[status] || status;
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      high: translations.high,
      medium: translations.medium,
      low: translations.low
    };
    return labels[priority] || priority;
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Map Container */}
      <div className="flex-1 relative">
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: '100%', height: '100%' }}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          attributionControl={false}
        >
          {/* Issue Markers */}
          {validIssues.map((issue) => (
            <Marker
              key={issue.id}
              longitude={issue.location.lng}
              latitude={issue.location.lat}
              anchor="bottom"
            >
              <div
                className="relative cursor-pointer transform transition-transform hover:scale-110"
                onClick={() => handleMarkerClick(issue)}
                onMouseEnter={() => handleMarkerHover(issue)}
                onMouseLeave={() => setHoveredIssue(null)}
              >
                {/* Custom Pin */}
                <div 
                  className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: getPriorityColor(issue.priority) }}
                >
                  <MapPinIcon className="w-5 h-5" />
                </div>
                
                {/* Priority Badge */}
                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs">
                  {getPriorityIcon(issue.priority)}
                </div>

                {/* Hover Tooltip */}
                {hoveredIssue?.id === issue.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-64 z-10">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-blue-600 text-sm">
                          {issue.complaintNumber}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          issue.priority === 'high' ? 'bg-red-100 text-red-800' :
                          issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {getPriorityLabel(issue.priority)}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                        {issue.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <User size={12} />
                        <span>{issue.userName}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Clock size={12} />
                        <span>{getStatusLabel(issue.status)}</span>
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                  </div>
                )}
              </div>
            </Marker>
          ))}

          {/* Detailed Popup */}
          {showPopup && selectedIssue && (
            <Popup
              longitude={selectedIssue.location.lng}
              latitude={selectedIssue.location.lat}
              anchor="top"
              onClose={() => {
                setShowPopup(false);
                setSelectedIssue(null);
              }}
              closeButton={true}
              closeOnClick={false}
              className="custom-popup"
            >
              <div className="p-4 max-w-sm">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-blue-600">
                      {selectedIssue.complaintNumber}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedIssue.priority === 'high' ? 'bg-red-100 text-red-800' :
                      selectedIssue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {getPriorityLabel(selectedIssue.priority)}
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-gray-900">
                    {selectedIssue.title}
                  </h4>
                  
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {selectedIssue.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <User size={14} />
                      <span>{selectedIssue.userName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={14} />
                      <span>{selectedIssue.userPhone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} />
                      <span>{selectedIssue.location.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={14} />
                      <span>{getStatusLabel(selectedIssue.status)}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      {translations.created}: {new Date(selectedIssue.createdAt).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            </Popup>
          )}
        </Map>

        {/* Map Legend */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-800 mb-3 text-sm">
            {translations.priority} {language === 'en' ? 'Levels' : 'स्तर'}
          </h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-700">{translations.high}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-700">{translations.medium}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-700">{translations.low}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              {translations.totalIssues}: {validIssues.length}
            </p>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
          <button
            onClick={() => setViewState(prev => ({ ...prev, zoom: Math.min(prev.zoom + 1, 18) }))}
            className="block w-8 h-8 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors mb-1"
          >
            +
          </button>
          <button
            onClick={() => setViewState(prev => ({ ...prev, zoom: Math.max(prev.zoom - 1, 8) }))}
            className="block w-8 h-8 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
          >
            −
          </button>
        </div>
      </div>

      {/* Issues Sidebar */}
      <IssuesSidebar 
        issues={validIssues} 
        onIssueSelect={(issue) => {
          setSelectedIssue(issue);
          setViewState(prev => ({
            ...prev,
            longitude: issue.location.lng,
            latitude: issue.location.lat,
            zoom: 15
          }));
          setShowPopup(true);
        }}
        selectedIssue={selectedIssue}
      />
    </div>
  );
};

export default MapView;