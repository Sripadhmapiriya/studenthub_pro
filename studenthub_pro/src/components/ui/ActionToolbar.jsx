import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';

const ActionToolbar = ({ 
  selectedItems = [], 
  onAddStudent, 
  onExportData, 
  onBulkDelete, 
  onBulkEdit,
  searchValue = '',
  onSearchChange,
  filterValue = 'all',
  onFilterChange,
  isLoading = false 
}) => {
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const location = useLocation();

  const isStudentListPage = location?.pathname === '/student-list';
  const hasSelectedItems = selectedItems?.length > 0;

  const handleExportToggle = () => {
    setIsExportMenuOpen(!isExportMenuOpen);
  };

  const handleExport = (format) => {
    onExportData?.(format, selectedItems);
    setIsExportMenuOpen(false);
  };

  const filterOptions = [
    { value: 'all', label: 'All Students' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'graduated', label: 'Graduated' },
  ];

  if (!isStudentListPage) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Search and Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search students..."
              value={searchValue}
              onChange={(e) => onSearchChange?.(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-micro"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <select
              value={filterValue}
              onChange={(e) => onFilterChange?.(e?.target?.value)}
              className="appearance-none bg-background border border-border rounded-lg px-4 py-2 pr-8 text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-micro"
            >
              {filterOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          {/* Bulk Actions (shown when items are selected) */}
          {hasSelectedItems && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">
                {selectedItems?.length} selected
              </span>
              <div className="w-px h-4 bg-border" />
              <Button
                variant="ghost"
                size="sm"
                onClick={onBulkEdit}
                iconName="Edit"
                iconPosition="left"
                disabled={isLoading}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onBulkDelete}
                iconName="Trash2"
                iconPosition="left"
                disabled={isLoading}
                className="text-destructive hover:text-destructive"
              >
                Delete
              </Button>
            </div>
          )}

          {/* Export Menu */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={handleExportToggle}
              iconName="Download"
              iconPosition="left"
              disabled={isLoading}
            >
              Export
            </Button>

            {isExportMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-3 py-1 z-10">
                <button
                  onClick={() => handleExport('csv')}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro"
                >
                  <Icon name="FileText" size={16} />
                  <span>Export as CSV</span>
                </button>
                <button
                  onClick={() => handleExport('excel')}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro"
                >
                  <Icon name="FileSpreadsheet" size={16} />
                  <span>Export as Excel</span>
                </button>
                <button
                  onClick={() => handleExport('pdf')}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro"
                >
                  <Icon name="FileDown" size={16} />
                  <span>Export as PDF</span>
                </button>
              </div>
            )}
          </div>

          {/* Add Student Button */}
          <Button
            variant="default"
            onClick={onAddStudent}
            iconName="UserPlus"
            iconPosition="left"
            disabled={isLoading}
            className="gradient-primary"
          >
            Add Student
          </Button>
        </div>
      </div>
      {/* Selected Items Summary */}
      {hasSelectedItems && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {selectedItems?.length} of {selectedItems?.length} students selected
            </span>
            <button
              onClick={() => onBulkEdit?.([])}
              className="text-primary hover:text-primary/80 transition-micro"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionToolbar;